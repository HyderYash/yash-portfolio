'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
// Type-only: erased at compile time, so `three` still arrives solely via the
// dynamic import inside start() and never lands in the initial bundle.
import type * as THREE from 'three'

type Phase = 'idle' | 'playing' | 'over'

const LANES = [-2.7, 0, 2.7]
const FLOOR = 0.9 // a request below this has been dropped
const REACH = 6.2 // highest a server can serve from
const HEAT_PER_HIT = 26
const COOL_PER_SEC = 15
const OFFLINE_MS = 2200
const MAX_DROPS = 3

/**
 * "Load" — three servers, one stream of requests, and traffic that keeps rising.
 *
 * Press a lane to serve the lowest request in it. Every hit heats that server;
 * heat bleeds off over time, and a server pushed to 100 goes offline for a
 * couple of seconds. So the game is not "hit everything as fast as possible" —
 * it is "spread the load", which is the point.
 *
 * Same contract as every other canvas here: `three` loads on the Play click, the
 * loop stops when the tab is hidden, and the HUD lives in the DOM rather than
 * being painted into the canvas.
 */
export default function LoadGame() {
  const mount = useRef<HTMLDivElement>(null)
  const api = useRef<{ serve: (lane: number) => void; dispose: () => void } | null>(null)

  const [phase, setPhase] = useState<Phase>('idle')
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [drops, setDrops] = useState(0)
  const [rate, setRate] = useState(0)
  const [heat, setHeat] = useState<number[]>([0, 0, 0])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    try {
      const v = Number(localStorage.getItem('load-best') ?? 0)
      if (Number.isFinite(v)) setBest(v)
    } catch {
      /* storage blocked */
    }
  }, [])

  const start = useCallback(async () => {
    if (!mount.current || loading) return
    setLoading(true)

    const THREE = await import('three')
    const host = mount.current
    if (!host) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(host.clientWidth, host.clientHeight, false)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    host.replaceChildren(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(46, host.clientWidth / host.clientHeight, 0.1, 100)
    camera.position.set(0, 4.6, 12.4)
    camera.lookAt(0, 4.2, 0)

    scene.add(new THREE.AmbientLight(0xffffff, 0.66))
    const key = new THREE.DirectionalLight(0xffffff, 1.1)
    key.position.set(4, 12, 8)
    scene.add(key)

    const ACCENT = 0x22d3ee
    const HOT = 0xff4d4d

    // ── Servers ──────────────────────────────────────────────────────────────
    const rackGeo = new THREE.BoxGeometry(1.9, 1.5, 1.6)
    const servers = LANES.map((x) => {
      const mat = new THREE.MeshLambertMaterial({ color: ACCENT })
      const mesh = new THREE.Mesh(rackGeo, mat)
      mesh.position.set(x, 0.75, 0)
      scene.add(mesh)
      return { mesh, mat, heat: 0, offlineUntil: 0 }
    })

    // Lane guides, so it is obvious where requests will land.
    const guideGeo = new THREE.BoxGeometry(0.03, 9, 0.03)
    const guideMat = new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.12 })
    LANES.forEach((x) => {
      const g = new THREE.Mesh(guideGeo, guideMat)
      g.position.set(x, 5.4, 0)
      scene.add(g)
    })

    // ── Requests ─────────────────────────────────────────────────────────────
    const reqGeo = new THREE.BoxGeometry(0.52, 0.52, 0.52)
    type Req = { mesh: THREE.Mesh; lane: number }
    const reqs: Req[] = []

    // ── Pulses (visual feedback for a served request) ────────────────────────
    const pulseGeo = new THREE.BoxGeometry(1.5, 0.16, 1.3)
    type Pulse = { mesh: THREE.Mesh; life: number }
    const pulses: Pulse[] = []

    let alive = true
    let frame = 0
    let last = performance.now()
    let sinceSpawn = 0
    let servedCount = 0
    let dropCount = 0
    let elapsed = 0

    function interval() {
      // 1150ms down to 360ms over roughly ninety seconds.
      return Math.max(360, 1150 - elapsed * 9)
    }

    function spawn() {
      const lane = Math.floor(Math.random() * 3)
      const mat = new THREE.MeshLambertMaterial({ color: 0xdff9ff })
      const mesh = new THREE.Mesh(reqGeo, mat)
      mesh.position.set(LANES[lane], 10.2, 0)
      mesh.rotation.set(0.4, 0.6, 0)
      scene.add(mesh)
      reqs.push({ mesh, lane })
    }

    function endRun() {
      alive = false
      setPhase('over')
      setBest((b) => {
        const next = Math.max(b, servedCount)
        try {
          localStorage.setItem('load-best', String(next))
        } catch {
          /* ignore */
        }
        return next
      })
    }

    function serve(lane: number) {
      if (!alive) return
      const s = servers[lane]
      if (performance.now() < s.offlineUntil) return

      // Lowest request in this lane that is within reach.
      let target: Req | null = null
      for (const r of reqs) {
        if (r.lane !== lane) continue
        if (r.mesh.position.y > REACH) continue
        if (!target || r.mesh.position.y < target.mesh.position.y) target = r
      }

      s.heat = Math.min(100, s.heat + HEAT_PER_HIT)
      if (s.heat >= 100) s.offlineUntil = performance.now() + OFFLINE_MS

      const pulse = new THREE.Mesh(
        pulseGeo,
        new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.85 }),
      )
      pulse.position.set(LANES[lane], 1.6, 0)
      scene.add(pulse)
      pulses.push({ mesh: pulse, life: 1 })

      if (!target) return // fired into empty air; the heat cost still applies

      scene.remove(target.mesh)
      ;(target.mesh.material as THREE.Material).dispose()
      reqs.splice(reqs.indexOf(target), 1)
      servedCount += 1
      setScore(servedCount)
    }

    function loop() {
      frame = requestAnimationFrame(loop)
      const now = performance.now()
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (alive) elapsed += dt

      // Spawning
      if (alive) {
        sinceSpawn += dt * 1000
        if (sinceSpawn >= interval()) {
          sinceSpawn = 0
          spawn()
          setRate(Math.round(1000 / interval()))
        }
      }

      // Requests fall; anything past the floor is a dropped request.
      const fall = 3.1 + Math.min(elapsed * 0.05, 2.2)
      for (let i = reqs.length - 1; i >= 0; i--) {
        const r = reqs[i]
        r.mesh.position.y -= fall * dt
        r.mesh.rotation.x += dt * 1.6
        if (r.mesh.position.y <= FLOOR) {
          scene.remove(r.mesh)
          ;(r.mesh.material as THREE.Material).dispose()
          reqs.splice(i, 1)
          if (alive) {
            dropCount += 1
            setDrops(dropCount)
            if (dropCount >= MAX_DROPS) endRun()
          }
        }
      }

      // Heat decay, offline state, colour.
      const heats: number[] = []
      servers.forEach((s) => {
        const offline = now < s.offlineUntil
        if (!offline) s.heat = Math.max(0, s.heat - COOL_PER_SEC * dt)
        const t = s.heat / 100
        s.mat.color.setHex(ACCENT).lerp(new THREE.Color(HOT), t)
        if (offline) {
          s.mat.color.setHex(HOT)
          // Flicker so an offline rack is unmistakable.
          s.mesh.scale.y = 1 + Math.sin(now * 0.03) * 0.04
        } else {
          s.mesh.scale.y = 1
        }
        heats.push(Math.round(s.heat))
      })
      setHeat(heats)

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        p.life -= dt * 2.6
        p.mesh.position.y += dt * 16
        ;(p.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, p.life * 0.85)
        if (p.life <= 0) {
          scene.remove(p.mesh)
          ;(p.mesh.material as THREE.Material).dispose()
          pulses.splice(i, 1)
        }
      }

      renderer.render(scene, camera)
    }

    function onResize() {
      if (!host.clientWidth || !host.clientHeight) return
      camera.aspect = host.clientWidth / host.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(host.clientWidth, host.clientHeight, false)
    }
    const ro = new ResizeObserver(onResize)
    ro.observe(host)

    function onVisibility() {
      if (document.hidden) {
        if (frame) cancelAnimationFrame(frame)
        frame = 0
      } else if (!frame) {
        last = performance.now()
        frame = requestAnimationFrame(loop)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    setScore(0)
    setDrops(0)
    setRate(Math.round(1000 / interval()))
    setPhase('playing')
    setLoading(false)
    loop()

    api.current = {
      serve,
      dispose: () => {
        alive = false
        if (frame) cancelAnimationFrame(frame)
        ro.disconnect()
        document.removeEventListener('visibilitychange', onVisibility)
        scene.traverse((o) => {
          const m = o as THREE.Mesh
          if (m.material) (m.material as THREE.Material).dispose()
        })
        rackGeo.dispose()
        reqGeo.dispose()
        pulseGeo.dispose()
        guideGeo.dispose()
        renderer.dispose()
        host.replaceChildren()
      },
    }
  }, [loading])

  const restart = useCallback(() => {
    api.current?.dispose()
    api.current = null
    void start()
  }, [start])

  const quit = useCallback(() => {
    api.current?.dispose()
    api.current = null
    setPhase('idle')
    setScore(0)
    setDrops(0)
    setHeat([0, 0, 0])
  }, [])

  useEffect(() => () => api.current?.dispose(), [])

  useEffect(() => {
    if (phase !== 'playing') return
    function onKey(e: KeyboardEvent) {
      const map: Record<string, number> = {
        Digit1: 0, Digit2: 1, Digit3: 2,
        KeyA: 0, KeyS: 1, KeyD: 2,
        ArrowLeft: 0, ArrowDown: 1, ArrowRight: 2,
      }
      const lane = map[e.code]
      if (lane !== undefined) {
        e.preventDefault()
        api.current?.serve(lane)
      } else if (e.code === 'Escape') {
        quit()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, quit])

  // Touch and mouse: the lane is simply which third of the board was pressed.
  const onPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (phase !== 'playing') return
    const rect = e.currentTarget.getBoundingClientRect()
    const lane = Math.min(2, Math.max(0, Math.floor(((e.clientX - rect.left) / rect.width) * 3)))
    api.current?.serve(lane)
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-surface/60">
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
        <div
          ref={mount}
          className="absolute inset-0"
          onPointerDown={onPointer}
          role={phase === 'playing' ? 'application' : undefined}
          aria-label={phase === 'playing' ? 'Load game board' : undefined}
        />

        {phase === 'playing' && (
          <>
            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5">
              <div>
                <p className="font-display text-3xl font-bold tabular-nums leading-none">{score}</p>
                <p className="mt-1 text-xs text-dim">served · best {best}</p>
              </div>
              <div className="text-right">
                <p className="text-sm tabular-nums text-accent">{rate} req/s</p>
                <p className="mt-1 text-xs text-dim">
                  dropped {drops}/{MAX_DROPS}
                </p>
              </div>
            </div>

            {/* Heat read-out sits under the lanes it describes. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 grid grid-cols-3 gap-2 p-4 sm:p-5">
              {heat.map((h, i) => (
                <div key={i} className="h-1 overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full transition-[width] duration-100"
                    style={{
                      width: `${h}%`,
                      background: h >= 100 ? '#ff4d4d' : 'rgb(var(--c-accent))',
                    }}
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={quit}
              className="absolute right-4 top-16 rounded-full border border-line bg-base/80 px-3 py-1.5 text-xs text-muted backdrop-blur transition-colors hover:text-fg"
            >
              Exit
            </button>
          </>
        )}

        {phase !== 'playing' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
            {phase === 'over' ? (
              <>
                <p className="font-display text-5xl font-bold tabular-nums leading-none">{score}</p>
                <p className="max-w-[34ch] text-sm text-muted">
                  {score >= best && score > 0
                    ? 'New best. Traffic held.'
                    : `Three dropped requests and the run ends. Best so far: ${best}.`}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={restart}
                    className="inline-flex min-h-11 items-center rounded-full bg-accent-solid px-6 text-sm font-medium text-on-accent transition-transform duration-200 ease-expo hover:scale-[1.02]"
                  >
                    Run it again
                  </button>
                  <button
                    type="button"
                    onClick={quit}
                    className="inline-flex min-h-11 items-center rounded-full border border-line px-5 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
                  >
                    Done
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="max-w-[40ch] text-sm leading-relaxed text-muted">
                  Requests fall down three lanes. Press <strong className="text-fg">1</strong>,{' '}
                  <strong className="text-fg">2</strong> or <strong className="text-fg">3</strong>{' '}
                  (or tap a lane) to serve one. Every hit heats that server, and a server pushed to
                  100 drops offline. Spread the load. Three dropped requests ends the run.
                </p>
                <button
                  type="button"
                  onClick={() => void start()}
                  disabled={loading}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent-solid px-6 text-sm font-medium text-on-accent transition-transform duration-200 ease-expo hover:scale-[1.02] disabled:opacity-60"
                >
                  {loading ? 'Loading…' : 'Start traffic'}
                </button>
                <p className="text-xs text-dim">
                  {best > 0 ? `Your best: ${best} served` : 'Nothing loads until you press start'}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

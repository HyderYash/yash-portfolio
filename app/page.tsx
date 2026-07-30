import Image from 'next/image'
import HeroCanvas from '@/components/HeroCanvas'
import Marquee from '@/components/Marquee'
import Motion from '@/components/Motion'
import ScrollProgress from '@/components/ScrollProgress'
import LoadGame from '@/components/LoadGame'
import TechIcon from '@/components/TechIcon'
import ThemeToggle from '@/components/ThemeToggle'
import {
  ArrowUpRight,
  Download,
  Award,
  GitHub,
  Gauge,
  GraduationCap,
  LinkedIn,
  Mail,
  MapPin,
  Server,
  Workflow,
} from '@/components/Icons'
import {
  capabilities,
  certifications,
  education,
  experience,
  intro,
  navLinks,
  person,
  projects,
  skills,
  stats,
  toolbelt,
} from '@/lib/site'

function Monogram() {
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-gradient-to-br from-raised to-surface"
      aria-hidden="true"
    >
      <span className="font-display text-6xl font-semibold tracking-tight text-line/90 sm:text-7xl">
        YS
      </span>
    </div>
  )
}

function StackRow({ items, label }: { items: string[]; label: string }) {
  if (items.length === 0) return null
  return (
    <ul className="mt-6 flex flex-wrap gap-2" aria-label={label}>
      {items.map((tech) => (
        <li key={tech} className="rounded-full border border-line px-3 py-1 text-xs text-dim">
          {tech}
        </li>
      ))}
    </ul>
  )
}

export default function Page() {
  return (
    <>
      <Motion />
      <ScrollProgress />

      <header className="sticky top-0 z-40 border-b border-line/60 bg-base/80 backdrop-blur-md">
        <nav aria-label="Primary" className="shell flex h-16 items-center justify-between gap-6">
          <a
            href="#main"
            className="inline-flex min-h-11 items-center font-display text-sm font-semibold tracking-tight text-fg"
          >
            {person.name}
          </a>
          <ul className="hidden items-center gap-8 sm:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted transition-colors duration-200 hover:text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={`mailto:${person.email}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <Mail className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Get in touch</span>
            </a>
          </div>
        </nav>
      </header>

      <main id="main">
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden">
          <HeroCanvas />
          <div className="shell grid gap-14 py-20 sm:py-28 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-16 lg:py-32">
            <div>
              <p data-reveal data-hero className="eyebrow">
                {person.role} · {person.location}
              </p>
              <h1
                data-split
                className="mt-5 font-display text-[clamp(2.6rem,7vw,4.6rem)] font-bold leading-[0.98] tracking-[-0.03em]"
              >
                {intro.headline}
              </h1>
              <p
                data-reveal
                data-hero
                className="mt-7 max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted"
              >
                {intro.body}
              </p>
              <div data-reveal data-hero className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent-solid px-6 text-sm font-medium text-on-accent transition-transform duration-200 ease-expo hover:scale-[1.02]"
                >
                  See the work
                </a>
                <a
                  href={person.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-6 text-sm text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
                >
                  GitHub
                  <ArrowUpRight className="h-4 w-4 shrink-0" />
                </a>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-6 text-sm text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
                >
                  LinkedIn
                  <ArrowUpRight className="h-4 w-4 shrink-0" />
                </a>
                {person.resumeHref && (
                  <a
                    href={person.resumeHref}
                    // `download` forces a save instead of handing the file to the
                    // browser's PDF viewer, which is what "one click" has to mean.
                    download="yash-sharma-resume.pdf"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-6 text-sm text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
                  >
                    <Download className="h-4 w-4 shrink-0" />
                    Download Resume
                  </a>
                )}
              </div>
            </div>

            <div data-reveal data-hero className="w-full max-w-[19rem] sm:max-w-[21rem] lg:justify-self-end">
              {/* Square box, sized by the wrapper, so the image never shifts layout. */}
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line bg-surface">
                {person.portrait ? (
                  <Image
                    src={person.portrait}
                    alt={person.portraitAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 80vw, 21rem"
                    quality={90}
                    className="object-cover"
                  />
                ) : (
                  <Monogram />
                )}
              </div>
            </div>
          </div>
        </section>


        {/* ── Numbers ───────────────────────────────────────────────────────── */}
        <section className="shell border-y border-line/60 py-12 sm:py-14">
          <dl className="grid grid-cols-2 gap-8 sm:gap-6 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} data-reveal>
                <dt className="sr-only">{`${stat.label} (${stat.note})`}</dt>
                <dd>
                  <span className="font-display text-[clamp(2rem,4.5vw,2.9rem)] font-bold tracking-tight text-fg">
                    {/* Counter ticks from 0; the static value is the SSR fallback. */}
                    <span data-count-to={stat.to} data-count-decimals={stat.decimals}>
                      {stat.to.toFixed(stat.decimals)}
                    </span>
                    <span className="text-accent">{stat.suffix}</span>
                  </span>
                  <span className="mt-1 block text-sm text-muted">{stat.label}</span>
                  <span className="mt-0.5 block text-xs text-dim">{stat.note}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Capabilities ──────────────────────────────────────────────────── */}
        <section className="shell py-20 sm:py-24">
          <h2 data-reveal className="eyebrow">
            What I work on
          </h2>
          <div data-rule className="mt-3 rule" />

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => {
              const Glyph = cap.icon === 'gauge' ? Gauge : cap.icon === 'server' ? Server : Workflow
              return (
                <li key={cap.title} data-reveal>
                  <article className="card h-full p-6 sm:p-7">
                    <span className="icon-tile">
                      <Glyph className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                      {cap.title}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">{cap.body}</p>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${cap.title} tools`}>
                      {cap.tags.map((tag) => (
                        <li key={tag} className="rounded-full border border-line px-3 py-1 text-xs text-dim">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </article>
                </li>
              )
            })}
          </ul>

          <div data-reveal className="mt-14">
            <Marquee items={toolbelt} label="Tools and technologies" />
          </div>
        </section>

        {/* ── Experience ────────────────────────────────────────────────────── */}
        <section id="work" className="shell scroll-mt-24 py-20 sm:py-24">
          <h2 data-reveal className="eyebrow">
            Experience
          </h2>
          <div data-rule className="mt-3 rule" />

          <ol className="mt-12 space-y-14 sm:space-y-16">
            {experience.map((role) => (
              <li key={role.slug} data-reveal>
                <article className="grid gap-6 sm:grid-cols-[1fr_1.6fr] sm:gap-10">
                  <div>
                    <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
                      {role.company}
                    </h3>
                    <p className="mt-2 text-sm text-fg">{role.title}</p>
                    <p className="mt-1 text-sm text-dim">{role.period}</p>
                  </div>

                  <div>
                    <p className="max-w-[58ch] leading-relaxed text-muted">{role.summary}</p>
                    <ul className="mt-5 space-y-2.5">
                      {role.contributions.map((line) => (
                        <li
                          key={line}
                          className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                          />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                    <StackRow items={role.stack ?? []} label={`${role.company} stack`} />
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Projects ──────────────────────────────────────────────────────── */}
        <section id="projects" className="shell scroll-mt-24 py-20 sm:py-24">
          <h2 data-reveal className="eyebrow">
            Projects
          </h2>
          <div data-rule className="mt-3 rule" />

          <ul className="mt-12 grid gap-8 sm:grid-cols-2 sm:gap-10">
            {projects.map((project) => (
              <li key={project.slug} data-reveal>
                <article className="card flex h-full flex-col p-6 sm:p-7">
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-baseline gap-2 transition-colors duration-200 hover:text-accent"
                      >
                        {project.name}
                        <ArrowUpRight className="h-4 w-4 shrink-0" />
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <p className="mt-1.5 text-sm text-dim">{project.subtitle}</p>
                  <p className="mt-1 text-sm text-dim">{project.period}</p>
                  <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                    {project.summary}
                  </p>
                  <StackRow items={project.stack} label={`${project.name} stack`} />
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Skills, education, certifications ─────────────────────────────── */}
        <section id="skills" className="shell scroll-mt-24 py-20 sm:py-24">
          <h2 data-reveal className="eyebrow">
            Technical skills
          </h2>
          <div data-rule className="mt-3 rule" />

          <dl className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {skills.map((group) => (
              <div key={group.label} data-reveal>
                <dt className="font-display text-sm font-semibold tracking-tight text-fg">
                  {group.label}
                </dt>
                <dd className="mt-3">
                  <ul className="flex flex-wrap gap-2.5">
                    {group.items.map((item) => (
                      <li key={item}>
                        <span className="tech-chip">
                          <TechIcon name={item} className="h-4 w-4 shrink-0" />
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-16 grid gap-12 sm:grid-cols-2 sm:gap-10">
            <div data-reveal>
              <h3 className="flex items-center gap-2 font-display text-sm font-semibold tracking-tight">
                <GraduationCap className="h-4 w-4 text-accent" />
                Education
              </h3>
              <p className="mt-3 text-[0.9375rem] text-fg">{education.degree}</p>
              <p className="text-sm text-muted">{education.school}</p>
              <p className="mt-1 text-sm text-dim">{education.period}</p>
            </div>
            <div data-reveal>
              <h3 className="flex items-center gap-2 font-display text-sm font-semibold tracking-tight">
                <Award className="h-4 w-4 text-accent" />
                Certifications
              </h3>
              <ul className="mt-3 space-y-2">
                {certifications.map((cert) => (
                  <li key={`${cert.issuer}-${cert.name}`} className="text-[0.9375rem] text-muted">
                    <span className="text-dim">{cert.issuer}</span> — {cert.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>


        {/* ── Play ──────────────────────────────────────────────────────────── */}
        <section id="play" className="shell scroll-mt-24 py-20 sm:py-24">
          <h2 data-reveal className="eyebrow">
            Keep it up
          </h2>
          <div data-rule className="mt-3 rule" />

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-12">
            <div data-reveal>
              <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
                Three servers, and traffic that will not stop rising
              </h3>
              <p className="mt-4 max-w-[46ch] leading-relaxed text-muted">
                Serve requests before they hit the floor. Every hit heats the server that took it,
                and a server pushed to 100 drops offline. Hammering one lane is how you lose.
              </p>
              <p className="mt-4 max-w-[46ch] text-[0.9375rem] leading-relaxed text-dim">
                It loads nothing until you press Play, so it costs a passing visitor exactly zero.
              </p>
            </div>

            <div data-reveal>
              <LoadGame />
            </div>
          </div>
        </section>

        {/* ── Contact ───────────────────────────────────────────────────────── */}
        <section id="contact" className="shell scroll-mt-24 py-20 sm:py-28">
          <div data-rule className="mt-3 rule" />
          <div className="mt-12" data-reveal>
            <h2 className="max-w-[26ch] font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.03em]">
              Building something that has to hold up? Let&rsquo;s talk.
            </h2>
            <p className="mt-6 max-w-[48ch] leading-relaxed text-muted">
              Email is fastest. I am open to backend and systems work, and to problems that look
              harder than they should be.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${person.email}`}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent-solid px-6 text-sm font-medium text-on-accent transition-transform duration-200 ease-expo hover:scale-[1.02]"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {person.email}
              </a>
              <a
                href={person.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line px-6 text-sm text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                <GitHub className="h-4 w-4 shrink-0" />
                GitHub
                <ArrowUpRight className="h-4 w-4 shrink-0" />
              </a>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line px-6 text-sm text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                <LinkedIn className="h-4 w-4 shrink-0" />
                LinkedIn
                <ArrowUpRight className="h-4 w-4 shrink-0" />
              </a>
              {person.resumeHref && (
                <a
                  href={person.resumeHref}
                  download="yash-sharma-resume.pdf"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line px-6 text-sm text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
                >
                  <Download className="h-4 w-4 shrink-0" />
                  Resume
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line/60 py-10">
        <div className="shell flex flex-col gap-2 text-sm text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {person.name}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {person.location}
          </p>
        </div>
      </footer>
    </>
  )
}

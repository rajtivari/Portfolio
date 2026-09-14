import { ArrowDownRight, ArrowUpRight, Check, CircleAlert, Mail, Radio, Send, Terminal } from 'lucide-react';
import { FormEvent, useState } from 'react';

function SectionHeading({ index, kicker, title, detail }: { index: string; kicker: string; title: string; detail: string }) {
  return (
    <div className="mb-14 grid gap-6 md:grid-cols-[120px_1fr_280px] md:items-end">
      <div className="font-mono text-xs tracking-[.2em] text-[#75e7a1]">{index} / 07</div>
      <div>
        <p className="mb-3 font-mono text-[10px] tracking-[.3em] text-[#718079]">{kicker}</p>
        <h2 className="font-display text-4xl font-semibold tracking-[-.05em] text-[#e0eee3] sm:text-6xl">{title}</h2>
      </div>
      <p className="font-mono text-[10px] leading-6 tracking-[.08em] text-[#779080]">{detail}</p>
    </div>
  );
}

export function HomeSection() {
  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section id="home" className="relative flex min-h-[92dvh] items-center overflow-hidden px-6 py-28 md:px-16 lg:px-28" data-testid="section-home">
      <div className="pointer-events-none absolute -right-24 top-1/4 h-80 w-80 rounded-full border border-[#75e7a1]/10 md:h-[520px] md:w-[520px]" />
      <div className="pointer-events-none absolute right-20 top-1/2 hidden h-px w-64 bg-gradient-to-r from-transparent to-[#75e7a1]/35 md:block" />
      <div className="relative z-10 max-w-5xl">
        <div className="mb-7 flex items-center gap-3 font-mono text-[10px] tracking-[.25em] text-[#75e7a1]">
          <Radio size={13} className="animate-pulse" />
          <span>PORTFOLIO SYSTEM ONLINE</span>
          <span className="text-[#54745f]">/</span>
          <span className="text-[#718079]">AVAILABLE FOR THE NEXT BUILD</span>
        </div>
        <h1 className="max-w-4xl text-[clamp(3.6rem,10vw,9.5rem)] font-extrabold leading-[.84] tracking-[-.095em] text-[#e7f3e9]">
          RAJ<br /><span className="text-[#75e7a1]">TIVARI</span>
        </h1>
        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="font-mono text-sm tracking-[.18em] text-[#c0d5c5]">SOFTWARE DEVELOPER</p>
            <p className="mt-4 max-w-xl text-base leading-8 text-[#81988a]">Building thoughtful web experiences, exploring artificial intelligence, and turning complex ideas into useful software.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => jump('projects')} className="group flex items-center gap-3 border border-[#75e7a1] bg-[#75e7a1] px-5 py-3 font-mono text-[10px] tracking-[.16em] text-[#07100b] transition-transform hover:-translate-y-1" data-testid="button-view-projects">
              VIEW PROJECTS <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button onClick={() => jump('contact')} className="group flex items-center gap-3 border border-[#7cb990]/30 px-5 py-3 font-mono text-[10px] tracking-[.16em] text-[#b4cdbc] transition-colors hover:border-[#75e7a1] hover:text-[#75e7a1]" data-testid="button-contact-me">
              CONTACT ME <ArrowDownRight size={14} />
            </button>
          </div>
        </div>
        <div className="mt-20 grid max-w-2xl grid-cols-2 gap-8 border-t border-[#79b88d]/15 pt-5 font-mono text-[9px] leading-5 tracking-[.1em] text-[#557260] sm:grid-cols-4">
          <div><span className="block text-[#75e7a1]">01</span>WEB DEVELOPMENT</div>
          <div><span className="block text-[#75e7a1]">02</span>ARTIFICIAL INTELLIGENCE</div>
          <div><span className="block text-[#75e7a1]">03</span>SOFTWARE DEVELOPMENT</div>
          <div><span className="block text-[#75e7a1]">04</span>CREATIVE TECHNOLOGY</div>
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="relative px-6 py-28 md:px-16 lg:px-28" data-testid="section-about">
      <SectionHeading index="02" kicker="IDENTITY / CONTEXT" title="About" detail="A concise read on the developer behind the signal. No inflated claims — just the direction that is confirmed." />
      <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <div className="glass-panel relative overflow-hidden p-7 sm:p-10">
          <div className="absolute right-0 top-0 h-24 w-24 border-l border-b border-[#75e7a1]/25" />
          <Terminal size={19} className="mb-10 text-[#75e7a1]" />
          <p className="max-w-2xl text-2xl leading-[1.3] tracking-[-.035em] text-[#d9e9dc] sm:text-4xl">“I’m Raj Tivari, a Software Developer focused on the space where useful software and creative technology meet.”</p>
          <p className="mt-8 max-w-xl text-sm leading-7 text-[#81988a]">My current focus spans web development, artificial intelligence, software development, and creative technology. This portfolio is an evolving record — project, certificate, and experience details will be added as verified records become available.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {[
            ['PROFILE', 'Software Developer', 'A practical, curious builder.'],
            ['OBJECTIVE', 'Learn · build · contribute', 'Looking for opportunities to grow through real software work.'],
          ].map(([label, value, note], index) => (
            <div key={label} className="glass-panel p-7" data-testid={`card-about-${index}`}>
              <p className="mb-8 font-mono text-[9px] tracking-[.25em] text-[#75e7a1]">{label}</p>
              <p className="text-xl tracking-[-.03em] text-[#d9e9dc]">{value}</p>
              <p className="mt-3 text-sm leading-6 text-[#718079]">{note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="relative px-6 py-28 md:px-16 lg:px-28" data-testid="section-projects">
      <SectionHeading index="03" kicker="SELECTED WORK / INDEX" title="Projects" detail="Verified project records are not included in the supplied information yet." />
      <div className="glass-panel relative flex min-h-[320px] flex-col justify-between overflow-hidden p-7 sm:p-10">
        <div className="pointer-events-none absolute right-8 top-8 grid h-32 w-32 grid-cols-4 gap-2 opacity-30">
          {Array.from({ length: 16 }).map((_, index) => <span key={index} className="border border-[#75e7a1]/25" />)}
        </div>
        <div>
          <CircleAlert size={19} className="mb-8 text-[#c8a267]" />
          <p className="font-mono text-[10px] tracking-[.22em] text-[#75e7a1]">PROJECT INDEX / PENDING SOURCE RECORDS</p>
          <h3 className="mt-5 max-w-xl text-3xl tracking-[-.04em] text-[#d9e9dc]">The next build belongs here.</h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#81988a]">No project names, descriptions, technologies, previews, or links were supplied. This space intentionally avoids fabricated work and is ready for Raj’s verified project records.</p>
        </div>
        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#79b88d]/15 pt-5 font-mono text-[9px] tracking-[.1em] text-[#587263]">
          <span>STATUS: AWAITING INPUT</span><span>LINKS: NOT PROVIDED</span><span>PREVIEWS: NOT PROVIDED</span>
        </div>
      </div>
    </section>
  );
}

export function SkillsSection() {
  const focus = ['Web Development', 'Artificial Intelligence', 'Software Development', 'Creative Technology'];
  return (
    <section id="skills" className="relative px-6 py-28 md:px-16 lg:px-28" data-testid="section-skills">
      <SectionHeading index="04" kicker="CAPABILITY / DIRECTION" title="Skills" detail="A focused capability map based only on the areas Raj has confirmed." />
      <div className="grid gap-px overflow-hidden border border-[#79b88d]/15 bg-[#79b88d]/15 md:grid-cols-2">
        {focus.map((item, index) => (
          <div key={item} className="group bg-[#0b1110] p-7 transition-colors hover:bg-[#101b16] sm:p-10" data-testid={`card-skill-${index}`}>
            <div className="mb-14 flex items-start justify-between">
              <span className="font-mono text-[10px] tracking-[.18em] text-[#75e7a1]">0{index + 1} / FOCUS</span>
              <ArrowUpRight size={17} className="text-[#486453] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#75e7a1]" />
            </div>
            <h3 className="text-2xl tracking-[-.04em] text-[#dce9df] sm:text-3xl">{item}</h3>
            <div className="mt-9 h-px w-full bg-[#78c992]/15"><div className="h-px w-1/3 bg-[#75e7a1] transition-all group-hover:w-2/3" /></div>
          </div>
        ))}
      </div>
      <p className="mt-6 font-mono text-[9px] tracking-[.12em] text-[#587263]">TECHNOLOGY-BY-TECHNOLOGY PROFICIENCY DATA: NOT PROVIDED / INTENTIONALLY NOT ASSUMED</p>
    </section>
  );
}

function EmptyRecord({ title, body, testId }: { title: string; body: string; testId: string }) {
  return (
    <div className="glass-panel flex min-h-[220px] flex-col justify-center p-8 sm:p-10" data-testid={testId}>
      <div className="mb-6 flex items-center gap-3 font-mono text-[9px] tracking-[.2em] text-[#c8a267]"><span className="h-1.5 w-1.5 rounded-full bg-[#c8a267]" /> RECORD NOT PROVIDED</div>
      <h3 className="text-2xl tracking-[-.04em] text-[#d9e9dc]">{title}</h3>
      <p className="mt-3 max-w-xl text-sm leading-7 text-[#81988a]">{body}</p>
    </div>
  );
}

export function CertificatesSection() {
  return (
    <section id="certificates" className="relative px-6 py-28 md:px-16 lg:px-28" data-testid="section-certificates">
      <SectionHeading index="05" kicker="CREDENTIALS / VERIFICATION" title="Certificates" detail="Verified learning records, presented with the source asset and the details visible on it." />
      <article className="glass-panel overflow-hidden" data-testid="certificate-c-programming">
        <div className="grid gap-0 lg:grid-cols-[1.15fr_.85fr]">
          <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden bg-[#11100c] p-5 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(224,169,58,.17),transparent_58%)]" />
            <img
              src="/certificates/c-programming-adhyaapana.png"
              alt="Course completion certificate for Raj Tiwari K completing a C Programming course at Adhyaapana Centre of Excellence"
              className="relative max-h-[420px] w-full object-contain shadow-[0_18px_70px_rgba(0,0,0,.42)]"
              data-testid="img-certificate-c-programming"
            />
          </div>
          <div className="flex flex-col justify-between border-t border-[#79b88d]/15 p-7 sm:p-10 lg:border-l lg:border-t-0">
            <div>
              <div className="mb-8 flex items-center justify-between gap-4">
                <p className="font-mono text-[9px] tracking-[.24em] text-[#75e7a1]">CERTIFICATE / 01</p>
                <span className="border border-[#c8a267]/40 px-2 py-1 font-mono text-[8px] tracking-[.16em] text-[#c8a267]">VERIFIED ASSET</span>
              </div>
              <h3 className="max-w-md text-3xl tracking-[-.05em] text-[#d9e9dc] sm:text-4xl">C Programming<br /><span className="text-[#75e7a1]">Course Completion</span></h3>
              <dl className="mt-10 space-y-5 border-t border-[#79b88d]/15 pt-6 font-mono text-[10px] tracking-[.08em]">
                <div className="flex items-start justify-between gap-6"><dt className="text-[#6f8477]">ISSUER</dt><dd className="max-w-[220px] text-right text-[#c8d9cb]">Adhyaapana Centre of Excellence</dd></div>
                <div className="flex items-start justify-between gap-6"><dt className="text-[#6f8477]">COMPLETED</dt><dd className="text-right text-[#c8d9cb]">11 May 2024</dd></div>
                <div className="flex items-start justify-between gap-6"><dt className="text-[#6f8477]">RECIPIENT</dt><dd className="text-right text-[#c8d9cb]">Raj Tiwari K</dd></div>
                <div className="flex items-start justify-between gap-6"><dt className="text-[#6f8477]">CREDENTIAL ID</dt><dd className="text-right text-[#7f9786]">Not provided</dd></div>
              </dl>
            </div>
            <a
              href="/certificates/c-programming-adhyaapana.png"
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex w-fit items-center gap-3 border border-[#75e7a1]/45 px-4 py-3 font-mono text-[10px] tracking-[.16em] text-[#b7d4bd] transition-colors hover:border-[#75e7a1] hover:text-[#75e7a1]"
              data-testid="link-view-certificate-c-programming"
            >
              VIEW CERTIFICATE <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </article>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="relative px-6 py-28 md:px-16 lg:px-28" data-testid="section-experience">
      <SectionHeading index="06" kicker="PATH / TIMELINE" title="Experience" detail="A recruiter-readable timeline without placeholder employers or invented milestones." />
      <EmptyRecord testId="empty-experience" title="Timeline records are ready to be added." body="No companies, internships, positions, education, awards, or achievements were provided. Add verified entries here when available." />
    </section>
  );
}

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };
  return (
    <section id="contact" className="relative px-6 pb-24 pt-28 md:px-16 lg:px-28" data-testid="section-contact">
      <SectionHeading index="07" kicker="OPEN CHANNEL / NEXT STEP" title="Contact" detail="A direct, low-friction start — with no unverified links pretending to be live." />
      <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        <div className="glass-panel flex min-h-[360px] flex-col justify-between p-7 sm:p-10">
          <div>
            <Mail size={20} className="mb-10 text-[#75e7a1]" />
            <h3 className="max-w-lg text-4xl leading-[1.05] tracking-[-.055em] text-[#e1efe4] sm:text-6xl">Let’s build something <span className="text-[#75e7a1]">useful.</span></h3>
            <p className="mt-6 max-w-md text-sm leading-7 text-[#81988a]">Raj’s public email, GitHub, LinkedIn, and resume links were not supplied. Add a verified endpoint before publishing.</p>
          </div>
          <div className="mt-12 border-t border-[#79b88d]/15 pt-5 font-mono text-[9px] tracking-[.12em] text-[#587263]"><span className="text-[#75e7a1]">CHANNEL STATUS</span> / ENDPOINT PENDING VERIFICATION</div>
        </div>
        <form onSubmit={submit} className="glass-panel p-7 sm:p-10" data-testid="form-contact">
          <div className="mb-8 flex items-center justify-between">
            <span className="font-mono text-[9px] tracking-[.2em] text-[#75e7a1]">MESSAGE DRAFT</span>
            <Send size={15} className="text-[#557260]" />
          </div>
          <label className="mb-6 block">
            <span className="mb-2 block font-mono text-[9px] tracking-[.16em] text-[#718079]">YOUR NAME</span>
            <input required name="name" className="w-full border-b border-[#79b88d]/25 bg-transparent py-3 text-sm text-[#dce9df] outline-none transition-colors placeholder:text-[#405747] focus:border-[#75e7a1]" placeholder="Type your name" data-testid="input-contact-name" />
          </label>
          <label className="mb-6 block">
            <span className="mb-2 block font-mono text-[9px] tracking-[.16em] text-[#718079]">YOUR EMAIL</span>
            <input required type="email" name="email" className="w-full border-b border-[#79b88d]/25 bg-transparent py-3 text-sm text-[#dce9df] outline-none transition-colors placeholder:text-[#405747] focus:border-[#75e7a1]" placeholder="you@example.com" data-testid="input-contact-email" />
          </label>
          <label className="mb-8 block">
            <span className="mb-2 block font-mono text-[9px] tracking-[.16em] text-[#718079]">MESSAGE</span>
            <textarea required name="message" rows={3} className="w-full resize-none border-b border-[#79b88d]/25 bg-transparent py-3 text-sm text-[#dce9df] outline-none transition-colors placeholder:text-[#405747] focus:border-[#75e7a1]" placeholder="A short note about what you’re building" data-testid="input-contact-message" />
          </label>
          <button type="submit" className="flex items-center gap-3 border border-[#75e7a1] bg-[#75e7a1] px-5 py-3 font-mono text-[10px] tracking-[.16em] text-[#07100b] transition-transform hover:-translate-y-1" data-testid="button-send-message">
            {sent ? <><Check size={14} /> DRAFT SAVED</> : <>PREPARE MESSAGE <ArrowUpRight size={14} /></>}
          </button>
          {sent && <p className="mt-4 font-mono text-[9px] leading-5 tracking-[.08em] text-[#75e7a1]" data-testid="status-contact-form">Message draft captured locally. A verified delivery endpoint is still required.</p>}
        </form>
      </div>
      <footer className="mt-24 flex flex-col gap-4 border-t border-[#79b88d]/15 pt-5 font-mono text-[9px] tracking-[.12em] text-[#557260] sm:flex-row sm:items-center sm:justify-between">
        <span>RAJ TIVARI / SOFTWARE DEVELOPER</span><span>BUILT FOR THE NEXT SIGNAL <span className="cursor-blink text-[#75e7a1]">_</span></span>
      </footer>
    </section>
  );
}
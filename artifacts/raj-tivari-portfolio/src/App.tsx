import { useEffect, useRef, useState } from 'react';
import { FrameCanvas } from '@/components/portfolio/FrameCanvas';
import { PortfolioNav } from '@/components/portfolio/PortfolioNav';
import {
  AboutSection,
  CertificatesSection,
  ContactSection,
  ExperienceSection,
  HomeSection,
  ProjectsSection,
  SkillsSection,
} from '@/components/portfolio/PortfolioSections';

const sectionIds = ['home', 'about', 'projects', 'skills', 'certificates', 'experience', 'contact'];

function IntroOverlay({ progress, complete }: { progress: number; complete: boolean }) {
  const phase = (min: number, max = 1) => !complete && progress >= min && progress < max;
  const panelClass = (visible: boolean, side: 'left' | 'right' = 'left') =>
    `absolute top-1/2 w-[min(86vw,370px)] -translate-y-1/2 transition-all duration-700 ${side === 'right' ? 'right-6 md:right-[12vw]' : 'left-6 md:left-[12vw]'} ${visible ? 'translate-y-[-50%] opacity-100' : 'pointer-events-none translate-y-[-42%] opacity-0'}`;

  return (
    <div className="pointer-events-none absolute inset-0 z-20" aria-hidden={complete}>
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <div className="absolute left-6 top-6 font-mono text-[9px] leading-5 tracking-[.16em] text-[#b9d8c0]/75 md:left-10 md:top-8">
          <p className="text-[#75e7a1]">RT / 001</p>
          <p>ALT 34,000 FT</p>
          <p>CAPTURE / {String(Math.round(progress * 237)).padStart(3, '0')}</p>
        </div>
        <div className="absolute right-6 top-6 text-right font-mono text-[9px] leading-5 tracking-[.16em] text-[#b9d8c0]/75 md:right-10 md:top-8">
          <p className="text-[#75e7a1]">SIGNAL LOCKED</p>
          <p>SCROLL TO DESCEND</p>
        </div>

        <div className={panelClass(phase(.08, .3))}>
          <p className="mb-4 font-mono text-[10px] tracking-[.28em] text-[#75e7a1]">IDENTITY DETECTED</p>
          <h2 className="text-5xl font-extrabold tracking-[-.08em] text-[#eff8f0] md:text-7xl">RAJ<br /><span className="text-[#75e7a1]">TIVARI</span></h2>
          <div className="mt-5 flex items-center gap-3 font-mono text-[10px] tracking-[.16em] text-[#c1d5c5]"><span className="h-px w-8 bg-[#75e7a1]" /> SOFTWARE DEVELOPER</div>
        </div>
        <div className={panelClass(phase(.3, .48), 'right')}>
          <p className="mb-3 font-mono text-[10px] tracking-[.28em] text-[#75e7a1]">PROFILE / 02</p>
          <p className="text-2xl leading-tight tracking-[-.04em] text-[#eff8f0]">Building modern web experiences and interactive products.</p>
          <p className="mt-5 font-mono text-[9px] leading-5 tracking-[.1em] text-[#b0c9b7]">A quiet interface for useful ideas.</p>
        </div>
        <div className={panelClass(phase(.48, .66))}>
          <p className="mb-3 font-mono text-[10px] tracking-[.28em] text-[#75e7a1]">MISSION / 03</p>
          <p className="text-2xl leading-tight tracking-[-.04em] text-[#eff8f0]">Build useful technology.<br />Learn continuously.<br />Solve real problems.</p>
        </div>
        <div className={panelClass(phase(.66, .79), 'right')}>
          <p className="mb-3 font-mono text-[10px] tracking-[.28em] text-[#75e7a1]">FOCUS / 04</p>
          <div className="space-y-2 font-mono text-sm tracking-[.1em] text-[#eff8f0]">
            <p>WEB DEVELOPMENT</p><p>ARTIFICIAL INTELLIGENCE</p><p>SOFTWARE DEVELOPMENT</p><p>CREATIVE TECHNOLOGY</p>
          </div>
        </div>

        <div className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center transition-all duration-1000 ${phase(.79) ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
          <div className="relative grid h-48 w-48 place-items-center md:h-64 md:w-64">
            <div className="spin-slow absolute inset-0 rounded-full border border-[#75e7a1]/40 border-dashed" />
            <div className="spin-slow absolute inset-5 rounded-full border border-[#75e7a1]/25" style={{ animationDirection: 'reverse' }} />
            <div className="absolute inset-12 rounded-full border border-[#75e7a1]/50 bg-[#75e7a1]/5 shadow-[0_0_80px_rgba(117,231,161,.22)]" />
            <div className="h-9 w-9 rounded-full bg-[#b9f5c9] shadow-[0_0_32px_#75e7a1,0_0_80px_rgba(117,231,161,.7)]" />
            <span className="absolute -right-12 top-8 font-mono text-[8px] tracking-[.2em] text-[#75e7a1]">SYNC / 98%</span>
            <span className="absolute -left-14 bottom-8 font-mono text-[8px] tracking-[.2em] text-[#75e7a1]">NODE / RT-01</span>
          </div>
          <p className="font-mono text-[10px] tracking-[.42em] text-[#75e7a1]">AI CORE</p>
          <p className="mt-4 font-mono text-sm tracking-[.38em] text-[#eff8f0]">SYSTEM ONLINE</p>
          <p className="mt-2 font-mono text-[9px] tracking-[.18em] text-[#75e7a1]">PORTFOLIO INITIALIZATION</p>
        </div>

        {!complete && (
          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 font-mono text-[8px] tracking-[.25em] text-[#d5e7d8]/70">
            <span>CONTINUE DOWN</span><span className="h-8 w-px bg-gradient-to-b from-[#75e7a1] to-transparent" />
          </div>
        )}
      </div>
    </div>
  );
}

function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const [complete, setComplete] = useState(() => sessionStorage.getItem('raj-intro-complete') === '1');
  const updateProgress = (next: number) => {
    if (Math.abs(next - progressRef.current) < 0.004) return;
    progressRef.current = next;
    setProgress(next);
  };
  const completeIntro = () => {
    if (complete) return;
    setComplete(true);
    sessionStorage.setItem('raj-intro-complete', '1');
    onComplete();
  };
  return (
    <section className="relative" data-testid="intro-sequence">
      <FrameCanvas onProgress={updateProgress} onComplete={completeIntro} />
      <IntroOverlay progress={progress} complete={complete} />
    </section>
  );
}

function PortfolioPage() {
  const [introComplete, setIntroComplete] = useState(() => sessionStorage.getItem('raj-intro-complete') === '1');
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0.1, 0.35, 0.7] },
    );
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-[100dvh] overflow-hidden bg-[#080b0c] text-[#dce9df]">
      <div className="fixed inset-0 hud-grid pointer-events-none opacity-40" />
      <CinematicIntro onComplete={() => setIntroComplete(true)} />
      <div className={`transition-opacity duration-1000 ${introComplete ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
        <PortfolioNav activeSection={activeSection} />
      </div>
      <main className="relative z-10 mx-auto max-w-[1600px]">
        <HomeSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <CertificatesSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </div>
  );
}

function App() {
  useEffect(() => {
    document.title = 'Raj Tivari — Software Developer';
    const description = 'Raj Tivari — Software Developer focused on web development, artificial intelligence, software development, and creative technology.';
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, []);
  return <PortfolioPage />;
}

export default App;

import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const items = [
  ['01', 'HOME', 'home'],
  ['02', 'ABOUT', 'about'],
  ['03', 'PROJECTS', 'projects'],
  ['04', 'SKILLS', 'skills'],
  ['05', 'CERTIFICATES', 'certificates'],
  ['06', 'EXPERIENCE', 'experience'],
  ['07', 'CONTACT', 'contact'],
] as const;

type PortfolioNavProps = {
  activeSection: string;
};

export function PortfolioNav({ activeSection }: PortfolioNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <aside className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 md:block" data-testid="navigation-desktop">
        <div className="glass-panel w-[188px] p-4">
          <div className="mb-7 flex items-center justify-between border-b border-[#78c992]/15 pb-4">
            <span className="font-mono text-[9px] tracking-[.24em] text-[#75e7a1]">RT / NAV</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#75e7a1] shadow-[0_0_12px_#75e7a1]" />
          </div>
          <nav aria-label="Portfolio sections" className="space-y-1">
            {items.map(([number, label, id]) => (
              <button
                key={id}
                onClick={() => goTo(id)}
                className={`group flex w-full items-center gap-3 py-2 text-left font-mono text-[10px] tracking-[.18em] transition-colors ${activeSection === id ? 'text-[#75e7a1]' : 'text-[#718079] hover:text-[#c9dfd0]'}`}
                data-testid={`button-nav-${id}`}
              >
                <span className="w-5 text-[9px] text-[#45614f]">{number}</span>
                <span className={`h-px transition-all ${activeSection === id ? 'w-5 bg-[#75e7a1]' : 'w-2 bg-[#45614f] group-hover:w-5 group-hover:bg-[#75e7a1]'}`} />
                {label}
              </button>
            ))}
          </nav>
          <div className="mt-7 border-t border-[#78c992]/15 pt-4 font-mono text-[8px] leading-5 tracking-[.1em] text-[#587263]">
            <p>LOCAL / PORTFOLIO</p>
            <p className="text-[#75e7a1]">SIGNAL: NOMINAL</p>
          </div>
        </div>
      </aside>

      <div className="fixed right-4 top-4 z-50 md:hidden">
        <button
          onClick={() => setMobileOpen((open) => !open)}
          className="glass-panel flex h-11 w-11 items-center justify-center text-[#75e7a1]"
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          data-testid="button-mobile-menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        {mobileOpen && (
          <div className="glass-panel absolute right-0 top-14 w-56 p-4">
            <nav aria-label="Mobile portfolio sections" className="space-y-1">
              {items.map(([number, label, id]) => (
                <button
                  key={id}
                  onClick={() => goTo(id)}
                  className={`flex w-full items-center gap-3 py-2.5 text-left font-mono text-[10px] tracking-[.16em] ${activeSection === id ? 'text-[#75e7a1]' : 'text-[#718079]'}`}
                  data-testid={`button-mobile-nav-${id}`}
                >
                  <span className="text-[9px] text-[#45614f]">{number}</span>
                  {label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </>
  );
}
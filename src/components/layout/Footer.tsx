import { IGGradientLine } from "./IGGradientLine";

const socialLinks = [
  { href: "https://instagram.com/jasnauskaite", label: "Instagram" },
  { href: "https://tiktok.com/@jasnauskaite", label: "TikTok" },
];

export function Footer() {
  return (
    <footer className="py-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="w-full h-[2px] animated-ig-gradient-line mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-[family-name:var(--font-outfit)] font-semibold text-lg tracking-[0.02em]">
              @jasnauskaite
            </p>
          </div>

          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors font-[family-name:var(--font-inter)]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <p className="text-xs text-[var(--muted)] font-[family-name:var(--font-inter)]">
            &copy; {new Date().getFullYear()} @jasnauskaite
          </p>
        </div>
      </div>
    </footer>
  );
}

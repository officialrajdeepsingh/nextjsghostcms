import Link from "next/link";
import SocialIcons from "@/SocialIcons";
import Image from "next/image";
import type { Settings } from "@tryghost/content-api";

function Header({ setting }: { setting: Settings }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand / Publication Title */}
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-85">
            {setting.logo ? (
              <Image
                alt={setting.title || "Logo"}
                width={140}
                height={36}
                src={setting.logo}
                className="max-h-8 w-auto object-contain dark:brightness-110"
                priority
              />
            ) : (
              <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-foreground">
                {setting.title}
              </span>
            )}
          </Link>

          {/* Navigation Links */}
          {setting.navigation && setting.navigation.length > 0 && (
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
              {setting.navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.url}
                  className="px-3 py-1.5 rounded-md text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/60"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* Search, Socials, Theme Toggle */}
        <div className="flex items-center">
          <SocialIcons setting={setting} />
        </div>
      </div>
    </header>
  );
}

export default Header;

import { Link, useLocation } from "wouter";
import { Home, IndianRupee, Wrench, Bot, User, Grid2X2, Globe, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/language-context";
import { LANGUAGES, type Language } from "@/lib/translations";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  const navItems = [
    { href: "/", label: t.nav.home, icon: Home },
    { href: "/market", label: t.nav.market, icon: IndianRupee },
    {
      label: t.nav.tools,
      icon: Grid2X2,
      isAction: true,
      onClick: () => setToolsOpen(true)
    },
    { href: "/ai", label: t.nav.ai, icon: Bot },
    { href: "/profile", label: t.nav.profile, icon: User },
  ];

  const tools = [
    { href: "/expenses", label: t.layout.expenses },
    { href: "/livestock", label: t.layout.livestock },
    { href: "/equipment", label: t.layout.equipment },
    { href: "/schemes", label: t.layout.schemes },
    { href: "/crop-advisor", label: t.layout.cropAdvisor },
    { href: "/weather", label: t.layout.weather },
    { href: "/marketplace", label: t.layout.marketplace },
  ];

  const currentLang = LANGUAGES.find(l => l.code === language);

  return (
    <div className="min-h-[100dvh] pb-16 bg-background flex flex-col">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border/50">
        <div className="flex items-center justify-between px-4 h-11 max-w-md mx-auto">
          <span className="font-bold text-primary text-sm tracking-wide">GRAM_X</span>
          <button
            onClick={() => setLangOpen(true)}
            data-testid="btn-language-switcher"
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors bg-muted px-2.5 py-1 rounded-full"
          >
            <Globe className="w-3 h-3" />
            {currentLang?.label}
          </button>
        </div>
      </div>

      <main className="flex-1 w-full max-w-md mx-auto relative bg-background shadow-xl">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 border-t border-border bg-card shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] z-50">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location === item.href;

            if (item.isAction) {
              return (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="flex flex-col items-center justify-center w-full h-full space-y-1 text-muted-foreground hover:text-primary transition-colors"
                  data-testid={`nav-tools`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </button>
              );
            }

            return (
              <Link key={index} href={item.href || "/"} className="w-full h-full flex flex-col items-center justify-center">
                <div
                  className={cn(
                    "flex flex-col items-center justify-center space-y-1 w-full h-full transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                  )}
                  data-testid={`nav-${item.href?.replace("/", "") || "home"}`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      <Sheet open={toolsOpen} onOpenChange={setToolsOpen}>
        <SheetContent side="bottom" className="h-[60vh] rounded-t-2xl sm:max-w-md sm:mx-auto">
          <SheetHeader>
            <SheetTitle>{t.layout.farmingTools}</SheetTitle>
          </SheetHeader>
          <div className="grid grid-cols-3 gap-4 py-6">
            {tools.map((tool) => (
              <Link key={tool.href} href={tool.href} onClick={() => setToolsOpen(false)}>
                <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-xl gap-2 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer text-center">
                  <Wrench className="w-6 h-6" />
                  <span className="text-xs font-medium">{tool.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={langOpen} onOpenChange={setLangOpen}>
        <SheetContent side="bottom" className="h-auto rounded-t-2xl sm:max-w-md sm:mx-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Choose Language / भाषा चुनें
            </SheetTitle>
          </SheetHeader>
          <div className="grid grid-cols-2 gap-3 py-4">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                data-testid={`btn-lang-${lang.code}`}
                onClick={() => {
                  setLanguage(lang.code as Language);
                  setLangOpen(false);
                }}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-left",
                  language === lang.code
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-muted"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{lang.flag}</span>
                  <span className="font-medium text-sm">{lang.label}</span>
                </div>
                {language === lang.code && <Check className="w-4 h-4 shrink-0" />}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

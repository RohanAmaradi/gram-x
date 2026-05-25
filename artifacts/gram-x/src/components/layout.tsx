import { Link, useLocation } from "wouter";
import { Home, IndianRupee, Wrench, Bot, User, Grid2X2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [toolsOpen, setToolsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/market", label: "Market", icon: IndianRupee },
    { 
      label: "Tools", 
      icon: Grid2X2, 
      isAction: true,
      onClick: () => setToolsOpen(true)
    },
    { href: "/ai", label: "AI", icon: Bot },
    { href: "/profile", label: "Profile", icon: User },
  ];

  const tools = [
    { href: "/expenses", label: "Expenses" },
    { href: "/livestock", label: "Livestock" },
    { href: "/equipment", label: "Equipment" },
    { href: "/schemes", label: "Schemes" },
    { href: "/crop-advisor", label: "Crop Advisor" },
    { href: "/weather", label: "Weather" },
    { href: "/marketplace", label: "Marketplace" },
  ];

  return (
    <div className="min-h-[100dvh] pb-16 bg-background flex flex-col">
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
                  data-testid={`nav-${item.label.toLowerCase()}`}
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
                  data-testid={`nav-${item.label.toLowerCase()}`}
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
            <SheetTitle>Farming Tools</SheetTitle>
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
    </div>
  );
}

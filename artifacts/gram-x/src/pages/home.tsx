import { Link } from "wouter";
import { useGetDashboardSummary, getGetDashboardSummaryQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  IndianRupee,
  Leaf,
  Tractor,
  CloudSun,
  Activity,
  ShieldCheck,
  Sprout,
  ArrowRight,
  Bird
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";

export default function Home() {
  const { data: summary, isLoading } = useGetDashboardSummary({ query: { queryKey: getGetDashboardSummaryQueryKey() } });
  const { t } = useLanguage();

  return (
    <div className="p-4 pb-20 space-y-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">{t.home.greeting}</h1>
          <p className="text-sm text-muted-foreground">{t.home.subtitle}</p>
        </div>
        <div className="w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-lg">
          GK
        </div>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
      ) : summary ? (
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-primary text-primary-foreground border-none">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-xs font-medium flex items-center gap-2 opacity-90">
                <IndianRupee className="w-4 h-4" /> {t.home.revenue}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-bold">₹{summary.totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="bg-card text-card-foreground">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-xs font-medium flex items-center gap-2 text-muted-foreground">
                <Activity className="w-4 h-4 text-destructive" /> {t.home.expenses}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-bold text-destructive">₹{summary.totalExpenses.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="bg-card text-card-foreground">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-xs font-medium flex items-center gap-2 text-muted-foreground">
                <Sprout className="w-4 h-4 text-primary" /> {t.home.activeCrops}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-bold">{summary.activeCrops}</div>
            </CardContent>
          </Card>
          <Card className="bg-card text-card-foreground">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-xs font-medium flex items-center gap-2 text-muted-foreground">
                <Bird className="w-4 h-4 text-accent" /> {t.home.livestock}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-bold">{summary.livestockCount}</div>
            </CardContent>
          </Card>
        </div>
      ) : null}

      {summary?.weatherAlert && (
        <Card className="bg-accent/20 border-accent/30">
          <CardContent className="p-4 flex items-start gap-3">
            <CloudSun className="w-6 h-6 text-accent mt-0.5" />
            <div>
              <p className="font-semibold text-sm text-foreground">{t.home.weatherAlert}</p>
              <p className="text-sm text-muted-foreground">{summary.weatherAlert}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">{t.home.quickActions}</h2>
        <div className="grid grid-cols-4 gap-4">
          {[
            { href: "/market", icon: IndianRupee, label: t.home.mandi },
            { href: "/schemes", icon: ShieldCheck, label: t.home.schemes },
            { href: "/equipment", icon: Tractor, label: t.home.rentals },
            { href: "/crop-advisor", icon: Leaf, label: t.home.advisor },
          ].map((item, i) => (
            <Link key={i} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <div className="w-14 h-14 bg-card rounded-2xl flex items-center justify-center shadow-sm border border-border text-primary">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-medium text-center text-muted-foreground">{item.label}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      <Card className="bg-primary/5 border-primary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sprout className="w-24 h-24 text-primary" />
        </div>
        <CardContent className="p-6 relative z-10">
          <h3 className="text-lg font-bold text-primary mb-2">{t.home.dailyTip}</h3>
          <p className="text-sm text-muted-foreground mb-4">{t.home.tipText}</p>
          <Link href="/ai">
            <Button variant="outline" size="sm" className="bg-background">
              {t.home.askAI} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

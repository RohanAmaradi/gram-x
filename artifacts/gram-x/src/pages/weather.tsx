import { useGetWeather, getGetWeatherQueryKey } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CloudSun, Droplets, Wind, MapPin, AlertCircle, Sun, CloudRain } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";

export default function Weather() {
  const { data: weather, isLoading } = useGetWeather({}, { query: { queryKey: getGetWeatherQueryKey() } });
  const { t } = useLanguage();

  const getWeatherIcon = (condition: string) => {
    const c = condition.toLowerCase();
    if (c.includes('rain')) return <CloudRain className="w-8 h-8 text-accent" />;
    if (c.includes('sun') || c.includes('clear')) return <Sun className="w-8 h-8 text-accent" />;
    return <CloudSun className="w-8 h-8 text-muted-foreground" />;
  };

  return (
    <div className="p-4 space-y-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-1">{t.weather.title}</h1>
        <p className="text-sm text-muted-foreground">{t.weather.subtitle}</p>
      </header>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <div className="flex gap-3 overflow-hidden">
            <Skeleton className="h-32 w-24 shrink-0 rounded-xl" />
            <Skeleton className="h-32 w-24 shrink-0 rounded-xl" />
            <Skeleton className="h-32 w-24 shrink-0 rounded-xl" />
          </div>
        </div>
      ) : weather ? (
        <>
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-none overflow-hidden relative shadow-lg">
            <div className="absolute top-0 right-0 p-6 opacity-20 transform translate-x-4 -translate-y-4">
              {getWeatherIcon(weather.condition)}
            </div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center gap-1.5 text-sm font-medium mb-4 opacity-90">
                <MapPin className="w-4 h-4" /> {weather.location}
              </div>
              <div className="flex items-end gap-3 mb-2">
                <div className="text-6xl font-bold leading-none">{weather.currentTemp}°</div>
                <div className="text-xl pb-1 opacity-90 capitalize">{weather.condition}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-primary-foreground/20">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 opacity-70" />
                  <span className="text-sm">{t.weather.humidity}: {weather.humidity}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 opacity-70" />
                  <span className="text-sm">{t.weather.wind}: {weather.windSpeed} km/h</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-accent/10 border-accent/20">
            <CardContent className="p-4 flex gap-3 items-start">
              <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm mb-1 text-foreground">{t.weather.farmingTip}</h3>
                <p className="text-sm text-muted-foreground">{weather.farmingTip}</p>
              </div>
            </CardContent>
          </Card>

          <div>
            <h3 className="font-bold text-lg mb-3">{t.weather.forecast}</h3>
            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4">
              {weather.forecast.map((day, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border rounded-xl p-3 min-w-[90px] flex flex-col items-center justify-center shrink-0 shadow-sm"
                >
                  <div className="text-xs text-muted-foreground font-medium mb-2 uppercase">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="mb-2">
                    {getWeatherIcon(day.condition)}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold mt-1">
                    <span>{day.high}°</span>
                    <span className="text-muted-foreground font-normal">{day.low}°</span>
                  </div>
                  <div className="text-[10px] text-accent font-medium mt-1 flex items-center gap-0.5">
                    <Droplets className="w-3 h-3" /> {day.rainChance}%
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

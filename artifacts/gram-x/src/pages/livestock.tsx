import { useGetLivestock, getGetLivestockQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bird, Plus, Clock, Syringe, Droplets } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";

export default function Livestock() {
  const { data: livestock, isLoading } = useGetLivestock({ query: { queryKey: getGetLivestockQueryKey() } });
  const { t } = useLanguage();

  return (
    <div className="p-4 space-y-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary mb-1">{t.livestock.title}</h1>
          <p className="text-sm text-muted-foreground">{t.livestock.subtitle}</p>
        </div>
        <Button size="icon" className="rounded-full shadow-md w-10 h-10" data-testid="btn-add-livestock">
          <Plus className="w-5 h-5" />
        </Button>
      </header>

      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))
        ) : livestock?.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Bird className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>{t.livestock.noRecords}</p>
            <Button variant="outline" className="mt-4">{t.livestock.addAnimal}</Button>
          </div>
        ) : (
          livestock?.map((animal, i) => (
            <motion.div
              key={animal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="overflow-hidden" data-testid={`card-livestock-${animal.id}`}>
                <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center">
                      <Bird className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{animal.name}</CardTitle>
                      <div className="text-xs text-muted-foreground capitalize">
                        {animal.type} • {t.livestock.count}: {animal.count}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-background">
                    {t.livestock.active}
                  </Badge>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.livestock.feedSchedule}</div>
                        <div className="text-sm font-medium">{animal.feedSchedule}</div>
                      </div>
                    </div>
                    {animal.nextVaccination && (
                      <div className="flex items-start gap-2">
                        <Syringe className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.livestock.nextVaccine}</div>
                          <div className="text-sm font-medium">{new Date(animal.nextVaccination).toLocaleDateString()}</div>
                        </div>
                      </div>
                    )}
                    {animal.milkPerDay && (
                      <div className="flex items-start gap-2 col-span-2 bg-muted/50 p-2 rounded-lg">
                        <Droplets className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.livestock.dailyYield}</div>
                          <div className="text-sm font-medium">{animal.milkPerDay} {t.livestock.litersPerDay}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

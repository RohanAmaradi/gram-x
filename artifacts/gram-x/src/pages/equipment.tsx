import { useGetEquipment, getGetEquipmentQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Tractor, Phone, MapPin, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";

export default function Equipment() {
  const { data: equipment, isLoading } = useGetEquipment({ query: { queryKey: getGetEquipmentQueryKey() } });
  const { t } = useLanguage();

  return (
    <div className="p-4 space-y-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-1">{t.equipment.title}</h1>
        <p className="text-sm text-muted-foreground">{t.equipment.subtitle}</p>
      </header>

      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))
        ) : equipment?.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="overflow-hidden border-border/50" data-testid={`card-equipment-${item.id}`}>
              <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg font-bold">{item.name}</CardTitle>
                  <div className="flex items-center text-xs text-muted-foreground mt-1 gap-1">
                    <Tractor className="w-3 h-3" />
                    {item.type}
                  </div>
                </div>
                <Badge variant={item.available ? "default" : "secondary"} className={item.available ? "bg-primary text-primary-foreground" : ""}>
                  {item.available ? t.equipment.available : t.equipment.rented}
                </Badge>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-muted rounded p-2 flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-primary" />
                    <div>
                      <div className="text-xs text-muted-foreground">{t.equipment.perHour}</div>
                      <div className="font-semibold text-sm">₹{item.pricePerHour}</div>
                    </div>
                  </div>
                  <div className="bg-muted rounded p-2 flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-primary" />
                    <div>
                      <div className="text-xs text-muted-foreground">{t.equipment.perDay}</div>
                      <div className="font-semibold text-sm">₹{item.pricePerDay}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    {item.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Phone className="w-4 h-4 text-primary" />
                    {item.ownerName}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  className="w-full"
                  disabled={!item.available}
                  asChild={item.available}
                  data-testid={`btn-contact-equipment-${item.id}`}
                >
                  {item.available ? (
                    <a href={`tel:${item.ownerPhone}`}>
                      <Phone className="w-4 h-4 mr-2" /> {t.equipment.contactOwner}
                    </a>
                  ) : (
                    <span>{t.equipment.unavailable}</span>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

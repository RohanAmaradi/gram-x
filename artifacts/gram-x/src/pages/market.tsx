import { useGetMandiPrices, getGetMandiPricesQueryKey } from "@workspace/api-client-react";
import { Link } from "wouter";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, Minus, Search, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function Market() {
  const { data: prices, isLoading } = useGetMandiPrices({ query: { queryKey: getGetMandiPricesQueryKey() } });
  const [search, setSearch] = useState("");

  const filteredPrices = prices?.filter(p => 
    p.cropName.toLowerCase().includes(search.toLowerCase()) || 
    p.mandiName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-primary mb-1">Mandi Prices</h1>
        <p className="text-sm text-muted-foreground">Live updates from your local markets.</p>
      </header>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input 
          placeholder="Search crop or mandi..." 
          className="pl-9 bg-card"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))
        ) : filteredPrices?.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No prices found for "{search}"</p>
          </div>
        ) : (
          filteredPrices?.map((price, i) => (
            <motion.div
              key={price.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/market/${price.id}`}>
                <Card className="hover:border-primary/50 transition-colors cursor-pointer active:bg-accent/10">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-foreground text-lg">{price.cropName}</h3>
                      <div className="flex items-center text-xs text-muted-foreground mt-1 gap-1">
                        <MapPin className="w-3 h-3" />
                        {price.mandiName}, {price.state}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-primary">₹{price.currentPrice}</div>
                      <div className="text-[10px] text-muted-foreground mb-1">per {price.unit}</div>
                      <div className="flex items-center justify-end gap-1 text-xs font-medium">
                        {price.trend === "up" && <><TrendingUp className="w-3 h-3 text-destructive" /><span className="text-destructive">Up from ₹{price.yesterdayPrice}</span></>}
                        {price.trend === "down" && <><TrendingDown className="w-3 h-3 text-primary" /><span className="text-primary">Down from ₹{price.yesterdayPrice}</span></>}
                        {price.trend === "stable" && <><Minus className="w-3 h-3 text-muted-foreground" /><span className="text-muted-foreground">Stable at ₹{price.yesterdayPrice}</span></>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

import { useGetMandiPrice, getGetMandiPriceQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Minus, ArrowLeft, Calendar, MapPin, Scale } from "lucide-react";

export default function MarketDetail() {
  const { id } = useParams();
  const { data: price, isLoading } = useGetMandiPrice(Number(id), { 
    query: { 
      queryKey: getGetMandiPriceQueryKey(Number(id)),
      enabled: !!id 
    } 
  });

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-60 w-full rounded-xl" />
      </div>
    );
  }

  if (!price) {
    return (
      <div className="p-4 text-center">
        <p className="text-muted-foreground">Price not found.</p>
        <Link href="/market">
          <Button variant="outline" className="mt-4">Back to Market</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <Link href="/market">
        <Button variant="ghost" size="sm" className="mb-2">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </Link>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{price.cropName}</h1>
          <div className="flex items-center text-sm text-muted-foreground mt-1 gap-1">
            <MapPin className="w-4 h-4" />
            {price.mandiName}, {price.state}
          </div>
        </div>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Current Price</p>
              <div className="text-3xl font-bold text-primary">₹{price.currentPrice}</div>
              <p className="text-xs text-muted-foreground">per {price.unit}</p>
            </div>
            <div className="text-right flex flex-col items-end justify-center">
              <div className="flex items-center gap-2 mb-1">
                {price.trend === "up" && <TrendingUp className="w-6 h-6 text-destructive" />}
                {price.trend === "down" && <TrendingDown className="w-6 h-6 text-primary" />}
                {price.trend === "stable" && <Minus className="w-6 h-6 text-muted-foreground" />}
              </div>
              <div className="text-sm font-medium">
                {price.trend === "up" && <span className="text-destructive">Up from ₹{price.yesterdayPrice}</span>}
                {price.trend === "down" && <span className="text-primary">Down from ₹{price.yesterdayPrice}</span>}
                {price.trend === "stable" && <span className="text-muted-foreground">Stable at ₹{price.yesterdayPrice}</span>}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
              <Scale className="w-4 h-4" /> Unit
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-lg font-semibold">{price.unit}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Last Updated
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-lg font-semibold">{new Date(price.updatedAt).toLocaleDateString()}</div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}

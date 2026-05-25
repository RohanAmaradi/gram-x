import { useGetMarketplaceListings, getGetMarketplaceListingsQueryKey } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Phone, MapPin, Scale } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";

export default function Marketplace() {
  const { data: listings, isLoading } = useGetMarketplaceListings({}, { query: { queryKey: getGetMarketplaceListingsQueryKey() } });
  const { t } = useLanguage();

  const buyListings = listings?.filter(l => l.type === 'buy') || [];
  const sellListings = listings?.filter(l => l.type === 'sell') || [];

  const ListingCard = ({ listing }: { listing: NonNullable<typeof listings>[number] }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="overflow-hidden border-border/50" data-testid={`card-listing-${listing.id}`}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-bold text-lg">{listing.cropName}</h3>
              <div className="text-sm text-muted-foreground font-medium">{listing.farmerName}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-primary text-lg">₹{listing.pricePerUnit}</div>
              <div className="text-xs text-muted-foreground">{t.marketplace.per} {listing.unit}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Scale className="w-3 h-3" /> {listing.quantity} {listing.unit} {t.marketplace.available}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {listing.location}
            </div>
          </div>

          <Button className="w-full" asChild data-testid={`btn-contact-farmer-${listing.id}`}>
            <a href={`tel:${listing.phone}`}>
              <Phone className="w-4 h-4 mr-2" /> {t.marketplace.contactFarmer}
            </a>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="p-4 space-y-6">
      <header className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-primary mb-1">{t.marketplace.title}</h1>
          <p className="text-sm text-muted-foreground">{t.marketplace.subtitle}</p>
        </div>
        <Button size="icon" className="rounded-full shadow-md w-10 h-10" data-testid="btn-add-listing">
          <Plus className="w-5 h-5" />
        </Button>
      </header>

      <Tabs defaultValue="sell" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="sell" data-testid="tab-for-sale">{t.marketplace.forSale}</TabsTrigger>
          <TabsTrigger value="buy" data-testid="tab-looking-to-buy">{t.marketplace.lookingToBuy}</TabsTrigger>
        </TabsList>
        <TabsContent value="sell" className="space-y-4 mt-0">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-36 w-full rounded-xl" />)
          ) : sellListings.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">{t.marketplace.noSellListings}</div>
          ) : (
            sellListings.map(listing => <ListingCard key={listing.id} listing={listing} />)
          )}
        </TabsContent>
        <TabsContent value="buy" className="space-y-4 mt-0">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-36 w-full rounded-xl" />)
          ) : buyListings.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">{t.marketplace.noBuyListings}</div>
          ) : (
            buyListings.map(listing => <ListingCard key={listing.id} listing={listing} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

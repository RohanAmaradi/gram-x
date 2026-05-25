import { useGetCropRecommendations } from "@workspace/api-client-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Leaf, TrendingUp, AlertTriangle, CloudRain, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function CropAdvisor() {
  const [formData, setFormData] = useState({
    soilType: "",
    location: "",
    season: "",
    waterAvailability: ""
  });
  const [showResults, setShowResults] = useState(false);

  const getRecommendations = useGetCropRecommendations();

  const handleSuggest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.soilType || !formData.location || !formData.season || !formData.waterAvailability) return;
    setShowResults(true);
    getRecommendations.mutate({ data: formData });
  };

  const getRiskColor = (level: string) => {
    if (level === 'low') return "bg-primary/20 text-primary border-primary/20";
    if (level === 'medium') return "bg-accent/20 text-accent border-accent/20";
    return "bg-destructive/20 text-destructive border-destructive/20";
  };

  return (
    <div className="p-4 space-y-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-1">Crop Advisor</h1>
        <p className="text-sm text-muted-foreground">AI-driven recommendations for your land.</p>
      </header>

      {!showResults ? (
        <Card className="border-primary/20 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Tell us about your farm</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSuggest} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location (State/District)</Label>
                <Input 
                  id="location" 
                  placeholder="e.g. Punjab, Meerut" 
                  value={formData.location}
                  onChange={(e) => setFormData(p => ({...p, location: e.target.value}))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Soil Type</Label>
                <Select value={formData.soilType} onValueChange={(v) => setFormData(p => ({...p, soilType: v}))} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alluvial">Alluvial</SelectItem>
                    <SelectItem value="black">Black</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                    <SelectItem value="laterite">Laterite</SelectItem>
                    <SelectItem value="sandy">Sandy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Season</Label>
                <Select value={formData.season} onValueChange={(v) => setFormData(p => ({...p, season: v}))} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kharif">Kharif (Monsoon)</SelectItem>
                    <SelectItem value="rabi">Rabi (Winter)</SelectItem>
                    <SelectItem value="zaid">Zaid (Summer)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Water Availability</Label>
                <Select value={formData.waterAvailability} onValueChange={(v) => setFormData(p => ({...p, waterAvailability: v}))} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High (Irrigation available)</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low (Rain-fed only)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" size="lg">
                <Leaf className="w-4 h-4 mr-2" /> Get Recommendations
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <Button variant="ghost" onClick={() => setShowResults(false)} className="mb-2 -ml-4">
             Start Over
          </Button>

          {getRecommendations.isPending ? (
            Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-56 w-full rounded-xl" />
            ))
          ) : getRecommendations.data ? (
            getRecommendations.data.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`overflow-hidden border-2 ${i === 0 ? 'border-primary shadow-lg' : 'border-border'}`}>
                  {i === 0 && (
                    <div className="bg-primary text-primary-foreground text-xs font-bold text-center py-1 flex items-center justify-center gap-1 uppercase tracking-wider">
                      <ShieldCheck className="w-3 h-3" /> Top Recommendation
                    </div>
                  )}
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-foreground">{rec.cropName}</h3>
                      <Badge variant="outline" className={`${getRiskColor(rec.riskLevel)} capitalize`}>
                        {rec.riskLevel} Risk
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{rec.reason}</p>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-muted p-3 rounded-lg flex flex-col justify-center">
                        <div className="text-[10px] text-muted-foreground uppercase mb-1">Est. Profit / Acre</div>
                        <div className="font-bold text-primary flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" /> ₹{rec.profitEstimate}
                        </div>
                      </div>
                      <div className="bg-muted p-3 rounded-lg flex flex-col justify-center">
                        <div className="text-[10px] text-muted-foreground uppercase mb-1">Duration</div>
                        <div className="font-medium text-foreground">{rec.duration}</div>
                      </div>
                    </div>

                    <div className="flex items-center text-xs text-muted-foreground bg-background border rounded p-2">
                       <CloudRain className="w-3 h-3 mr-2 text-accent" />
                       Market Demand: <span className="font-bold ml-1 capitalize text-foreground">{rec.marketDemand}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="text-center p-8 text-destructive">Failed to load recommendations.</div>
          )}
        </div>
      )}
    </div>
  );
}

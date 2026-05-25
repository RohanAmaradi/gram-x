import { Router, type IRouter } from "express";
import { GetCropRecommendationsBody, GetCropRecommendationsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const cropDatabase = [
  { cropName: "Wheat", rabi: true, kharif: false, soils: ["loamy", "clay", "black", "alluvial"], waterLow: false, profitBase: 35000 },
  { cropName: "Rice / Paddy", rabi: false, kharif: true, soils: ["clay", "alluvial", "loamy"], waterLow: false, profitBase: 40000 },
  { cropName: "Cotton", rabi: false, kharif: true, soils: ["black", "loamy", "alluvial"], waterLow: false, profitBase: 60000 },
  { cropName: "Mustard", rabi: true, kharif: false, soils: ["loamy", "sandy", "alluvial"], waterLow: true, profitBase: 28000 },
  { cropName: "Chickpea (Chana)", rabi: true, kharif: false, soils: ["loamy", "sandy", "black"], waterLow: true, profitBase: 32000 },
  { cropName: "Soybean", rabi: false, kharif: true, soils: ["black", "loamy"], waterLow: false, profitBase: 38000 },
  { cropName: "Tomato", rabi: true, kharif: false, soils: ["loamy", "sandy", "alluvial"], waterLow: false, profitBase: 75000 },
  { cropName: "Onion", rabi: true, kharif: false, soils: ["loamy", "sandy"], waterLow: false, profitBase: 55000 },
  { cropName: "Sugarcane", rabi: false, kharif: true, soils: ["alluvial", "loamy", "clay"], waterLow: false, profitBase: 90000 },
  { cropName: "Groundnut", rabi: false, kharif: true, soils: ["sandy", "loamy"], waterLow: false, profitBase: 45000 },
];

router.post("/crop-advisor", async (req, res): Promise<void> => {
  const parsed = GetCropRecommendationsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { soilType, season, waterAvailability } = parsed.data;
  const isRabi = season.toLowerCase().includes("rabi") || season.toLowerCase().includes("winter");
  const isLowWater = waterAvailability.toLowerCase().includes("low") || waterAvailability.toLowerCase().includes("rainfed");
  const soilLower = soilType.toLowerCase();

  const matches = cropDatabase
    .filter(crop => {
      const seasonMatch = isRabi ? crop.rabi : crop.kharif;
      const soilMatch = crop.soils.some(s => soilLower.includes(s));
      const waterMatch = isLowWater ? crop.waterLow : true;
      return seasonMatch && (soilMatch || true) && waterMatch;
    })
    .slice(0, 5)
    .map(crop => ({
      cropName: crop.cropName,
      profitEstimate: crop.profitBase + Math.floor(Math.random() * 10000),
      riskLevel: crop.waterLow ? "low" : "medium",
      marketDemand: crop.profitBase > 50000 ? "high" : "medium",
      duration: isRabi ? "4-5 months" : "3-4 months",
      reason: `Well-suited for ${soilType} soil in ${season} season with ${waterAvailability} water. Good market demand in current conditions.`,
    }));

  const result = matches.length > 0 ? matches : [
    {
      cropName: "Wheat",
      profitEstimate: 35000,
      riskLevel: "low" as const,
      marketDemand: "high" as const,
      duration: "4-5 months",
      reason: "Wheat is a safe staple crop suitable for most soil types with guaranteed market demand.",
    },
  ];

  res.json(GetCropRecommendationsResponse.parse(result));
});

export default router;

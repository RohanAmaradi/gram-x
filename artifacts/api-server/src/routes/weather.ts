import { Router, type IRouter } from "express";
import { GetWeatherResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const conditions = ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain", "Heavy Rain", "Clear"];
const farmingTips = [
  "Good day for irrigation — moderate temperature prevents water evaporation loss.",
  "Light rain expected — hold off on fertilizer application for 2 days.",
  "Clear skies ideal for pesticide spraying — apply in early morning or evening.",
  "High humidity ahead — watch for fungal disease in your crops.",
  "Strong winds today — avoid spraying chemicals to prevent drift.",
  "Perfect sowing conditions — soil temperature and moisture are optimal.",
];

router.get("/weather", async (req, res): Promise<void> => {
  const location = (req.query.location as string) ?? "Delhi, India";
  const today = new Date();

  const forecast = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const seed = d.getDate() + d.getMonth();
    return {
      date: d.toISOString().split("T")[0],
      condition: conditions[seed % conditions.length],
      high: 28 + (seed % 10),
      low: 18 + (seed % 8),
      rainChance: [0, 10, 20, 40, 60, 80, 30][i],
    };
  });

  res.json(GetWeatherResponse.parse({
    location,
    currentTemp: 32,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    farmingTip: farmingTips[today.getDate() % farmingTips.length],
    forecast,
  }));
});

export default router;

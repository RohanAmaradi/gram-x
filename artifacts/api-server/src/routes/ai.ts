import { Router, type IRouter } from "express";
import { AiChatBody, AiChatResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const farmingResponses: Record<string, string> = {
  "pest": "For pest control, use neem-based pesticides as a first step. Mix 5ml neem oil with 1 liter water and spray in the evening. For severe infestations, consult your local Krishi Vigyan Kendra for guidance on chemical control.",
  "crop": "Based on current season, wheat and mustard are good choices for rabi season. For kharif, paddy, cotton, and soybean are profitable. Consider your soil type and water availability before deciding.",
  "scheme": "PM Kisan gives ₹6000/year to eligible farmers. You can check eligibility at pmkisan.gov.in. Also look into PM Fasal Bima Yojana for crop insurance which covers losses due to natural disasters.",
  "weather": "Check the weather section for 7-day forecast. In case of rainfall warnings, avoid spraying pesticides. After rain, watch for fungal diseases in your crops and apply preventive fungicide if needed.",
  "price": "Mandi prices fluctuate daily. Check the Market section for live prices. Typically, holding your crop for 2-3 weeks after harvest can get you 10-15% better price if storage is available.",
  "fertilizer": "For most crops, use NPK in ratio 4:2:1 at basal dose. Apply urea in 2-3 splits — don't apply all at once. Organic manure 2-3 weeks before sowing improves soil health significantly.",
  "water": "Drip irrigation can save up to 40% water compared to flood irrigation. For paddy, maintain 5cm standing water during vegetative stage. Avoid waterlogging as it reduces oxygen to roots.",
  "disease": "For early identification, compare with images in disease identification guides. Most fungal diseases need copper-based fungicides. Bacterial diseases need copper+streptomycin. Viral diseases have no cure — remove infected plants.",
};

function getAiResponse(message: string): string {
  const lower = message.toLowerCase();
  for (const [keyword, response] of Object.entries(farmingResponses)) {
    if (lower.includes(keyword)) {
      return response;
    }
  }
  return "Thank you for your question. For the best advice, please contact your local Krishi Vigyan Kendra or agricultural extension officer. They can provide advice specific to your region and current crop conditions. You can also check the Crop Advisor section for personalized recommendations based on your soil and location.";
}

router.post("/ai/chat", async (req, res): Promise<void> => {
  const parsed = AiChatBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const reply = getAiResponse(parsed.data.message);
  const language = parsed.data.language ?? "en";

  res.json(AiChatResponse.parse({ reply, language }));
});

export default router;

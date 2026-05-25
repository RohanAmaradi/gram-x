export type Language = "en" | "hi" | "te" | "ta" | "kn" | "ml" | "mr";

export const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "hi", label: "हिंदी", flag: "🇮🇳" },
  { code: "te", label: "తెలుగు", flag: "🇮🇳" },
  { code: "ta", label: "தமிழ்", flag: "🇮🇳" },
  { code: "kn", label: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "ml", label: "മലയാളം", flag: "🇮🇳" },
  { code: "mr", label: "मराठी", flag: "🇮🇳" },
];

export type TranslationKeys = {
  nav: {
    home: string;
    market: string;
    tools: string;
    ai: string;
    profile: string;
  };
  layout: {
    farmingTools: string;
    expenses: string;
    livestock: string;
    equipment: string;
    schemes: string;
    cropAdvisor: string;
    weather: string;
    marketplace: string;
  };
  home: {
    greeting: string;
    subtitle: string;
    revenue: string;
    expenses: string;
    activeCrops: string;
    livestock: string;
    quickActions: string;
    mandi: string;
    schemes: string;
    rentals: string;
    advisor: string;
    dailyTip: string;
    tipText: string;
    askAI: string;
    weatherAlert: string;
  };
  market: {
    title: string;
    subtitle: string;
    search: string;
    noResults: string;
    upFrom: string;
    downFrom: string;
    stableAt: string;
    per: string;
  };
  schemes: {
    title: string;
    subtitle: string;
    benefits: string;
    eligibility: string;
    applyNow: string;
    noDeadline: string;
    deadline: string;
  };
  equipment: {
    title: string;
    subtitle: string;
    perHour: string;
    perDay: string;
    available: string;
    rented: string;
    contactOwner: string;
    unavailable: string;
  };
  expenses: {
    title: string;
    subtitle: string;
    revenue: string;
    expenses: string;
    categoryBreakdown: string;
    recentTransactions: string;
    noData: string;
    noExpenses: string;
  };
  livestock: {
    title: string;
    subtitle: string;
    feedSchedule: string;
    nextVaccine: string;
    dailyYield: string;
    active: string;
    addAnimal: string;
    noRecords: string;
    count: string;
    litersPerDay: string;
  };
  marketplace: {
    title: string;
    subtitle: string;
    forSale: string;
    lookingToBuy: string;
    contactFarmer: string;
    noSellListings: string;
    noBuyListings: string;
    available: string;
    per: string;
  };
  ai: {
    title: string;
    subtitle: string;
    greeting: string;
    typeQuestion: string;
    prompt1: string;
    prompt2: string;
    prompt3: string;
    prompt4: string;
    error: string;
  };
  cropAdvisor: {
    title: string;
    subtitle: string;
    tellUs: string;
    location: string;
    soilType: string;
    selectSoil: string;
    season: string;
    selectSeason: string;
    waterAvail: string;
    selectWater: string;
    getRecommendations: string;
    startOver: string;
    topRec: string;
    estProfit: string;
    duration: string;
    marketDemand: string;
    risk: string;
    low: string;
    medium: string;
    high: string;
    failed: string;
  };
  weather: {
    title: string;
    subtitle: string;
    farmingTip: string;
    forecast: string;
    humidity: string;
    wind: string;
  };
};

const translations: Record<Language, TranslationKeys> = {
  en: {
    nav: { home: "Home", market: "Market", tools: "Tools", ai: "AI", profile: "Profile" },
    layout: { farmingTools: "Farming Tools", expenses: "Expenses", livestock: "Livestock", equipment: "Equipment", schemes: "Schemes", cropAdvisor: "Crop Advisor", weather: "Weather", marketplace: "Marketplace" },
    home: { greeting: "Ram Ram, Kisan!", subtitle: "Here is your farm's overview today.", revenue: "Revenue", expenses: "Expenses", activeCrops: "Active Crops", livestock: "Livestock", quickActions: "Quick Actions", mandi: "Mandi", schemes: "Schemes", rentals: "Rentals", advisor: "Advisor", dailyTip: "Daily Farming Tip", tipText: "Soil moisture is optimal right now. Wait 2 more days before the next irrigation cycle to promote deeper root growth in your wheat crop.", askAI: "Ask AI Assistant", weatherAlert: "Weather Alert" },
    market: { title: "Mandi Prices", subtitle: "Live updates from your local markets.", search: "Search crop or mandi...", noResults: "No prices found for", upFrom: "Up from ₹", downFrom: "Down from ₹", stableAt: "Stable at ₹", per: "per" },
    schemes: { title: "Government Schemes", subtitle: "Find subsidies and support programs.", benefits: "Benefits", eligibility: "Eligibility", applyNow: "Apply Now", noDeadline: "No deadline", deadline: "Deadline" },
    equipment: { title: "Equipment Rental", subtitle: "Find tractors, harvesters, and tools near you.", perHour: "Per Hour", perDay: "Per Day", available: "Available", rented: "Rented", contactOwner: "Contact Owner", unavailable: "Currently Unavailable" },
    expenses: { title: "Expenses", subtitle: "Track your farm's finances.", revenue: "Revenue", expenses: "Expenses", categoryBreakdown: "Category Breakdown", recentTransactions: "Recent Transactions", noData: "No data available", noExpenses: "No expenses recorded yet." },
    livestock: { title: "Livestock Manager", subtitle: "Track health, feed, and yield.", feedSchedule: "Feed Schedule", nextVaccine: "Next Vaccine", dailyYield: "Daily Yield", active: "Active", addAnimal: "Add Animal", noRecords: "No livestock records found.", count: "Count", litersPerDay: "Liters / Day" },
    marketplace: { title: "Marketplace", subtitle: "Trade crops directly with others.", forSale: "For Sale", lookingToBuy: "Looking to Buy", contactFarmer: "Contact Farmer", noSellListings: "No sell listings available.", noBuyListings: "No buy requests available.", available: "available", per: "per" },
    ai: { title: "Gram_X Assistant", subtitle: "Always ready to help", greeting: "Namaste! I am your Gram_X assistant. Ask me anything about farming, weather, schemes, or crop advice.", typeQuestion: "Type your question...", prompt1: "Best crop for monsoon in UP?", prompt2: "Pest control for rice", prompt3: "PM Kisan scheme details", prompt4: "Wheat price near me", error: "Sorry, I had trouble processing that. Please try again." },
    cropAdvisor: { title: "Crop Advisor", subtitle: "AI-driven recommendations for your land.", tellUs: "Tell us about your farm", location: "Location (State/District)", soilType: "Soil Type", selectSoil: "Select soil type", season: "Season", selectSeason: "Select season", waterAvail: "Water Availability", selectWater: "Select availability", getRecommendations: "Get Recommendations", startOver: "Start Over", topRec: "Top Recommendation", estProfit: "Est. Profit / Acre", duration: "Duration", marketDemand: "Market Demand", risk: "Risk", low: "Low", medium: "Medium", high: "High", failed: "Failed to load recommendations." },
    weather: { title: "Weather Forecast", subtitle: "7-day outlook for your farm.", farmingTip: "Farming Tip", forecast: "7-Day Forecast", humidity: "Humidity", wind: "Wind" },
  },

  hi: {
    nav: { home: "होम", market: "बाज़ार", tools: "औज़ार", ai: "AI", profile: "प्रोफ़ाइल" },
    layout: { farmingTools: "खेती के औज़ार", expenses: "खर्च", livestock: "पशुपालन", equipment: "उपकरण", schemes: "योजनाएं", cropAdvisor: "फसल सलाहकार", weather: "मौसम", marketplace: "बाज़ार" },
    home: { greeting: "राम राम, किसान!", subtitle: "आज आपके खेत का हाल।", revenue: "आमदनी", expenses: "खर्च", activeCrops: "सक्रिय फसलें", livestock: "पशु", quickActions: "त्वरित कार्य", mandi: "मंडी", schemes: "योजनाएं", rentals: "किराया", advisor: "सलाहकार", dailyTip: "आज की खेती टिप", tipText: "अभी मिट्टी की नमी सही है। गेहूं की जड़ों की गहराई बढ़ाने के लिए अगली सिंचाई 2 दिन बाद करें।", askAI: "AI से पूछें", weatherAlert: "मौसम अलर्ट" },
    market: { title: "मंडी भाव", subtitle: "आपकी नज़दीकी मंडी से ताज़ा भाव।", search: "फसल या मंडी खोजें...", noResults: "के लिए कोई भाव नहीं मिला", upFrom: "से ऊपर ₹", downFrom: "से नीचे ₹", stableAt: "स्थिर ₹", per: "प्रति" },
    schemes: { title: "सरकारी योजनाएं", subtitle: "सब्सिडी और सहायता कार्यक्रम खोजें।", benefits: "लाभ", eligibility: "पात्रता", applyNow: "अभी आवेदन करें", noDeadline: "कोई अंतिम तिथि नहीं", deadline: "अंतिम तिथि" },
    equipment: { title: "उपकरण किराया", subtitle: "अपने पास ट्रैक्टर, हार्वेस्टर और औज़ार खोजें।", perHour: "प्रति घंटा", perDay: "प्रति दिन", available: "उपलब्ध", rented: "किराए पर", contactOwner: "मालिक से संपर्क करें", unavailable: "अभी उपलब्ध नहीं" },
    expenses: { title: "खर्च", subtitle: "अपने खेत का हिसाब रखें।", revenue: "आमदनी", expenses: "खर्च", categoryBreakdown: "श्रेणी विवरण", recentTransactions: "हाल के लेन-देन", noData: "कोई डेटा नहीं", noExpenses: "अभी तक कोई खर्च दर्ज नहीं।" },
    livestock: { title: "पशुपालन", subtitle: "स्वास्थ्य, चारा और उत्पादन ट्रैक करें।", feedSchedule: "चारा समय", nextVaccine: "अगला टीका", dailyYield: "रोज़ उत्पादन", active: "सक्रिय", addAnimal: "पशु जोड़ें", noRecords: "कोई पशु रिकॉर्ड नहीं मिला।", count: "संख्या", litersPerDay: "लीटर / दिन" },
    marketplace: { title: "बाज़ार", subtitle: "सीधे दूसरों के साथ फसल का व्यापार करें।", forSale: "बिक्री के लिए", lookingToBuy: "खरीदना चाहते हैं", contactFarmer: "किसान से संपर्क करें", noSellListings: "कोई बिक्री सूची उपलब्ध नहीं।", noBuyListings: "कोई खरीद अनुरोध उपलब्ध नहीं।", available: "उपलब्ध", per: "प्रति" },
    ai: { title: "Gram_X सहायक", subtitle: "हमेशा सहायता के लिए तैयार", greeting: "नमस्ते! मैं आपका Gram_X सहायक हूं। खेती, मौसम, योजनाओं या फसल सलाह के बारे में कुछ भी पूछें।", typeQuestion: "अपना सवाल टाइप करें...", prompt1: "UP में मानसून के लिए सबसे अच्छी फसल?", prompt2: "धान में कीट नियंत्रण", prompt3: "PM किसान योजना विवरण", prompt4: "मेरे पास गेहूं का भाव", error: "क्षमा करें, उत्तर देने में परेशानी हुई। कृपया पुनः प्रयास करें।" },
    cropAdvisor: { title: "फसल सलाहकार", subtitle: "आपकी ज़मीन के लिए AI सुझाव।", tellUs: "अपने खेत के बारे में बताएं", location: "स्थान (राज्य/जिला)", soilType: "मिट्टी का प्रकार", selectSoil: "मिट्टी का प्रकार चुनें", season: "मौसम", selectSeason: "मौसम चुनें", waterAvail: "पानी की उपलब्धता", selectWater: "उपलब्धता चुनें", getRecommendations: "सुझाव पाएं", startOver: "फिर से शुरू", topRec: "सर्वोत्तम सुझाव", estProfit: "अनुमानित लाभ / एकड़", duration: "अवधि", marketDemand: "बाज़ार माँग", risk: "जोखिम", low: "कम", medium: "मध्यम", high: "अधिक", failed: "सुझाव लोड करने में विफल।" },
    weather: { title: "मौसम का हाल", subtitle: "आपके खेत के लिए 7 दिन का मौसम।", farmingTip: "खेती सुझाव", forecast: "7 दिन का पूर्वानुमान", humidity: "आर्द्रता", wind: "हवा" },
  },

  te: {
    nav: { home: "హోమ్", market: "మార్కెట్", tools: "సాధనాలు", ai: "AI", profile: "ప్రొఫైల్" },
    layout: { farmingTools: "వ్యవసాయ సాధనాలు", expenses: "ఖర్చులు", livestock: "పశుపోషణ", equipment: "పరికరాలు", schemes: "పథకాలు", cropAdvisor: "పంట సలహాదారు", weather: "వాతావరణం", marketplace: "వ్యాపారం" },
    home: { greeting: "రామ్ రామ్, రైతన్నా!", subtitle: "నేడు మీ పొలం యొక్క వివరాలు.", revenue: "ఆదాయం", expenses: "ఖర్చులు", activeCrops: "సక్రియ పంటలు", livestock: "పశువులు", quickActions: "త్వరిత చర్యలు", mandi: "మండి", schemes: "పథకాలు", rentals: "అద్దె", advisor: "సలహాదారు", dailyTip: "రోజువారీ వ్యవసాయ చిట్కా", tipText: "ప్రస్తుతం నేల తేమ సరిగ్గా ఉంది. మీ గోధుమ పంటలో లోతైన వేర్ల వృద్ధికి మరో 2 రోజులు ఆగి నీరు పెట్టండి.", askAI: "AI ని అడగండి", weatherAlert: "వాతావరణ హెచ్చరిక" },
    market: { title: "మండి ధరలు", subtitle: "మీ స్థానిక మార్కెట్ నుండి తాజా ధరలు.", search: "పంట లేదా మండి వెతకండి...", noResults: "కోసం ధరలు కనుగొనబడలేదు", upFrom: "నుండి పెరిగింది ₹", downFrom: "నుండి తగ్గింది ₹", stableAt: "స్థిరంగా ₹", per: "కి" },
    schemes: { title: "ప్రభుత్వ పథకాలు", subtitle: "సబ్సిడీలు మరియు సహాయ కార్యక్రమాలు కనుగొనండి.", benefits: "లాభాలు", eligibility: "అర్హత", applyNow: "ఇప్పుడే దరఖాస్తు చేయండి", noDeadline: "గడువు తేదీ లేదు", deadline: "చివరి తేదీ" },
    equipment: { title: "పరికరాల అద్దె", subtitle: "మీ సమీపంలో ట్రాక్టర్లు, హార్వెస్టర్లు కనుగొనండి.", perHour: "గంటకు", perDay: "రోజుకు", available: "అందుబాటులో", rented: "అద్దెకు ఇచ్చారు", contactOwner: "యజమానిని సంప్రదించండి", unavailable: "ప్రస్తుతం అందుబాటులో లేదు" },
    expenses: { title: "ఖర్చులు", subtitle: "మీ పొలం యొక్క ఆర్థిక వివరాలు ట్రాక్ చేయండి.", revenue: "ఆదాయం", expenses: "ఖర్చులు", categoryBreakdown: "వర్గం వివరాలు", recentTransactions: "ఇటీవలి లావాదేవీలు", noData: "డేటా అందుబాటులో లేదు", noExpenses: "ఇంకా ఖర్చులు నమోదు కాలేదు." },
    livestock: { title: "పశుపోషణ", subtitle: "ఆరోగ్యం, మేత మరియు దిగుబడి ట్రాక్ చేయండి.", feedSchedule: "మేత షెడ్యూల్", nextVaccine: "తదుపరి టీకా", dailyYield: "రోజువారీ దిగుబడి", active: "సక్రియ", addAnimal: "జంతువు జోడించండి", noRecords: "పశువుల నమోదులు కనుగొనబడలేదు.", count: "సంఖ్య", litersPerDay: "లీటర్లు / రోజు" },
    marketplace: { title: "వ్యాపారం", subtitle: "నేరుగా ఇతరులతో పంటలు వ్యాపారం చేయండి.", forSale: "అమ్మకానికి", lookingToBuy: "కొనాలనుకుంటున్నారు", contactFarmer: "రైతును సంప్రదించండి", noSellListings: "అమ్మకం జాబితాలు లేవు.", noBuyListings: "కొనుగోలు అభ్యర్థనలు లేవు.", available: "అందుబాటులో", per: "కి" },
    ai: { title: "Gram_X సహాయకుడు", subtitle: "ఎల్లప్పుడూ సహాయం చేయడానికి సిద్ధంగా", greeting: "నమస్కారం! నేను మీ Gram_X సహాయకుడిని. వ్యవసాయం, వాతావరణం, పథకాలు లేదా పంట సలహా గురించి ఏదైనా అడగండి.", typeQuestion: "మీ ప్రశ్న టైప్ చేయండి...", prompt1: "UP లో వర్షాకాలానికి అత్యుత్తమ పంట ఏది?", prompt2: "వరికి చీడపురుగుల నివారణ", prompt3: "PM కిసాన్ పథకం వివరాలు", prompt4: "నాకు దగ్గరలో గోధుమ ధర", error: "క్షమించండి, ప్రాసెస్ చేయడంలో సమస్య ఉంది. దయచేసి మళ్ళీ ప్రయత్నించండి." },
    cropAdvisor: { title: "పంట సలహాదారు", subtitle: "మీ భూమి కోసం AI సిఫార్సులు.", tellUs: "మీ పొలం గురించి చెప్పండి", location: "స్థానం (రాష్ట్రం/జిల్లా)", soilType: "నేల రకం", selectSoil: "నేల రకం ఎంచుకోండి", season: "ఋతువు", selectSeason: "ఋతువు ఎంచుకోండి", waterAvail: "నీటి లభ్యత", selectWater: "లభ్యత ఎంచుకోండి", getRecommendations: "సిఫార్సులు పొందండి", startOver: "మళ్ళీ ప్రారంభించండి", topRec: "అత్యుత్తమ సిఫార్సు", estProfit: "అంచనా లాభం / ఎకరా", duration: "వ్యవధి", marketDemand: "మార్కెట్ డిమాండ్", risk: "ప్రమాదం", low: "తక్కువ", medium: "మధ్యస్థం", high: "ఎక్కువ", failed: "సిఫార్సులు లోడ్ చేయడం విఫలమైంది." },
    weather: { title: "వాతావరణ సూచన", subtitle: "మీ పొలానికి 7 రోజుల వాతావరణ సూచన.", farmingTip: "వ్యవసాయ చిట్కా", forecast: "7 రోజుల సూచన", humidity: "తేమ", wind: "గాలి" },
  },

  ta: {
    nav: { home: "முகப்பு", market: "சந்தை", tools: "கருவிகள்", ai: "AI", profile: "சுயவிவரம்" },
    layout: { farmingTools: "விவசாய கருவிகள்", expenses: "செலவுகள்", livestock: "கால்நடை", equipment: "உபகரணங்கள்", schemes: "திட்டங்கள்", cropAdvisor: "பயிர் ஆலோசகர்", weather: "வானிலை", marketplace: "சந்தை" },
    home: { greeting: "வணக்கம், விவசாயி!", subtitle: "இன்று உங்கள் வயல் நிலை.", revenue: "வருமானம்", expenses: "செலவுகள்", activeCrops: "செயல்பாட்டு பயிர்கள்", livestock: "கால்நடைகள்", quickActions: "விரைவு செயல்கள்", mandi: "மண்டி", schemes: "திட்டங்கள்", rentals: "வாடகை", advisor: "ஆலோசகர்", dailyTip: "இன்றைய விவசாய குறிப்பு", tipText: "மண்ணில் ஈரப்பதம் சரியாக உள்ளது. கோதுமை வேர்கள் ஆழமாக வளர இன்னும் 2 நாட்கள் தண்ணீர் பாய்ச்சாமல் இருங்கள்.", askAI: "AI ஐ கேளுங்கள்", weatherAlert: "வானிலை எச்சரிக்கை" },
    market: { title: "மண்டி விலைகள்", subtitle: "உங்கள் உள்ளூர் சந்தையிலிருந்து புதிய விலைகள்.", search: "பயிர் அல்லது மண்டி தேடுங்கள்...", noResults: "க்கு விலைகள் கிடைக்கவில்லை", upFrom: "இலிருந்து அதிகரித்தது ₹", downFrom: "இலிருந்து குறைந்தது ₹", stableAt: "நிலையான ₹", per: "க்கு" },
    schemes: { title: "அரசு திட்டங்கள்", subtitle: "மானியங்கள் மற்றும் உதவி திட்டங்களை காணுங்கள்.", benefits: "நலன்கள்", eligibility: "தகுதி", applyNow: "இப்போதே விண்ணப்பிக்கவும்", noDeadline: "காலக்கெடு இல்லை", deadline: "காலக்கெடு" },
    equipment: { title: "உபகரண வாடகை", subtitle: "அருகிலுள்ள டிராக்டர்கள், அறுவடை இயந்திரங்கள் கண்டறியுங்கள்.", perHour: "மணிக்கு", perDay: "நாளுக்கு", available: "கிடைக்கும்", rented: "வாடகைக்கு", contactOwner: "உரிமையாளரை தொடர்பு கொள்ளுங்கள்", unavailable: "தற்போது கிடைக்கவில்லை" },
    expenses: { title: "செலவுகள்", subtitle: "உங்கள் வயல் நிதியை கண்காணிக்கவும்.", revenue: "வருமானம்", expenses: "செலவுகள்", categoryBreakdown: "வகை விவரம்", recentTransactions: "சமீபத்திய பரிவர்த்தனைகள்", noData: "தரவு இல்லை", noExpenses: "இன்னும் செலவுகள் பதிவு செய்யப்படவில்லை." },
    livestock: { title: "கால்நடை மேலாண்மை", subtitle: "ஆரோக்கியம், தீவனம் மற்றும் விளைச்சல் கண்காணிக்கவும்.", feedSchedule: "தீவன அட்டவணை", nextVaccine: "அடுத்த தடுப்பூசி", dailyYield: "தினசரி விளைச்சல்", active: "செயல்பாட்டில்", addAnimal: "விலங்கு சேர்க்கவும்", noRecords: "கால்நடை பதிவுகள் இல்லை.", count: "எண்ணிக்கை", litersPerDay: "லிட்டர் / நாள்" },
    marketplace: { title: "வணிகம்", subtitle: "நேரடியாக மற்றவர்களுடன் பயிர்களை வர்த்தகம் செய்யுங்கள்.", forSale: "விற்பனைக்கு", lookingToBuy: "வாங்க விரும்புகிறோம்", contactFarmer: "விவசாயியை தொடர்பு கொள்ளுங்கள்", noSellListings: "விற்பனை பட்டியல்கள் இல்லை.", noBuyListings: "வாங்கும் கோரிக்கைகள் இல்லை.", available: "கிடைக்கும்", per: "க்கு" },
    ai: { title: "Gram_X உதவியாளர்", subtitle: "எப்போதும் உதவ தயாராக", greeting: "வணக்கம்! நான் உங்கள் Gram_X உதவியாளர். விவசாயம், வானிலை, திட்டங்கள் அல்லது பயிர் ஆலோசனை பற்றி எதையும் கேளுங்கள்.", typeQuestion: "உங்கள் கேள்வியை தட்டச்சு செய்யுங்கள்...", prompt1: "UP ல் மழை காலத்தில் சிறந்த பயிர் எது?", prompt2: "நெல்லுக்கு பூச்சி கட்டுப்பாடு", prompt3: "PM கிசான் திட்ட விவரங்கள்", prompt4: "என் அருகிலுள்ள கோதுமை விலை", error: "மன்னிக்கவும், செயல்படுத்துவதில் சிக்கல். மீண்டும் முயற்சிக்கவும்." },
    cropAdvisor: { title: "பயிர் ஆலோசகர்", subtitle: "உங்கள் நிலத்திற்கான AI பரிந்துரைகள்.", tellUs: "உங்கள் வயல் பற்றி சொல்லுங்கள்", location: "இடம் (மாநிலம்/மாவட்டம்)", soilType: "மண் வகை", selectSoil: "மண் வகை தேர்வு செய்யுங்கள்", season: "பருவம்", selectSeason: "பருவம் தேர்வு செய்யுங்கள்", waterAvail: "நீர் கிடைக்கும் தன்மை", selectWater: "தேர்வு செய்யுங்கள்", getRecommendations: "பரிந்துரைகள் பெறுங்கள்", startOver: "மீண்டும் தொடங்கு", topRec: "சிறந்த பரிந்துரை", estProfit: "மதிப்பிட்ட லாபம் / ஏக்கர்", duration: "காலம்", marketDemand: "சந்தை தேவை", risk: "ஆபத்து", low: "குறைவு", medium: "நடுத்தர", high: "அதிகம்", failed: "பரிந்துரைகள் ஏற்றுவதில் தோல்வி." },
    weather: { title: "வானிலை முன்னறிவிப்பு", subtitle: "உங்கள் வயலுக்கு 7 நாள் வானிலை.", farmingTip: "விவசாய குறிப்பு", forecast: "7 நாள் முன்னறிவிப்பு", humidity: "ஈரப்பதம்", wind: "காற்று" },
  },

  kn: {
    nav: { home: "ಮನೆ", market: "ಮಾರುಕಟ್ಟೆ", tools: "ಸಾಧನಗಳು", ai: "AI", profile: "ಪ್ರೊಫೈಲ್" },
    layout: { farmingTools: "ಕೃಷಿ ಸಾಧನಗಳು", expenses: "ಖರ್ಚು", livestock: "ಪಶುಪಾಲನೆ", equipment: "ಉಪಕರಣಗಳು", schemes: "ಯೋಜನೆಗಳು", cropAdvisor: "ಬೆಳೆ ಸಲಹೆಗಾರ", weather: "ಹವಾಮಾನ", marketplace: "ಮಾರುಕಟ್ಟೆ" },
    home: { greeting: "ನಮಸ್ಕಾರ, ರೈತರೇ!", subtitle: "ಇಂದು ನಿಮ್ಮ ಜಮೀನಿನ ಮಾಹಿತಿ.", revenue: "ಆದಾಯ", expenses: "ಖರ್ಚು", activeCrops: "ಸಕ್ರಿಯ ಬೆಳೆಗಳು", livestock: "ಪಶುಗಳು", quickActions: "ತ್ವರಿತ ಕ್ರಿಯೆಗಳು", mandi: "ಮಂಡಿ", schemes: "ಯೋಜನೆಗಳು", rentals: "ಬಾಡಿಗೆ", advisor: "ಸಲಹೆಗಾರ", dailyTip: "ದೈನಂದಿನ ಕೃಷಿ ಸಲಹೆ", tipText: "ಮಣ್ಣಿನ ತೇವಾಂಶ ಸರಿಯಾಗಿದೆ. ಗೋಧಿ ಬೆಳೆಗೆ ಆಳವಾದ ಬೇರು ಬೆಳವಣಿಗೆಗೆ ಇನ್ನೂ 2 ದಿನ ನೀರು ಹಾಕಬೇಡಿ.", askAI: "AI ಅನ್ನು ಕೇಳಿ", weatherAlert: "ಹವಾಮಾನ ಎಚ್ಚರಿಕೆ" },
    market: { title: "ಮಂಡಿ ಬೆಲೆಗಳು", subtitle: "ನಿಮ್ಮ ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆಯಿಂದ ತಾಜಾ ಬೆಲೆಗಳು.", search: "ಬೆಳೆ ಅಥವಾ ಮಂಡಿ ಹುಡುಕಿ...", noResults: "ಗಾಗಿ ಬೆಲೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ", upFrom: "ಇಂದ ಹೆಚ್ಚಾಯಿತು ₹", downFrom: "ಇಂದ ಕಡಿಮೆಯಾಯಿತು ₹", stableAt: "ಸ್ಥಿರ ₹", per: "ಗೆ" },
    schemes: { title: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು", subtitle: "ಸಬ್ಸಿಡಿ ಮತ್ತು ಸಹಾಯ ಕಾರ್ಯಕ್ರಮಗಳು ಕಂಡುಹಿಡಿಯಿರಿ.", benefits: "ಪ್ರಯೋಜನಗಳು", eligibility: "ಅರ್ಹತೆ", applyNow: "ಈಗಲೇ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ", noDeadline: "ಗಡುವು ಇಲ್ಲ", deadline: "ಕೊನೆ ದಿನಾಂಕ" },
    equipment: { title: "ಉಪಕರಣ ಬಾಡಿಗೆ", subtitle: "ಹತ್ತಿರದ ಟ್ರಾಕ್ಟರ್, ಹಾರ್ವೆಸ್ಟರ್ ಹುಡುಕಿ.", perHour: "ಗಂಟೆಗೆ", perDay: "ದಿನಕ್ಕೆ", available: "ಲಭ್ಯವಿದೆ", rented: "ಬಾಡಿಗೆಗೆ", contactOwner: "ಮಾಲಕರನ್ನು ಸಂಪರ್ಕಿಸಿ", unavailable: "ಪ್ರಸ್ತುತ ಲಭ್ಯವಿಲ್ಲ" },
    expenses: { title: "ಖರ್ಚು", subtitle: "ನಿಮ್ಮ ಜಮೀನಿನ ಆರ್ಥಿಕ ವ್ಯವಹಾರ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.", revenue: "ಆದಾಯ", expenses: "ಖರ್ಚು", categoryBreakdown: "ವರ್ಗ ವಿವರ", recentTransactions: "ಇತ್ತೀಚಿನ ವ್ಯವಹಾರಗಳು", noData: "ಡೇಟಾ ಇಲ್ಲ", noExpenses: "ಇನ್ನೂ ಯಾವ ಖರ್ಚೂ ದಾಖಲಿಸಲಾಗಿಲ್ಲ." },
    livestock: { title: "ಪಶುಪಾಲನೆ", subtitle: "ಆರೋಗ್ಯ, ಮೇವು ಮತ್ತು ಇಳುವರಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.", feedSchedule: "ಮೇವು ವೇಳಾಪಟ್ಟಿ", nextVaccine: "ಮುಂದಿನ ಲಸಿಕೆ", dailyYield: "ದೈನಂದಿನ ಇಳುವರಿ", active: "ಸಕ್ರಿಯ", addAnimal: "ಪ್ರಾಣಿ ಸೇರಿಸಿ", noRecords: "ಪಶು ದಾಖಲೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.", count: "ಸಂಖ್ಯೆ", litersPerDay: "ಲೀಟರ್ / ದಿನ" },
    marketplace: { title: "ಮಾರುಕಟ್ಟೆ", subtitle: "ನೇರವಾಗಿ ಇತರರೊಂದಿಗೆ ಬೆಳೆ ವ್ಯಾಪಾರ ಮಾಡಿ.", forSale: "ಮಾರಾಟಕ್ಕೆ", lookingToBuy: "ಖರೀದಿಸಲು ಬಯಸುತ್ತೇವೆ", contactFarmer: "ರೈತರನ್ನು ಸಂಪರ್ಕಿಸಿ", noSellListings: "ಮಾರಾಟ ಪಟ್ಟಿಗಳು ಇಲ್ಲ.", noBuyListings: "ಖರೀದಿ ವಿನಂತಿಗಳು ಇಲ್ಲ.", available: "ಲಭ್ಯ", per: "ಗೆ" },
    ai: { title: "Gram_X ಸಹಾಯಕ", subtitle: "ಯಾವಾಗಲೂ ಸಹಾಯಕ್ಕೆ ಸಿದ್ಧ", greeting: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ Gram_X ಸಹಾಯಕ. ಕೃಷಿ, ಹವಾಮಾನ, ಯೋಜನೆಗಳು ಅಥವಾ ಬೆಳೆ ಸಲಹೆ ಕುರಿತು ಏನಾದರೂ ಕೇಳಿ.", typeQuestion: "ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಟೈಪ್ ಮಾಡಿ...", prompt1: "UP ನಲ್ಲಿ ಮಳೆಗಾಲಕ್ಕೆ ಅತ್ಯುತ್ತಮ ಬೆಳೆ ಯಾವುದು?", prompt2: "ಭತ್ತಕ್ಕೆ ಕೀಟ ನಿಯಂತ್ರಣ", prompt3: "PM ಕಿಸಾನ್ ಯೋಜನೆ ವಿವರ", prompt4: "ನನ್ನ ಹತ್ತಿರ ಗೋಧಿ ಬೆಲೆ", error: "ಕ್ಷಮಿಸಿ, ಪ್ರಕ್ರಿಯೆ ಸಮಸ್ಯೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ." },
    cropAdvisor: { title: "ಬೆಳೆ ಸಲಹೆಗಾರ", subtitle: "ನಿಮ್ಮ ಭೂಮಿಗಾಗಿ AI ಶಿಫಾರಸುಗಳು.", tellUs: "ನಿಮ್ಮ ಜಮೀನಿನ ಬಗ್ಗೆ ಹೇಳಿ", location: "ಸ್ಥಳ (ರಾಜ್ಯ/ಜಿಲ್ಲೆ)", soilType: "ಮಣ್ಣಿನ ರೀತಿ", selectSoil: "ಮಣ್ಣಿನ ರೀತಿ ಆರಿಸಿ", season: "ಋತು", selectSeason: "ಋತು ಆರಿಸಿ", waterAvail: "ನೀರಿನ ಲಭ್ಯತೆ", selectWater: "ಲಭ್ಯತೆ ಆರಿಸಿ", getRecommendations: "ಶಿಫಾರಸುಗಳು ಪಡೆಯಿರಿ", startOver: "ಮತ್ತೆ ಪ್ರಾರಂಭಿಸಿ", topRec: "ಅತ್ಯುತ್ತಮ ಶಿಫಾರಸು", estProfit: "ಅಂದಾಜು ಲಾಭ / ಎಕರೆ", duration: "ಅವಧಿ", marketDemand: "ಮಾರುಕಟ್ಟೆ ಬೇಡಿಕೆ", risk: "ಅಪಾಯ", low: "ಕಡಿಮೆ", medium: "ಮಧ್ಯಮ", high: "ಹೆಚ್ಚು", failed: "ಶಿಫಾರಸುಗಳು ಲೋಡ್ ಮಾಡಲು ವಿಫಲ." },
    weather: { title: "ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ", subtitle: "ನಿಮ್ಮ ಜಮೀನಿಗಾಗಿ 7 ದಿನದ ಹವಾಮಾನ.", farmingTip: "ಕೃಷಿ ಸಲಹೆ", forecast: "7 ದಿನದ ಮುನ್ಸೂಚನೆ", humidity: "ತೇವಾಂಶ", wind: "ಗಾಳಿ" },
  },

  ml: {
    nav: { home: "ഹോം", market: "മാർക്കറ്റ്", tools: "ഉപകരണങ്ങൾ", ai: "AI", profile: "പ്രൊഫൈൽ" },
    layout: { farmingTools: "കൃഷി ഉപകരണങ്ങൾ", expenses: "ചെലവുകൾ", livestock: "കന്നുകാലി", equipment: "യന്ത്രങ്ങൾ", schemes: "പദ്ധതികൾ", cropAdvisor: "വിള ഉപദേഷ്ടാവ്", weather: "കാലാവസ്ഥ", marketplace: "ചന്ത" },
    home: { greeting: "നമസ്കാരം, കർഷകൻ!", subtitle: "ഇന്ന് നിങ്ങളുടെ ഫാമിന്റെ വിവരം.", revenue: "വരുമാനം", expenses: "ചെലവ്", activeCrops: "സജീവ വിളകൾ", livestock: "കന്നുകാലി", quickActions: "വേഗ പ്രവർത്തനങ്ങൾ", mandi: "മൻഡി", schemes: "പദ്ധതികൾ", rentals: "വാടക", advisor: "ഉപദേഷ്ടാവ്", dailyTip: "ദൈനംദിന കൃഷി ടിപ്പ്", tipText: "ഇപ്പോൾ മണ്ണിൽ ഈർപ്പം ശരിയാണ്. ഗോതമ്പ് വേരുകൾ ആഴത്തിൽ വളരാൻ 2 ദിവസം കൂടി നനക്കേണ്ടതില്ല.", askAI: "AI നോടു ചോദിക്കൂ", weatherAlert: "കാലാവസ്ഥ മുന്നറിയിപ്പ്" },
    market: { title: "മൻഡി വില", subtitle: "നിങ്ങളുടെ പ്രാദേശിക ചന്തയിൽ നിന്നുള്ള പുതിയ വിലകൾ.", search: "വിള അല്ലെങ്കിൽ മൻഡി തിരയൂ...", noResults: "ക്ക് വില കണ്ടെത്തിയില്ല", upFrom: "ൽ നിന്ന് കൂടി ₹", downFrom: "ൽ നിന്ന് കുറഞ്ഞ ₹", stableAt: "സ്ഥിരം ₹", per: "ക്ക്" },
    schemes: { title: "സർക്കാർ പദ്ധതികൾ", subtitle: "സബ്സിഡികളും സഹായ പദ്ധതികളും കണ്ടെത്തൂ.", benefits: "ആനുകൂല്യങ്ങൾ", eligibility: "യോഗ്യത", applyNow: "ഇപ്പോൾ അപേക്ഷിക്കൂ", noDeadline: "സമയ പരിധി ഇല്ല", deadline: "അവസാന തീയതി" },
    equipment: { title: "യന്ത്ര വാടക", subtitle: "അടുത്തുള്ള ട്രാക്ടർ, ഹാർവെസ്റ്റർ കണ്ടെത്തൂ.", perHour: "മണിക്കൂറിന്", perDay: "ദിവസത്തിന്", available: "ലഭ്യം", rented: "വാടകയ്ക്ക്", contactOwner: "ഉടമയുമായി ബന്ധപ്പെടൂ", unavailable: "ഇപ്പോൾ ലഭ്യമല്ല" },
    expenses: { title: "ചെലവുകൾ", subtitle: "നിങ്ങളുടെ ഫാം ധനകാര്യം ട്രാക്ക് ചെയ്യൂ.", revenue: "വരുമാനം", expenses: "ചെലവ്", categoryBreakdown: "വിഭാഗ വിശദാംശം", recentTransactions: "സമീപ ഇടപാടുകൾ", noData: "ഡേറ്റ ഇല്ല", noExpenses: "ഇതുവരെ ചെലവുകൾ രേഖപ്പെടുത്തിയിട്ടില്ല." },
    livestock: { title: "കന്നുകാലി മാനേജ്മെന്റ്", subtitle: "ആരോഗ്യം, ഭക്ഷണം, ഉൽപ്പാദനം ട്രാക്ക് ചെയ്യൂ.", feedSchedule: "ഭക്ഷണ സമയക്രമം", nextVaccine: "അടുത്ത വാക്സിൻ", dailyYield: "ദൈനംദിന ഉൽപ്പാദനം", active: "സജീവം", addAnimal: "മൃഗം ചേർക്കൂ", noRecords: "കന്നുകാലി രേഖകൾ ഇല്ല.", count: "എണ്ണം", litersPerDay: "ലിറ്റർ / ദിവസം" },
    marketplace: { title: "ചന്ത", subtitle: "നേരിട്ട് മറ്റുള്ളവരുമായി വിള വ്യാപാരം ചെയ്യൂ.", forSale: "വിൽക്കാൻ", lookingToBuy: "വാങ്ങാൻ ആഗ്രഹം", contactFarmer: "കർഷകനെ ബന്ധപ്പെടൂ", noSellListings: "വിൽക്കൽ ലിസ്റ്റ് ഇല്ല.", noBuyListings: "വാങ്ങൽ അഭ്യർഥനകൾ ഇല്ല.", available: "ലഭ്യം", per: "ക്ക്" },
    ai: { title: "Gram_X സഹായി", subtitle: "എപ്പോഴും സഹായിക്കാൻ തയ്യാർ", greeting: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ Gram_X സഹായിയാണ്. കൃഷി, കാലാവസ്ഥ, പദ്ധതികൾ അല്ലെങ്കിൽ വിള ഉപദേശം പറ്റി ഏതും ചോദിക്കൂ.", typeQuestion: "നിങ്ങളുടെ ചോദ്യം ടൈപ്പ് ചെയ്യൂ...", prompt1: "UP ൽ മഴക്കാലത്ത് നല്ല വിള ഏത്?", prompt2: "നെൽകൃഷിക്ക് കീടനിയന്ത്രണം", prompt3: "PM കിസാൻ പദ്ധതി വിവരം", prompt4: "എന്റെ അടുത്ത് ഗോതമ്പ് വില", error: "ക്ഷമിക്കൂ, പ്രോസസ് ചെയ്യുന്നതിൽ പ്രശ്നം. ദയവായി വീണ്ടും ശ്രമിക്കൂ." },
    cropAdvisor: { title: "വിള ഉപദേഷ്ടാവ്", subtitle: "നിങ്ങളുടെ ഭൂമിക്കായി AI ശുപാർശകൾ.", tellUs: "നിങ്ങളുടെ ഫാമിനെ കുറിച്ച് പറയൂ", location: "സ്ഥലം (സംസ്ഥാനം/ജില്ല)", soilType: "മണ്ണിന്റെ തരം", selectSoil: "മണ്ണ് തരം തിരഞ്ഞെടുക്കൂ", season: "ഋതു", selectSeason: "ഋതു തിരഞ്ഞെടുക്കൂ", waterAvail: "ജലം ലഭ്യത", selectWater: "ലഭ്യത തിരഞ്ഞെടുക്കൂ", getRecommendations: "ശുപാർശകൾ നേടൂ", startOver: "വീണ്ടും ആരംഭിക്കൂ", topRec: "ഏറ്റവും ഉത്തമ ശുപാർശ", estProfit: "കണക്കാക്കിയ ലാഭം / ഏക്കർ", duration: "ദൈർഘ്യം", marketDemand: "വിപണി ആവശ്യം", risk: "അപകടം", low: "കുറഞ്ഞ", medium: "മധ്യ", high: "ഉയർന്ന", failed: "ശുപാർശകൾ ലോഡ് ചെയ്യുന്നതിൽ പരാജയം." },
    weather: { title: "കാലാവസ്ഥ പ്രവചനം", subtitle: "നിങ്ങളുടെ ഫാമിന് 7 ദിവസത്തെ കാലാവസ്ഥ.", farmingTip: "കൃഷി ടിപ്പ്", forecast: "7 ദിവസ പ്രവചനം", humidity: "ഈർപ്പം", wind: "കാറ്റ്" },
  },

  mr: {
    nav: { home: "होम", market: "बाजार", tools: "साधने", ai: "AI", profile: "प्रोफाइल" },
    layout: { farmingTools: "शेतीची साधने", expenses: "खर्च", livestock: "पशुधन", equipment: "उपकरणे", schemes: "योजना", cropAdvisor: "पीक सल्लागार", weather: "हवामान", marketplace: "बाजार" },
    home: { greeting: "राम राम, शेतकरी!", subtitle: "आज तुमच्या शेताचा आढावा.", revenue: "उत्पन्न", expenses: "खर्च", activeCrops: "सक्रिय पिके", livestock: "पशुधन", quickActions: "जलद कृती", mandi: "मंडी", schemes: "योजना", rentals: "भाड्याने", advisor: "सल्लागार", dailyTip: "आजची शेती टिप", tipText: "मातीमध्ये ओलावा आत्ता योग्य आहे. गव्हाच्या पिकाची मुळे खोलवर वाढण्यासाठी पुढील सिंचन आणखी 2 दिवसांनी करा.", askAI: "AI ला विचारा", weatherAlert: "हवामान इशारा" },
    market: { title: "मंडी भाव", subtitle: "तुमच्या जवळच्या मंडीतील ताजे भाव.", search: "पीक किंवा मंडी शोधा...", noResults: "साठी कोणते भाव मिळाले नाहीत", upFrom: "पेक्षा जास्त ₹", downFrom: "पेक्षा कमी ₹", stableAt: "स्थिर ₹", per: "प्रति" },
    schemes: { title: "सरकारी योजना", subtitle: "अनुदान आणि मदत कार्यक्रम शोधा.", benefits: "लाभ", eligibility: "पात्रता", applyNow: "आता अर्ज करा", noDeadline: "कोणतीही अंतिम मुदत नाही", deadline: "अंतिम मुदत" },
    equipment: { title: "उपकरण भाडे", subtitle: "जवळचे ट्रॅक्टर, हार्वेस्टर आणि साधने शोधा.", perHour: "प्रति तास", perDay: "प्रति दिन", available: "उपलब्ध", rented: "भाड्याने दिले", contactOwner: "मालकाशी संपर्क करा", unavailable: "सध्या उपलब्ध नाही" },
    expenses: { title: "खर्च", subtitle: "तुमच्या शेताचे आर्थिक व्यवहार नोंदवा.", revenue: "उत्पन्न", expenses: "खर्च", categoryBreakdown: "श्रेणी तपशील", recentTransactions: "अलीकडील व्यवहार", noData: "डेटा उपलब्ध नाही", noExpenses: "अद्याप कोणताही खर्च नोंदवलेला नाही." },
    livestock: { title: "पशुपालन", subtitle: "आरोग्य, चारा आणि उत्पादन नोंदवा.", feedSchedule: "चारा वेळापत्रक", nextVaccine: "पुढील लसीकरण", dailyYield: "दैनंदिन उत्पादन", active: "सक्रिय", addAnimal: "प्राणी जोडा", noRecords: "कोणतेही पशु रेकॉर्ड नाही.", count: "संख्या", litersPerDay: "लिटर / दिन" },
    marketplace: { title: "बाजार", subtitle: "थेट इतरांशी पिकांचा व्यापार करा.", forSale: "विक्रीसाठी", lookingToBuy: "खरेदी करायची आहे", contactFarmer: "शेतकऱ्याशी संपर्क करा", noSellListings: "कोणत्याही विक्री याद्या नाहीत.", noBuyListings: "कोणत्याही खरेदी विनंत्या नाहीत.", available: "उपलब्ध", per: "प्रति" },
    ai: { title: "Gram_X सहायक", subtitle: "नेहमी मदतीसाठी तयार", greeting: "नमस्कार! मी तुमचा Gram_X सहायक आहे. शेती, हवामान, योजना किंवा पीक सल्ल्याबद्दल काहीही विचारा.", typeQuestion: "तुमचा प्रश्न टाइप करा...", prompt1: "UP मध्ये पावसाळ्यात सर्वोत्तम पीक कोणते?", prompt2: "भाताला कीटक नियंत्रण", prompt3: "PM किसान योजना तपशील", prompt4: "माझ्याजवळ गव्हाचा भाव", error: "क्षमस्व, उत्तर देताना अडचण आली. कृपया पुन्हा प्रयत्न करा." },
    cropAdvisor: { title: "पीक सल्लागार", subtitle: "तुमच्या जमिनीसाठी AI शिफारसी.", tellUs: "तुमच्या शेताबद्दल सांगा", location: "ठिकाण (राज्य/जिल्हा)", soilType: "मातीचा प्रकार", selectSoil: "मातीचा प्रकार निवडा", season: "हंगाम", selectSeason: "हंगाम निवडा", waterAvail: "पाण्याची उपलब्धता", selectWater: "उपलब्धता निवडा", getRecommendations: "शिफारसी मिळवा", startOver: "पुन्हा सुरू करा", topRec: "सर्वोत्तम शिफारस", estProfit: "अंदाजे नफा / एकर", duration: "कालावधी", marketDemand: "बाजार मागणी", risk: "जोखीम", low: "कमी", medium: "मध्यम", high: "जास्त", failed: "शिफारसी लोड करण्यात अयशस्वी." },
    weather: { title: "हवामान अंदाज", subtitle: "तुमच्या शेतासाठी 7 दिवसांचे हवामान.", farmingTip: "शेती टिप", forecast: "7 दिवसांचा अंदाज", humidity: "आर्द्रता", wind: "वारा" },
  },
};

export default translations;

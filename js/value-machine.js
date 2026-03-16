// ===============================
//  VALUE MACHINE — CORE LOGIC
// ===============================


// ---------- CATEGORY BASE COSTS ----------
const CATEGORY_BASE_COSTS = {
    "Redstone(4)": 3200000,
    "Redstone(2)": 1600000,
    "Redstone": 800000,
    "Greystone": 600000,
    "Battle": 50000,
    "Premium": 100000,
    "Seasonal": 100000,
    "Orphan": 25000,
    "Quest/Award": 80000,
    "Main": 5000,
    "Stray": 4000
};


// ---------- AGE CURVES ----------
const AGE_CURVES = {
    "Redstone":     { early: 0.045, late: 0.0095 },
    "Redstone(2)":  { early: 0.045, late: 0.0092 },
    "Redstone(4)":  { early: 0.045, late: 0.009 },
    "Greystone":    { early: 0.04,  late: 0.014 },
    "Battle":       { early: 0.035, late: 0.02 },
    "Premium":      { early: 0.03,  late: 0.02 },
    "Seasonal":     { early: 0.028, late: 0.012 },
    "Orphan":       { early: 0.025,  late: 0.02 },
    "Quest/Award":  { early: 0.02,  late: 0.03 },
    "Main":         { early: 0.038, late: 0.035 },
    "Stray":        { early: 0.038, late: 0.035 },
    "CUSTOM":       { early: 0.03,  late: 0.02 }
};


// ---------- EXTRA EFFECTS ----------
const EXTRA_EFFECTS = {
    Ethereal: { default: v => 4000000 },
    Glitched: { 
        default: v => v * 0.15 + 80000,
        "Main": v => v * 0.15 + 300000,
        "Orphan": v => v * 0.16 + 600000,
        "Stray": v => v * 0.18 + 450000    
    },
    Manual: { default: v => v * 0.25 },
    BreedOnly: { default: v => v * 0.20 },
    AllCarrier: { default: v => v * 0.99 },
    Event: { default: v => (v * 0.40) + 700000 },
    Painted: { default: v => 500000 },
    Rare: {
        default: v => v * 0.05,
        "Battle": v => v * 0.45 + 350000,
        "Orphan": v => v + 80000,
        "Stray": v => v + 20000
    },
    Effect: { default: v => v * 0.12 },
    Parentless: {
        default: v => v * 0.15,
        "Redstone": v => v * 0.16,
        "Redstone(2)": v => v * 0.17,
        "Redstone(4)": v => v * 0.18,
        "Quest/Award": v => v * 0.19,
        "Main": v => v * 0.20,
        "Battle": v => v * 0.21
    },
    Childless: { default: v => v * 0.10 },
    Ungrown: { default: v => 0 },
    Unbreedable: { default: v => 200000 }
};


// ===============================
//  HELPERS
// ===============================

function getBaseCost(category, customBase) {
    return category === "CUSTOM"
        ? customBase
        : (CATEGORY_BASE_COSTS[category] || 0);
}


// ---------- GENERATION MODIFIER ----------
function getGenerationModifier(category, generation, extras) {
    const isRedstone = category.includes("Redstone");

    if (extras.includes("Ethereal")) return 1;

    let modifier = 1;

    if (generation >= 1) {
        const capped = Math.min(generation, 4);
        modifier = Math.pow(0.5, capped - 1);
    } else {
        modifier = isRedstone ? 1 : (1 / 3);
    }

    const softeningExtras = ["Glitched", "BreedOnly", "Manual"];
    if (softeningExtras.some(e => extras.includes(e))) {
        modifier = 1 - ((1 - modifier) / 2);
    }

    return modifier;
}


// ---------- AGE CALCULATION ----------
function calculateAgeAdjusted(value, category, ageMonths) {
    const curve = AGE_CURVES[category] || AGE_CURVES["CUSTOM"];

    let adjusted = value;
    const earlyMonths = Math.min(ageMonths, 12);
    const lateMonths = Math.max(ageMonths - 12, 0);

    adjusted *= Math.pow(1 + curve.early, earlyMonths);
    adjusted *= Math.pow(1 + curve.late, lateMonths);

    return adjusted;
}


// ---------- POPULATION MODIFIER ----------
function getPopulationModifier(generation, population, extras) {
    if (generation <= 0) return 1;

    let modifier;

    if (population < 11) modifier = 1.40;
    else if (population <= 151) modifier = 1.20;
    else if (population <= 1001) modifier = 1.15;
    else if (population <= 10001) modifier = 1.05;
    else if (population <= 100001) modifier = 1.005;
    else modifier = 0.95;

    if (generation > 1 && !extras.includes("BreedOnly")) {
        modifier = 1 + ((modifier - 1) * -0.55);
    }

    return modifier;
}


// ---------- EXTRAS ----------
function calculateExtras(value, category, generation, ageMonths, extras) {
    let total = 0;

    extras.forEach(extra => {
        const rule = EXTRA_EFFECTS[extra];
        if (!rule) return;

        if (extra === "Manual" && generation < 2) return;

        if (extra === "Ungrown") {
            if (ageMonths >= 120) total += value;
            else if (ageMonths < 3) total -= value * 0.03;
            return;
        }

        const fn = rule[category] || rule.default;
        if (typeof fn === "function") total += fn(value);
    });

    return total;
}


// ---------- MARKET INFLUENCE ----------
function calculateMarketInfluence(finalValue, market) {
    const values = [];
    if (market.week > 0) values.push(market.week);
    if (market.month > 0) values.push(market.month);
    if (market.current > 0) values.push(market.current);

    if (values.length === 0) return finalValue;

    const avg = values.reduce((a, b) => a + b, 0) / values.length;

    if (values.length === 3) {
        return (finalValue * 0.20) + (avg * 0.80);
    }

    return (finalValue * 0.60) + (avg * 0.40);
}


// ===============================
//  MAIN CALCULATOR
// ===============================
function calculateValue({
    category,
    customBase,
    generation,
    birthdate,
    population,
    extras,
    market
}) {
    const baseCost = getBaseCost(category, customBase);

    const birth = new Date(birthdate);
    const now = new Date();
    const ageMonths = Math.max(
        0,
        Math.floor((now - birth) / (1000 * 60 * 60 * 24 * 30.437))
    );

    const genAdjusted = baseCost * getGenerationModifier(category, generation, extras);
    const ageAdjusted = calculateAgeAdjusted(genAdjusted, category, ageMonths);
    const populationAdjusted = ageAdjusted * getPopulationModifier(generation, population, extras);

    const extrasAdded = calculateExtras(
        populationAdjusted,
        category,
        generation,
        ageMonths,
        extras
    );

    let finalValue = populationAdjusted + extrasAdded;
    finalValue = calculateMarketInfluence(finalValue, market);

    return {
        category,
        baseCost: Math.floor(baseCost),
        generationAdjusted: Math.floor(genAdjusted),
        ageAdjusted: Math.floor(ageAdjusted),
        populationAdjusted: Math.floor(populationAdjusted),
        extrasAdded: Math.floor(extrasAdded),
        finalValue: Math.floor(finalValue)
    };
}


// ===============================
//  UI HANDLING
// ===============================
function runCalc() {
    const category   = document.getElementById("category").value;
    const customBase = Number(document.getElementById("customBase").value || 0);
    const generation = Number(document.getElementById("generation").value);
    const birthdate  = document.getElementById("birthdate").value;
    const population = Number(document.getElementById("population").value);

    const market = {
        week: Number(document.getElementById("market7").value || 0),
        month: Number(document.getElementById("market30").value || 0),
        current: Number(document.getElementById("marketCurrent").value || 0)
    };

    const extras = Array.from(
        document.querySelectorAll(".extras-grid input:checked")
    ).map(el => el.value);

    const result = calculateValue({
        category,
        customBase,
        generation,
        birthdate,
        population,
        extras,
        market
    });

    const marketValues = [];
    if (market.week > 0) marketValues.push(market.week);
    if (market.month > 0) marketValues.push(market.month);
    if (market.current > 0) marketValues.push(market.current);

    const marketSuggested = marketValues.length > 0
        ? Math.floor(marketValues.reduce((a, b) => a + b, 0) / marketValues.length)
        : result.finalValue;

    document.getElementById("output").textContent = `
Category: ${result.category}
--------------------------------
Base Value: ${result.baseCost.toLocaleString()}
Generation Adjusted: ${result.generationAdjusted.toLocaleString()}
Age Adjusted: ${result.ageAdjusted.toLocaleString()}
Population Adjusted: ${result.populationAdjusted.toLocaleString()}
Extras Added: ${result.extrasAdded.toLocaleString()}
Market Consideration: ${marketSuggested.toLocaleString()}
--------------------------------
FINAL VALUE: ${result.finalValue.toLocaleString()}
`.trim();
}


// ---------- CUSTOM CATEGORY TOGGLE ----------
function toggleCustomField() {
    const category = document.getElementById("category").value;
    const wrapper = document.getElementById("customBaseWrapper");
    wrapper.style.display = (category === "CUSTOM") ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", () => {
    const categorySelect = document.getElementById("category");
    categorySelect.addEventListener("change", toggleCustomField);
    toggleCustomField();
});

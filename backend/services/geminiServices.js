const axios = require("axios");

async function analyzeIngredients(ingredients){

const prompt = `
You are a food analysis AI.

Analyze these ingredients:

${ingredients.join(", ")}

Return JSON only:

{
 "additives": [],
 "nova_class": "",
 "toxicity_score": 0,
 "metabolic_stress": "",
 "health_explanation": ""
}

Rules:
- additives must contain harmful additives
- nova_class must be NOVA1 NOVA2 NOVA3 or NOVA4
- metabolic_stress must be LOW MEDIUM or HIGH
`;

const response = await axios.post(

`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,

{
contents:[
{
parts:[
{ text: prompt }
]
}
]
}

);

const text = response.data.candidates[0].content.parts[0].text;

return JSON.parse(text);

}

module.exports = analyzeIngredients;
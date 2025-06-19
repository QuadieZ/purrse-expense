import { CAT_FACTS_URL, fallbackCatFacts } from "../constants/cat";
import type { CatFactResponse } from "../types/cats";

export async function getCatFact(): Promise<CatFactResponse> {
    try {
        const response = await fetch(CAT_FACTS_URL)
        const data = await response.json() as CatFactResponse
        return data
    } catch (error) {
        // Offline fallback
        console.error(error)
        const randomIndex = Math.floor(Math.random() * fallbackCatFacts.length)
        return fallbackCatFacts[randomIndex]
    }
}
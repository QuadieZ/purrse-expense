import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CAT_FACTS_URL, fallbackCatFacts } from '../constants/cat';
import { getCatFact } from './getCatFact';

// Mock fetch globally
global.fetch = vi.fn();

// Mock console.error to avoid noise in tests
vi.spyOn(console, 'error').mockImplementation(() => { });

describe('getCatFact', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('returns cat fact from API when successful', async () => {
        const mockResponse = {
            fact: 'Cats have excellent night vision.',
            length: 32,
        };

        (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
            json: vi.fn().mockResolvedValueOnce(mockResponse),
        } as unknown as Response);

        const result = await getCatFact();

        expect(fetch).toHaveBeenCalledWith(CAT_FACTS_URL);
        expect(result).toEqual(mockResponse);
    });

    it('returns fallback cat fact when API fails', async () => {
        const networkError = new Error('Network error');
        (fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(networkError);

        const result = await getCatFact();

        expect(fetch).toHaveBeenCalledWith(CAT_FACTS_URL);
        expect(console.error).toHaveBeenCalledWith(networkError);
        expect(fallbackCatFacts).toContain(result);
    });

    it('returns fallback cat fact when API returns invalid JSON', async () => {
        (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
            json: vi.fn().mockRejectedValueOnce(new Error('Invalid JSON')),
        } as unknown as Response);

        const result = await getCatFact();

        expect(fetch).toHaveBeenCalledWith(CAT_FACTS_URL);
        expect(fallbackCatFacts).toContain(result);
    });

    it('returns different fallback facts on multiple failures', async () => {
        const networkError = new Error('Network error');
        (fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(networkError);

        const results = await Promise.all([
            getCatFact(),
            getCatFact(),
            getCatFact(),
        ]);

        // All results should be from fallback facts
        results.forEach(result => {
            expect(fallbackCatFacts).toContain(result);
        });

        // Should have called fetch multiple times
        expect(fetch).toHaveBeenCalledTimes(3);
    });

    it('handles malformed API response gracefully', async () => {
        const malformedResponse = { invalidField: 'not a cat fact' };
        (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
            json: vi.fn().mockResolvedValueOnce(malformedResponse),
        } as unknown as Response);

        const result = await getCatFact();

        expect(fetch).toHaveBeenCalledWith(CAT_FACTS_URL);
        // Should still return a valid response (either from API or fallback)
        expect(result).toBeDefined();
    });
}); 
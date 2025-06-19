import { defineTokens } from "@chakra-ui/react";

export const semanticColorTokens = defineTokens({
    colors: {
        brand: {
            primary: { value: "{colors.brand.500}" },
            primaryHover: { value: "{colors.brand.400}" },
            secondary: { value: "{colors.brand.200}" },
            secondaryHover: { value: "{colors.brand.300}" },
            light: { value: "{colors.brand.100}" },
            accent: { value: "{colors.accent.500}" },
            accentHover: { value: "{colors.accent.400}" },
            accentLight: { value: "{colors.accent.200}" },
        },
        background: {
            primary: { value: "{colors.brand.50}" },
            brand: { value: "{colors.brand.500}" },
        },
        text: {
            primary: { value: "#211a1d" },
            contrast: { value: "{colors.brand.50}" },
            accent: { value: "{colors.accent.600}" },
        },
        brandPalette: {
            solid: { value: "{colors.brand.500}" },
            contrast: { value: "{colors.brand.50}" },
            fg: { value: "{colors.brand.500}" },
            muted: { value: "{colors.brand.100}" },
            subtle: { value: "{colors.brand.100}" },
            emphasized: { value: "{colors.accent.500}" },
            focusRing: { value: "{colors.accent.500}" },
        },
        accentPalette: {
            solid: { value: "{colors.accent.500}" },
            contrast: { value: "{colors.accent.50}" },
            fg: { value: "{colors.accent.500}" },
            muted: { value: "{colors.accent.100}" },
            subtle: { value: "{colors.accent.100}" },
            emphasized: { value: "{colors.accent.500}" },
            focusRing: { value: "{colors.accent.500}" },
        }
    }
})
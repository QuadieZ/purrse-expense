import { defineTokens } from "@chakra-ui/react";

export const baseColorTokens = defineTokens({
    colors: {
        brand: {
            50: { value: "#fffbf7" },
            100: { value: "#ffecdb" },
            200: { value: "#fbc4ab" },
            300: { value: "#f8ad9d" },
            400: { value: "#f4978e" },
            500: { value: "#f08080" },
        },
        accent: {
            300: { value: "#e1fdf3" },
            400: { value: "#c3edde" },
            500: { value: "#89e4c5" },
            600: { value: "#33c291" }
        }
    }
})
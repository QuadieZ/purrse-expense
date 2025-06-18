import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { baseColorTokens } from "./tokens/colors/baseToken";
import { semanticColorTokens } from "./tokens/colors/semanticTokens";

const meowKitTheme = defineConfig({
    globalCss: {
        "html, body": {
            margin: 0,
            padding: 0,
            fontFamily: "Quicksand Variable, Tahoma, system-ui, sans-serif",
            bg: "background.primary",
            color: "text.primary"
        },
    },
    theme: {
        tokens: {
            ...baseColorTokens
        },
        semanticTokens: {
            ...semanticColorTokens
        }
    }
})

const meowKitSystem = createSystem(defaultConfig, meowKitTheme)
export default meowKitSystem;
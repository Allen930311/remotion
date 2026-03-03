import { loadFont as loadNotoSansTC } from "@remotion/google-fonts/NotoSansTC";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";

// Load Chinese-compatible font with required weights
const noto = loadNotoSansTC("normal", {
    weights: ["400", "700", "900"],
    subsets: ["latin", "chinese-traditional"],
});

const jetbrains = loadJetBrainsMono("normal", {
    weights: ["400", "700"],
    subsets: ["latin"],
});

export const FONT_FAMILY = noto.fontFamily;
export const FONT_MONO = jetbrains.fontFamily;

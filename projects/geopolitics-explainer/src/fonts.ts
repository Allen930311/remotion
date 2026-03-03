import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";

const jetbrains = loadJetBrainsMono("normal", {
    weights: ["400", "700"],
    subsets: ["latin"],
});

export const FONT_FAMILY = '"Noto Sans TC", sans-serif';
export const FONT_MONO = jetbrains.fontFamily;

import { loadFont as loadNotoSansTC } from "@remotion/google-fonts/NotoSansTC";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";

const noto = loadNotoSansTC();
const jetbrains = loadJetBrainsMono();

export const FONT_FAMILY = noto.fontFamily;
export const FONT_MONO = jetbrains.fontFamily;

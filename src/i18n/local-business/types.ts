// Languages the /local-business page is fully translated into.
export type LbLang = "en" | "fr" | "es" | "de" | "pt" | "zh" | "ja" | "nl" | "no";
export const LB_LANGS: LbLang[] = ["en", "fr", "es", "de", "pt", "zh", "ja", "nl", "no"];

// One piece of text in every language, in the order of LB_LANGS.
export type Entry = [string, string, string, string, string, string, string, string, string];

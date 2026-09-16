export type LangCode = "en" | "fr" | "es" | "de" | "pt" | "zh" | "ja" | "yo";
export type CurrencyCode = "USD" | "EUR" | "GBP" | "BRL" | "CNY" | "JPY" | "NGN" | "CAD" | "AUD" | "AED";

export interface Language {
  code: LangCode;
  label: string;
  flag: string;
  currency: CurrencyCode;
}

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rate: number; // vs USD — approximate, indicative only
}

export const LANGUAGES: Language[] = [
  { code: "en", label: "English",   flag: "🇺🇸", currency: "USD" },
  { code: "fr", label: "Français",  flag: "🇫🇷", currency: "EUR" },
  { code: "es", label: "Español",   flag: "🇪🇸", currency: "EUR" },
  { code: "de", label: "Deutsch",   flag: "🇩🇪", currency: "EUR" },
  { code: "pt", label: "Português", flag: "🇧🇷", currency: "BRL" },
  { code: "zh", label: "中文",      flag: "🇨🇳", currency: "CNY" },
  { code: "ja", label: "日本語",    flag: "🇯🇵", currency: "JPY" },
  { code: "yo", label: "Yorùbá",   flag: "🇳🇬", currency: "NGN" },
];

export const CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$",    name: "US Dollar",         rate: 1      },
  { code: "EUR", symbol: "€",    name: "Euro",              rate: 0.92   },
  { code: "GBP", symbol: "£",    name: "British Pound",     rate: 0.79   },
  { code: "NGN", symbol: "₦",    name: "Nigerian Naira",    rate: 1640   },
  { code: "BRL", symbol: "R$",   name: "Brazilian Real",    rate: 4.97   },
  { code: "CNY", symbol: "¥",    name: "Chinese Yuan",      rate: 7.24   },
  { code: "JPY", symbol: "¥",    name: "Japanese Yen",      rate: 149    },
  { code: "CAD", symbol: "C$",   name: "Canadian Dollar",   rate: 1.36   },
  { code: "AUD", symbol: "A$",   name: "Australian Dollar", rate: 1.54   },
  { code: "AED", symbol: "AED",  name: "UAE Dirham",        rate: 3.67   },
];

export const T: Record<string, Record<LangCode, string>> = {
  // ── Nav ──────────────────────────────────────────────────────────────
  "nav.work": {
    en: "WORK",         fr: "PROJETS",      es: "PROYECTOS",    de: "ARBEIT",
    pt: "PROJETOS",     zh: "作品",          ja: "実績",          yo: "ÌṢẸ",
  },
  "nav.benefits": {
    en: "BENEFITS",     fr: "AVANTAGES",    es: "BENEFICIOS",   de: "VORTEILE",
    pt: "BENEFÍCIOS",   zh: "优势",          ja: "メリット",      yo: "ÀǸFÀNÍ",
  },
  "nav.process": {
    en: "PROCESS",      fr: "PROCESSUS",    es: "PROCESO",      de: "PROZESS",
    pt: "PROCESSO",     zh: "流程",          ja: "プロセス",      yo: "ÌLàNA",
  },
  "nav.pricing": {
    en: "PRICING",      fr: "TARIFS",       es: "PRECIOS",      de: "PREISE",
    pt: "PREÇOS",       zh: "价格",          ja: "料金",          yo: "ÈTÒ OWÓ",
  },
  "nav.testimonials": {
    en: "TESTIMONIALS", fr: "AVIS",         es: "TESTIMONIOS",  de: "BEWERTUNGEN",
    pt: "DEPOIMENTOS",  zh: "评价",          ja: "口コミ",        yo: "ẸRÍ",
  },
  "nav.about": {
    en: "ABOUT",        fr: "À PROPOS",     es: "SOBRE MÍ",     de: "ÜBER MICH",
    pt: "SOBRE MIM",    zh: "关于我",        ja: "私について",    yo: "NÍPA MI",
  },
  "nav.faq": {
    en: "FAQ",          fr: "FAQ",          es: "FAQ",          de: "FAQ",
    pt: "FAQ",          zh: "常见问题",      ja: "よくある質問",  yo: "ÌBÉÈRÈ",
  },

  // ── Hero ─────────────────────────────────────────────────────────────
  "hero.badge": {
    en: "2 spots open",            fr: "2 places disponibles",    es: "2 plazas disponibles",    de: "2 Plätze frei",
    pt: "2 vagas disponíveis",     zh: "2个名额开放",              ja: "残り2枠",                  yo: "àyè 2 ṣí",
  },
  "hero.badge2": {
    en: "Next start: Oct 2026",    fr: "Début: Oct 2026",         es: "Inicio: Oct 2026",        de: "Start: Okt 2026",
    pt: "Início: Out 2026",        zh: "下一期: 2026年10月",       ja: "次回開始: 2026年10月",     yo: "Ìbẹ̀rẹ̀: Okt 2026",
  },
  "hero.h1": {
    en: "I DESIGN AND BUILD",      fr: "JE CONÇOIS ET CRÉE",      es: "DISEÑO Y CONSTRUYO",      de: "ICH GESTALTE UND BAUE",
    pt: "EU PROJETO E CONSTRUO",   zh: "我设计并构建",              ja: "デザインして構築する",      yo: "MO ṢEÈDÀ ATI KÒ",
  },
  "hero.h2": {
    en: "WEBSITES THAT CONVERT.",  fr: "DES SITES QUI CONVERTISSENT.", es: "SITIOS WEB QUE CONVIERTEN.", de: "WEBSITES DIE KONVERTIEREN.",
    pt: "SITES QUE CONVERTEM.",    zh: "能够转化的网站。",           ja: "コンバージョンするサイト。", yo: "ÀWỌN OJÚEWÉ TÓ YÁRA.",
  },
  "hero.subtitle": {
    en: "Product designer & Framer developer. I use Framer, Shopify, and Webflow to build sites that genuinely convert.",
    fr: "Designer produit & développeur Framer. J'utilise Framer, Shopify et Webflow pour créer des sites qui convertissent vraiment.",
    es: "Diseñador de producto y desarrollador Framer. Uso Framer, Shopify y Webflow para crear sitios que realmente convierten.",
    de: "Produktdesigner & Framer-Entwickler. Ich nutze Framer, Shopify und Webflow, um Websites zu bauen, die wirklich konvertieren.",
    pt: "Designer de produto & desenvolvedor Framer. Uso Framer, Shopify e Webflow para criar sites que realmente convertem.",
    zh: "产品设计师 & Framer 开发者。我使用 Framer、Shopify 和 Webflow 构建真正能转化的网站。",
    ja: "プロダクトデザイナー＆Framer開発者。Framer、Shopify、Webflowを使い、本当にコンバージョンするサイトを構築します。",
    yo: "Aṣàpẹẹrẹ ọja & olùgbéjáde Framer. Mo lo Framer, Shopify, àti Webflow láti kọ àwọn ìdí tó mú àwọn ará wọlé.",
  },
  "hero.cta": {
    en: "BOOK A FREE CALL",        fr: "RÉSERVER UN APPEL",       es: "AGENDAR LLAMADA",         de: "ANRUF BUCHEN",
    pt: "AGENDAR CHAMADA",         zh: "预约免费通话",              ja: "無料通話を予約",            yo: "PADE NÍNÚ ÌPÈ",
  },

  // ── Pricing ──────────────────────────────────────────────────────────
  "pricing.eyebrow": {
    en: "INVESTMENT",   fr: "INVESTISSEMENT", es: "INVERSIÓN",    de: "INVESTITION",
    pt: "INVESTIMENTO", zh: "投资",            ja: "投資",          yo: "IDOKO-ỌWÓ",
  },
  "pricing.h2a": {
    en: "CLEAR SCOPE.",   fr: "PRIX CLAIRS.",     es: "PRECIOS CLAROS.",    de: "KLARE PREISE.",
    pt: "PREÇOS CLAROS.", zh: "清晰报价。",         ja: "明確な価格。",        yo: "ÈTÒ TÓ KEDERE.",
  },
  "pricing.h2b": {
    en: "CLEAR NUMBER. NO SURPRISES.", fr: "PAS DE MAUVAISES SURPRISES.", es: "SIN SORPRESAS.", de: "KEINE ÜBERRASCHUNGEN.",
    pt: "SEM SURPRESAS.",              zh: "无隐藏费用。",                  ja: "驚きなし。",         yo: "KÒ SÍ ÌYÀLẸ́NÚ.",
  },
  "pricing.desc": {
    en: "Pricing is scoped per project — no hourly billing, no retainers you didn't ask for. Book a call and you'll leave with an exact number and exactly what's included.",
    fr: "Les tarifs sont définis par projet — pas de facturation horaire, pas de forfaits non demandés. Réservez un appel et vous repartirez avec un chiffre précis.",
    es: "El precio se define por proyecto — sin facturación por hora, sin retenciones. Agenda una llamada y sabrás exactamente cuánto cuesta y qué incluye.",
    de: "Die Preise werden projektbezogen festgelegt — keine Stundenabrechnung, keine unerwünschten Retainer. Buchen Sie ein Gespräch und erhalten Sie eine genaue Zahl.",
    pt: "Os preços são definidos por projeto — sem cobrança por hora. Agende uma chamada e sairá com um número exato e tudo o que está incluído.",
    zh: "价格按项目定价——无按小时计费，无额外收费。预约通话，您将得到精确的报价。",
    ja: "料金はプロジェクトごとに設定されます。時間制課金はありません。通話を予約して正確な金額をご確認ください。",
    yo: "Iye ọ̀pọ̀ ni a gbé kalẹ̀ fún iṣẹ́ kọ̀ọ̀kan — kò sí ìsanwó lọ́ọ̀rọ̀. Pàdé mi nínú ìpè kí o tó mọ iye tó tọ́.",
  },
  "pricing.cta": {
    en: "Book a call",      fr: "Réserver un appel",    es: "Agendar una llamada", de: "Anruf buchen",
    pt: "Agendar chamada",  zh: "预约通话",               ja: "通話を予約",           yo: "Sọ̀rọ̀ fún mi",
  },
  "pricing.disclaimer": {
    en: "All prices are starting points — final quote depends on scope. Book a free 30-min call and you'll have a number before you leave.",
    fr: "Tous les prix sont des points de départ. Réservez un appel gratuit de 30 min et vous repartirez avec un chiffre précis.",
    es: "Todos los precios son puntos de partida. Agenda una llamada gratuita de 30 minutos y tendrás un número exacto.",
    de: "Alle Preise sind Ausgangspunkte. Buchen Sie ein kostenloses 30-minütiges Gespräch und erhalten Sie eine genaue Zahl.",
    pt: "Todos os preços são pontos de partida. Agende uma chamada gratuita de 30 min e terá um número preciso.",
    zh: "所有价格均为起始价格，最终报价取决于项目范围。预约30分钟免费通话获取精确报价。",
    ja: "すべての価格は出発点です。30分の無料通話を予約して正確な数字をご確認ください。",
    yo: "Gbogbo iye jẹ́ àkọsílẹ̀ ìbẹ̀rẹ̀. Ṣàgbékalẹ̀ ìpè ọ̀fẹ́ ìṣẹ́jú 30 kí o tó mọ iye tó tọ́.",
  },

  // ── Footer ───────────────────────────────────────────────────────────
  "footer.cta": {
    en: "LET'S BUILD SOMETHING YOU'RE PROUD OF.",
    fr: "CONSTRUISONS QUELQUE CHOSE DONT VOUS SEREZ FIER.",
    es: "CONSTRUYAMOS ALGO DE LO QUE ESTÉS ORGULLOSO.",
    de: "LASS UNS ETWAS BAUEN, AUF DAS DU STOLZ BIST.",
    pt: "VAMOS CONSTRUIR ALGO DO QUAL VOCÊ SE ORGULHE.",
    zh: "让我们一起打造让你引以为豪的产品。",
    ja: "誇りに思えるものを一緒に作りましょう。",
    yo: "JẸ́ KÁ KÒ NǸKAN TÍ YÓÒ MU INÚ RẸ DÀN.",
  },
  "footer.ctaDesc": {
    en: "No back-and-forth, no bloated agencies, no wasted time. Tell me what you need and I'll tell you exactly how I'll get it done.",
    fr: "Pas d'allers-retours, pas d'agences gonflées, pas de temps perdu. Dites-moi ce qu'il vous faut et je vous dirai exactement comment y parvenir.",
    es: "Sin idas y venidas, sin agencias infladas, sin tiempo perdido. Dime lo que necesitas y te diré exactamente cómo lo haré.",
    de: "Kein Hin und Her, keine aufgeblähten Agenturen, keine Zeitverschwendung. Sagen Sie mir, was Sie brauchen, und ich sage Ihnen genau, wie ich es umsetze.",
    pt: "Sem idas e vindas, sem agências infladas, sem tempo perdido. Diga-me o que você precisa e eu direi exatamente como farei.",
    zh: "没有来回沟通，没有臃肿的代理机构，没有时间浪费。告诉我您需要什么，我会告诉您如何实现。",
    ja: "行き来なし、肥大したエージェンシーなし、時間の無駄なし。必要なことを教えていただければ、どう実現するかをお伝えします。",
    yo: "Kò sí ìfòfindè, kò sí àwọn ilé-iṣẹ́ tó pọ̀jù, kò sí àkókò tí a nà. Sọ fún mi ohun tí o fẹ́ kí n ṣe.",
  },

  // ── Common CTAs ──────────────────────────────────────────────────────
  "common.scheduleCall": {
    en: "SCHEDULE FREE CALL", fr: "PLANIFIER UN APPEL",  es: "PROGRAMAR LLAMADA",   de: "ANRUF PLANEN",
    pt: "AGENDAR CHAMADA",    zh: "预约通话",              ja: "通話を予約",            yo: "ṢÈTÒ ÌPÈPE",
  },
  "common.bookCall": {
    en: "BOOK A FREE CALL",   fr: "RÉSERVER UN APPEL",   es: "AGENDAR LLAMADA",     de: "ANRUF BUCHEN",
    pt: "AGENDAR CHAMADA",    zh: "预约免费通话",           ja: "無料通話を予約",        yo: "PADE NÍNÚ ÌPÈ",
  },
};

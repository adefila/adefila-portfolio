import type { LangCode } from "./translations";

// Project descriptions, industry tags and badges for the Projects section.
// Rows are [en, fr, es, de, pt, zh, ja]; Dutch and Norwegian show English (the Projects
// section only appears on the main site, where those two are not offered yet).
type Row = [string, string, string, string, string, string, string];
const ORDER: LangCode[] = ["en", "fr", "es", "de", "pt", "zh", "ja"];
type Entry = Partial<Record<LangCode, string>> & { en: string };

const rows: Record<string, Row> = {
  // ── descriptions
  "proj.calder.desc": [
    "Telehealth website for personalised online care. Built in Next.js with a custom design system, calm healthcare visuals, and a content editor so the team can update pages without code.",
    "Site de télésanté pour des soins en ligne personnalisés. Développé avec Next.js, avec un design system sur mesure, des visuels apaisants et un éditeur de contenu pour que l'équipe modifie les pages sans code.",
    "Sitio de telesalud para una atención online personalizada. Creado con Next.js, con un sistema de diseño propio, imágenes sanitarias serenas y un editor de contenido para que el equipo actualice las páginas sin código.",
    "Telemedizin-Website für persönliche Online-Betreuung. Mit Next.js gebaut, mit eigenem Designsystem, ruhiger Bildsprache und einem Content-Editor, damit das Team Seiten ohne Code aktualisieren kann.",
    "Site de telessaúde para cuidados online personalizados. Feito em Next.js, com design system próprio, visuais de saúde calmos e um editor de conteúdo para a equipe atualizar as páginas sem código.",
    "面向个性化在线医疗的远程医疗网站。使用 Next.js 构建，配有定制设计系统、平静的医疗视觉，以及让团队无需代码即可更新页面的内容编辑器。",
    "パーソナライズされたオンライン診療のためのテレヘルスサイト。Next.jsで構築し、独自のデザインシステム、落ち着いたビジュアル、コード不要でページを更新できるコンテンツエディターを備えています。",
  ],
  "proj.initial.desc": [
    "AI-powered creative agency site. Figma designs translated to pixel-perfect Framer with custom interactions and CMS.",
    "Site d'une agence créative pilotée par l'IA. Maquettes Figma transposées au pixel près dans Framer, avec interactions sur mesure et CMS.",
    "Sitio de una agencia creativa con IA. Diseños de Figma llevados a Framer al píxel, con interacciones a medida y CMS.",
    "Website einer KI-gestützten Kreativagentur. Figma-Designs pixelgenau in Framer umgesetzt, mit individuellen Interaktionen und CMS.",
    "Site de uma agência criativa com IA. Designs do Figma levados ao Framer pixel a pixel, com interações sob medida e CMS.",
    "AI 驱动的创意机构网站。将 Figma 设计像素级还原到 Framer，并加入定制交互和 CMS。",
    "AI活用クリエイティブエージェンシーのサイト。FigmaデザインをFramerでピクセルパーフェクトに再現し、カスタムインタラクションとCMSを実装。",
  ],
  "proj.bindhq.desc": [
    "Insurance management SaaS. Template customised to match their design system with complex navigation and data-dense layouts.",
    "SaaS de gestion d'assurance. Template personnalisé selon leur design system, avec une navigation complexe et des mises en page riches en données.",
    "SaaS de gestión de seguros. Plantilla personalizada para ajustarse a su sistema de diseño, con navegación compleja y diseños densos en datos.",
    "Versicherungsmanagement-SaaS. Template an ihr Designsystem angepasst, mit komplexer Navigation und datenreichen Layouts.",
    "SaaS de gestão de seguros. Template personalizado conforme o design system deles, com navegação complexa e layouts densos em dados.",
    "保险管理 SaaS。按其设计系统定制模板，包含复杂导航和数据密集型布局。",
    "保険管理SaaS。テンプレートをクライアントのデザインシステムに合わせてカスタマイズし、複雑なナビゲーションとデータ量の多いレイアウトに対応。",
  ],
  "proj.vpa.desc": [
    "Talent agency portfolio built in Framer with editorial typography, smooth scroll, and a roster filtering system.",
    "Portfolio d'agence de talents créé dans Framer, avec une typographie éditoriale, un défilement fluide et un système de filtrage du roster.",
    "Portafolio de una agencia de talento creado en Framer, con tipografía editorial, scroll suave y un sistema de filtrado del roster.",
    "Portfolio einer Talentagentur in Framer, mit redaktioneller Typografie, sanftem Scrollen und einem Filtersystem für das Roster.",
    "Portfólio de agência de talentos feito no Framer, com tipografia editorial, rolagem suave e um sistema de filtro do elenco.",
    "用 Framer 打造的人才经纪公司作品集，采用杂志式排版、流畅滚动和艺人名单筛选系统。",
    "Framerで構築したタレントエージェンシーのポートフォリオ。エディトリアルなタイポグラフィ、なめらかなスクロール、所属タレントの絞り込み機能を備えています。",
  ],
  "proj.upside.desc": [
    "ESG reporting platform with live data integrations, custom chart components, and a resource library built in Framer.",
    "Plateforme de reporting ESG avec intégrations de données en direct, composants de graphiques sur mesure et bibliothèque de ressources, le tout dans Framer.",
    "Plataforma de reportes ESG con integraciones de datos en vivo, componentes de gráficos a medida y una biblioteca de recursos creada en Framer.",
    "ESG-Reporting-Plattform mit Live-Datenanbindung, eigenen Diagramm-Komponenten und einer Ressourcenbibliothek, gebaut in Framer.",
    "Plataforma de relatórios ESG com integrações de dados ao vivo, componentes de gráficos sob medida e uma biblioteca de recursos feita no Framer.",
    "ESG 报告平台，包含实时数据集成、定制图表组件和用 Framer 搭建的资源库。",
    "ESGレポーティングプラットフォーム。リアルタイムのデータ連携、カスタムチャートコンポーネント、Framerで構築したリソースライブラリを備えています。",
  ],
  "proj.alyssa.desc": [
    "Personal portfolio for a healthcare SEO consultant. Clean, conversion-focused layout with case study pages.",
    "Portfolio personnel d'une consultante SEO en santé. Mise en page claire, axée conversion, avec des pages d'études de cas.",
    "Portafolio personal para una consultora de SEO en salud. Diseño limpio y orientado a la conversión, con páginas de casos de estudio.",
    "Persönliches Portfolio für eine SEO-Beraterin im Gesundheitsbereich. Klares, conversion-orientiertes Layout mit Fallstudien-Seiten.",
    "Portfólio pessoal de uma consultora de SEO para saúde. Layout limpo e focado em conversão, com páginas de estudos de caso.",
    "为医疗健康领域 SEO 顾问打造的个人作品集。简洁、以转化为导向的版式，并包含案例研究页面。",
    "ヘルスケア分野のSEOコンサルタントの個人ポートフォリオ。すっきりとしたコンバージョン重視のレイアウトで、事例ページも用意。",
  ],
  "proj.emalbu.desc": [
    "Full HTML-to-Framer migration for a professional services firm — preserving brand identity while modernising the stack.",
    "Migration complète de HTML vers Framer pour un cabinet de services professionnels, en préservant l'identité de marque tout en modernisant la stack.",
    "Migración completa de HTML a Framer para una firma de servicios profesionales, conservando la identidad de marca y modernizando la tecnología.",
    "Komplette Migration von HTML zu Framer für ein Dienstleistungsunternehmen: Markenidentität bleibt erhalten, der Technologie-Stack wird modernisiert.",
    "Migração completa de HTML para Framer para uma empresa de serviços profissionais, preservando a identidade da marca e modernizando a tecnologia.",
    "为一家专业服务公司完成从 HTML 到 Framer 的完整迁移，在保留品牌形象的同时升级技术栈。",
    "プロフェッショナルサービス企業のHTMLからFramerへの全面移行。ブランドアイデンティティを守りながら技術基盤を刷新しました。",
  ],
  "proj.leadopo.desc": [
    "Lead generation and pipeline management platform. Custom Framer build with dynamic CMS and conversion-optimised flows.",
    "Plateforme de génération de leads et de gestion du pipeline. Site Framer sur mesure avec CMS dynamique et parcours optimisés pour la conversion.",
    "Plataforma de generación de leads y gestión del pipeline. Sitio Framer a medida con CMS dinámico y flujos optimizados para la conversión.",
    "Plattform für Lead-Generierung und Pipeline-Management. Individueller Framer-Build mit dynamischem CMS und conversion-optimierten Abläufen.",
    "Plataforma de geração de leads e gestão de pipeline. Site em Framer sob medida, com CMS dinâmico e fluxos otimizados para conversão.",
    "线索获取与销售管道管理平台。定制 Framer 网站，配有动态 CMS 和转化优化的流程。",
    "リード獲得とパイプライン管理のプラットフォーム。動的CMSとコンバージョンに最適化されたフローを備えたFramerのカスタム構築。",
  ],
  "proj.rusty.desc": [
    "Streetwear brand e-commerce experience. Bold visual identity translated into a high-converting Framer storefront.",
    "Expérience e-commerce d'une marque streetwear. Une identité visuelle audacieuse transformée en boutique Framer à fort taux de conversion.",
    "Experiencia de e-commerce para una marca de streetwear. Una identidad visual audaz convertida en una tienda Framer de alta conversión.",
    "E-Commerce-Erlebnis für eine Streetwear-Marke. Mutige visuelle Identität, umgesetzt als conversionstarker Framer-Shop.",
    "Experiência de e-commerce para uma marca de streetwear. Uma identidade visual ousada transformada em uma loja Framer de alta conversão.",
    "街头服饰品牌的电商体验。将大胆的视觉形象打造成高转化的 Framer 店铺。",
    "ストリートウェアブランドのECサイト。大胆なビジュアルアイデンティティを、成約率の高いFramerストアフロントに仕上げました。",
  ],
  "proj.primemedia.desc": [
    "Digital media agency site built in Framer — bold editorial layout, motion-forward sections, and a content-first structure for a Canadian creative studio.",
    "Site d'agence de médias numériques créé dans Framer : mise en page éditoriale audacieuse, sections animées et structure centrée sur le contenu pour un studio créatif canadien.",
    "Sitio de una agencia de medios digitales creado en Framer: diseño editorial audaz, secciones con movimiento y una estructura centrada en el contenido para un estudio creativo canadiense.",
    "Website einer Digitalmedien-Agentur in Framer: kräftiges redaktionelles Layout, bewegte Sektionen und eine inhaltsorientierte Struktur für ein kanadisches Kreativstudio.",
    "Site de agência de mídia digital feito no Framer: layout editorial marcante, seções com movimento e estrutura centrada no conteúdo para um estúdio criativo canadense.",
    "用 Framer 为加拿大创意工作室打造的数字媒体机构网站：大胆的杂志式版面、动感十足的板块和内容优先的结构。",
    "Framerで構築したデジタルメディアエージェンシーのサイト。力強いエディトリアルレイアウト、動きのあるセクション、コンテンツ重視の構成で、カナダのクリエイティブスタジオを表現。",
  ],
  "proj.jamal.desc": [
    "Personal brand and portfolio for a creative professional. Designed in Claude and brought to life in Framer with smooth transitions and a refined typographic system.",
    "Marque personnelle et portfolio d'un créatif. Conçu dans Claude et mis en vie dans Framer, avec des transitions fluides et un système typographique soigné.",
    "Marca personal y portafolio de un profesional creativo. Diseñado en Claude y llevado a la vida en Framer, con transiciones suaves y un sistema tipográfico refinado.",
    "Personal Brand und Portfolio eines Kreativen. In Claude entworfen und in Framer umgesetzt, mit sanften Übergängen und einem ausgefeilten Typografiesystem.",
    "Marca pessoal e portfólio de um profissional criativo. Projetado no Claude e colocado em prática no Framer, com transições suaves e um sistema tipográfico refinado.",
    "创意从业者的个人品牌与作品集。在 Claude 中设计，并用 Framer 实现，拥有流畅过渡和精致的字体系统。",
    "クリエイティブ職の個人ブランドとポートフォリオ。Claudeでデザインし、Framerで形にしました。なめらかなトランジションと洗練されたタイポグラフィシステムが特徴です。",
  ],
  "proj.talon.desc": [
    "Performance tyre brand site built in Next.js. A 3D car hero made with Three.js, a set builder that helps drivers pick the right tyres, and a bold motorsport look.",
    "Site d'une marque de pneus performance créé avec Next.js. Un héros 3D de voiture réalisé avec Three.js, un configurateur qui aide à choisir les bons pneus et un look motorsport affirmé.",
    "Sitio de una marca de neumáticos de alto rendimiento creado con Next.js. Un héroe 3D de coche hecho con Three.js, un configurador que ayuda a elegir los neumáticos adecuados y un look de automovilismo contundente.",
    "Website einer Performance-Reifenmarke mit Next.js. Ein 3D-Auto im Hero mit Three.js, ein Konfigurator, der bei der Reifenwahl hilft, und ein kräftiger Motorsport-Look.",
    "Site de uma marca de pneus de alta performance feito em Next.js. Um herói 3D de carro com Three.js, um configurador que ajuda a escolher os pneus certos e um visual marcante de automobilismo.",
    "使用 Next.js 构建的高性能轮胎品牌网站。包含 Three.js 制作的 3D 汽车首屏、帮助车主选对轮胎的配置器，以及醒目的赛车风格。",
    "Next.jsで構築したハイパフォーマンスタイヤブランドのサイト。Three.jsによる3Dカーのヒーロー、最適なタイヤ選びをサポートするセットビルダー、力強いモータースポーツの世界観が特徴です。",
  ],
  "proj.bookedez.desc": [
    "Event booking platform connecting organizers, vendors, and attendees. Full dark-mode mobile app with profile management, membership tiers, and seamless booking flow.",
    "Plateforme de réservation d'événements reliant organisateurs, prestataires et participants. Application mobile complète en mode sombre, avec gestion de profil, formules d'abonnement et parcours de réservation fluide.",
    "Plataforma de reservas de eventos que conecta organizadores, proveedores y asistentes. App móvil completa en modo oscuro, con gestión de perfil, niveles de membresía y un flujo de reserva fluido.",
    "Event-Buchungsplattform, die Veranstalter, Dienstleister und Gäste verbindet. Komplette Mobile-App im Dark Mode mit Profilverwaltung, Mitgliedschaftsstufen und reibungslosem Buchungsablauf.",
    "Plataforma de reservas de eventos que conecta organizadores, fornecedores e participantes. App mobile completo em modo escuro, com gestão de perfil, planos de assinatura e fluxo de reserva fluido.",
    "连接主办方、供应商和参与者的活动预订平台。完整的深色模式移动应用，包含个人资料管理、会员等级和流畅的预订流程。",
    "主催者、ベンダー、参加者をつなぐイベント予約プラットフォーム。プロフィール管理、メンバーシップ、スムーズな予約フローを備えた、ダークモードのモバイルアプリ一式です。",
  ],

  "proj.datum.desc": [
    "A bold site for a building contractor: current projects up front, the fixed price and weekly report explained, and a clear Start a project button.",
    "Un site affirmé pour une entreprise de construction : les chantiers en cours en avant, le prix fixe et le rapport hebdomadaire expliqués, et un bouton « Démarrer un projet » bien visible.",
    "Una web potente para un constructor: los proyectos actuales por delante, el precio fijo y el informe semanal explicados, y un botón «Empezar un proyecto» bien visible.",
    "Eine markante Website für ein Bauunternehmen: aktuelle Projekte vorn, Festpreis und Wochenbericht erklärt und ein deutlicher „Projekt starten“-Button.",
    "Um site marcante para uma construtora: projetos atuais em destaque, preço fixo e relatório semanal explicados e um botão «Iniciar um projeto» bem visível.",
    "为施工承包商打造的醒目网站：在建项目置前，讲清固定价格与每周报告，并有醒目的“开始项目”按钮。",
    "施工会社向けの力強いサイト。進行中のプロジェクトを前面に、固定価格と週次レポートを説明し、目立つ「プロジェクトを始める」ボタンを配置。",
  ],
  // ── industry tags (technology tags such as "Framer Build" stay in English)
  "projtag.HealthTech": ["HealthTech", "Santé numérique", "HealthTech", "HealthTech", "HealthTech", "健康科技", "ヘルステック"],
  "projtag.Creative Agency": ["Creative Agency", "Agence créative", "Agencia creativa", "Kreativagentur", "Agência criativa", "创意机构", "クリエイティブ会社"],
  "projtag.Talent Agency": ["Talent Agency", "Agence de talents", "Agencia de talento", "Talentagentur", "Agência de talentos", "人才经纪", "タレント事務所"],
  "projtag.Personal Brand": ["Personal Brand", "Marque personnelle", "Marca personal", "Personal Brand", "Marca pessoal", "个人品牌", "個人ブランド"],
  "projtag.Professional Services": ["Professional Services", "Services professionnels", "Servicios profesionales", "Dienstleistungen", "Serviços profissionais", "专业服务", "プロフェッショナルサービス"],
  "projtag.Lead Gen SaaS": ["Lead Gen SaaS", "SaaS génération de leads", "SaaS de generación de leads", "Lead-Gen-SaaS", "SaaS de geração de leads", "线索获取 SaaS", "リード獲得SaaS"],
  "projtag.E-commerce": ["E-commerce", "E-commerce", "E-commerce", "E-Commerce", "E-commerce", "电商", "EC"],
  "projtag.Media Agency": ["Media Agency", "Agence média", "Agencia de medios", "Medienagentur", "Agência de mídia", "媒体机构", "メディア会社"],
  "projtag.Automotive": ["Automotive", "Automobile", "Automoción", "Automobil", "Automotivo", "汽车", "自動車"],
  "projtag.Events Marketplace": ["Events Marketplace", "Marketplace d'événements", "Marketplace de eventos", "Event-Marktplatz", "Marketplace de eventos", "活动市场", "イベントマーケットプレイス"],
  "projtag.Template Customization": ["Template Customization", "Personnalisation de template", "Personalización de plantilla", "Template-Anpassung", "Personalização de template", "模板定制", "テンプレートカスタマイズ"],
  "projtag.Construction": ["Construction", "Construction", "Construcción", "Bau", "Construção", "建筑", "建設"],
  "projtag.Telecom": ["Telecom", "Télécoms", "Telecomunicaciones", "Telekommunikation", "Telecomunicações", "电信", "通信"],
  "projtag.Concept": ["Concept", "Concept", "Concepto", "Konzept", "Conceito", "概念作品", "コンセプト"],

  // ── badges
  "projbadge.Live on Stores": ["Live on Stores", "Disponible sur les stores", "Disponible en las tiendas", "In den Stores verfügbar", "Disponível nas lojas", "已上架应用商店", "ストアで公開中"],
};

export const PROJECT_COPY: Record<string, Entry> = {};
for (const [key, row] of Object.entries(rows)) {
  const entry = {} as Entry;
  ORDER.forEach((code, i) => { entry[code] = row[i]; });
  PROJECT_COPY[key] = entry;
}

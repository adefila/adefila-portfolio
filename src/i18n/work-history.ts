import type { LangCode } from "./translations";

// The About section's work history: dates, roles, places, bullet points and the toggle labels.
// Rows are [en, fr, es, de, pt, zh, ja]; Dutch and Norwegian show English.
// Company names stay as they are (they are names), except "Self-employed".
type Row = [string, string, string, string, string, string, string];
const ORDER: LangCode[] = ["en", "fr", "es", "de", "pt", "zh", "ja"];
type Entry = Partial<Record<LangCode, string>> & { en: string };

const rows: Record<string, Row> = {
  // ── labels
  "wh.now": ["Now", "Actuel", "Ahora", "Aktuell", "Atual", "现在", "現在"],
  "wh.less": ["Show less", "Voir moins", "Ver menos", "Weniger anzeigen", "Ver menos", "收起", "閉じる"],
  "wh.more": ["Show full history ({n} more)", "Voir tout le parcours ({n} de plus)", "Ver todo el historial ({n} más)", "Gesamten Werdegang anzeigen ({n} weitere)", "Ver todo o histórico (mais {n})", "查看完整经历（还有 {n} 条）", "経歴をすべて見る（あと{n}件）"],

  // ── About text: recent teams and side projects, as words inside the paragraphs ({0} {1} {2} are the hoverable names)
  "about.p3": [
    "Along the way I've worked with teams at {0}, {1} and {2}.",
    "Au fil du temps, j'ai travaillé avec les équipes de {0}, {1} et {2}.",
    "Por el camino he trabajado con los equipos de {0}, {1} y {2}.",
    "Unterwegs habe ich mit den Teams von {0}, {1} und {2} gearbeitet.",
    "Pelo caminho, trabalhei com as equipes de {0}, {1} e {2}.",
    "一路走来，我曾与 {0}、{1} 和 {2} 的团队合作。",
    "これまでに、{0}、{1}、{2}のチームと仕事をしてきました。",
  ],
  "about.p4": [
    "When the tool I need doesn't exist, I build it: {0}, {1} and {2}.",
    "Quand l'outil dont j'ai besoin n'existe pas, je le crée : {0}, {1} et {2}.",
    "Cuando la herramienta que necesito no existe, la construyo: {0}, {1} y {2}.",
    "Wenn es das Werkzeug, das ich brauche, nicht gibt, baue ich es selbst: {0}, {1} und {2}.",
    "Quando a ferramenta de que preciso não existe, eu a construo: {0}, {1} e {2}.",
    "当我需要的工具不存在时，我就自己做：{0}、{1} 和 {2}。",
    "必要なツールがなければ、自分で作ります：{0}、{1}、{2}。",
  ],
  "about.viewProject": ["View project", "Voir le projet", "Ver proyecto", "Projekt ansehen", "Ver projeto", "查看项目", "プロジェクトを見る"],

  // ── Work text: group labels and the tooltip link
  "projects.groupCode": ["Built in code", "Développé en code", "Desarrollado en código", "In Code gebaut", "Feito em código", "代码开发", "コードで構築"],
  "projects.groupFramer": ["Built in Framer", "Créé avec Framer", "Creado en Framer", "In Framer gebaut", "Feito no Framer", "Framer 搭建", "Framerで構築"],
  "projects.groupDesign": ["Designed", "Conçu", "Diseñado", "Entworfen", "Desenhado", "设计", "デザイン"],
  "projects.visit": ["Visit live site", "Voir le site", "Ver el sitio", "Live-Seite ansehen", "Ver o site", "访问网站", "サイトを見る"],

  // ── 1. Freelance
  "wh0.period": ["2020 – Present", "2020 – Aujourd'hui", "2020 – Actualidad", "2020 – Heute", "2020 – Atualmente", "2020 年 – 至今", "2020年 – 現在"],
  "wh0.role": ["Freelance Web Developer & Framer Designer", "Développeur web freelance & designer Framer", "Desarrollador web freelance y diseñador Framer", "Freelance Webentwickler & Framer-Designer", "Desenvolvedor web freelancer e designer Framer", "自由职业网页开发者 & Framer 设计师", "フリーランスのWebデベロッパー兼Framerデザイナー"],
  "wh0.company": ["Self-employed", "Indépendant", "Autónomo", "Selbstständig", "Autônomo", "个体经营", "個人事業主"],
  "wh0.location": ["Remote", "À distance", "Remoto", "Remote", "Remoto", "远程", "リモート"],
  "wh0.p0": ["50+ websites for founders, agencies and small businesses.", "Plus de 50 sites pour des fondateurs, des agences et de petites entreprises.", "Más de 50 sitios web para fundadores, agencias y pequeñas empresas.", "Über 50 Websites für Gründer, Agenturen und kleine Unternehmen.", "Mais de 50 sites para fundadores, agências e pequenos negócios.", "为创始人、机构和小企业打造了 50 多个网站。", "起業家、エージェンシー、小規模事業者向けに50以上のサイトを制作。"],
  "wh0.p1": ["Top Rated on Upwork with 100% Job Success.", "Top Rated sur Upwork avec 100 % de succès.", "Top Rated en Upwork con un 100 % de éxito.", "Top Rated auf Upwork mit 100 % Job Success.", "Top Rated no Upwork com 100% de sucesso.", "Upwork Top Rated，工作成功率 100%。", "UpworkでTop Rated、ジョブ成功率100%。"],

  // ── 2. Klimt and Design
  "wh1.period": ["Sep 2025 – Oct 2026", "Sept. 2025 – Oct. 2026", "Sep 2025 – Oct 2026", "Sep. 2025 – Okt. 2026", "Set. 2025 – Out. 2026", "2025年9月 – 2026年10月", "2025年9月 – 2026年10月"],
  "wh1.role": ["Framer Developer (Contract)", "Développeur Framer (contrat)", "Desarrollador Framer (contrato)", "Framer-Entwickler (Vertrag)", "Desenvolvedor Framer (contrato)", "Framer 开发者（合同）", "Framerデベロッパー（契約）"],
  "wh1.location": ["Los Angeles, CA. Remote", "Los Angeles, CA. À distance", "Los Ángeles, CA. Remoto", "Los Angeles, CA. Remote", "Los Angeles, CA. Remoto", "洛杉矶，加州。远程", "ロサンゼルス（CA）・リモート"],
  "wh1.p0": ["Turned design concepts into pixel-perfect, user-friendly websites in Framer.", "Transformé des concepts de design en sites fidèles au pixel près et conviviaux dans Framer.", "Convertí conceptos de diseño en sitios web fieles al píxel y fáciles de usar en Framer.", "Designkonzepte in Framer zu pixelgenauen, benutzerfreundlichen Websites umgesetzt.", "Transformei conceitos de design em sites fiéis ao pixel e fáceis de usar no Framer.", "在 Framer 中将设计概念做成像素级还原、易用的网站。", "デザインコンセプトを、Framerでピクセルパーフェクトで使いやすいサイトに仕上げました。"],
  "wh1.p1": ["Worked with designers to make sure functionality and usability matched what clients expected.", "Collaboré avec les designers pour que fonctionnalités et facilité d'usage répondent aux attentes des clients.", "Trabajé con diseñadores para que la funcionalidad y la usabilidad coincidieran con lo que esperaban los clientes.", "Mit Designern zusammengearbeitet, damit Funktionalität und Bedienbarkeit den Erwartungen der Kunden entsprachen.", "Trabalhei com designers para que funcionalidade e usabilidade correspondessem ao que os clientes esperavam.", "与设计师协作，确保功能和易用性符合客户预期。", "デザイナーと連携し、機能性と使いやすさがクライアントの期待に沿うようにしました。"],

  // ── 3. Trust-Tai Agency
  "wh2.period": ["Oct 2024 – Sep 2025", "Oct. 2024 – Sept. 2025", "Oct 2024 – Sep 2025", "Okt. 2024 – Sep. 2025", "Out. 2024 – Set. 2025", "2024年10月 – 2025年9月", "2024年10月 – 2025年9月"],
  "wh2.role": ["UI/UX Designer & Project Manager (Full-time)", "Designer UI/UX & chef de projet (temps plein)", "Diseñador UI/UX y jefe de proyecto (tiempo completo)", "UI/UX-Designer & Projektmanager (Vollzeit)", "Designer UI/UX e gerente de projetos (tempo integral)", "UI/UX 设计师兼项目经理（全职）", "UI/UXデザイナー兼プロジェクトマネージャー（正社員）"],
  "wh2.location": ["Murfreesboro, TN. Remote", "Murfreesboro, TN. À distance", "Murfreesboro, TN. Remoto", "Murfreesboro, TN. Remote", "Murfreesboro, TN. Remoto", "田纳西州默夫里斯伯勒。远程", "マーフリーズボロ（TN）・リモート"],
  "wh2.p0": ["Led multidisciplinary teams on client projects spanning UI/UX design, branding and development.", "Dirigé des équipes pluridisciplinaires sur des projets clients mêlant design UI/UX, branding et développement.", "Lideré equipos multidisciplinarios en proyectos de clientes que abarcaban diseño UI/UX, branding y desarrollo.", "Multidisziplinäre Teams bei Kundenprojekten aus UI/UX-Design, Branding und Entwicklung geleitet.", "Liderei equipes multidisciplinares em projetos de clientes de design UI/UX, branding e desenvolvimento.", "带领跨职能团队完成涵盖 UI/UX 设计、品牌和开发的客户项目。", "UI/UXデザイン、ブランディング、開発にまたがるクライアント案件で、多職種チームを率いました。"],
  "wh2.p1": ["Managed client communication and project timelines, delivering on time.", "Géré la communication client et les calendriers de projet, avec des livraisons dans les délais.", "Gestioné la comunicación con clientes y los plazos de proyecto, entregando a tiempo.", "Kundenkommunikation und Projektzeitpläne betreut und termingerecht geliefert.", "Gerenciei a comunicação com clientes e os prazos dos projetos, entregando no prazo.", "负责客户沟通和项目进度，按时交付。", "クライアントとのやり取りとプロジェクトの納期を管理し、期日どおりに納品しました。"],
  "wh2.p2": ["Introduced agile practices that made the team 25% more efficient.", "Mis en place des pratiques agiles qui ont rendu l'équipe 25 % plus efficace.", "Introduje prácticas ágiles que hicieron al equipo un 25 % más eficiente.", "Agile Arbeitsweisen eingeführt, die das Team um 25 % effizienter machten.", "Introduzi práticas ágeis que tornaram a equipe 25% mais eficiente.", "引入敏捷实践，使团队效率提升 25%。", "アジャイルの手法を導入し、チームの効率を25%向上させました。"],

  // ── 4. Hitpay
  "wh3.period": ["Oct 2024 – Jul 2025", "Oct. 2024 – Juil. 2025", "Oct 2024 – Jul 2025", "Okt. 2024 – Juli 2025", "Out. 2024 – Jul. 2025", "2024年10月 – 2025年7月", "2024年10月 – 2025年7月"],
  "wh3.role": ["Framer Developer (Contract)", "Développeur Framer (contrat)", "Desarrollador Framer (contrato)", "Framer-Entwickler (Vertrag)", "Desenvolvedor Framer (contrato)", "Framer 开发者（合同）", "Framerデベロッパー（契約）"],
  "wh3.location": ["Singapore. Remote", "Singapour. À distance", "Singapur. Remoto", "Singapur. Remote", "Singapura. Remoto", "新加坡。远程", "シンガポール・リモート"],
  "wh3.p0": ["Built high-fidelity prototypes in Framer to speed up user testing and developer handoff.", "Créé des prototypes haute fidélité dans Framer pour accélérer les tests utilisateurs et la passation aux développeurs.", "Creé prototipos de alta fidelidad en Framer para acelerar las pruebas con usuarios y el traspaso a desarrollo.", "Hochwertige Prototypen in Framer gebaut, um Nutzertests und die Übergabe an Entwickler zu beschleunigen.", "Criei protótipos de alta fidelidade no Framer para acelerar testes com usuários e a entrega aos desenvolvedores.", "在 Framer 中制作高保真原型，加快用户测试和开发交接。", "Framerで高精度のプロトタイプを作成し、ユーザーテストと開発への引き継ぎを加速しました。"],
  "wh3.p1": ["Worked with design and product teams to improve the experience across core payment tools.", "Collaboré avec les équipes design et produit pour améliorer l'expérience des principaux outils de paiement.", "Trabajé con los equipos de diseño y producto para mejorar la experiencia en las herramientas de pago principales.", "Mit Design- und Produktteams die Nutzung der zentralen Zahlungstools verbessert.", "Trabalhei com as equipes de design e produto para melhorar a experiência nas principais ferramentas de pagamento.", "与设计和产品团队合作，改善核心支付工具的体验。", "デザイン・プロダクトチームと協力し、主要な決済ツールの体験を改善しました。"],
  "wh3.p2": ["Streamlined design workflows, cutting time-to-ship by 30%.", "Simplifié les flux de travail design, réduisant de 30 % le délai de livraison.", "Simplifiqué los flujos de diseño y reduje un 30 % el tiempo de entrega.", "Design-Workflows gestrafft und die Zeit bis zur Auslieferung um 30 % verkürzt.", "Simplifiquei os fluxos de design e reduzi em 30% o tempo até a entrega.", "优化设计流程，将交付时间缩短 30%。", "デザインのワークフローを効率化し、リリースまでの時間を30%短縮しました。"],

  // ── 5. BookedEZ
  "wh4.period": ["Sep 2023 – Sep 2025", "Sept. 2023 – Sept. 2025", "Sep 2023 – Sep 2025", "Sep. 2023 – Sep. 2025", "Set. 2023 – Set. 2025", "2023年9月 – 2025年9月", "2023年9月 – 2025年9月"],
  "wh4.role": ["Lead Product Designer (Full-time)", "Lead Product Designer (temps plein)", "Diseñador de producto principal (tiempo completo)", "Lead Product Designer (Vollzeit)", "Designer de produto líder (tempo integral)", "首席产品设计师（全职）", "リードプロダクトデザイナー（正社員）"],
  "wh4.location": ["Atlanta, GA. Remote", "Atlanta, GA. À distance", "Atlanta, GA. Remoto", "Atlanta, GA. Remote", "Atlanta, GA. Remoto", "佐治亚州亚特兰大。远程", "アトランタ（GA）・リモート"],
  "wh4.p0": ["Directed the redesign of the core booking flows, increasing conversion by 20%.", "Dirigé la refonte des parcours de réservation principaux, avec 20 % de conversion en plus.", "Dirigí el rediseño de los flujos de reserva principales y aumenté la conversión un 20 %.", "Das Redesign der zentralen Buchungsabläufe geleitet und die Conversion um 20 % gesteigert.", "Liderei o redesign dos principais fluxos de reserva, aumentando a conversão em 20%.", "主导核心预订流程的重新设计，转化率提升 20%。", "主要な予約フローのリデザインを主導し、コンバージョンを20%向上させました。"],
  "wh4.p1": ["Ran user research, wireframing and usability testing for continuous product improvement.", "Mené la recherche utilisateur, le wireframing et les tests d'utilisabilité pour améliorer le produit en continu.", "Realicé investigación con usuarios, wireframes y pruebas de usabilidad para mejorar el producto de forma continua.", "Nutzerforschung, Wireframing und Usability-Tests für die laufende Produktverbesserung durchgeführt.", "Conduzi pesquisa com usuários, wireframes e testes de usabilidade para a melhoria contínua do produto.", "开展用户研究、线框设计和可用性测试，持续改进产品。", "ユーザーリサーチ、ワイヤーフレーム、ユーザビリティテストを行い、継続的にプロダクトを改善しました。"],
  "wh4.p2": ["Mentored junior designers and led design reviews across teams.", "Accompagné de jeunes designers et dirigé des revues de design entre équipes.", "Fui mentor de diseñadores junior y dirigí revisiones de diseño entre equipos.", "Nachwuchsdesigner betreut und teamübergreifende Design-Reviews geleitet.", "Orientei designers juniores e conduzi revisões de design entre equipes.", "指导初级设计师，并主持跨团队的设计评审。", "ジュニアデザイナーを指導し、チーム横断のデザインレビューを主導しました。"],

  // ── 6. Davis Enterprises
  "wh5.period": ["Jan 2021 – Jul 2021", "Janv. 2021 – Juil. 2021", "Ene 2021 – Jul 2021", "Jan. 2021 – Juli 2021", "Jan. 2021 – Jul. 2021", "2021年1月 – 2021年7月", "2021年1月 – 2021年7月"],
  "wh5.role": ["Intern WordPress Developer", "Développeur WordPress stagiaire", "Desarrollador WordPress en prácticas", "Praktikant WordPress-Entwicklung", "Estagiário de desenvolvimento WordPress", "WordPress 开发实习生", "WordPress開発インターン"],
  "wh5.location": ["United States. Remote", "États-Unis. À distance", "Estados Unidos. Remoto", "USA. Remote", "Estados Unidos. Remoto", "美国。远程", "アメリカ・リモート"],
  "wh5.p0": ["Helped build and update client websites with WordPress and Elementor.", "Participé à la création et à la mise à jour de sites clients avec WordPress et Elementor.", "Ayudé a crear y actualizar sitios de clientes con WordPress y Elementor.", "Beim Aufbau und der Pflege von Kundenwebsites mit WordPress und Elementor mitgewirkt.", "Ajudei a criar e atualizar sites de clientes com WordPress e Elementor.", "协助使用 WordPress 和 Elementor 搭建和更新客户网站。", "WordPressとElementorでクライアントサイトの制作と更新を手伝いました。"],
  "wh5.p1": ["Worked with cross-functional teams on real-world design challenges.", "Collaboré avec des équipes transverses sur de vrais défis de design.", "Trabajé con equipos multifuncionales en retos de diseño reales.", "Mit funktionsübergreifenden Teams an realen Designaufgaben gearbeitet.", "Trabalhei com equipes multifuncionais em desafios de design reais.", "与跨职能团队合作解决真实的设计难题。", "部門横断のチームと、実際のデザイン課題に取り組みました。"],
};

export const WORK_COPY: Record<string, Entry> = {};
for (const [key, row] of Object.entries(rows)) {
  const entry = {} as Entry;
  ORDER.forEach((code, i) => { entry[code] = row[i]; });
  WORK_COPY[key] = entry;
}

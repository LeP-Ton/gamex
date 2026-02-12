"use client";

import { useEffect, useState } from "react";

type Locale = "zh" | "en";
type LocalizedText = Record<Locale, string>;
type IconName = "spark" | "controller" | "team" | "shield";

type Metric = {
  label: LocalizedText;
  value: string;
  delta: LocalizedText;
};

type Pillar = {
  title: LocalizedText;
  description: LocalizedText;
  icon: IconName;
};

type GameCard = {
  title: LocalizedText;
  genre: LocalizedText;
  stage: LocalizedText;
  description: LocalizedText;
  tag: LocalizedText;
};

const LANGUAGE_STORAGE_KEY = "gamex.locale";

const copy = {
  brand: "GameX",
  nav: {
    games: { zh: "作品", en: "Games" },
    capabilities: { zh: "能力", en: "Capabilities" },
    careers: { zh: "招聘", en: "Careers" },
    cta: { zh: "开启合作", en: "Start a Project" },
    languageSwitch: { zh: "语言切换", en: "Language switch" },
  },
  hero: {
    badge: { zh: "独立游戏工作室门户", en: "Independent game studio portal" },
    title: {
      zh: "打造让玩家每天回归的游戏世界。",
      en: "Build worlds players return to every day.",
    },
    description: {
      zh: "GameX 专注原创 IP、全球化发行和长线运营，用创意与技术打造可持续成长的游戏体验。",
      en: "GameX creates original game IP, scales live operations, and launches community-driven experiences across global platforms.",
    },
    primaryCta: { zh: "浏览作品集", en: "Explore Game Portfolio" },
    secondaryCta: { zh: "加入团队", en: "Join Our Team" },
  },
  sections: {
    gamesTitle: { zh: "精选宇宙", en: "Featured universes" },
    gamesDescription: {
      zh: "当前与即将上线的作品，兼顾叙事张力、竞技深度与可扩展的 Live Service 架构。",
      en: "Current and upcoming titles built to combine strong narrative, competitive depth, and scalable live-service systems.",
    },
    requestDeck: { zh: "获取完整能力手册", en: "Request full capability deck" },
    stageLabel: { zh: "阶段", en: "Stage" },
    capabilitiesTitle: { zh: "工作室能力", en: "Studio capabilities" },
    careersTitle: {
      zh: "与我们一起打造下一个标志性 IP",
      en: "Build the next iconic franchise with us",
    },
    careersDescription: {
      zh: "我们正在招募玩法工程师、技术美术与 LiveOps 设计师，欢迎热爱高自主团队协作的你加入。",
      en: "We are hiring gameplay engineers, technical artists, and live operations designers who thrive in high-ownership product teams.",
    },
    viewRoles: { zh: "查看职位", en: "View Open Roles" },
    partner: { zh: "商务合作", en: "Partner With Studio" },
  },
  footer: {
    offices: {
      zh: "hello@gamex.studio · 旧金山 · 东京 · 柏林",
      en: "hello@gamex.studio · San Francisco · Tokyo · Berlin",
    },
  },
};

const metrics: Metric[] = [
  {
    label: { zh: "全球玩家", en: "Global Players" },
    value: "2.4M+",
    delta: { zh: "季度增长 +18%", en: "+18% QoQ" },
  },
  {
    label: { zh: "已发行作品", en: "Games Shipped" },
    value: "12",
    delta: { zh: "PC / 主机 / 移动", en: "PC / Console / Mobile" },
  },
  {
    label: { zh: "在线区域", en: "Live Regions" },
    value: "38",
    delta: { zh: "7x24 持续运营", en: "24/7 operations" },
  },
];

const pillars: Pillar[] = [
  {
    title: { zh: "全流程研发", en: "End-to-End Game Development" },
    description: {
      zh: "从创意孵化到上线后运营，我们打造可长期迭代的游戏世界。",
      en: "From early concept to post-launch operations, we build game worlds that stay fresh season after season.",
    },
    icon: "controller",
  },
  {
    title: { zh: "创意美术方向", en: "Creative Art Direction" },
    description: {
      zh: "统一视觉语言、角色体系和预告片叙事，让你的 IP 更具辨识度。",
      en: "Distinct visual language, cinematic trailers, and memorable character systems shaped around your IP.",
    },
    icon: "spark",
  },
  {
    title: { zh: "社区与发行", en: "Community & Publishing" },
    description: {
      zh: "覆盖发布节奏、创作者合作与跨区域增长策略，提升长期用户价值。",
      en: "Release planning, creator campaigns, and cross-region go-to-market support for long-term growth.",
    },
    icon: "team",
  },
  {
    title: { zh: "安全的在线基础设施", en: "Secure Live Infrastructure" },
    description: {
      zh: "提供高可用运维、内容治理与数据工具，支撑稳定的 Live Service。",
      en: "Battle-tested backend workflows with uptime, moderation, and data tooling designed for live service teams.",
    },
    icon: "shield",
  },
];

const games: GameCard[] = [
  {
    title: { zh: "蚀光计划", en: "Project Eclipse" },
    genre: { zh: "动作 RPG", en: "Action RPG" },
    stage: { zh: "持续运营", en: "Live Ops" },
    description: {
      zh: "一款科幻合作冒险游戏，拥有动态团队副本、阵营战争与每周世界状态变化。",
      en: "A cooperative sci-fi adventure with evolving raids, faction wars, and weekly world-state shifts.",
    },
    tag: { zh: "第 09 赛季", en: "Season 09" },
  },
  {
    title: { zh: "霓虹漂移赛道", en: "Neon Drift Circuit" },
    genre: { zh: "街机竞速", en: "Arcade Racing" },
    stage: { zh: "预制作", en: "Pre-Production" },
    description: {
      zh: "高速竞速结合跑酷机动与可破坏赛道，并支持玩家共创赛事系统。",
      en: "A speed-focused racer blending parkour movement, destructible tracks, and creator-built tournaments.",
    },
    tag: { zh: "原型验证", en: "Prototype" },
  },
  {
    title: { zh: "零号堡垒", en: "Citadel Zero" },
    genre: { zh: "战术射击", en: "Tactical Shooter" },
    stage: { zh: "小范围上线", en: "Soft Launch" },
    description: {
      zh: "以小队协作为核心，融合动态天气与地图控制，面向赛事级竞技体验。",
      en: "Squad-based combat with dynamic weather systems and tactical map control built for esports-ready play.",
    },
    tag: { zh: "测试版", en: "Beta" },
  },
];

function Icon({ name }: { name: IconName }) {
  const baseClass = "h-5 w-5 text-cyan-200";

  if (name === "controller") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={baseClass}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 10.5h9a4.5 4.5 0 0 1 4.418 5.357l-.6 3A3.75 3.75 0 0 1 16.643 22h-9.286a3.75 3.75 0 0 1-3.675-3.143l-.6-3A4.5 4.5 0 0 1 7.5 10.5ZM9 8.25h6m-4.5 5.25v3m-1.5-1.5h3m5.25-1.5h.008v.008h-.008V13.5Zm0 3h.008v.008h-.008V16.5Z"
        />
      </svg>
    );
  }

  if (name === "team") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={baseClass}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.13a9.466 9.466 0 0 0-6 0m9-7.63a3 3 0 1 0-2.999-3A3 3 0 0 0 18 11.5ZM6 11.5a3 3 0 1 0-2.999-3A3 3 0 0 0 6 11.5Zm12 8.25v-.5a4.25 4.25 0 0 0-4.25-4.25h-3.5A4.25 4.25 0 0 0 6 19.25v.5"
        />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={baseClass}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3.75 5.25 6.75v5.93a9 9 0 0 0 4.493 7.794L12 21.75l2.257-1.276a9 9 0 0 0 4.493-7.794V6.75L12 3.75Zm0 5.25v6"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={baseClass}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904 9 18l-.813-2.096a4.5 4.5 0 0 0-2.833-2.833L3.258 12l2.096-.813a4.5 4.5 0 0 0 2.833-2.833L9 6.258l.813 2.096a4.5 4.5 0 0 0 2.833 2.833L14.742 12l-2.096.813a4.5 4.5 0 0 0-2.833 2.833ZM18.25 8.5 18 9.25l-.25-.75A2.25 2.25 0 0 0 16.5 7.25L15.75 7l.75-.25A2.25 2.25 0 0 0 17.75 5.5L18 4.75l.25.75A2.25 2.25 0 0 0 19.5 6.75l.75.25-.75.25A2.25 2.25 0 0 0 18.25 8.5Z"
      />
    </svg>
  );
}

function LanguageToggle({
  locale,
  label,
  onChange,
}: {
  locale: Locale;
  label: string;
  onChange: (next: Locale) => void;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center rounded-full border border-white/20 bg-slate-950/70 p-1"
    >
      {(["zh", "en"] as const).map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => onChange(code)}
            aria-pressed={active}
            className={`h-10 min-w-[44px] cursor-pointer rounded-full px-3 text-xs font-semibold uppercase tracking-[0.08em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
              active
                ? "bg-cyan-300 text-slate-950"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") {
      return "zh";
    }

    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return saved === "zh" || saved === "en" ? saved : "zh";
  });

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  const t = (value: LocalizedText) => value[locale];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070b14] text-slate-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.24),transparent_35%),radial-gradient(circle_at_50%_90%,rgba(34,197,94,0.14),transparent_35%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black_25%,transparent)]"
      />

      <header className="relative z-20 mx-auto w-full max-w-6xl px-6 pt-6 lg:px-8">
        <nav className="flex items-center justify-between rounded-2xl border border-white/15 bg-slate-900/70 px-5 py-3 backdrop-blur-xl">
          <a
            href="#top"
            className="cursor-pointer text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            {copy.brand}
          </a>
          <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a
              href="#games"
              className="cursor-pointer transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {t(copy.nav.games)}
            </a>
            <a
              href="#capabilities"
              className="cursor-pointer transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {t(copy.nav.capabilities)}
            </a>
            <a
              href="#careers"
              className="cursor-pointer transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {t(copy.nav.careers)}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <LanguageToggle
              locale={locale}
              label={t(copy.nav.languageSwitch)}
              onChange={setLocale}
            />
            <a
              href="#contact"
              className="cursor-pointer rounded-full border border-cyan-300/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-200 transition-all duration-200 hover:border-cyan-200 hover:bg-cyan-300/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {t(copy.nav.cta)}
            </a>
          </div>
        </nav>
      </header>

      <main
        id="top"
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-10 lg:px-8"
      >
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
          <div className="space-y-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/40 bg-violet-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-violet-100">
              <Icon name="spark" />
              {t(copy.hero.badge)}
            </span>
            <div className="space-y-5">
              <h1 className="max-w-2xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                {t(copy.hero.title)}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                {t(copy.hero.description)}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#games"
                className="cursor-pointer rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition-all duration-200 hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                {t(copy.hero.primaryCta)}
              </a>
              <a
                href="#careers"
                className="cursor-pointer rounded-full border border-slate-400/60 px-6 py-3 text-sm font-semibold text-slate-100 transition-all duration-200 hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                {t(copy.hero.secondaryCta)}
              </a>
            </div>
          </div>

          <aside className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {metrics.map((metric) => (
              <article
                key={metric.label.en}
                className="rounded-2xl border border-white/15 bg-slate-900/80 p-5 shadow-[0_24px_80px_-40px_rgba(34,211,238,0.85)] backdrop-blur"
              >
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  {t(metric.label)}
                </p>
                <p className="mt-3 text-3xl font-bold text-white">{metric.value}</p>
                <p className="mt-2 text-sm text-cyan-200">{t(metric.delta)}</p>
              </article>
            ))}
          </aside>
        </section>

        <section id="games" className="mt-16 space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                {t(copy.sections.gamesTitle)}
              </h2>
              <p className="mt-2 max-w-2xl text-base leading-7 text-slate-300">
                {t(copy.sections.gamesDescription)}
              </p>
            </div>
            <a
              href="#contact"
              className="cursor-pointer text-sm font-semibold text-cyan-200 transition-colors duration-200 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {t(copy.sections.requestDeck)}
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {games.map((game) => (
              <article
                key={game.title.en}
                className="group rounded-2xl border border-white/15 bg-gradient-to-b from-slate-900/95 to-slate-900/70 p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-cyan-200">
                      {t(game.genre)}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                      {t(game.title)}
                    </h3>
                  </div>
                  <span className="rounded-full border border-violet-300/45 bg-violet-300/10 px-3 py-1 text-xs font-semibold text-violet-100">
                    {t(game.tag)}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {t(game.description)}
                </p>
                <div className="mt-6 border-t border-white/10 pt-4 text-sm text-slate-200">
                  {t(copy.sections.stageLabel)}: <span className="font-semibold text-white">{t(game.stage)}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="capabilities" className="mt-16 space-y-6">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {t(copy.sections.capabilitiesTitle)}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {pillars.map((pillar) => (
              <article
                key={pillar.title.en}
                className="rounded-2xl border border-white/15 bg-slate-900/70 p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-xl border border-cyan-200/25 bg-cyan-400/10 p-2">
                    <Icon name={pillar.icon} />
                  </span>
                  <h3 className="text-lg font-semibold text-white">{t(pillar.title)}</h3>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(pillar.description)}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="careers"
          className="mt-16 rounded-3xl border border-cyan-300/30 bg-gradient-to-r from-cyan-300/15 via-violet-300/10 to-emerald-300/15 p-8"
        >
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {t(copy.sections.careersTitle)}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-8 text-slate-200">
            {t(copy.sections.careersDescription)}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="cursor-pointer rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors duration-200 hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {t(copy.sections.viewRoles)}
            </a>
            <a
              href="#contact"
              className="cursor-pointer rounded-full border border-white/60 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {t(copy.sections.partner)}
            </a>
          </div>
        </section>
      </main>

      <footer
        id="contact"
        className="relative z-10 border-t border-white/10 px-6 py-8 text-sm text-slate-400 lg:px-8"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {copy.brand} © {new Date().getFullYear()}.
          </p>
          <p>{t(copy.footer.offices)}</p>
        </div>
      </footer>
    </div>
  );
}

module.exports = {
  title: "VIA",
  tagline: "Your keyboard's best friend",
  url: "https://caniusevia.com",
  baseUrl: "/",
  organizationName: "the-via",
  projectName: "keyboards",
    i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
    localeConfigs: {
      'zh-Hans': {
        label: '简体中文',
        direction: 'ltr',
        htmlLang: 'zh-Hans',
      },
      'en': {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en',
      }
    }
  },
  themeConfig: {
    twitterImage: "img/icon.png",
    ogImage: "img/icon.png",
    navbar: {
      title: "VIA",
      logo: {
        alt: "VIA",
        src: "img/icon.png",
      },
      items: [
        {
          href: "https://www.usevia.app",
          label: "Try Now!",
          position: "left",
        },
        { to: "docs/whats_new", label: "What's New", position: "left" },
        {
          to: "docs/supported_keyboards",
          label: "Supported Keyboards",
          position: "left",
        },
        { to: "docs/specification", label: "Docs", position: "left" },
        { to: "docs/download_firmware", label: "Firmware", position: "left" },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: "https://discord.gg/NStTR5YaPB",
          label: "Discord",
          position: "right",
        },
        {
          href: "https://github.com/the-via",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [],
      copyright: "Built with ❤️ from the VIA team.",
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};


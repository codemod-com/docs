// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Intuita Docs',
  tagline: 'Upgrade dependencies faster with high-quality codemods.',
  url: 'https://docs.intutia.io',
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'intuita-inc', // Usually your GitHub org/user name.
  projectName: 'intuita-docs', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/intuita-inc/intuita-docs/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom-dev.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {name: 'og:image', content: '/img/docs/intuita-docs-opengraph.jpg'},
        {name: 'twitter:card', content: 'summary_large_image'},
        {name: 'twitter:image', content: '/img/docs/intuita-docs-opengraph.jpg'},
      ],
      navbar: {
        title: 'Intuita',
        logo: {
          alt: 'Intuita Logo',
          src: 'img/intuita-logo.png',
          href: 'https://intuita.io',
          target: '_self',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Docs',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/intuita-inc',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/intuita-inc/',
              },
              {
                label: 'Join Slack',
                href: 'https://join.slack.com/t/intuita-inc/shared_invite/zt-1bjj5exxi-95yPfWi71HcO2p_sS5L2wA',
              },
              {
                label: 'Feature Requests',
                href: 'https://feedback.intuita.io/feature-requests',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
            ],
          },
          {
            title: 'Company',
            items: [
              {
                label: 'Privacy Policy',
                to: 'docs/about-intuita/legal/privacy-policy',
              },
              {
                label: 'Terms & Conditions',
                to: 'docs/about-intuita/legal/terms-and-conditions',
              },
              {
                label: 'Telemetry Compliance',
                to: 'docs/about-intuita/legal/telemetry-compliance',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Intuita`,
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        //theme: require('prism-react-renderer/themes/dracula'),
        magicComments: [
          {
            className: 'theme-code-block-highlighted-line',
            line: 'highlight-next-line',
            block: {start: 'highlight-start', end: 'highlight-end'},
          },
          {
            className: 'code-block-yellow-line',
            line: 'yellow line',
            block: {start: 'highlight-start', end: 'highlight-end'},
          },
          {
            className: 'code-block-red-line',
            line: 'red line',
            block: {start: 'red start', end: 'red end'},
          },
          {
            className: 'code-block-green-line',
            line: 'green line',
            block: {start: 'green start', end: 'green end'},
          },
        ],
      },
    }),
};

module.exports = config;

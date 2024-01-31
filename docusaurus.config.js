// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Codemod.com Docs',
  tagline: 'Upgrade dependencies faster with high-quality codemods.',
  url: 'https://docs.codemod.com',
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'codemod-com', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

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
            'https://github.com/codemod-com/docs/tree/main/',
        },
        blog: {
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/codemod-com/docs/tree/main/',
          blogTitle: 'Codemod.com Blog',
          blogDescription: 'Check out the latest blog posts by Codemod.com.',
          postsPerPage: 'ALL',
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
      navbar: {
        title: 'Codemod.com',
        logo: {
          alt: 'Codemod.com Logo',
          src: 'img/intuita-logo.png',
          href: 'https://codemod.com',
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
            href: 'https://github.com/codemod-com',
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
                href: 'https://github.com/codemod-com/',
              },
              {
                label: 'Join Slack',
                href: 'https://codemod.com/community',
              },
              {
                label: 'Feature Requests',
                href: 'https://feedback.codemod.com/feature-requests',
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
                to: 'docs/about/privacy-policy',
              },
              {
                label: 'Terms & Conditions',
                to: 'docs/about/terms-and-conditions',
              },
              {
                label: 'Telemetry Compliance',
                to: 'docs/about/telemetry-compliance',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Codemod.com`,
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

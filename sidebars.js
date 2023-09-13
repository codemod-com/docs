/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  //tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  
  mySidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'What is Intuita?',
    },
    {
      type: 'doc',
      id: 'codemod-studio/quickstart',
      label: 'Codemod Studio',
    },
    {
      type: 'category',
      label: 'Codemod Registry',
      items: [
        'codemod-registry/intro',
        'codemod-registry/importing-codemods',
      ],
    },
    {
        type: 'category',
        label: 'VS Code Extension',
        items: [
          'vs-code-extension/quickstart',
          'vs-code-extension/advanced-usage',
        ],
    },
    {
      type: 'category',
      label: 'CLI',
      items: [
        'cli/quickstart',
        'cli/advanced-usage',
      ],
  },
    {
      type: 'category',
      label: 'Contributing',
      items: [
        'contributing/our-community',
        'contributing/roadmap',
      ],
    },
    {
      type: 'category',
      label: 'About Intuita',
      items: [
        'about-intuita/why-intutia',
        {
          type: 'category',
          label: 'Legal',
          items: [
            'about-intuita/legal/privacy-policy',
            'about-intuita/legal/terms-and-conditions',
            'about-intuita/legal/telemetry-compliance',            
          ],
        },
      ],
    },
  ],
   
};

module.exports = sidebars;

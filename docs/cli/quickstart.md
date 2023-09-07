---
title: Quickstart
description: Get started with using the Intuita command-line interface.
---

import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ReactPlayer from 'react-player';
import VideoSwitcher from '../../src/components/VideoSwitcher.tsx';

<head>
  <meta property='og:title' content='Quickstart | Intuita CLI'/>
  <meta property='og:description' content='The new way to build, share & run codemods at any scale.'/>
  <meta name='og:image' content='https://raw.githubusercontent.com/intuita-inc/intuita-docs/main/static/img/docs/intuita-docs-opengraph.png'/>
  <meta property='og:image' content='https://raw.githubusercontent.com/intuita-inc/intuita-docs/main/static/img/docs/intuita-docs-opengraph.png'/>
  
  <meta name='twitter:card' content='summary_large_image'/>
  <meta name='twitter:image' content='https://raw.githubusercontent.com/intuita-inc/intuita-docs/main/static/img/docs/intuita-docs-opengraph.png'/>
</head>

Intuita gives you multiple ways to discover, run & share supported codemods and code automation recipes. With the command-line interface (CLI) you can interact with the Intuita platform using a terminal or through an automated system. Intuita's CLI requires [Node.js v16+](https://nodejs.org/).

For a better developer experience with dry-running codemods, reviewing & tweaking automated changes, reporting issues, and sharing codemods, we recommend using [Intuita's VS Code Extension](../vs-code-extension/quickstart).

---

## Install CLI

```bash
pnpm i -g @intuita-inc/intuita
```

## List Available Codemods

```bash
intuita list
```

## Run a Codemod or Recipe

```bash
intuita next/13/app-router-recipe   
```

> `next/13/app-router-recipe` is a sample recipe. Replace it with any codemod or recipe name from the registry.

<VideoSwitcher 
lightImageSrc="/img/docs/cli/quickstart/intuita-cli-light.mp4"
darkImageSrc="/img/docs/cli/quickstart/intuita-cli-dark.mp4"/>

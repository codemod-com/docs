---
title: Quickstart
---

import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ReactPlayer from 'react-player';
import VideoSwitcher from '../../src/components/VideoSwitcher.tsx';

# Intuita CLI Overview →

Intuita gives you multiple ways to discover, run & share supported codemods and code automation recipes. With the command-line interface (CLI) you can interact with the Intuita platform using a terminal or through an automated system. Intuita's CLI requires [Node.js v16+](https://nodejs.org/).

For a better developer experience with dry-running codemods, reviewing & tweaking automated changes, reporting issues, and sharing codemods, we recommend using [Intuita's VS Code Extension](https://docs.intuita.io/docs/vs-code-extension/quickstart).

---

## Install CLI
```
pnpm add --global @intuita-inc/intuita
```
## List Available Codemods
```
intuita listNames
```
## Run a Codemod or Recipe
```
intuita --name next/13/app-router   #"next/13/app-router" is a sample recipe. Replace it with any codemod or recipe name from the registry.
```

<VideoSwitcher 
lightImageSrc="/img/docs/cli/quickstart/intuita-cli-light.mp4"
darkImageSrc="/img/docs/cli/quickstart/intuita-cli-dark.mp4"/>

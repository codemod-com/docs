---
title: Quickstart
---

import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ReactPlayer from 'react-player';
import VideoSwitcher from '../../src/components/VideoSwitcher.tsx';

# Quickstart →

Intuita CLI, is a command-line interface to Intuita for running codemods in your terminal or scripts.

## Prerequisites

- [NodeJS v16+](https://nodejs.org/)

---


Get started with Intuita in three steps:

1. Install Intuita cli using: `pnpm install --global @intuita-inc/intuita`.
2. List available codemods using: `intuita listNames`.
3. Run codemod using: `intuita run --name [codemod name]`.

<VideoSwitcher 
lightImageSrc="/img/docs/cli/quickstart/intuita-cli-light.mp4"
darkImageSrc="/img/docs/cli/quickstart/intuita-cli-dark.mp4"/>
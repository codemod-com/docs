---
sidebar_position: 1
title: Quickstart
description: Get started with using Codemod.com's VS Code extension.
---

import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ReactPlayer from 'react-player';
import VideoSwitcher from '../../src/components/VideoSwitcher.tsx';

<head>
  <meta property='og:title' content='Quickstart | Codemod.com VS Code Extension'/>
  <meta property='og:description' content='The new way to build, share & run codemods at any scale.'/>
  <meta name='og:image' content='https://raw.githubusercontent.com/codemod-com/docs/main/static/img/docs/vs-code-extension/getting-started-vs-code-extension-og.png'/>
  <meta property='og:image' content='https://raw.githubusercontent.com/codemod-com/docs/main/static/img/docs/vs-code-extension/getting-started-vs-code-extension-og.png'/>
  
  <meta name='twitter:card' content='summary_large_image'/>
  <meta name='twitter:image' content='https://raw.githubusercontent.com/codemod-com/docs/main/static/img/docs/vs-code-extension/getting-started-vs-code-extension-og.png'/>
</head>

Install [Codemod.com's VS Code extension](https://marketplace.visualstudio.com/items?itemName=Intuita.intuita-vscode-extension) & upgrade your projects with the help of codemods created by experts in the community, one framework at a time.

> 🎁 What frameworks should we support next? [Let us know →](https://feedback.codemod.com/codemod-requests)

## 1. Discover

- Codemod.com is **a one-stop shop for discovering & sharing quality-governed codemods.** You don't need to install and run many codemod engines for each dependency. Simply search for your framework codemods and click run. With codemod deep links, you can reach & run your target codemod with just one click.

<VideoSwitcher 
lightImageSrc="/img/vsce/vsce-discover.mp4"
darkImageSrc="/img/vsce/vsce-discover.mp4"/>

## 2. Run

- **Safely dry-run the codemods**, preview the changes with a user-friendly experience, adjust the changes as necessary, and apply them to your code only when you feel confident.

<VideoSwitcher 
lightImageSrc="/img/vsce/vsce-run.mp4"
darkImageSrc="/img/vsce//vsce-run.mp4"/>

## 3. Customize & Improve

- Leverage the **1-click integration with Codemod Studio** and the feedback loop with the **community of Codemod Champions** to continuously improve Codemods and customize them to your needs.

> 💡 Codemod.com is in Public Beta and we’re continuously working on improving codemods and solving any compatibility issues.
If you run into an issue while running a codemod, please [let us know →](https://feedback.codemod.com/feature-requests-and-bugs)

## Other Features

- **Out-of-the-box Prettier Integration -** Your favorite code transformation engines such as Meta’s JSCodeshift or TS-morph will mess up the formatting. Codemod.com will automatically prettify the changes according to your settings, saving you much time and energy for more exciting features.
- **Multi-threading -** Execute codemods faster than you would with vanilla jscodeshift or ts-morph. Codemod.com's engine uses multi-threading, which is customizable via extension settings, to take full advantage of your machine's computing power and expedite large-scale changes.

## Extension vs. the Platform

![Codemod.com Platform Architecture](/img/docs/vs-code-extension/intuita-platform-architecture-vs-code-extension.png)

## Telemetry 🔭

- The extension collects telemetry data to help us improve the product for you.
- **We never send PII, OS information, file, or folder names.**
- Telemetry can be disabled in the settings.
- See more details in our [telemetry compliance considerations](https://docs.codemod.com/docs/about/telemetry-compliance) doc.

## Share Feedback 🎁

- Please share your ideas, questions, and feature requests **[here](https://feedback.codemod.com/)**, or chat with us in [Slack](https://codemod.com/community).

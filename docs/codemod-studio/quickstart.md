---
sidebar_position: 1
title: Quickstart
description: Get started with making codemods using Intuita's Codemod Studio.
---

<head>
  <meta property='og:title' content='Quickstart | Codemod Studio'/>
  <meta property='og:description' content='The new way to build, share & run codemods at any scale.'/>
  <meta name='og:image' content='https://github.com/intuita-inc/intuita-docs/blob/main/static/img/docs/codemod-studio/quickstart/codemod-studio-og.png?raw=true'/>
  <meta property='og:image' content='https://github.com/intuita-inc/intuita-docs/blob/main/static/img/docs/codemod-studio/quickstart/codemod-studio-og.png?raw=true'/>
  
  <meta name='twitter:card' content='summary_large_image'/>
  <meta name='twitter:title' content='Quickstart | Codemod Studio'/>
  <meta name='twitter:description' content='The new way to build, share & run codemods at any scale.'/>
  <meta name='twitter:image' content='https://github.com/intuita-inc/intuita-docs/blob/main/static/img/docs/codemod-studio/quickstart/codemod-studio-og.png?raw=true'/>
</head>

import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoSwitcher from '../../src/components/VideoSwitcher.tsx';

[Codemod Studio](https://codemod.studio/) is an AI workbench for creating codemods. Codemods are powerful code automation bots that can automate many crucial yet tedious coding tasks, such as migrations, upgrades, large-scale changes, enforcing best practices, and bringing conformity to a codebase (learn more about codemods [here](https://docs.intuita.io/blog/what-are-codemods)). However, building them has been very hard and time-consuming. Until now. [Codemod Studio](https://codemod.studio/) allows you to "instantly" create code automation bots with the help of AI, specialized helpers, and debuggers, as well as a vibrant community of "codemod champions."

<VideoSwitcher 
lightImageSrc="/img/docs/codemod-studio/quickstart/codemod-studio-quickstart.mp4"
darkImageSrc="/img/docs/codemod-studio/quickstart/codemod-studio-quickstart.mp4"/>


## 1. Build

With the help of fine-tuned LLMs under-the-hood and codemod creation features such as expert-curated prompts, smart highlighting & GUI codemod builder, Codemod Studio can help you build codemods in a few minutes.

:::tip 
Your codemod creation journey can also start right from your IDE/CLI and with just one command: `intuita learn`

[More info here ->](../cli/advanced-usage#generate-codemod-from-file-diff)
:::

## 2. Test

Codemod Studio allows you to iteratively test, debug, and improve your codemods’ as you build them.

## 3. Deploy

With close integration with Intuita’s platform, Codemod Studio allows you to easily deploy and run your codemods over your projects using Intuita’s VS Code Extension.


## Codemod Studio vs. the Platform

![Codemod Studio vs. the Platform](/img/docs/codemod-studio/quickstart/intuita-platform-architecture-codemod-studio.png)

## Telemetry 🔭

### Clerk

We use Clerk, a secure authentication service, to handle user registration and login. Clerk provides us with essential user authentication features, such as secure password management and multi-factor authentication. When you create an account or log in using our web app, Clerk processes and stores your authentication data.

For more information on how Clerk handles user data and their privacy practices, please refer to [Clerk's Privacy Policy](https://clerk.com/privacy).

### OpenAI

Our web app leverages OpenAI's capabilities to process user requests and provide relevant responses. When you interact with AI Assistant or VSCode Export in Codemod Studio, some information (such as code snippets, prompts, etc.) will be sent to OpenAI's servers for processing. We do not store the text inputs you provide for processing beyond what is necessary for delivering the service.

For more details on OpenAI's data usage and privacy policies, please consult [OpenAI's Privacy Policy](https://openai.com/policies/privacy-policy).

## Share Feedback 🎁

- Please share your ideas, questions, and feature requests **[here](https://feedback.intuita.io/)**, or chat with us in [Slack](https://join.slack.com/t/intuita-inc/shared_invite/zt-1tvxm6ct0-mLZld_78yguDYOSM7DM7Cw).




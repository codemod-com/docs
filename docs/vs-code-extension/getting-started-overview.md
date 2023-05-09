---
sidebar_position: 1
title: Getting Started
---

import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Getting Started

## Prerequisites

- Open a Next.js project you would like to update to Next.js v13. In this example, we are using [`netlify/next-runtime`](https://github.com/netlify/next-runtime/).
- Before going through this tutorial, make sure that you have installed [Intuita's VS Code Extension](https://marketplace.visualstudio.com/items?itemName=Intuita.intuita-vscode-extension).
    
![installing intuita extension](/img/docs/getting-started/installing-intuita.gif)
    

---

## Quick Start →

Get started with automating dependency upgrades using Intuita in three steps:

1. Install the Intuita VS Code Extension.
2. Open the Intuita sidebar menu → View the upgrade codemod you’d like to run → Click `Dry Run` 

![dry running codemod](/img/docs/getting-started/dry-run.gif)

:::note
In this example, we’re using the [`netlify/next-runtime`](https://github.com/netlify/next-runtime/) repository and [`replace-next-router`](https://github.com/intuita-inc/codemod-registry/tree/main/codemods/ts-morph/next/13/replace-next-router) upgrade codemod.

Intuita is in Public Beta and we’re continuously working on improving codemods and solving any compatibility issues.
If you run into an issue while running a codemod, please [let us know →](https://feedback.intuita.io/feature-requests-and-bugs)

:::

1. View the changes made by Intuita → then apply the approved changes to your project files.
    
    ![view changes made by codemod](/img/docs/getting-started/view-changes.gif)
    

This example showcases a basic usage of Intuita. In the next tutorials, we’ll go over more of Intuita’s features and how to incorporate them in your workflow.



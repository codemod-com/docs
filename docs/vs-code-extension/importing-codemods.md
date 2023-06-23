---
sidebar_position: 3
title: Importing Codemods
---

import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Importing Codemods Into the Intuita VS Code Extension

The Intuita VS Code Extension automatically fetches the latest codemods available on the [Intuita Codemod Registry](https://github.com/intuita-inc/codemod-registry). If you have a codemod you would like to run using the Intuita VS Code Extension, we recommend [submitting your codemod to the registry](https://docs.intuita.io/blog/adding-codemods-to-registry). However, if you would like to run a private codemod using the Intuita VS Code Extension, you can follow this tutorial.

:::caution
Please note that this is a highly experimental beta feature that is subject to major changes. If you would like to see specific improvements in importing your codemods to the Intuita VS Code Extension, please [leave us some feedback here](https://feedback.intuita.io/feature-requests-and-bugs).
:::

---

If you're new to the Intuita VS Code Extension, we recommend referring to our [Getting Started](https://www.notion.so/Getting-Started-6a8ef8d3ba754a9b8f620b55d8256b91?pvs=21) doc first.

:::tip
If you’re interested in learning how to write your own codemods, here are some great resources:

- [What Are Codemods, Deciphered →](https://docs.intuita.io/blog/what-are-codemods)
- [Writing Codemods Like A Pro →](https://docs.intuita.io/blog/writing-codemods-like-a-pro)

You can also join and collaborate with our community of codemod experts on [Slack →](https://join.slack.com/t/intuita-inc/shared_invite/zt-1tvxm6ct0-mLZld_78yguDYOSM7DM7Cw)
:::

---

On this page, we will go over two ways of running private codemods using the Intuita VS Code extension:

1. Importing `jscodeshift` codemods using Codemod Studio.
2. Importing `ts-morph` codemods by adding your `.tsm.ts` file.

## Importing jscodeshift codemods using Codemod Studio

To import a `jscodeshift` codemod using the Codemod Studio, you should:

1. Paste your codemod into Codemod Studio.
    
    ![pasting codemod into codemod studio](/img/docs/importing-codemods/paste-codemod-into-codemod-studio.jpeg)
    

1. Click `Export to VSCode`.
    
    ![export codemod to vs code](/img/docs/importing-codemods/export-to-vscode.gif)
    
2. Right click any path and run your codemod over it.
    
    ![run codemod](/img/docs/importing-codemods/run-codemod.gif)
    

## Importing ts-morph codemods by adding your ts-morph file

To import a `ts-morph` codemod you can:

1. Create and place your codemod into a `.tsm.ts` file anywhere in your project.
    
    ![place codemod in ts-morph file](/img/docs/importing-codemods/create-ts-morph-file.jpeg)
    
    For this example, we’ll be naming the codemod `codemod.tsm.ts`.
    
2. Right click on the `.tsm.ts` codemod file and run the codemod.
    
    ![run ts-morph codemod](/img/docs/importing-codemods/run-tsmorph-codemod.gif)
    
    :::note
    Note that the ts-morph codemod will run over the whole project. The path selection feature is not available for this yet.
    :::
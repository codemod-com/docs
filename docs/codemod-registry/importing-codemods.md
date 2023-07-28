---
title: Importing Codemods
---

import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Importing Codemods Into the Intuita VS Code Extension

This page goes through the 

This page will walk you through importing your codemods into the Codemod Registry, allowing you to run your codemods using Intuita's VS Code Extension or CLI.


---

Codemods using different codemod engines are imported into the registry using different steps.

This page will cover:

1. Importing `jscodeshift` codemods using Codemod Studio.
2. Importing `ts-morph` codemods by adding your `.tsm.ts` file.
3. Importing Uber Piranha rules.

:::caution
Please note that this is a highly experimental beta feature that is subject to frequent changes. If you would like to see specific improvements in importing your codemods to the Intuita VS Code Extension, please [leave us some feedback here](https://feedback.intuita.io/feature-requests-and-bugs).
:::

## Importing jscodeshift codemods using Codemod Studio

To import a `jscodeshift` codemod using the Codemod Studio, you should:

1. Paste your codemod into Codemod Studio.
    
    ![pasting codemod into codemod studio](/img/docs/importing-codemods/paste-codemod-into-codemod-studio.jpeg)
    

2. Click `Export to VSCode`.
    
    ![export codemod to vs code](/img/docs/importing-codemods/export-to-vscode.gif)
    
3. Right click any path and run your codemod over it.
    
    ![run codemod](/img/docs/importing-codemods/run-codemod.gif)
    

## Importing ts-morph codemods

To import a `ts-morph` codemod you can:

1. Create and place your codemod into a `.tsm.ts` file anywhere in your project.
    
    ![place codemod in ts-morph file](/img/docs/importing-codemods/create-ts-morph-file.jpeg)
    
    For this example, we’ll be naming the codemod `codemod.tsm.ts`.
    
2. Right click on the `.tsm.ts` codemod file and run the codemod.
    
    ![run ts-morph codemod](/img/docs/importing-codemods/run-tsmorph-codemod.gif)
    
    :::note
    Note that the ts-morph codemod will run over the whole project. The path selection feature is not available for this yet.
    :::

---

:::tip
If you’re interested in learning how to write your own codemods, here are some great resources:

- [What Are Codemods, Deciphered →](https://docs.intuita.io/blog/what-are-codemods)
- [Writing Codemods Like A Pro →](https://docs.intuita.io/blog/writing-codemods-like-a-pro)

You can also join and collaborate with our community of codemod experts on [Slack →](https://join.slack.com/t/intuita-inc/shared_invite/zt-1tvxm6ct0-mLZld_78yguDYOSM7DM7Cw)
:::
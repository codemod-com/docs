---
title: Importing Codemods
description: Learn how to import codemods into Intuita's Codemod Registry.
---

<head>
  <meta property='og:title' content='Importing Codemods | Codemod Registry'/>
  <meta property='og:description' content='The new way to build, share & run codemods at any scale.'/>
  <meta name='og:image' content='https://raw.githubusercontent.com/intuita-inc/intuita-docs/main/static/img/docs/codemod-docs-og.jpg'/>
  <meta property='og:image' content='https://raw.githubusercontent.com/intuita-inc/intuita-docs/main/static/img/docs/codemod-docs-og.jpg'/>
  
  <meta name='twitter:card' content='summary_large_image'/>
  <meta name='twitter:image' content='https://raw.githubusercontent.com/intuita-inc/intuita-docs/main/static/img/docs/codemod-docs-og.jpg'/>
</head>

import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoSwitcher from '../../src/components/VideoSwitcher.tsx';


Open-source framework/library builders! Follow this guide to add your codemods to the Codemod Registry. Once added, they will **automatically** integrate with Intuita's platform. This simplifies **codemod discovery** and **distribution**, and offers **a great developer experience for running codemods**. 

Thanks to features like **codemod deep links** and **codemod engines that are powered up by Intuita under the hood** via its IDE extensions and CLI, your users can go from migration docs to having their code automatically transformed with just one click!

---

## Importing codemods into the public registry

To ensure quality and usefulness of codemods and code automation recipes, Intuita provides guidelines and sets some basic governance rules. We'll also be building features to empower the community to uprank the highest quality codemods and recipes. Here is the process to add your codemods to the registry.

- [Adding existing/new codemods to the registry](#adding-existingnew-codemods-to-the-registry)
  - [Importing codemods into the public registry](#importing-codemods-into-the-public-registry)
    - [Understanding the registry's structure](#understanding-the-registrys-structure)
    - [Opening a PR with your codemod](#opening-a-pr-with-your-codemod)


### Understanding the registry's structure

The codemod registry consists of many codemods running over various codemod engines (jscodeshift, ts-morph, Uber's Piranha, and Intuita's File Transformation Engine).

The codemod registry contains directories for each framework/library. Within each directory, you can find the supported framework/library versions. For each version, you can find all the supported codemods.

Codemod registry structure:

```
.
└── codemod-registry
    ├── next/                                    ----> Framework/Library
    │   └── 13/                                   ---> Framework/Library Version
    │       ├── app-directory-boilerplate/           --> Codemod
    │       │   ├── README.md                          -> Readme
    │       │   ├── config.json                        -> Metadata
    │       │   ├── index.ts                           -> Transform file
    │       │   └── test.ts                            -> Test cases
    │       └── ...
    ├── immutable/
    │   └── 0/
    │       ├── add-deprecation-comment
    │       ├── nest-from-js
    │       └── ...
    ├── redwoodjs/
    │   └── ...
    └── ...
```

You can contribute to the registry by adding a completely new framework/library including supported codemods, or you can add a codemod to an existing framework/library.

### Opening a PR with your codemod

To contribute your codemod to the registry, you can [open a PR](https://github.com/intuita-inc/codemod-registry/pulls) containing your codemod. Your codemod should meet the following criteria:
1. Includes a Readme file that contains:
    - Codemod description.
    - Before and after code examples.
    - Applicability criteria (applicable framework/library versions, etc.)
    - Change mode (Assistive/autonomous).
    - Used codemod engine (jscodeshift, ts-morph, Uber Piranha, Intuita File transformation Engine).
    - Estimated time saving per occurrence.
    - Owner.
    - Links for more info (any links to manual/codemod migration steps).

      :::tip
      You can use the codemod Readme template [here →](https://intuita.notion.site/Codemod-Readme-Template-1797c9773653469fa23a9ad21d7e17c9?pvs=4)
      :::

2. Includes a `config.json` metadata file which indicates the following fields:

    ```
    {
	    "schemaVersion": "[vx.x.x]",
	    "name": "[framework/version/codemod-name]",
	    "engine": "[jscodeshift/ts-morph/piranha/repomod-engine]",
        "language": "[java/ts/tsx]", (Optional - Only if engine is Piranha)
	    "dependencyVersionLowerThan": ["[framework]", "[vx.x.x]"],
	    "owner": "[codemod owner name]"
    }
    ```

    :::tip
    Example of the [`replace-next-head`](https://github.com/intuita-inc/codemod-registry/tree/main/next/13/replace-next-head-v2) codemod metadata file:

    ```
    {
	    "schemaVersion": "1.0.0",
	    "name": "next/13/replace-next-head-v2",
	    "engine": "repomod-engine",
	    "dependencyVersionLowerThan": ["next", "13.0.0"],
	    "owner": "intuita"
    }
    ```
    :::

3. Includes an `index.ts` file (if using jscodeshift, ts-morph, or repomod-engine) or `rules.toml` file (if using piranha). This file should include the transform function or the Piranha rule.
4. Includes a `test.ts` file (if using jscodeshift, ts-morph, or repomod-engine) which includes the codemod's test cases. [Learn more about testing codemods here →](/blog/writing-test-cases-for-codemods)


---

:::tip
If you’re interested in learning how to write codemods, here are some great resources:

- [What Are Codemods, Deciphered →](https://docs.intuita.io/blog/what-are-codemods)
- [Writing Codemods Like A Pro →](https://docs.intuita.io/blog/writing-codemods-like-a-pro)

You can also join and collaborate with our community of codemod experts on [Slack →](https://join.slack.com/t/intuita-inc/shared_invite/zt-1tvxm6ct0-mLZld_78yguDYOSM7DM7Cw)
:::

---
title: Importing Codemods
---

import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoSwitcher from '../../src/components/VideoSwitcher.tsx';

# Importing Codemods Into the Intuita VS Code Extension

This page will walk you through importing your codemods into the Codemod Registry, allowing you to run your codemods using Intuita's VS Code Extension or CLI.

Intuita allows you to import codemods either into your private registry or the public registry.

Contributing to the public registry allows your codemods to be automatically integrated within Intuita's platform. This allows you to easily push your codemods to all developers who have the extension or cli installed.

Importing your codemods to your private registry allows you to use your codemods with Intuita's platform within your private projects, without sharing them publicly.

This page covers:

1. [Importing codemods into your private registry.](#importing-codemods-into-your-private-registry)
2. [Importing codemods into the public registry.](#importing-codemods-into-the-public-registry)

---

## Importing codemods into your private registry

Importing codemods into your private registry is done differently based on the codemod's engine.

This section covers:

1. [Importing `jscodeshift` codemods.](#importing-jscodeshift-codemods-using-codemod-studio)
2. [Importing `ts-morph` codemods.](#importing-ts-morph-codemods)
3. [Importing Piranha rules.](#importing-piranha-rules)

:::caution
Please note that this is a highly experimental beta feature that is subject to frequent changes. If you would like to see specific improvements in importing your codemods to the Intuita VS Code Extension, please [leave us some feedback here](https://feedback.intuita.io/feature-requests-and-bugs).
:::

### Importing jscodeshift codemods

To import and use a `jscodeshift` codemod, you can:

1. Paste your codemod into Codemod Studio's 'Codemod' pane.
2. Click `Export to VSCode`.
3. Dry running the codemod.
    <VideoSwitcher 
    lightImageSrc="/img/docs/importing-codemods/importing-jscodeshift-codemods.mp4"
    darkImageSrc="/img/docs/importing-codemods/importing-jscodeshift-codemods.mp4"/>
    

### Importing ts-morph codemods

To import and use a `ts-morph` codemod, you can:

1. Create and place your codemod into a `[your-codemod].tsm.ts` file anywhere in your project.
2. Right-click on `[your-codemod].tsm.ts` file and click `Run as a codemod`.

:::note
Note that the ts-morph codemod will run over the whole project. Path selection is not available yet.
:::

### Importing Piranha Rules

To import and use a Piranha rule, you can:

1. Create a directory that will contain your Piranha rule.
2. Place the Piranha rule inside a file called `rules.toml`.
3. Right-click on the containing directory and click `Run as a Piranha Rule`.


---

## Importing codemods into the public registry

Intuita ensures that contributions are of high quality and pass Intuita's guidelines and governance so that it is ready to be shared with the community.

To import your codemods to the public registry, you can:

1. [Understand the registry's structure.](#understanding-the-registrys-structure)
2. [Open a PR with your codemod.](#opening-a-pr-with-your-codemod)


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
2. Includes a `config.json` metadata file which indicates the following fields:

    ```
    {
	    "schemaVersion": "[vx.x.x]",
	    "name": "[framework/version/codemod-name]",
	    "description": "[codemod description]",
	    "engine": "[jscodeshift/ts-morph/piranha/repomod-engine]",
        "language": "[java/ts/tsx]", (Optional - Only if engine is Piranha)
	    "dependencyVersionLowerThan": ["[framework]", "[vx.x.x]"],
	    "owner": "[codemod owner name]"
    }
    ```
3. Includes an `index.ts` file (if using jscodeshift, ts-morph, or repomod-engine) or `rules.toml` file (if using piranha). This file should include the transform function or the Piranha rule.
4. Includes a `test.ts` file (if using jscodeshift, ts-morph, or repomod-engine) which includes the codemod's test cases. [Learn more about testing codemods here →](/blog/writing-test-cases-for-codemods)


---

:::tip
If you’re interested in learning how to write codemods, here are some great resources:

- [What Are Codemods, Deciphered →](https://docs.intuita.io/blog/what-are-codemods)
- [Writing Codemods Like A Pro →](https://docs.intuita.io/blog/writing-codemods-like-a-pro)

You can also join and collaborate with our community of codemod experts on [Slack →](https://join.slack.com/t/intuita-inc/shared_invite/zt-1tvxm6ct0-mLZld_78yguDYOSM7DM7Cw)
:::
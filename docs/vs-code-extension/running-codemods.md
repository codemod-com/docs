---
sidebar_position: 2
title: Running Codemods
---

import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Running Codemods

The Intuita VS Code Extension allows you to run codemods over your projects to successfully migrate your project dependencies from one version to the next.

This page will walk you through running these codemods as well as Intuita's useful features that make running codemods easier.

:::tip
If you’re interested in writing your own codemods, here are some great resources:

- [What Are Codemods, Deciphered →](https://docs.intuita.io/blog/what-are-codemods)
- [Writing Codemods Like A Pro →](https://docs.intuita.io/blog/writing-codemods-like-a-pro)

You can also join and collaborate with our community of codemod experts on [Slack →](https://join.slack.com/t/intuita-inc/shared_invite/zt-1tvxm6ct0-mLZld_78yguDYOSM7DM7Cw)

:::

---

On this page, we will go over:

- [Dry-running Codemods](#dry-running-codemods)
- [Changing a Codemod's Path](#change-codemod-path-optional)
- [Reviewing and Applying Changes](#reviewing-and-applying-changes)
- [More Helpful Features](#more-helpful-features)


## Dry-running Codemods

Before applying a codemod to your project, you can test it out in the dry-run mode and decide which parts of your codebase it should modify. This simplifies dependency upgrade tasks and allows you to easily review large codebase changes.

To dry-run a codemod:
1. Find the codemod you would like to use.
2. Click **`Dry Run`.**

![dry running codemods](/img/docs/running-codemods/dry-running-codemods.gif)

## Change Codemod Path (Optional)

Before dry-running a codemod over your project, the Intuita extension allows you to limit the codemod’s changes to a specific path in your project.

This is useful for tackling large project migrations by breaking them down into smaller, manageable tasks.

:::tip
By default, dry-running a codemod will affect the root directory of your project. In most cases, this is fine.
However, if you are migrating a large project, choosing codemod paths can be very helpful.

:::

To change a codemod's path:

1. Hover over the codemod.
2. Click on `Edit Path`.
3. Specify the desired path.

![choosing codemod path](/img/docs/running-codemods/choosing-codemod-path.gif)

## Reviewing and Applying Changes

The is reviewing the changes made by the codemod.

When you dry-run a codemod, all the changes are temporarily in preview before being applied to your local files. This allows you to accept or discard specific changes before applying them to the project's files.

To review the changes made:

1. Select a dry run.
    
    ![select dry run](/img/docs/running-codemods/select-dry-run.gif)
    
    Selecting a dry run will show a diff view containing the changes made by the codemod.
    
2. Accept or decline specific file changes.
    
    ![accept or decline codemod changes](/img/docs/running-codemods/accept-decline-changes.gif)
    
    Sometimes codemods may make unwanted changes to some files. In such cases, you can deselect changes to prevent them from being applied to your project.
    
3. Set changes as viewed.
    
    ![set codemod changes as viewed](/img/docs/running-codemods/set-changes-viewed.gif)
    
4. Apply changes.
    
    ![apply changes made by Intuita extension](/img/docs/running-codemods/apply-changes.gif)
    
    When you click `Apply`, the Intuita extension will apply the selected changes to your local project files.

## More Helpful Features

### Change Explorer
You can use the change explorer to easily browse the affected files. The Change Explorer is especially helpful when you are reviewing a lot of changes.

Additionally, you can use the change explorer's search to look for specific files.

![Intuita extension change explorer](/img/docs/running-codemods/change-explorer.gif)

### Diff View Switch

You can switch between an inline or side-by-side diff view by clicking the view type toggle.
    
![Intuita extension diff view switch](/img/docs/running-codemods/diff-view-switch.gif)
    
### Reporting Issues

If a codemod causes an incorrect change, you can report an issue by clicking `Report Issue`.
    
![Report codemod issue](/img/docs/running-codemods/report-issue.png)
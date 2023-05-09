---
sidebar_position: 2
title: Running Codemods
---

import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Running Codemods

The Intuita VS Code Extension allows you to run various codemods over your projects to successfully migrate your project dependencies from one version to the next. This page will guide you through how to run these codemods and Intuita’s useful features that allow a better experience with running codemods.

If you're new to the Intuita VS Code Extension, we recommend referring to our [Getting Started](https://www.notion.so/Getting-Started-6a8ef8d3ba754a9b8f620b55d8256b91) doc first.

:::tip
If you’re interested in learning how to write your own codemods, here are some great resources:

- [What Are Codemods, Deciphered →](https://docs.intuita.io/blog/what-are-codemods)
- [Writing Codemods Like A Pro →](https://docs.intuita.io/blog/writing-codemods-like-a-pro)

You can also join and collaborate with our community of codemod experts on [Slack →](https://join.slack.com/t/intuita-inc/shared_invite/zt-1tvxm6ct0-mLZld_78yguDYOSM7DM7Cw)

:::

---

On this page, we will go over:

- [Codemod Registry](#codemod-registry)
- [Dry-running Codemods](#dry-running-codemods)
- [Reviewing and Applying Changes](#reviewing-and-applying-changes)

## Codemod Registry

Intuita’s Codemod Registry is an organized and maintained collection of codemods that can be used to help you upgrade several frameworks and libraries for your projects.

To get started with running codemods, you have to browse the list of publicly available codemods in the codemod registry. To do so, you need to click on the Intuita extension sidebar menu and look for **Public Codemods.**

![codemod registry](/img/docs/running-codemods/codemod-registry.gif)

Here, you will find a list of all available codemods categorized under their corresponding frameworks, libraries, and specific versions.


<img src="/img/docs/running-codemods/codemod-registry-available-codemods.png" width="400" alt="available codemods in codemod registry" />


:::note
To contribute and learn more about the codemod registry, read our article on [Intuita’s codemod registry here →](https://docs.intuita.io/blog/adding-codemods-to-registry)
:::

## Dry-running Codemods

The dry-run mode allows you to test running a codemod over your project and control which parts of your codebase the codemod should affect, before applying it to your project. This allows for reviewing big changes done to your codebase (discussed more in the following section) and easier orchestration of dependency upgrade tasks.

To get started with dry-running a codemod, you simply have to:

1. Find the codemod you would like to use.
2. Click **`Dry Run`.**

![dry running codemods](/img/docs/running-codemods/dry-running-codemods.gif)

### Choosing the Codemod Path (Optional)

:::tip
By default, dry-running a codemod will affect the root directory of your project. In most cases, this is fine.
However, if you are migrating a large project, choosing codemod paths can be very helpful.

:::

Before dry-running a codemod over your project, the Intuita extension allows you to limit the codemod’s changes to a specific path in your project. This is useful for tackling large project migrations by breaking them down into smaller, manageable tasks.

If you would like to limit the codemod’s scope to a specific directory, you can:

1. Hover over the codemod.
2. Click on `Edit Path`.
3. Specify the desired path.

![choosing codemod path](/img/docs/running-codemods/choosing-codemod-path.gif)

## Reviewing and Applying Changes

The final step in running a codemod is reviewing and applying the changes made by dry-running the codemod. When you dry run a codemod, all the changes are temporarily in preview before being applied to your local files.

This allows you to:

1. Review the changes made.
2. Accept or discard specific changes made to your project.

Once the dry run is done, you will see a diff view containing all the changes in the files affected by the codemod. To review and apply the changes made, you simply have to:

1. Select a dry run.
    
    ![select dry run](/img/docs/running-codemods/select-dry-run.gif)
    
    For every codemod you run, a recent dry run will appear. By selecting a dry run, a diff view that allows you to accept or decline changes will appear.
    
2. Accept or decline specific file changes.
    
    ![accept or decline codemod changes](/img/docs/running-codemods/accept-decline-changes.gif)
    
    Sometimes a codemod can make an unwanted change to a file. In such cases, you can select/unselect changes to allow or decline a specific change from being applied to your project.
    
3. Set changes as viewed.
    
    ![set codemod changes as viewed](/img/docs/running-codemods/set-changes-viewed.gif)
    
4. Apply changes.
    
    ![apply changes made by Intuita extension](/img/docs/running-codemods/apply-changes.gif)
    
    Once `Apply Selected` is clicked, the Intuita extension will apply the changes to your local project files. If you are logged in to VS Code’s Source Control, you will be automatically redirected to commit the changes made by running the codemod.
    

### Helpful tips:

- **Change Explorer** - You can use the Change Explorer to browse the affected files easier than scrolling through the diff view. The Change Explorer is especially helpful when you’re looking for specific file changes.
    
    ![Intuita extension change explorer](/img/docs/running-codemods/change-explorer.gif)
    
- **Diff View Switch** - You can switch between an inline or side-by-side diff view by clicking the view type toggle.
    
    ![Intuita extension diff view switch](/img/docs/running-codemods/diff-view-switch.gif)
    
- **Reporting Issues - I**f a codemod causes an incorrect change, you can report an issue by clicking `Report Issue` on the right side of the header.
    
    ![Report codemod issue](/img/docs/running-codemods/report-issue.png)
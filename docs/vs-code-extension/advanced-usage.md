---
sidebar_position: 2
title: Advanced Usage
description: Learn more about running codemods with Codemod.com's VS Code extension.
---

import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoSwitcher from '../../src/components/VideoSwitcher.tsx';

<head>
  <meta property='og:title' content='Advanced Usage | Codemod.com VS Code Extension'/>
  <meta property='og:description' content='The new way to build, share & run codemods at any scale.'/>
  <meta name='og:image' content='https://raw.githubusercontent.com/codemod-com/docs/main/static/img/docs/vs-code-extension/advanced-usage-vs-code-extension-og.png'/>
  <meta property='og:image' content='https://raw.githubusercontent.com/codemod-com/docs/main/static/img/docs/vs-code-extension/advanced-usage-vs-code-extension-og.png'/>
  
  <meta name='twitter:card' content='summary_large_image'/>
  <meta name='twitter:image' content='https://raw.githubusercontent.com/codemod-com/docs/main/static/img/docs/vs-code-extension/advanced-usage-vs-code-extension-og.png'/>
</head>

The Codemod.com VS Code Extension allows you to run codemods over your projects to successfully migrate your project dependencies from one version to the next. This page will walk you through running these codemods as well as Codemod.com's useful features that make running codemods easier.

---

On this page, you will learn:

- [Dry-running Codemods](#dry-running-codemods)
- [Change Codemod Path (Optional)](#change-codemod-path-optional)
- [Set Codemod Arguments](#set-codemod-arguments)
- [Reviewing and Applying Changes](#reviewing-and-applying-changes)
- [More Helpful Features](#more-helpful-features)
  - [Change Explorer](#change-explorer)
  - [Diff View Switch](#diff-view-switch)
  - [Reporting Issues](#reporting-issues)


## Dry-running Codemods

Before applying a codemod to your project, you can test it out in the dry-run mode and decide which parts of your codebase it should modify. This simplifies dependency upgrade tasks and allows you to easily review large codebase changes.

To dry-run a codemod:
1. Find the codemod you would like to use.
2. Click **`Dry Run`.**

<VideoSwitcher 
lightImageSrc="/img/docs/running-codemods/dry-run-light.mp4"
darkImageSrc="/img/docs/running-codemods/dry-run-dark.mp4"/>

## Change Codemod Path (Optional)

Before dry-running a codemod over your project, the Codemod.com extension allows you to limit the codemod’s changes to a specific path in your project.

This is useful for tackling large project migrations by breaking them down into smaller, manageable tasks.

:::tip
By default, dry-running a codemod will affect the root directory of your project. In most cases, this is fine.
However, if you are migrating a large project, choosing codemod paths can be very helpful.

:::

To change a codemod's path:

1. Hover over the codemod.
2. Click on `Edit Path`.
3. Specify the desired path.

<VideoSwitcher 
lightImageSrc="/img/docs/running-codemods/change-codemod-path-light.mp4"
darkImageSrc="/img/docs/running-codemods/change-codemod-path-dark.mp4"/>

## Set Codemod Arguments

Some codemods may require custom arguments to be set before running. This feature allows you to specify custom arguments when needed.

To set codemod arguments:

1. Click on the `Edit Codemod Arguments` icon.
2. Set the value of the available arguments.

<VideoSwitcher 
    lightImageSrc="/img/docs/running-codemods/set-codemod-arguments.mp4"
    darkImageSrc="/img/docs/running-codemods/set-codemod-arguments.mp4"/>

## Reviewing and Applying Changes

The is reviewing the changes made by the codemod.

When you dry-run a codemod, all the changes are temporarily in preview before being applied to your local files. This allows you to accept or discard specific changes before applying them to the project's files.

To review the changes made:

1. Select a dry run.
    <VideoSwitcher 
    lightImageSrc="/img/docs/running-codemods/select-dry-run-light.mp4"
    darkImageSrc="/img/docs/running-codemods/select-dry-run-dark.mp4"/>
    
    Selecting a dry run will show a diff view containing the changes made by the codemod.
    
2. Accept or decline specific file changes.
    
    <VideoSwitcher 
    lightImageSrc="/img/docs/running-codemods/accept-decline-changes-light.mp4"
    darkImageSrc="/img/docs/running-codemods/accept-decline-changes-dark.mp4"/>
    
    Sometimes codemods may make unwanted changes to some files. In such cases, you can deselect changes to prevent them from being applied to your project.
    
3. Set changes as reviewed.
    
    <VideoSwitcher 
    lightImageSrc="/img/docs/running-codemods/set-changes-as-viewed-light.mp4"
    darkImageSrc="/img/docs/running-codemods/set-changes-as-viewed-dark.mp4"/>
    
4. Apply changes.

    <VideoSwitcher 
    lightImageSrc="/img/docs/running-codemods/apply-changes-light.mp4"
    darkImageSrc="/img/docs/running-codemods/apply-changes-dark.mp4"/>
    
    When you click `Apply`, the Codemod.com extension will apply the selected changes to your local project files.

## More Helpful Features

### Change Explorer
You can use the change explorer to easily browse the affected files. The Change Explorer is especially helpful when you are reviewing a lot of changes.

Additionally, you can use the change explorer's search to look for specific files.

<VideoSwitcher 
lightImageSrc="/img/docs/running-codemods/change-explorer-light.mp4"
darkImageSrc="/img/docs/running-codemods/change-explorer-dark.mp4"/>

### Diff View Switch

You can switch between an inline or side-by-side diff view by clicking the view type toggle.
    
<VideoSwitcher 
lightImageSrc="/img/docs/running-codemods/diff-view-switch-light.mp4"
darkImageSrc="/img/docs/running-codemods/diff-view-switch-dark.mp4"/>


### Reporting Issues

If a codemod causes an incorrect change, you can report an issue by clicking `Report Issue`.
    
![Report codemod issue](/img/docs/running-codemods/report-issue.png)


:::tip
If you’re interested in writing your own codemods, here are some great resources:

- [What Are Codemods, Deciphered →](https://docs.codemod.com/blog/what-are-codemods)
- [Writing Codemods Like A Pro →](https://docs.codemod.com/blog/writing-codemods-like-a-pro)

You can also join and collaborate with our community of codemod experts on [Slack →](https://codemod.com/community)

:::

---
slug: dream-migration
title: "Next.js App Router Migration with Codemod.com"
authors: [alex]
tags: [migration, case study]
toc_min_heading_level: 3
toc_max_heading_level: 3

---

import VideoSwitcher from '../../src/components/VideoSwitcher.tsx';

<head>
  <meta content="https://raw.githubusercontent.com/codemod-com/docs/main/static/img/blog/dream-migration/nextjs-app-router-migration-with-intuita-og.jpg" property="og:image"/>
  <meta content="This article showcases codebase migration challenges and how Codemod.com helps developers tackle large-scale migrations through automation and better DevX." property="og:description"/>

  
  <meta content="@codemod_com" name="twitter:site"/>
  <meta content="summary_large_image" name="twitter:card"/>
  <meta name='twitter:image' content='https://raw.githubusercontent.com/codemod-com/docs/main/static/img/blog/dream-migration/nextjs-app-router-migration-with-intuita-og.jpg'/>
</head>

In this post, I'll touch on the following topics:

- Code migrations are becoming more important but also more difficult.
- Migrations do not need to be a headache. I share our criteria for a dream migration.
- I demo Codemod.com for fully automating Next.js app router migration for the cms-wordpress project.
- I share my thoughts on the future of code automation at scale with the help of AI and the community.

<!--truncate-->

---

## The importance of code migrations

Code migration projects are crucial for making codebases secure and performant, and for keeping users and developers happy and productive. For instance, Next.js, the leading React framework, has recently introduced a major architectural improvement that helps developers build more performant apps faster and with a better developer experience. However, these large-scale migrations are often tedious and error-prone for developers, especially in larger codebases. As generative AI speeds up code creation and more companies end up with massive codebases, migration campaigns can go from difficult to downright impossible without proper infrastructure ([article by Google](https://abseil.io/resources/swe-book/html/ch22.html)).

> "What’s dangerous is not to evolve.” - Jeff Bezos

## There is a better way for code migrations at scale

Fortunately, there is a solution: **codemods!** These code automation bots automate a vast amount of coding for large migrations. Tech giants such as Meta, Google, and Uber, who have the luxury of hiring top programming language experts, have long automated their migration campaigns with the help of codemods and the infrastructure around them. In fact, progressive software teams are always undergoing incremental migrations!

:::tip Note
Discover our "Always Be Migrating" (ABM) philosophy and delve into Vercel’s CTO, Malte's perspective on the subject [here >](https://www.linkedin.com/posts/alexbit_why-all-application-migrations-should-be-activity-7102796682681049089-4l6V/)
:::

## Codemod.com: The end-to-end platform for code automation at scale

At Codemod.com, our ex-Meta team is collaborating with top researchers from Google, Uber, and other companies, combining the power of AI and community to bring better versions of tools that were once confined to tech giants to the rest of the world. Our goal is to create a delightful developer experience for migrations, which Guillermo, Vercel's CEO, once described as the "dream migration.”

![Codemod.com Platform Architecture](/img/docs/intuita-platform-architecture.png)

For us, the dream migration is one that is:

- fully automated for undifferentiated tasks that do not require human intelligence or involvement.
- puts developers in full control until they complete the migration and end up with working, secure, and reliable code.
- iteratively becomes smarter with the help of AI and the community.

We partnered with Vercel to build the most comprehensive set of open-source codemods for Next.js, automating the bulk of the migration for the Pages router to App router for developers. Over the past few weeks, we have increased automation coverage from 79% to 88%, then to 92%, and finally to 100% for simple projects that do not have much business logic. We tested our codemods on one of the most popular examples for wordpress and are currently running them on Cal.com's large production-ready open-source codebase.


| Next.js Migration with Codemod.com | Personal Projects | Mid-size codebases | Large codebase |
| --- | --- | --- | --- |
| Pages to migrate | Less than ten | Tens | Hundreds |
| Potential time saving | Day(s) | Weeks | Months |


While generically applicable codemods can save weeks and months for large codebases, due to custom business logic, there will be more challenges to overcome. That's why at Codemod.com, we have built an AI-powered Codemod Studio to empower developers to instantly create their custom codemods. We are also gathering top codemod experts and enthusiasts in our community. We will briefly discuss those at the end with some pointers for you to learn more and join us to make a dent in the future of software development together.

:::note
If you have a large Next.js project and prefer to delegate the migration project, please contact us, and we will take full ownership of the migration for you.
:::

Enough context; let's get into the demo!

## App Router migration for cms-wordpress with Codemod.com

Here is a 30-second demo of running the Next.js app router recipe on [cms-wordpress](https://github.com/vercel/next.js/tree/canary/examples/cms-wordpress) through the [Codemod.com VS Code extension](https://marketplace.visualstudio.com/items?itemName=Codemod.com.intuita-vscode-extension).

<VideoSwitcher 
lightImageSrc="/img/blog/dream-migration/cms-wordpress-dream-migration.mp4"
darkImageSrc="/img/blog/dream-migration/cms-wordpress-dream-migration.mp4"/>

And just like that, you saved a day of manual, error-prone work and a lot of brainpower that can be used for more exciting and challenging new features that require human intelligence. Some of the necessary changes that were automated for you include::

- Generating **metadata** and **generateMetadata** functions, considering the imports and dependencies.
- Moving dependencies from **pages** to the **app** directory and generating new API functions.
- Migrating **useRouter** hook usages to new hooks.
- Removing **next/head** usages and related component code.
- Creating boilerplate functions to replace **getStaticPaths**, **getServerSideProps**, and **getStaticProps**.

**Follow the steps below to automate your Next.js App Router migration with Codemod.com.**

These steps can also reproduce our results on the cms-wordpress sample project demonstrated above.

### 1: Set up Codemod.com.

Install Codemod.com’s CLI tool by running the following command:

```bash
npm i -g intuita
```

For an even better user experience, install the Codemod.com VS Code extension from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Codemod.com.intuita-vscode-extension).

After installing Codemod.com, navigate to your Next.js project folder and optionally create a branch dedicated to the migration.

### 2: Run codemods.

We have simplified the migration process by providing a predefined migration "recipe" that can be executed with a single command.
Running the recipe will execute a set of codemods sequentially, eliminating the need to find and run the required codemods in the correct order. Learn how to easily run a codemod [using the VS Code extension here](https://docs.codemod.com/docs/vs-code-extension/quickstart#2-run), or [using the CLI here](https://docs.codemod.com/docs/cli/quickstart#run-a-codemod-or-recipe). For a Next.js migration, you can use the following command:

```bash
intuita next/13/app-router-recipe
```

<VideoSwitcher 
lightImageSrc="/img/blog/dream-migration/cli-run.mp4"
darkImageSrc="/img/blog/dream-migration/cli-run.mp4"/>

Alternatively, you can use the VS Code [deep link for the migration recipe](https://shorturl.at/jJP69) and execute it with just one click.

For larger projects, it is recommended to run the codemods individually.

There are three ways to discover the list of codemods:

1. Codemod Discovery panel in Codemod.com's VS Code extension
2. Running the Codemod.com CLI command: intuita list
3. Exploring the public [Code Registry repository](https://github.com/codemod-com/codemod-registry) on GitHub.

After executing the recipe or codemods, you'll notice that most of the migration work has been automated.

Now, it's time to commit the changes to your repository.

If you run the individual codemods one by one, you can end up with a PR like this:

![PR Example](/img/blog/dream-migration/pr-example.png)

### 3: Final tweaks.

While Codemod.com's codemods are very powerful, some project-specific cases might require human intervention.

I will go into more detail in the below sections. For the cms-wordpress project, it is possible to build it successfully even without manual tweaks after running codemods.

But there is a minor tweak that we need to do, which is to change the shape of paths returned from getStaticPaths.

I will propose a solution for such use cases in the last section.

### 4: Test, build & ship.

After completing the code changes for the migration, it is essential to perform thorough testing of your application to ensure that everything is working as expected before pushing the changes. Having comprehensive test cases in CI/CD also provides confidence that nothing is broken.

:::tip
For some of our customers, we ran custom codemods to add types to their codebase, making it more reliable before running the migration codemods. So, If you do not feel confident about automated large-scale changes, you might want first to use custom codemods to bring more conformity and reliability to your codebase. To build custom codemods, you can use [Codemod Studio](https://codemod.studio/) or [contact us](https://join.slack.com/t/intuita-inc/shared_invite/zt-1bjj5exxi-95yPfWi71HcO2p_sS5L2wA) if you need help.
:::

Alright! The migration for cms-wordpress is complete. But what if your project has custom business logic or you encounter issues with Codemod.com codemods?

## AI-assisted custom codemods

After running Next.js's generically applicable codemods, you may end up with many repetitive code blocks that you might want to abstract away. Or, your team may have specific best practices to enforce that differ from the output of generic codemods.

For such use cases, you can use [Codemod Studio](https://codemod.studio/) to create a separate set of cleanup codemods. You can [start your codemod creation journey](https://docs.codemod.com/docs/codemod-studio/quickstart) from Codemod Studio or your local machine with just one CLI command: `intuita learn`.

Follow these few steps:

**One-time prerequisite**

1. Install **Codemod.com CLI**: `npm i -g intuita`
2. Install the **Codemod.com [extension](https://marketplace.visualstudio.com/items?itemName=Codemod.com.intuita-vscode-extension)**. While it is not required for `intuita learn`, it provides the best developer experience once the codemod is ready.
3. Sign in to **Codemod Studio**. Although you can use Codemod Studio anonymously without signing in, you must be logged in to use its AI assistant, ModGPT.

**Cleanup codemods or day-to-day large-scale changes**

1. **Create a diff.**
2. Run `intuita learn`
3. Watch as your **codemod is created automatically**.
    1. It's solid for simple codemods (covers most of the daily usages)
    2. If ModGPT did not create the desired codemod, use its integrated test fixtures, live codemod runner, expert-curated and context-aware prompts, and live debugger to understand and improve the codemod iteratively.
4. Once the codemod is ready, you can bring it back to your IDE with one click and automate the cleanup process.

<VideoSwitcher 
lightImageSrc="/img/docs/cli/quickstart/intuita-learn-workflow.mp4"
darkImageSrc="/img/docs/cli/quickstart/intuita-learn-workflow.mp4"/>

Next.js codemods are backed by Codemod.com and Vercel. So, if you ever come across any issues, report them as a GitHub issue in the Codemod Registry with just one click.

![Report Issue](/img/blog/dream-migration/report-issue.png)

If you find this article useful or have some ideas or feedback you want to share, [drop me a line](https://join.slack.com/t/intuita-inc/shared_invite/zt-1bjj5exxi-95yPfWi71HcO2p_sS5L2wA).

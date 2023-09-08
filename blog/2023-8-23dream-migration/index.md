---
slug: dream-migration
title: "The Dream Migration"
authors: [alex]
tags: [migration, case study]
toc_min_heading_level: 2
toc_max_heading_level: 3

---

import VideoSwitcher from '../../src/components/VideoSwitcher.tsx';

<head>
  <meta name='og:image' content='https://raw.githubusercontent.com/intuita-inc/intuita-docs/main/static/img/blog/intuita-blog-opengraph.png'/>
  <meta property='og:image' content='https://raw.githubusercontent.com/intuita-inc/intuita-docs/main/static/img/blog/intuita-blog-opengraph.png'/>
  
  <meta name='twitter:card' content='summary_large_image'/>
  <meta name='twitter:image' content='https://raw.githubusercontent.com/intuita-inc/intuita-docs/main/static/img/blog/intuita-blog-opengraph.png'/>
</head>

In this post, I'm diving into the growing challenges of code migrations in the Gen AI era. I'll also walk you through how to use Intuita to fully automate the App Router migration for a simple project called 'cms-wordpress'. Finally, I'll touch on the limitations of codemods and share our game plan to tackle those issues. Our goal? Making dream migrations a reality for all developers out there!

<!--truncate-->

---

Code migration projects are crucial for making codebases secure and performant and keeping users and developers happy. However, they are often tedious and error-prone, especially for larger codebases. As generative AI speeds up code creation and more companies end up with massive codebases, migration campaigns can go from difficult to downright impossible without proper infrastructure. For more on evolving large codebases, read this informative [article by Google](https://abseil.io/resources/swe-book/html/ch22.html).

Fortunately, there is a solution: **codemods!** These code automation bots automate a vast amount of coding for large migrations. Tech giants such as Meta, Google, and Uber, who have the luxury of hiring top programming language experts, have long automated their migration campaigns with the help of codemods and the infrastructure around them.

At Intuita, by combining the power of AI and community, we are bringing a better version of those tools to the rest of the world. We are here to create a delightful developer experience for migrations, which Guillermo Rauch, Vercel's CEO, describes as the "dream migration."

For the start, we teamed up with Vercel to build a comprehensive set of codemods for Next.js, the React framework for the web, used by some of the world's largest companies.

These open-source codemods can automate the bulk of the migration for Next.js developers. We have increased automation coverage from 79% to 88%, then to 92%, and finally to 100% for simple projects that do not have much business logic. We tested our codemods on several open-source projects, including the rauchg blog, Cal.com, and others. To showcase the capability of codemods, we chose [cms-wordpress](https://github.com/vercel/next.js/tree/canary/examples/cms-wordpress), one of the most popular example projects in the Next.js repository.

There will be more challenges and less automation coverage for larger projects with custom business logic. We will discuss these challenges below.

Enough context; let's get into the demo!

## From Pages to App: Migration with Intuita

Here is a 30-second demo of running the Next.js app router recipe on [cms-wordpress](https://github.com/vercel/next.js/tree/canary/examples/cms-wordpress) through the Intuita VS Code extension.

<VideoSwitcher 
lightImageSrc="/img/blog/dream-migration/cms-wordpress-dream-migration.mp4"
darkImageSrc="/img/blog/dream-migration/cms-wordpress-dream-migration.mp4"/>




**Follow the steps below to automate your Next.js App Router migration with Intuita.**

These steps can also reproduce our results on the cms-wordpress sample project demonstrated above.

### 1: Set up Intuita.

Install Intuita’s CLI tool by running the following command:

```bash
npm i -g intuita
```

For an even better user experience, install the Intuita VS Code extension from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Intuita.intuita-vscode-extension).

After installing Intuita, navigate to your Next.js project folder and optionally create a branch dedicated to the migration. For our example, we used this [commit](https://github.com/intuita-inc/next.js/commit/56fcd7ac33e700236e6a37a8dac5ed9c378e0823) for the cms-wordpress.

### 2: Run codemods.

We have simplified the migration process by providing a predefined migration "recipe" that can be executed with a single command.
Running the recipe will execute a set of codemods sequentially, eliminating the need to find and run the required codemods in the correct order. Learn how to easily run a codemod [using the VS Code extension here](https://docs.intuita.io/docs/vs-code-extension/running-codemods#dry-running-codemods), or [using the CLI here](https://docs.intuita.io/docs/cli/quickstart#run-a-codemod-or-recipe). For a Next.js migration, you can use the following command from the root directory of your project:

```bash
intuita next/13/app-router-recipe
```

![hero-video](https://github.com/intuita-inc/intuita-docs/assets/78109534/2d179ce9-36c3-472f-9ca9-ca5a495133cb)


Alternatively, you can use the VS Code [deep link for the migration recipe](https://shorturl.at/jJP69) and execute it with just one click.

For larger projects, it is recommended to run the codemods individually.

There are three ways to discover the list of codemods:

1. Codemod Discovery panel in Intuita's VS Code extension
2. Running the Intuita CLI command: intuita list
3. Exploring the public [Code Registry repository](https://github.com/intuita-inc/codemod-registry) on GitHub.

After executing the recipe or codemods, you'll notice that most of the migration work has been automated.

Now, it's time to commit the changes to your repository.

If you run the recipe on cms-wordpress, you will get [a commit like this](https://github.com/intuita-inc/next.js/pull/13/commits/09aa2f4f9020fd80ce438d2fd7630dbc52e19667), and if you run the individual codemods one by one, you will end up with [a PR like this](https://github.com/intuita-inc/next.js/pull/12/commits).

![from pages to app](https://github.com/intuita-inc/intuita-docs/assets/78109534/5ac4fcab-dfd2-46be-96b1-fb49fc6ee0cd)


### 3: Final tweaks

While Intuita's codemods are very powerful, some project-specific cases might require human intervention.

We will go into more detail in the below sections. For the cms-wordpress project, it is possible to build it successfully even without manual tweaks after running codemods.

But there is a [minor tweak](https://github.com/intuita-inc/next.js/pull/13/commits/d3a77b11831101c1f76848c8e21d5edf61f7e3f6) that we need to do, which is to change the shape of paths returned from getStaticPaths.

We will propose a solution for such use cases in the last section.

### 4: Test, build & ship.

After completing the code changes for the migration, it is essential to perform thorough testing of your application to ensure that everything is working as expected before pushing the changes. Having comprehensive test cases in CI/CD also provides confidence that nothing is broken.

> 💡 Fun fact: For some of our customers, we ran custom codemods to add types to their codebase, making it more reliable before running the migration codemods. So, If you do not feel confident about automated large-scale changes, you might want first to use custom codemods to bring more conformity and reliability to your codebase. To build custom codemods, you can use [Codemod Studio](https://codemod.studio/) or [contact us](https://join.slack.com/t/intuita-inc/shared_invite/zt-1bjj5exxi-95yPfWi71HcO2p_sS5L2wA) if you need help.

Alright! The migration for cms-wordpress is over, and with Intuita codemods, you...

- **Saved brainpower**
    - While we are obsessed with the intricacies of Next.js, we would prefer if you focused your brainpower on creating new, delightful experiences for end-users.
    - Our generically applicable codemods will automate many demanding tasks for you.
    - Some of them include:
        - Generating **metadata** and **generateMetadata** functions, considering the imports and dependencies.
        - Moving dependencies from **pages** to the **app** directory and generating new API functions.
        - Migrating **useRouter** hook usages to new hooks.
        - Removing **next/head** usages and related component code.
        - Creating boilerplate functions to replace **getStaticPaths**, **getServerSideProps**, and **getStaticProps**.
    - Without the codemods, you would have to handle these tasks manually, referring to documentation and considering API differences, making the process demanding and error-prone.
- **Saved time**
    - The effort required for migration depends on the size and complexity of the project (we can assist with estimating this effort).
    - But as a reference, **using our migration codemods for even a tiny project like cms-wordpress with only two pages has the potential to save approximately one day**:
        - 4 hours of reading upgrade documentation and 4 hours of manually analyzing, detecting, and properly transforming the code to complete the migration.

## Codemod Issues, 1-click Report.

Generic codemods can make mistakes, which we call FPs (false positives), or they may miss making all the required transformations, which we call FNs (false negatives).

Sometimes, they may make part of the required changes or leave comments for developers to complete the rest (we still don't have a good name for these :) maybe just assistive codemods?).

This is especially true when custom logic is involved.

We attempt to address these shortcomings through the following:

1. **Build in-product guides to differentiate between safe changes and those that require human intervention**, such as changes with a higher chance of false positives or areas where only instructional comments have been left. The safety and quality of codemods could be determined by the codemod creator and/or through community feedback as they are used in projects.
2. Enable a **1-click feedback experience** to report issues to codemod owners or codemod champions in the community. This feature automatically creates a GitHub issue in the codemod registry, automatically filling out all the required context.
3. Enable a **1-click codemod improvement experience.** This feature automatically sends the problematic code blocks to Codemod Studio, which leverages its AI assistant, specialized helpers, and debuggers to improve the codemod. Users can execute the improved codemod on their codebase with one click.

As our AI and automation platform mature, the need for the above will decrease. However, since there will always be some glitches, we need to provide the best experience in mitigating the shortcomings of codemods.

## Custom Cleanup Codemods

Codemods can be used for a variety of code evolution tasks. Next.js codemods fall under the category of generically applicable codemods. After running these codemods, it is common to have many instances of code blocks that you may want to abstract away to achieve a cleaner codebase.

You can use [Codemod Studio](https://codemod.studio/) to create a separate set of cleanup codemods to handle such cases. You can [start your codemod creation journey](https://docs.intuita.io/docs/codemod-studio/quickstart) from Codemod Studio or your local machine with just one CLI command: `intuita learn`.

Follow these few steps:

#### One-time prerequisite

1. Install Intuita CLI: `npm i -g intuita`
2. Install the **Intuita [extension](https://marketplace.visualstudio.com/items?itemName=Intuita.intuita-vscode-extension)**. While it is not required for `intuita learn`, it provides the best developer experience once the codemod is ready.
3. Sign in to **Codemod Studio**. Although you can use Codemod Studio anonymously without signing in, you must be logged in to use its AI assistant, ModGPT.

#### Cleanup codemods or day-to-day large-scale changes

1. **Create a diff.**
2. Run `intuita learn`.
3. Watch as your **codemod is created automatically**.
    1. It's solid for simple codemods (covers most of the daily usages)
    2. If ModGPT did not create the desired codemod, use its integrated test fixtures, live codemod runner, expert-curated and context-aware prompts, and live debugger to understand and improve the codemod iteratively.
4. Once the codemod is ready, you can bring it back to your IDE with one click and automate the cleanup process.

<VideoSwitcher 
lightImageSrc="/img/docs/cli/quickstart/intuita-learn-workflow.mp4"
darkImageSrc="/img/docs/cli/quickstart/intuita-learn-workflow.mp4"/>


If you find this article useful or have some ideas or feedback you want to share, [drop me a line](https://join.slack.com/t/intuita-inc/shared_invite/zt-1bjj5exxi-95yPfWi71HcO2p_sS5L2wA).

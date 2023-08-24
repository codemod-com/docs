---
slug: dream-migration
title: The "Dream Migration"
authors: [alex]
tags: [migration, case study]
toc_min_heading_level: 2
toc_max_heading_level: 3

---

import VideoSwitcher from '../../src/components/VideoSwitcher.tsx';

In this blog post, I will demonstrate the usage of Next.js codemods on a simple project, cms-wordpress, which fully automates the Pages to App migration via Intuita's code automation platform. Additionally, I outline the shortcomings of codemods and our plan for addressing them as we work towards making dream migration a reality for the developer community.

<!--truncate-->

---

Code migration projects are crucial for making codebases secure and performant and keeping users and developers happy. However, they are often tedious and error-prone, especially for larger codebases. As generative AI speeds up code creation and more companies end up with massive codebases, migration campaigns can go from difficult to downright impossible without proper infrastructure. Yep, [you've heard that from Googlers](https://abseil.io/resources/swe-book/html/ch22.html).

Fortunately, there is a solution: codemods! These code automation bots automate a vast amount of coding for large migrations. Tech giants such as Meta, Google, and Uber, who have the luxury of hiring top programming language experts, have long automated their migration campaigns with the help of codemods and the infrastructure around them.

At Intuita, by combining the power of AI and community, we are bringing a better version of those tools to the rest of the world. We are here to create a delightful developer experience for migrations, which Guillermo Rauch, Vercel's CEO, describes as the "dream migration."

For a start, we teamed up with Vercel to build a comprehensive set of codemods for Next.js, the cutting-edge web framework.

These open-source codemods can automate the bulk of the migration for Next.js developers. We have increased automation coverage from 79% to 88%, then to 92%, and finally to 100% for simple projects that do not have much business logic. We tested our codemods on several open-source projects, including the rauchg blog, Cal.com, and others. To showcase the capability of codemods, we chose [cms-wordpress](https://github.com/vercel/next.js/tree/canary/examples/cms-wordpress), one of our popular example projects in the Next.js repository.

There will be more challenges and less automation coverage for larger projects with custom business logic. We will discuss these challenges below.

Enough context; let's get into the demo!

## From Pages to App: cms-wordpress Migration with Intuita

Here is a 30-second demo of running the Next.js app router recipe through the Intuita VS Code extension.

<VideoSwitcher 
lightImageSrc="/img/blog/dream-migration/cms-wordpress-dream-migration.mp4"
darkImageSrc="/img/blog/dream-migration/cms-wordpress-dream-migration.mp4"/>

With Intuita codemods, you will…

- **Save brainpower:** While we are obsessed with the intricacies of Next.js, we would prefer if you focused your brainpower on creating new, delightful experiences for end users. Our generically applicable codemods will automate many demanding tasks for you. Some of them include generating **metadata** and **generateMetadata** functions considering the imports & dependencies; moving dependencies from **pages** to the **app** directory and generating new API functions; migrating **useRouter** hook usages to new hooks; removing **next/head** usages and related component code; and creating boilerplate functions to replace **getStaticPaths**, **getServerSideProps**, and **getStaticProps**. Without the codemods, you would have to handle these tasks manually, referring to documentation and considering API differences, making the process demanding and error-prone.
- **Save time**: The effort required for migration depends on the size and complexity of the project (we can assist with estimating this effort). But as a reference, using our migration codemods for even a tiny project like cms-wordpress with only two pages has the potential to save approximately one day: 4 hours of reading upgrade documentation and 4 hours of manually analyzing, detecting, and properly transforming the code to complete the migration.

**Follow the steps below to install and use Intuita on your own Next.js (or any other supported frameworks or libraries) projects.**

These steps can also reproduce our results on the cms-wordpress sample project demonstrated above.


### 1. Set up Intuita

Install Intuita’s CLI tool by running the following command:

```bash
pnpm add --global @intuita-inc/intuita
```

For an even better user experience, install the Intuita VS Code extension from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Intuita.intuita-vscode-extension).

After installing Intuita, navigate to your Next.js project folder and optionally create a branch dedicated to the migration. For our example, we used this [commit](https://github.com/intuita-inc/next.js/commit/56fcd7ac33e700236e6a37a8dac5ed9c378e0823%2056fcd7ac33e700236e6a37a8dac5ed9c378e0823) for the cms-wordpress.

### 2. Execute the codemods

We have simplified the migration process by providing a predefined migration "recipe" that can be executed with a single command.
Running the recipe will execute a set of codemods sequentially, eliminating the need to find and run the required codemods in the correct order. For a Next.js migration, you can use the following command:

```bash
intuita next/13/app-router-recipe
```

Alternatively, you can use the VS Code **deep link for the migration recipe** (vscode://intuita.intuita-vscode-extension/showCodemod?chd=04PfxDw-UMAksJuCgx991nxVWcU) and execute it with just one click.

For larger projects, it is recommended to run the codemods individually.

There are three ways to discover the list of codemods:

1. Codemod Discovery panel in Intuita's VS Code extension
2. Running the Intuita CLI command: intuita list
3. Exploring the public [Code Registry repository](https://github.com/intuita-inc/codemod-registry) on GitHub.

After executing the recipe or codemods, you'll notice that most of the migration work has been automated.

Now, it's time to commit the changes to your repository.

If you run the recipe on cms-wordpress, you will get [a commit like this](https://github.com/intuita-inc/next.js/pull/13/commits/09aa2f4f9020fd80ce438d2fd7630dbc52e19667), and if you run the individual codemods one by one, you will end up with [a PR like this](https://github.com/intuita-inc/next.js/pull/12/commits).

### 3. Make final tweaks

While Intuita's codemods are very powerful, some project-specific cases might require human intervention.

We will go into more detail in the below sections. For the cms-wordpress project, it is possible to build it successfully even without manual tweaks after running codemods.

But there is a [minor tweak](https://github.com/intuita-inc/next.js/pull/13/commits/d3a77b11831101c1f76848c8e21d5edf61f7e3f6) that we need to do, which is to change the shape of paths returned from getStaticPaths.

We will propose a solution for such use cases in the last section.

### 4. Test, build & ship

After completing the code changes for the migration, it is essential to perform thorough testing of your application to ensure that everything is working as expected before pushing the changes. Having comprehensive test cases in CI/CD also provides confidence that nothing is broken.

Fun fact**:** For some of our customers, we ran codemods to add types to their codebase, making it more reliable before running the migration codemods.

So, If you do not feel confident about automated large-scale changes, you might want first to use custom codemods to bring more conformity and reliability to your codebase.

## Codemods fall short sometimes. What now?

Generic codemods can make mistakes, which we call FPs (false positives), or they may miss making all the required transformations, which we call FNs (false negatives).

Sometimes, they may make part of the required changes or leave comments for developers to complete the rest (we still don't have a good name for these :) maybe just assistive codemods?).

This is especially true when custom logic is involved.

We attempt to address these shortcomings through the following:

1. **Build in-product guides to differentiate between safe changes and those that require human intervention**, such as changes with a higher chance of false positives or areas where only instructional comments have been left. The safety and quality of codemods could be determined by the codemod creator and/or through community feedback as they are used in projects.
2. Enable a **1-click feedback experience** to report issues to codemod owners or codemod champions in the community. This feature automatically creates a GitHub issue in the codemod registry, automatically filling out all the required context.
3. Enable a **1-click codemod improvement experience.** This feature automatically sends the problematic code blocks to Codemod Studio, which leverages its AI assistant, specialized helpers, and debuggers to improve the codemod. Users can execute the improved codemod on their codebase with one click.

As our AI and automation platform mature, the need for the above will decrease. However, since there will always be some glitches, we need to provide the best experience in mitigating the shortcomings of codemods.

## Messy code sometimes. Clean up?

Codemods can be used for a variety of code evolution tasks. Next.js codemods fall under the category of generically applicable codemods. After running these codemods, it is common to have many instances of code blocks that you may want to abstract away to achieve a cleaner codebase.

You can use Codemod Studio to create a separate set of cleanup codemods to handle such cases. You can start your codemod creation journey from Codemod Studio or your local machine with just one CLI command: `intuita learn`.

Follow these few steps:

**One-time prerequisite**

1. Install **Intuita CLI**: `pnpm add --global @intuita-inc/intuita`
2. Install the **Intuita [extension](https://marketplace.visualstudio.com/items?itemName=Intuita.intuita-vscode-extension)**. While it is not required for `intuita learn`, it provides the best developer experience once the codemod is ready.
3. Sign in to **Codemod Studio**. Although you can use Codemod Studio anonymously without signing in, you must be logged in to use its AI assistant, ModGPT.

**Cleanup codemods or day-to-day large-scale changes**

1. **Create a diff.**
2. Run `intuita learn`.
3. Watch as your **codemod is created automatically**.
    1. It's solid for simple codemods (covers most of the daily usages)
    2. If ModGPT did not create the desired codemod, use its integrated test fixtures, live codemod runner, expert-curated and context-aware prompts, and live debugger to understand and improve the codemod iteratively.
4. Once the codemod is ready, you can bring it back to your IDE with one click and automate the cleanup process.

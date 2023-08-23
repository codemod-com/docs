---
slug: dream-migration
title: The "Dream Migration"
authors: [alex]
tags: [migration, case study]
toc_min_heading_level: 3
toc_max_heading_level: 3

---

import VideoSwitcher from '../../src/components/VideoSwitcher.tsx';


As the Next.js ecosystem evolves, it becomes crucial to keep your codebase up-to-date in order to leverage the latest features and optimizations. This is especially true with the recent app router paradigm, which comes with many devX and performance improvements. But code upgrade can be a challenging task, specially in large codebases. 

Fortunately, there is a solution to greatly simplify code migration: code automation bots called codemods! Tech giants like Meta, Google, Uber automate a vast amount of their code migrations with the help of codemods.

In this blog post, we will explore the exciting impact of codemods, as well as their shortcomings. We will also discuss our game plan to tackle these issues on our mission to make dream migration a reality for the community.


<!--truncate-->

---

As the Next.js ecosystem evolves, it becomes crucial to keep your codebase up-to-date in order to leverage the latest features and optimizations. This is especially true with the recent app router paradigm, which comes with many devX and performance improvements. But code upgrade can be a challenging task, specially in large codebases. 

Fortunately, there is a solution to greatly simplify code migration: code automation bots called codemods! Tech giants like Meta, Google, Uber automate a vast amount of their code migrations with the help of codemods. 

While codemods are extremely powerful, building them can be very difficult. It often requires in-depth knowledge of programming languages, as well as the intricacies of the framework that needs to be upgraded. 

That's why at Intuita, we are building an AI-powered platform for creating, sharing, and deploying codemods at scale. We also partner with maintainers of top frameworks, such as Next.js, to utilize their domain knowledge and empower the community to rapidly build useful codemods. We believe in the power of AI and community to keep up with new versions of frameworks, which are being released faster than ever before. Our goal is to build the migration experience that we would like to see in our industry, or as Guillermo Rauch, Vercel's CEO, puts it, "the dream migration.”

In this blog post, we will explore the exciting impact of codemods, as well as their shortcomings. We will also discuss our game plan to tackle these issues on our mission to make dream migration a reality for the community.

## Codemods can automate the bulk of the migration process.

We have worked tirelessly with the Vercel team to create a comprehensive set of Next.js codemods. These codemods can be found in our [public codemod registry](https://github.com/intuita-inc/codemod-registry/tree/main/next/13) and automate the bulk of the migration, creating a great experience for Next.js developers.

To identify gaps in our codemods, we ran them on several open source projects, including cms-wordpress, rauchg blog, [Cal.com](http://cal.com/), and a few others. To showcase the capability of codemods, we chose cms-wordpress, one of our popular example projects in the Next.js repository.

In recent weeks, we have been refining our codemods. We have increased automation coverage from 79% to 88%, then to 92%, and finally to 100% for this relatively simple project that does not have much business logic. For larger projects that have custom business logic, there will be more challenges and less automation coverage. We will discuss these challenges below.

While we aspire to achieve 100% automation even for the largest projects, we believe it would be more motivating for our team, and hopefully for others, to first experience a "dream migration" on simpler projects. This magical feeling will set the bar for future migration experiences and serve as our north star.

Now, let's take a look at a 30-second demo of running the Next.js app router recipe through the Intuita VS Code extension. We will also provide a summary of the codemod impacts and the steps to reproduce our results for those who are interested.


<VideoSwitcher 
lightImageSrc="/img/blog/dream-migration/cms-wordpress-dream-migration.mp4"
darkImageSrc="/img/blog/dream-migration/cms-wordpress-dream-migration.mp4"/>




### The impact

- **Save brainpower:** While we are obsessed with the intricacies of Next.js, we would prefer if you focused your brainpower on creating new, delightful experiences for end users. Our generically applicable codemods will automate many demanding tasks for you. Some of them include generating `metadata` and `generateMetadata` functions considering the imports & dependencies; moving dependencies from `pages` to the `app` directory and generating new API functions; migrating `useRouter` hook usages to new hooks; removing `next/head` usages and related component code; and creating boilerplate functions to replace `getStaticPaths`, `getServerSideProps`, and `getStaticProps`. Without the codemods, you would have to manually handle these tasks, referring to documentation and considering API differences, making the process demanding and error-prone.
- **Save time**: The effort required for migration depends on the size and complexity of the project (we can assist with estimating this effort). But as a reference, using our migration codemods for even a small project like cms-wordpress with only 2 pages has the potential to save approximately 1 day: 4 hours of reading upgrade documentation, and 4 hours of manually analyzing, detecting, and properly transforming the code to complete the migration.

### Migration steps using Intuita CLI or VS Code extension

Follow these steps to install and use Intuita on your own project or to reproduce our results on the cms-wordpress sample project.

### #1 Set up Intuita

Install Intuita’s CLI tool by running the following command:

```bash
pnpm add --global @intuita-inc/intuita
```

For an even better user experience, you can install the Intuita VS Code extension from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Intuita.intuita-vscode-extension).

After installing Intuita, navigate to your Next.js project folder and optionally create a branch dedicated to the migration. For our example, we used this [commit](https://github.com/intuita-inc/next.js/commit/56fcd7ac33e700236e6a37a8dac5ed9c378e0823%2056fcd7ac33e700236e6a37a8dac5ed9c378e0823) for the cms-wordpress.

### #2 Execute the codemods

We have simplified the process of migration by providing a predefined migration “recipe” that can be executed with a single command. Running the recipe will execute a set of codemods sequentially, eliminating the need to find and run the required codemods in the correct order. For a Next.js migration, you can use the following command:

```bash
intuita next/13/app-router-recipe
```

Alternatively, you can use the VS Code deep link for the migration recipe (vscode://intuita.intuita-vscode-extension/showCodemod?chd=04PfxDw-UMAksJuCgx991nxVWcU) and execute it with just one click.

For larger projects, it is recommended to run the codemods individually. There are three ways to obtain the list of codemods:

1. Codemod Discovery panel in Intuita’s VS Code extension
2. Running the Intuita CLI command: `intuita listNames`
3. Exploring the public [Code Registry repository](https://github.com/intuita-inc/codemod-registry) on GitHub.

After executing the recipe or codemods, you'll notice that the majority of the migration work has been automated. 

Now, it's time to commit the changes to your repository. 

If you run the recipe on cms-wordpress, you will get [a commit like this](https://github.com/intuita-inc/next.js/pull/13/commits/09aa2f4f9020fd80ce438d2fd7630dbc52e19667), and if you run the individual codemods one by one, you will end up with [a PR like this](https://github.com/intuita-inc/next.js/pull/12/commits).

### #3 Make final tweaks

While Intuita's codemods are very powerful, there might be some project-specific cases that require human intervention. We will go into more details in the below sections. For the cms-wordpress project, it is possible to build the project successfully even without manual tweaks after running codemods. But there is a minor tweak that we need to do which is to change the shape of paths returned from getStaticPaths: https://github.com/intuita-inc/next.js/pull/13/commits/d3a77b11831101c1f76848c8e21d5edf61f7e3f6

We will propose a solution for such use cases in the last section.

### #4 Test, build & ship

After completing the code changes for the migration, it is essential to perform thorough testing of your application to ensure that everything is working as expected before pushing the changes. Having comprehensive test cases in CI/CD also provides confidence that nothing is broken. Fun fact, for some of our customers, we ran codemods to add types to their codebase, making it more reliable before running the migration codemods. So, If you do not feel confident about automated large-scale changes, you might want to first use custom codemods to bring more conformity and reliability to your codebase.

## Generic codemods fall short sometimes. So, what now?

Generic codemods can make mistakes, which we call FPs (false positives), or they may miss making all the required transformations, which we call FNs (false negatives). Sometimes, they may make part of the required changes or leave comments for developers to complete the rest (we still don't have a good name for these :) maybe just assistive codemods?). This is especially true when custom logic is involved. 

We attempt to address these shortcomings through the following:

1. **Build in-product guides to differentiate between safe changes and those that require human intervention**, such as changes with a higher chance of false positives or areas where only instructional comments have been left. The safety and quality of codemods could be determined by the codemod creator and/or through community feedback as they are used in projects.
2. Enable a **1-click feedback experience** to report issues to codemod owners or codemod champions in the community. This feature automatically creates a Github issue in the codemod registry, with all the required context filled out automatically.
3. Enable a **1-click codemod improvement experience.** This feature automatically sends the problematic code blocks to Codemod Studio, which leverages its AI assistant, specialized helpers, and debuggers to improve the codemod. With one click, users can then execute the improved codemod on their codebase.

As our AI and automation platform mature, there will be decreasing need for the above. However, since there will always be some glitches, it is important for us to provide the best experience in mitigating the shortcomings of codemods.

## Generic codemods leave my code looking messy sometimes. Clean up, please?

Codemods can be used for a variety of code evolution tasks. Nextjs codemods fall under the category of generically applicable codemods. After running these codemods, it is common to have many instances of code blocks that you may want to abstract away to achieve a cleaner codebase. To handle such cases, you can use Codemod Studio to create a separate set of cleanup codemods.You can start your codemod creation journey from Codemod Studio or directly from your local machine with just one CLI command: `intuita learn`.

Follow these few steps:

### One-time prerequisite

1. Install **Intuita CLI**: `pnpm add --global @intuita-inc/intuita`
2. Install the **Intuita [extension](https://marketplace.visualstudio.com/items?itemName=Intuita.intuita-vscode-extension)**. While it is not required for `intuita learn`, it provides the best developer experience once the codemod is ready.
3. Sign in to **Codemod Studio**. Although you can use Codemod Studio anonymously without signing in, you need to be logged in to use its AI assistant, ModGPT.

### Cleanup codemods or day-to-day large scale changes

1. **Create a diff.**
2. Run `intuita learn`.
3. Watch as your **codemod is created automatically**.
    1. it’s solid for simple codemods (covers most of daily usages)
    2. If ModGPT did not create the desired codemod, use its integrated test fixtures, live codemod runner, expert-curated and context-aware prompts, and live debugger to iteratively understand and improve the codemod.
4. Once the codemod is ready, you can bring it back to your IDE with one click and automate the clean-up process.
---
slug: eslint-to-biome
title: "Eslint & Prettier to Biome migration: Adopting performant JavaScript language toolchain"
authors: [sasha]
description: "Replacing ESLint & Prettier with Biome: sane defaults, single configuration and faster linting checks."
image: "/img/blog/eslint-to-biome/eslint-to-biome-og.jpg"
---

<head>
  <meta property="og:site_name" content="Codemod.com" />
  <meta content="@codemod" name="twitter:site"/>
  <meta content="summary_large_image" name="twitter:card"/>
</head>

Replacing ESLint & Prettier with Biome: sane defaults, single configuration and faster linting checks.

<!--truncate-->

---

## Introduction

JavaScript toolchain has been stable for around 10 years now, with tools like `ESLint` and `Prettier`, it might have seemed like regular commit-to-commit tasks, such as code linting & formatting have been solved, and there is not much need to improve on top of existing solutions. However, what if there was a tool that is much easier to configure, holds a configuration for both linting and formatting in the same place, and runs DOZENS (!) of times faster? Well, that’s what Biome.js was built for!

While the curiosity to try out the solution is already there all over the social media and some companies are actively trying it out for new projects, the hard part is if you want to migrate your existing configuration with hundreds of rules working nicely together to be migrated to Biome. Although there might not be a replacement for every single rule in `ESLint`, there are certainly replacements for the most popular and used ones, including React JSX and even some a11y rules! Well, the good news is that trying out Biome, while preserving what’s possible from your existing configuration, has never been easier.

The Codemod platform allows you to migrate your existing set of `ESLint` and `Prettier` configurations to Biome without much hassle. Get your set of rules to migrate by running a simple `ESLint` CLI command and feeding it into our codemod. We will do the rest for you.

## Understanding the Migration Landscape

Designed to be fast, optimized, scalable, and simple, Biome is very easy to get started with. It’s 97% compatible with code formatting that you all are used to with `Prettier` and requires less configuration to make it work similarly. It has a lot of essential rules that you would naturally use in your `ESLint` configuration, but they are also much easier to set up, run much faster, and have descriptive errors that tell precisely where the error is located and how to fix it.

For most of the cases, it’s hard to migrate off of `ESLint` and `Prettier` because of the huge ecosystem they have built around them. But, the simplicity and speed behind it have their benefits. It’s 25x times faster than `Prettier` and 15x times faster than `ESLint`. It has most of the essential rules available right away, it’s incredibly easy to set up and get running, it has first-class support for TypeScript and JSX, and even has an extension or a way to set up in any editor of your choice. It even has organize imports rule section to replace similar plugin in `Prettier` and has some of the most requested features in development that will soon be released, such as sorting tailwind classes and many others.

All that said, it’s still a lot of manual work to migrate all the config files to a single biome.json and make it work. This might take a day for a relatively simple codebase, just as it could take a week for a giant monorepo with dozens of apps and packages that all need to share the same code formatting rules.

This is where codemods become handy. With the help of our Codemod platform, you will be able to switch in no-time and try it out quickly to make a decision!

## The Codemod Platform

Our Codemod platform assisted in building the mentioned codemod and running it across our codebase. First of all, we had to think about what needs to be done in the course of the migration.

- We have to read all `ESLint` and `Prettier` related files, and based on what’s inside of them, build a `biome.json` configuration file.
- We should replace all the `ESLint` and `Prettier` commands in `package.json` files’ script field to use biome
- We have to also update the dependencies in `package.json` files where `ESLint` is installed.

A known shortcoming of existing transformation engines, like `jscodeshift` or `ts-morph` is the fact that they cannot really create/delete/move files. They also can’t make updates to other files based on previously parsed file. This is where our `filemod` engine comes into play. When parsing a file, it allows us to execute multiple actions in different locations of the filesystem. For example, we could parse `.eslintrc` file and based on it’s contents update (upsert, in fact) `biome.json` while at the same time deleting the original `.eslintrc` as it is not needed anymore. This way we have introduced a solution that allows to make drastic coupled changes in different parts of the codebase, while maintaining the initial parsing order.

Security is a top priority in the Codemod platform. That’s why we have limited codemods to a certain extent to prevent codemod creators from abusing the possibilities that Node.js platform provides in terms of access to the user system. We only pass certain functions and features down the pipeline to be accessible within a particular codemod. In the mentioned migration, we had to fetch a raw markdown file which contains mappings from `ESLint` to Biome rules and fetch Biome website pages to determine how to activate this rules within `biome.json`. So, we only passed fetch function down the line and made use of this particular Node.js feature. We don’t do any extra.

We named the codemod for the described migration `eslint/biome/migrate-rules`.

Running the codemod was fun. It only required us to find a file that `ESLint` performs checks on using the most rules. In the next section we’ll talk about the experience.

## Migrating Codemod.com’s Own Codebase & Results

So, we wanted to try this tooling for ourselves. We decided to test the recipe over [our monorepo](https://github.com/codemod-com/codemod). We wrapped our sleeves, found a file that supposedly gets linted by the most amount of rules in our `ESLint` config, and ran:

`npx eslint --print-config apps/vsce/webview/src/main/index.tsx | npx codemod eslint/biome/migrate-rules`

In this command:
`npx eslint --print-config apps/vsce/webview/src/main/index.tsx` - to print the config used for a particular file, unwrapping ALL the rules that hide under configs that our own configuration extends from. In this example we used `.tsx` file to include possible React rules.

`| npx codemod eslint/biome/migrate-rules`  - feed the input of previous command to our CLI.

As shown in the table below, our migration to Biome was well worth it.

| Time (ESLint + Prettier) | Time (Biome) |
| --- | --- |
| 15.6 seconds | 1.6 seconds |

Biome was noticeably faster and easier in use, so we decided to stick with it for the foreseeable future.

It was a matter of getting rid of all the `ESLint` configuration files and installed dependencies, including compat plugins for `Prettier` to work nicely with it.

After the migration, we didn’t notice that we lost some of the rules. It was working as expected perfectly from the get-go.

If we were to manually migrate the Codemod Monorepo alone, we would have to:

1. adjust 134 existing package.json files:
    1. replace `ESLint` scripts (1 minute per file);
    2. replace `ESLint` deps (1 minute per file);
2. find a corresponding rule for each of the existing `ESLint` rules (2 minutes per rule);
3. replace `Prettier` configuration (5 minutes)

It would have taken up to a whole day of boring mechanical work to perform the migration manually without performing any additional troubleshooting. [Our platform](https://codemod.com) made it all happen by running a single command.
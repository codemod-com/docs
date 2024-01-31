---
slug: mocha-to-vitest-migration
title: "From Mocha to Vitest for 2X Faster Tests"
authors: [greg]
tags: [migration, case study]
toc_min_heading_level: 3
toc_max_heading_level: 3

---

import VideoSwitcher from '../../src/components/VideoSwitcher.tsx';
import Figure from '../../src/components/figures.jsx'

<head>
  <meta content="https://raw.githubusercontent.com/codemod-com/docs/main/static/img/blog/mocha-to-vitest/mocha-to-vitest-og.jpg" property="og:image"/>
  <meta content="Read about our practical experience in automating the migration from Mocha.js to Vitest using Codemod.com. This article provides a detailed overview of streamlining code updates with modern tools." property="og:description"/>

  <meta content="@codemod" name="twitter:site"/>
  <meta content="summary_large_image" name="twitter:card"/>
  <meta name='twitter:image' content='https://raw.githubusercontent.com/codemod-com/docs/main/static/img/blog/mocha-to-vitest/mocha-to-vitest-og.jpg'/>
</head>

Over the years, the JavaScript community has introduced many test runners. The [StateOfJS 2022 survey](https://2022.stateofjs.com/en-US/libraries/testing/) provides interesting data points and visuals on the trends of these testing libraries and frameworks, with Vitest sitting at the top in terms of community interest.

Read on to learn how we built and used open-source codemods to automate the migration from Mocha to Vitest, saving countless hours of tedious work.

![Screenshot 2023-12-15 at 12 40 42 PM](https://github.com/intuita-inc/intuita-docs/assets/78109534/91b8dc80-e613-4146-8f75-d8caea1458bc)

<!--truncate-->

## Why bother migrating to Vitest?

Vitest is a modern test runner with improved perfomance and developer experience comapred to many other existing alternatives, which explains its growing popularity. 

More specifically, Vitest simplifies configuration, supports TypeScript & ESM, and popular component libraries out of the box. Last but not least, it comes with code coverage analysis, and overall, saving hours of tedious work for developers.

But, the manual migration from Mocha.js to Vitest could take a considerable amount of time, especially when you have a lot of test suites.

What if there were code modification bots that could automate the entire migration process?

## **Codemod.com: The end-to-end platform for code automation at scale**

Creating the code modification bots, also known as codemods, requires knowledge of the compiler theory, namely navigating around the abstract syntax trees. Interestingly, each compiler and transpiler has its own tree structure, which makes the creation of automation agents difficult. Therefore, if you want to build the agents proficiently, you need to know such structures by heart.

This is why we created the Codemod.com platform to build, test, distribute, and execute codmods for codebases of any size.

* **Build**: Leverage the latest LLMs in Codemod Studio for free to instantly create and test codemods using the jscodeshift API, a library designed for manipulating abstract syntax trees in JS/TS. The studio offers one-click integration for VS Code and CLI to run the auto-generated codemods.
* **Share**: Add your codemods to Codemod.com's private or public distributed registries, making them available to colleagues or the community.
* **Run**: Discover and run codemods with a single click or CLI command, tweak changes as needed, and iteratively improve them by providing feedback to Codemod.com AI or the community.
* **Manage**: Codemods alone are not sufficient for successful migrations in large codebases and teams. Orchestrating the changes made by codemods across multiple teams requires a platform that can integrate with the existing tools of each software team. These features, which are only needed by large teams, fall under Codemod.com's enterprise offerings.

<Figure caption="The architectural diagram of the Codemod.com Platform, including the planned Web App." src="/img/docs/intuita-platform-architecture.png" />

With that in mind, let's go over how we leveraged our platform to migrate from Mocha to Vitest.

## Mocha to Vitest migration with Codemod.com

### 1. Build the codemod

To build a codemod with Codemod Studio, you only need two code snippets: one before the transformation and one after.

Imagine we have an existing Mocha.js-compatible test file with the following code, which we place in the “before” snippet:

```tsx
import type { Context } from 'mocha';
import { expect } from 'chai';

describe('Test Suite 1', function (this) {
	beforeEach(() => {
		doAThing();
	});

	it('addition', () => {
		expect(1 + 1).to.equal(2);
	});

	afterAll(() => {
		doBThing();
	});
});
```

With Vitest, we would write the test file in the following way, which we place in the “after” snippet:

```tsx
import { describe, it, expect, beforeEach, afterAll } from 'vitest';

describe('Test Suite 1', () => {
    beforeEach(() => {
		doAThing();
	});

	it('addition', () => {
		expect(1 + 1).to.equal(2);
	});

	afterAll(() => {
		doBThing();
	});
});
```

As you can see, in Mocha.js `describe`, `beforeEach`, `it` and `afterAll` functions exist in the global scope. Additionally, we chose to use the `expect` function from the `chai` library explicitly for test assertions. In Vitest, we need to import all of these functions from the `vitest` package.

Instead of writing the jscodeshift codemod ourselves, we can automate it using the Codemod Studio.

Within a few iterations with the AI helper, we got [the following codemod](https://go.intuita.io/WASAwm):

```tsx
import type { FileInfo, API, Options } from 'jscodeshift';
export default function transform(
    file: FileInfo,
    api: API,
    options?: Options,
): string | undefined {
    const j = api.jscodeshift;
    const root = j(file.source);

    // Helper function to preserve leading comments
    function replaceWithComments(path, newNode) {
        // If the original node had comments, add them to the new node
        if (path.node.comments) {
            newNode.comments = path.node.comments;
        }

        // Replace the node
        j(path).replaceWith(newNode);
    }

    // Check if beforeEach and afterAll are used in the code
    const isBeforeEachUsed = root.find(j.Identifier, { name: 'beforeEach' }).size() > 0;
    const isAfterAllUsed = root.find(j.Identifier, { name: 'afterAll' }).size() > 0;

    // Find all import declarations
    root.find(j.ImportDeclaration).forEach(path => {
        // Check if import source is 'chai'
        if (path.node.source.value === 'chai') {
            // Replace 'chai' with 'vitest'
            path.node.source.value = 'vitest';
            // Add 'describe', 'it', 'expect', 'beforeEach', 'afterAll' to import specifiers conditionally
            const importNames = ['describe', 'it', 'expect'];
            if (isBeforeEachUsed) importNames.push('beforeEach');
            if (isAfterAllUsed) importNames.push('afterAll');
            path.node.specifiers = importNames.map(name =>
                j.importSpecifier.from({ imported: j.identifier(name), local: j.identifier(name) })
            );
            // Replace the node with the new node, preserving comments
            replaceWithComments(path, path.node);
        }
    });

    // Find all function declarations
    root.find(j.FunctionExpression).forEach(path => {
        // Check if function has 'this' as parameter
        if (path.node.params.some(param => param.type === 'Identifier' && param.name === 'this')) {
            // Remove 'this' from parameters
            path.node.params = path.node.params.filter(param => !(param.type === 'Identifier' && param.name === 'this'));
            // Replace function declaration with arrow function expression
            const arrowFunction = j.arrowFunctionExpression.from({
                params: path.node.params,
                body: path.node.body,
                async: path.node.async,
            });
            // Replace the node with the new node, preserving comments
            replaceWithComments(path, arrowFunction);
        }
    });

    return root.toSource();
}
```

The generated codemod served as a base for the final one called `mocha/vitest/migrate-tests`. We refined it manually based on happy-path tests and executed the codemod directly on our own projects, which we will describe in the following section.

We also built codemod `mocha/vitest/migrate-configurations` using Codemod.com's engine (called filemod) as jscodeshift does not allow creating and removing files.

The filemod removes all Mocha.js configuration files, drops the library from all package dependencies, and adds Vitest instead.

Having both a jscodeshift codemod and a filemod left us with two code automation agents to execute sequentially. To facilitate that, we introduced the concept of a recipe. Our recipes contain information for the codemod runners to execute specific agents one by one and combine the results.

We called the recipe for the described migration [`mocha/vitest/recipe`](vscode://intuita.intuita-vscode-extension/showCodemod?chd=oDAjaOrkUfLtuw4nNXnfIHLEL-o) which can be discovered, shared, and run like any other codemods.

### 2. Run the codemod

Codemods could be run via Codemod.com's VS Code Extension ([click on this deep-link](https://tinyurl.com/ytpbx5kb)), or via the CLI command from the root folder of the project:
```bash
npx intuita mocha/vitest/recipe
```

We ran the recipe over 3 of our own repositories:

1. [`intuita/filemod`](https://github.com/intuita-inc/filemod)
2. [`intuita/codemod-engine-node`](https://github.com/intuita-inc/codemod-engine-node)
3. [`intuita/codemod-registry`](https://github.com/intuita-inc/codemod-registry)

The first two had a handful of Mocha.js test suites and we migrated them first to spot problems early in the development. Once the codemod was ready and accurate, we merged them into the Codemod Registry. Once codemods are published to the registry, they automatically become accessible to the community via Codemod.com VSCode Extension or the Codemod.com CLI.

And shown below, with the help of our codemod, we automated the bulk of the migration for over 60 test files spread across the entire Codemod Registry monorepo.


<VideoSwitcher 
lightImageSrc="/img/blog/mocha-to-vitest/running-recipe.mp4"
darkImageSrc="/img/blog/mocha-to-vitest/running-recipe.mp4"/>


We repeated the same steps for the Codemod Engine Node. During testing, we found out Vitest does not transpile TypeScript files if we use them as entry points for thread workers. This functionality used to work with Mocha.js supported by the `ts-node/esm` dependency. We replaced the path to the TS file with a path to the built ESM files to restore the feature.

### 3. Final tweaks

When migrating the Codemod Registry, we found unhandled cases, like:

- the usages of the `Context` type from Mocha.js,
- the usages of the `this` variable in test bodies.

We could fix the former problem by putting the existing codemod into the Codemod Studio and asking the AI helper to fix it. With the latter, we fixed the test bodies manually due to the small number of such occurrences. 

Since the Codemod.com CLI can execute local codemods, we used it to see if the changes to the codemod resulted in the correct transformation of the codebase in question. This speeded up the development process tremendously.

### The impact

With the help of the recipe, we were able to migrate three repositories in a short amount of time. We reused the same code within the recipe for all the projects. Now, other developers may leverage our work as well.

If we were to manually migrate the Codemod Registry alone, we would have to:

1. delete the 60+ existing Mocha.js configuration files (1 minute for each),
2. remove Mocha.js and add Vitest dependencies in 60+ package files (1 minute for each),
3. drop Mocha.js types and put the Vitest import statements in 60+ tests files (2 minutes for each).

It would have taken around 4 hours of mundane work to perform the migration without ensuring we had not introduced any mistakes.

After ensuring the proper quality of the code automation agents, we executed the recipe that transformed over 200 files instantly. We removed all Mocha.js configuration files and thus reduced the complexity of the test suites. Our platform made it all available at the push of a button.

## The future of automated migrations

Thanks to generative AI, the volume and velocity of software components will grow exponentially. Without a given infrastructure, these components will collapse under their own weight and cannot keep up with the pace of the other components they rely on. Manual migrations of massive codebases become increasingly intractable, creating new opportunities for dedicated platforms specifically designed for autonomous code evolution at scale.

We envision a future where everyone is a "developer," creating delightful, performant, and secure digital experiences. Human developers will focus only on tasks that require innovation and spark their interest, while any undifferentiated tasks are managed by AI and its surrounding infrastructure. Code automation platforms, such as Codemod.com, will serve as an indispensable part of any company's technology stack, transforming lifeless software into a living entity that evolves autonomously. Software of the future will be orders of magnitude larger than what we have today, mostly created by AI developers. It will be understandable and controllable by humans and give rise to new experiences in life.

## Conclusion

This article has journeyed through the specifics of migrating from Mocha to Vitest using Codemod.com's platform, and here are the key takeaways:

1. **Codemods** are powerful code modification bots that can help us modernize our stack at any scale, and keep up with the pace of new technologies.
2. **LLM**: Thanks to cutting edge LLMs, any developer can instantly create codemods, saving hours, days and weeks of time in bigger codebases.
3. **OSS**: With Codemod.com's open-source platform we can automate crucial yet tedious tasks for ourselves, colleagues, and the community.

If you, just like us, are passioante about the future of software development, join our [community](https://go.intuita.io/slack) or [team](https://codemod.notion.site/Join-us-b9c9bf82d38341f8936744b6aac20dba?pvs=4).

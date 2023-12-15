---
slug: mocha-to-vitest-migration
title: "Migrating from Mocha to Vitest for 2X Faster Tests"
authors: [greg]
tags: [migration, case study]
toc_min_heading_level: 3
toc_max_heading_level: 3

---

import VideoSwitcher from '../../src/components/VideoSwitcher.tsx';
import Figure from '../../src/components/figures.jsx'

<head>
  <meta content="https://raw.githubusercontent.com/intuita-inc/intuita-docs/main/static/img/blog/mocha-to-vitest/mocha-to-vitest-og.jpg" property="og:image"/>
  <meta content="Read about our practical experience in automating the migration from Mocha.js to Vitest using Intuita. This article provides a detailed overview of streamlining code updates with modern tools." property="og:description"/>

  <meta content="@intuita_io" name="twitter:site"/>
  <meta content="summary_large_image" name="twitter:card"/>
  <meta name='twitter:image' content='https://raw.githubusercontent.com/intuita-inc/intuita-docs/main/static/img/blog/mocha-to-vitest/mocha-to-vitest-og.jpg'/>
</head>

Read about our practical experience in automating the migration from Mocha.js to Vitest using Intuita. This article provides a detailed overview of streamlining code updates with modern tools.

<!--truncate-->

---
## Introduction

Over the years, the JavaScript community introduced many test runners. The StateOfJS 2022 survey clearly showed developers rapidly abandoned the existing libraries in favor of newer, more efficient ones. It appears a lot of users of Mocha.js started to prefer Vitest due to a better development experience.

Developers are reluctant to migrate from one library to another since it requires planning, execution, and bug fixing. Such reservations do not happen when moving to Vitest. It is a major pain in most library and framework upgrades.

What if there exists a platform that automates the entire process, such as the Mocha.js to Vitest migration?

This is why we built Intuita - a place to create, test, and distribute code automation agents. Using our platform, we created an agent to migrate from Mocha.js to Vitest.

## Why bother migrating to Vitest?

With some test runners, you may spend hours configuring them to execute TypeScript, support ESM or produce code coverage. On the contrary, Vitest provides these features out of the box, which explains its growing popularity.

The introduction of Vite fundamentally changed the way the JavaScript community thought about building tools. It simplified the configuration, leveraged ES modules to reduce the wait time between changes, and supported the most popular component libraries from the get-go. If you already use Vite, you may consider switching your test runner to Vitest to leverage the same setup as your application.

The manual migration from Mocha.js to Vite may take a considerable amount of time, especially when you have a lot of test suites.

You could try to find and replace simple phrases using your IDE to some extent. However, this may not work with adding new imports or replacing multi-line instructions. You probably noticed that code in virtually every language follows a set of rules. Incorrect replacements might confuse the compiler (or a transpiler) or make it refuse to parse the code. It is thus better to perform changes using scripts that respect such rules.

The community calls such scripts codemods or code automation agents.

## **Intuita: The end-to-end platform for code automation at scale**

Creating the code automation agents requires practical skills stemming from the compiler theory, namely navigating around the abstract syntax trees. Interestingly, each compiler and transpiler has its own tree structure, which makes the creation of automation agents difficult. Therefore, if you want to build the agents proficiently, you need to know such structures by heart.

This is the reason we created the platform to build, verify, and distribute the code automation agents.

With the Codemod Studio, you can leverage the existing LLMs to create and test codemods using the JSCodeshift API, a library designed to manipulate abstract syntax trees.

Unfortunately, creating agents easily using Codemod Studio alone is not enough. Orchestrating them to land large-scale changes makes up for another challenge.

It is why we built the Intuita CLI and the Intuita VSCode Extension. They both offer a better DevX for running automation agents. 

We integrated them with the Codemod Studio which allows you to effortlessly export codemods straight into your local environment.

<Figure caption="The architectural diagram of the Intuita Platform, including the planned Web App." src="/img/docs/intuita-platform-architecture.png" />

With that in mind, we will now go over how we leveraged our platform to migrate from Mocha to Vitest; all the way from building the automation agents, to deploying them and landing large-scale changes.

## Mocha to Vitest migration with Intuita

### 1. Building the automation agents

To use the Codemod Studio, you only need two code snippets: one before the transformation and one after.

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

Instead of writing the JSCodeshift codemod ourselves, we can automate it using the Codemod Studio.

Within a few iterations with the AI helper, we got the following codemod:

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

There is another code automation agent we built called `mocha/vitest/migrate-configurations`. Since JSCodeshift does not allow creating and removing files, we introduced another execution model as part of the `filemod engine`.

The filemod we built removes all Mocha.js configuration files, drops the library from all package dependencies, and adds Vitest instead.

Having both a JSCodeshift codemod and a filemod left us with two code automation agents to execute sequentially. To facilitate that, we introduced the concept of a recipe. Our recipes contain information for the codemod runners to execute specific agents one by one and combine the results.

We called the recipe for the described migration `mocha/vitest/recipe`.

### 2. Running the automation agents

We decided to test the recipe over our following repositories:

1. [`intuita/filemod`](https://github.com/intuita-inc/filemod),
2. [`intuita/codemod-engine-node`](https://github.com/intuita-inc/codemod-engine-node),
3. [`intuita/codemod-registry`](https://github.com/intuita-inc/codemod-registry).

The first two had a handful of Mocha.js test suites and we migrated them first to spot problems early in the development.

The Codemod Registry has over 60 test files spread across the entire mono repository. Each repository within the project had its own Mocha.js setup, including configuration files.

Once we merged our code automation agents into the Codemod Registry, we could use them directly from the Intuita VSCode Extension or from the Intuita CLI.

We executed the `mocha/vitest/recipe` against the Filemod repository.

<VideoSwitcher 
lightImageSrc="/img/blog/mocha-to-vitest/running-recipe.mp4"
darkImageSrc="/img/blog/mocha-to-vitest/running-recipe.mp4"/>


We repeated the same steps for the Codemod Engine Node. During testing, we found out Vitest does not transpile TypeScript files if we use them as entry points for thread workers. This functionality used to work with Mocha.js supported by the `ts-node/esm` dependency. We replaced the path to the TS file with a path to the built ESM files to restore the feature.

### 3. **Final tweaks**

When migrating the Codemod Registry, we found unhandled cases, like:

- the usages of the `Context` type from Mocha.js,
- the usages of the `this` variable in test bodies.

We could fix the former problem by putting the existing codemod into the Codemod Studio and asking the AI helper to fix it. With the latter, we fixed the test bodies manually due to the small number of such occurrences. 

Since the Intuita CLI can execute local code automation agents, we used it to see if the changes to the codemod resulted in the correct transformation of the codebase in question. This sped up the development process tremendously.

### 4. A successful migration

With the help of the recipe, we were able to migrate three repositories in a short amount of time. We reused the same code within the recipe for all the projects. Now, other developers may leverage our work as well.

If we were to manually migrate the Codemod Registry alone, we would have to:

1. delete the 60+ existing Mocha.js configuration files (1 minute for each),
2. remove Mocha.js and add Vitest dependencies in 60+ package files (1 minute for each),
3. drop Mocha.js types and put the Vitest import statements in 60+ tests files (2 minutes for each).

It would have taken around 4 hours of mundane work to perform the migration without ensuring we had not introduced any mistakes.

After ensuring the proper quality of the code automation agents, we executed the recipe that transformed over 200 files instantly. We removed all Mocha.js configuration files and thus reduced the complexity of the test suites. Our platform made it all available at the push of a button.

## The future of automated migrations

In the future, as software continues to grow in complexity and dependency, the role of automated dependency upgrades will become increasingly critical.

The introduction and development of LLMs across the software industry will no doubt add to the volume of code and dependencies, transforming codebases into constantly evolving entities. These codebases will regularly evolve and incorporate different or newer versions of their key dependencies and test runners, making the task of manual migration nearly impossible.

Within this context, code automation agents will play a pivotal role. These agents will need to deliver infallible transformations to handle the sheer volume of changes, ensuring that migrations are seamless and error-free. This will help prevent developers from becoming overwhelmed and will maintain the integrity of software projects, even as they grow and change at unprecedented rates.

At Intuita, we are aware of these upcoming challenges and opportunities. That's why we are currently developing a web platform designed specifically for enterprise teams. This platform will provide orchestration for dependency migrations, enabling teams to manage this complex process with ease. This will allow teams to streamline their workflows, reduce the risk of errors, and keep their focus where it matters most: on developing innovative solutions for their users.

## Conclusion

In the rapidly evolving landscape of software development, where change is the only constant, Intuita emerges as a beacon of efficiency and innovation.

This article has journeyed through the specifics of migrating from Mocha.js to Vitest using Intuita's platform, and here are the key takeaways:

1. **Beyond Basic Tools:** Traditional methods like find-and-replace are no longer sufficient for the complex task of migrating large codebases. The intricacies involved in such processes demand a more sophisticated approach. Codemods provide this by enabling complex code transformations that manipulate the codebase on an AST-level.
2. **Leveraging LLM Technology:** The power of Large Language Models (LLMs) in creating codemods is a game-changer. By combining the strengths of tuned LLMs with an improved DevX, Codemod Studio makes the creation of codemods not only faster but more accessible.
3. **Orchestrated Execution:** The orchestration of landing large-scale code changes is crucial in managing the complexities of migration projects. By structuring the execution process, Intuita VSCode extension and CLI helped us ensure that each step of the migration was performed in the correct sequence, avoiding potential errors and inconsistencies.
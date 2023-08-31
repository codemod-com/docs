---
title: Advanced Usage
---

The command-line interface (CLI) to Intuita is the `intuita` command, which accepts a variety of subcommands and options for various preferences. With the Intuita CLI, you can interact with Intuita using a terminal or a script.

If you want to use Intutia through a graphical interface, check out the [Intuita VS Code Extension](/docs/vs-code-extension/quickstart).

---

To view a list of the commands and options available using the Intuita CLI, run `intuita help`:

```
Commands:
  intuita               runs a codemod or recipe                       [default]
  intuita list          lists all the codemods & recipes in the public registry
  intuita syncRegistry  syncs all the codemods from the registry
  intuita learn         exports the current `git diff` in a file to before/after panels in codemod studio

Options:
  --help                 Show help                                   [boolean]
  --version              Show version number                         [boolean]
  --include              Glob pattern(s) for files to include        [array] [default: ["**/*.*{ts,tsx,js,jsx,mjs,cjs,mdx}"]]
  --exclude              Glob pattern(s) for files to exclude        [array] [default: ["**/node_modules/**/*.*"]]
  --targetPath           Input directory path                        [string] [default: "/Users/mohabsameh"]
  --sourcePath           Source path of the local codemod to run     [string]
  --codemodEngine        The engine to use with the local codemod: "jscodeshift", "ts-morph", "repomod-engine" [string]
  --fileLimit            File limit for processing                   [number] [default: 1000]
  --usePrettier          Format output with Prettier                 [boolean] [default: false]
  --useCache             Use cache for HTTP(S) requests              [boolean] [default: false]
  --useJson              Use JSON responses in the console           [boolean] [default: false]
  --threadCount          Number of worker threads                    [number] [default: 4]
  --dryRun               Perform a dry run                           [boolean] [default: false]
  --outputDirectoryPath  Output directory path for dry-run only      [string]
  ```

## Commands

### Running codemods

You can use the `intuita` command to run codemods. The `intuita` command uses the following format:

```bash
intuita [codemod name]
```

:::note
By default, using the `intuita` cli command will run the codemod over the current directory. To run codemods over a specific file, use the [`--targetPath` option](#--targetpath).
:::

### Listing all public codemods

The `list` command can be used to list all codemods available in the [Codemod Registry](https://github.com/intuita-inc/codemod-registry). This command uses the following format:

```bash
intuita list
```

### Getting codemod metadata

The `syncRegistry` command can be used to sync local codemods with the public [Codemod Registry](https://github.com/intuita-inc/codemod-registry). This command uses the following format:

```bash
intuita syncRegistry
```

### Generate codemod from file diff (Experimental)

The `learn` command can be used to intelligently generate a codemod using the diff of the latest edited file.

By running the `learn` command, Intuita will check if there is any git diff in the last modified file. If some git diff exists, Intuita will use the diff as before/after snippets in [Codemod Studio](https://codemod.studio). This command uses the following format:

```bash
intuita learn
```

:::caution
Please note that this is a highly experimental beta feature and may produce inaccurate results. If you encounter any issues, please [leave us some feedback here](https://feedback.intuita.io/feature-requests-and-bugs).
:::

:::tip
To detect changes only in a specific path or file, you can use the [`--targetPath` option](#--targetpath).
:::

---

## Options

The following options can be used to change the default behavior of the Intuita CLI. Option-specific information is provided below.

### `--include`

The `--include` option can be used to specify a glob pattern of the files to be targeted by the codemod.

This option uses the following format:

```bash
intuita [codemod name] --include "[glob pattern]"
```

:::tip
You can specify your glob patterns to include specific file formats or directory structures. The default pattern Intuita CLI uses is: `--include "**/*.*{ts,tsx,js,jsx,mjs,cjs,mdx}"`.
:::

### `--exclude`

While running a codemod, you may want to prevent changes from occurring to specific parts of your project. The `--exclude` option can be used to specify a glob pattern of the files to be ignored by the codemod.

This option uses the following format:

```bash
intuita [codemod name] --exclude "[glob pattern]"
```

:::tip
By default, the Intuita CLI excludes the following glob pattern: `--exclude "**/node_modules/**/*.*"`. If you are using your own glob pattern, we recommend excluding the `node_modules` directory to avoid unnecessary codemod runs.
:::

### `--targetPath`

The `--targetPath` option can be used to specify the directory of your project that Intuita should target while running codemods.

This option is set as the current directory by default.

This option uses the following format:

```bash
intuita [codemod name] --targetPath [path]
```

### `--sourcePath`

The `--sourcePath` option can be used to specify the path to a local codemod you want to run using Intuita.

:::tip
Running local codemods requires specifying the codemod engine your codemod uses. You can do this by using the [`--codemodEngine` option](#--codemodengine).
:::

This option uses the following format:

```bash
intuita --sourcePath [path] --codemodEngine [codemod engine]
```

### `--codemodEngine`

The `--codemodEngine` option can be used to specify the codemod engine that will be used while running the codemod.

The `--codemodEngine` option now supports three engines: `jscodeshift`, `ts-morph`, and `repomod-engine`.

:::tip
This option is used when running a local codemod using the `--sourcePath` optoin.
:::

### `--fileLimit`

The `--fileLimit` option can be used to specify a limit to the number of files targeted by the codemod. The file limit is set to `1000` by default.

This option uses the following format:

```bash
intuita [codemod name] --fileLimit [number]
```

### `--usePrettier`

The `usePrettier` option can be used to enable/disable prettier formatting to the files affected by the codemod. This option is set to `false` by default.

This option uses the following format:

```bash
intuita [codemod name] --usePrettier [true/false]
```

### `--useCache`

The `--useCache` option can be used to enable/disable caching downloaded codemod files. Enabling cache can help you save bandwidth and time for repetitive use of the same codemods. While disabling cache ensures you fetch the latest version of the codemod. This option is set to `false` by default.

This option uses the following format:

```bash
intuita [codemod name] --useCache [true/false]
```

### `--useJson`

The `--useJson` option can be used to switch Intuita's CLI responses to JSON format.

This option uses the following format:

```bash
intuita [codemod name] --useJson
```

### `--threadCount`

The `--threadCount` option can be used to specify the number of worker threads Intuita uses while running codemods. This option is set to 4 threads by default.

This option uses the following format:

```bash
intuita [codemod name] --threadCount [number of threads]
```

### `--dryRun`

The `--dryRun` option can be used to switch to dry run mode. Dry running codemods helps you see the changes the codemod will do without affecting the project files.

:::tip
Dry running codemods requires specifying the output directory to which the codemod's changes will be written. You can do this by using the `--outputDirectoryPath` option.
:::

This option uses the following format:

```bash
intuita [codemod name] --dryRun true --outputDirectoryPath [path]
```

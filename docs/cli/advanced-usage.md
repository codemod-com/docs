---
title: Advanced Usage
---

# Advanced Usage

The command-line interface (CLI) to Intuita is the `intuita` command, which accepts a variety of subcommands and options for various preferences. With the Intuita CLI you can interact with Intuita using a terminal or a script.

If you want to use Intutia through a graphical interface, check out the [Intuita VS Code Extension](/docs/vs-code-extension/quickstart).


---

To view a list of the commands and options available using the Intuita CLI, run `intuita --help`:

```
Commands:
  intuita                  run a codemod                               [default]
  intuita listNames        list the codemod names
  intuita getMetadataPath  list the codemod names

Options:
  --help                Show help                                      [boolean]
  --version             Show version number                            [boolean]
  --includePattern      Glob pattern(s) for files to include
                        [array] [default: ["**/*.*{ts,tsx,js,jsx,mjs,cjs,mdx}"]]
  --excludePattern      Glob pattern(s) for files to exclude
                                   [array] [default: ["**/node_modules/**/*.*"]]
  --inputDirectoryPath  Input directory path[string] [default: "C:\Users\Mohab"]
  --name                Name of the codemod in the registry  [string] [required]
  --fileLimit           File limit for processing       [number] [default: 1000]
  --usePrettier         Format output with Prettier   [boolean] [default: false]
  --useCache            Use cache for HTTP(S) requests[boolean] [default: false]
  ```

## Commands

### Running codemods using `run`
 The `run` command is used to run a codemod using Intuita. The `run` command uses the following format: 
```
intuita run --name [codemod name]
```

:::note
Using the `run` cli command will run the codemod over the current directory. Intuita CLI will support path targeting soon.

In the meantime, you can either navigate to your target path before running the codemod, or use the Intuita VSCE to [run codemods over specific paths](/docs/vs-code-extension/running-codemods#choosing-the-codemod-path-optional).
:::

### List all codemods using `listNames`
The `listNames` command is used to list all codemods available in the [Codemod Registry](https://github.com/intuita-inc/codemod-registry). This command uses the following format: 
```
intuita listNames
```

### Get codemod metadata using `getMetadataPath`
The `getMetadataPath` command can be used to get the path to a codemod's metadata `config.json` file. This command uses the following format:
```
intuita getMetadataPath --name [codemod name]
```


## Options

The following options can be used to change the default behavior of the Intuita CLI. Option-specific information is provided below.


### `--includePattern`
When running a codemod, you can use the `--includePattern` option followed an array that includes the pattern of files to be affected during the codemod run. This option uses the following format:
```
intuita run --name [codemod name] --includePattern "[pattern]"
```
:::tip
You can specify your own patterns to include specific file formats or directory structures. The default pattern Intuita CLI uses is: `--includePattern "**/*.*{ts,tsx,js,jsx,mjs,cjs,mdx}"`.
:::


### `--excludePattern`
While running a codemod, you may want to prevent changes from occurring to specific parts of your project. You can use the `--excludePattern` option followed an array that includes the pattern of files to be ignored. This option uses the following format:
```
intuita run --name [codemod name] --excludePattern "[pattern]"
```
:::tip
By default, the Intuita CLI excludes the following pattern: `--excludePattern "**/node_modules/**/*.*"`. If you are using your own exclude pattern, we recommend excluding the `node_modules` directory to avoid unecessary codemod runs.
:::

### `--inputDirectoryPath`

### `--fileLimit`

### `--usePrettier`

### `--useCache`

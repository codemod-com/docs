---
title: Advanced Usage
---

# Advanced Usage

The command-line interface (CLI) to Intuita is the `intuita` command, which accepts a variety of subcommands and options for various preferences. With the Intuita CLI, you can interact with Intuita using a terminal or a script.

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

### Running codemods
 The `run` command is used to run codemods. The `run` command uses the following format: 
```
intuita run --name [codemod name]
```

:::note
By default, using the `run` cli command will run the codemod over the current directory. Intuita CLI will support path targeting soon.

In the meantime, you can either navigate to your target path before running the codemod or use the Intuita VSCE to [run codemods over specific paths](/docs/vs-code-extension/running-codemods#choosing-the-codemod-path-optional).
:::

### Listing all public codemods
The `listNames` command can be used to list all codemods available in the [Codemod Registry](https://github.com/intuita-inc/codemod-registry). This command uses the following format: 
```
intuita listNames
```

### Getting codemod metadata
The `getMetadataPath` command can be used to get the path to a codemod's metadata `config.json` file. This command uses the following format:
```
intuita getMetadataPath --name [codemod name]
```


## Options

The following options can be used to change the default behavior of the Intuita CLI. Option-specific information is provided below.


### `--includePattern`
The `--includePattern` option can be used to specify a glob pattern of the files to be targeted by the codemod.

This option uses the following format:
```
intuita run --name [codemod name] --includePattern "[pattern]"
```
:::tip
You can specify your glob patterns to include specific file formats or directory structures. The default pattern Intuita CLI uses is: `--includePattern "**/*.*{ts,tsx,js,jsx,mjs,cjs,mdx}"`.
:::


### `--excludePattern`
While running a codemod, you may want to prevent changes from occurring to specific parts of your project. The `--excludePattern` option can be used to specify a glob pattern of the files to be ignored by the codemod.

This option uses the following format:
```
intuita run --name [codemod name] --excludePattern "[pattern]"
```
:::tip
By default, the Intuita CLI excludes the following pattern: `--excludePattern "**/node_modules/**/*.*"`. If you are using your own exclude pattern, we recommend excluding the `node_modules` directory to avoid unnecessary codemod runs.
:::

### `--inputDirectoryPath`
The `--inputDirectoryPath` option can be used to specify the root directory of your project that Intuita should target while running codemods. This option is set as the current directory by default.

This option uses the following format:
```
intuita run --name [codemod name] --inputDirectoryPath "[path]"
```

### `--fileLimit`
The `--fileLimit` option can be used to specify a limit to the number of files targeted by the codemod. The file limit is set to `1000` by default.

This option uses the following format:
```
intuita run --name [codemod name] --fileLimit [number]
```

### `--usePrettier`
The `usePrettier` option can be used to enable/disable prettier formatting to the files affected by the codemod. This option is set to `false` by default.

This option uses the following format:
```
intuita run --name [codemod name] --usePrettier [true/false]
```

### `--useCache`
The `--useCache` option can be used to enable/disable caching downloaded codemod files. Enabling cache can help you save bandwidth and time for repetitive use of the same codemods. While disabling cache ensures you fetch the latest version of the codemod. This option is set to `false` by default.

This option uses the following format:
```
intuita run --name [codemod name] --useCache [true/false]
```

[vite 中配置 eslint](https://www.npmjs.com/package/vite-plugin-eslint?activeTab=readme)

```js
yarn add eslint vite-plugin-eslint eslint-plugin-vue standard -D
```

执行`npx eslint --init`生成配置文件。
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ddb52c9057174d0293bdfed730e7516d~tplv-k3u1fbpfcp-watermark.image?)

**注意：vscode 的 eslint 插件只能给出格式错误提示和自动格式化。而不是安装了插件就可以有格式提示。还需要我们在开发的时候安装对应的 eslint 包，配置是否开启对应的格式检查。从而配合 vscode 的插件。**

他一般和 prettier 代码格式化工具配合使用。并结合 vscode prettier code formatter 插件来达到格式化代码的效果（保存代码时）

```js
// .prettierrc
{
  "useTabs": false,
  "tabWidth": 4,
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false,
  "endOfLine": "auto"
}
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6845d43b6fe34677a9cac473bb762015~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b6052b7fedd4032b1333467e1207ee5~tplv-k3u1fbpfcp-watermark.image?)

## git 提交规范

一般都会遵循 angular 团队的提交规范。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c59e87042ae84e8cb160d7a0993875a5~tplv-k3u1fbpfcp-watermark.image?)

如果我们提交代码时自己去遵循这种规范，那将是很痛苦的。所以我们需要工具来代替我们完成。

commitizen，他表示当我们使用 commitizen 进行代码提交（git commit）时, commitizen 会提交你在提交时填写的所有必须的提交字段。

下面我们来看其具体使用。

全局安装 commitizen

```js
yarn add commitizen -g
```

安装并配置 cz-customizable 插件。

```js
yarn add cz-customizable -D
```

```js
// package.json
 "config": {
    "commitizen": {
      "path": "node_modules/cz-customizable"
    }
  }
```

项目根目录下创建`.cz-config.js`自定义提示文件。并且将 package.json 中的 type 改成 commonjs。

```js
module.exports = {
  //  可选类型
  types: [
    { value: 'feat', name: 'feat: 新功能' },
    { value: 'fix', name: 'fix: 修复' },
    { value: 'docs', name: 'docs: 文档变更' },
    { value: 'style', name: 'style: 代码格式(不影响代码运行的变动)' },
    { value: 'refactor', name: 'refactor: 重构代码' },
    { value: 'perf', name: 'perf: 性能优化' },
    { value: 'test', name: 'test: 测试' },
    { value: 'chore', name: 'chore: 构建过程或辅助工具的变动' },
    { value: 'revert', name: 'revert: 回滚' },
    { value: 'build', name: 'build: 打包' }
  ],
  // 消息步骤
  messages: {
    type: '选择你的提交类型:',
    customScope: '选择你的修改范围(可选):',
    subject: '请简要描述提交(必填):',
    body: '请输入详细内容(可选):',
    footer: '请输入要关闭的issue(可选):',
    confirmCommit: '确认提交？(y/n)'
  },
  // 跳过问题
  skipQuestions: ['body', 'footer'],
  // subject文字长度默认72
  subjectLimit: 72
}

// module.exports = {
//   types: [
//     { value: 'feat', name: 'feat:     A new feature' },
//     { value: 'fix', name: 'fix:      A bug fix' },
//     { value: 'docs', name: 'docs:     Documentation only changes' },
//     {
//       value: 'style',
//       name:
//         'style:    Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)',
//     },
//     {
//       value: 'refactor',
//       name: 'refactor: A code change that neither fixes a bug nor adds a feature',
//     },
//     {
//       value: 'perf',
//       name: 'perf:     A code change that improves performance',
//     },
//     { value: 'test', name: 'test:     Adding missing tests' },
//     {
//       value: 'chore',
//       name:
//         'chore:    Changes to the build process or auxiliary tools\n            and libraries such as documentation generation',
//     },
//     { value: 'revert', name: 'revert:   Revert to a commit' },
//     { value: 'WIP', name: 'WIP:      Work in progress' },
//   ],

//   scopes: [{ name: 'accounts' }, { name: 'admin' }, { name: 'exampleScope' }, { name: 'changeMe' }],

//   allowTicketNumber: false,
//   isTicketNumberRequired: false,
//   ticketNumberPrefix: 'TICKET-',
//   ticketNumberRegExp: '\\d{1,5}',

//   // it needs to match the value for field type. Eg.: 'fix'
//   /*
//   scopeOverrides: {
//     fix: [
//       {name: 'merge'},
//       {name: 'style'},
//       {name: 'e2eTest'},
//       {name: 'unitTest'}
//     ]
//   },
//   */
//   // override the messages, defaults are as follows
//   messages: {
//     type: "Select the type of change that you're committing:",
//     scope: '\nDenote the SCOPE of this change (optional):',
//     // used if allowCustomScopes is true
//     customScope: 'Denote the SCOPE of this change:',
//     subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
//     body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
//     breaking: 'List any BREAKING CHANGES (optional):\n',
//     footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
//     confirmCommit: 'Are you sure you want to proceed with the commit above?',
//   },

//   allowCustomScopes: true,
//   allowBreakingChanges: ['feat', 'fix'],
//   // skip any questions you want
//   skipQuestions: ['body'],

//   // limit subject length
//   subjectLimit: 100,
//   // breaklineChar: '|', // It is supported for fields body and footer.
//   // footerPrefix : 'ISSUES CLOSED:'
//   // askForBreakingChangeFirst : true, // default is false
// };
```

但是这样只是在使用`git cz`的情况下才可以做到规范化提交。但是还是可以使用`git commit`来提交的。所以我们要杜绝使用`git commit`直接进行**不规范的**提交。

可以使用[`commitlint`](https://github.com/conventionalcommit/commitlint)来达到效果。**主要的目的是检测提交信息的规范性。**

```js
yarn add @commitlint/config-conventional @commitlint/cli -D
```

在根目录创建 commitlint.config.js 文件，配置 commitlint

```js
module.exports = {
  // 继承规则
  extends: ['@commitlint/config-conventional'],
  // 定义规则
  roles: {
    // type的类型定义: 表示git提交的type必须在以下类型范围之内
    'type-enum': [
      // 提交类型
      // 当前验证错误的级别
      2,
      // 在什么情况可以验证
      'always',
      // 泛型内容
      [
        'feat', // 新功能
        'fix', // 修复
        'docs', // 文档变更
        'style', // 代码格式(不影响代码运行的变动)
        'refactor', // 重构代码
        'perf', // 性能优化
        'test', // 测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回滚
        'build' // 打包
      ]
    ],
    // subject大小写不做校验
    'subject-case': [0]
  }
}
```

**有了 commitlint 配置，我们还需要执行在什么时机触发 git 消息提交检验，所以需要使用[`husky`](https://github.com/typicode/husky)来完成。** 主要是监听`commit-msg`钩子来校验其规范性。

**husky 是一个 git hook 工具，可以帮助我们触发 git 提交的各个阶段：pre-commit、commit-msg、pre-push。**

```js
yarn add husky -D
```

启动 husky，生成.husky 文件夹

```js
yarn husky install
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ef9e681fcaf485eaaa50955ca6c9e86~tplv-k3u1fbpfcp-watermark.image?)
在 package 中配置指令。

```js
prepare: 'husky install'
```

添加 commitlint 的 hook 到 husky 中，并指令在 commit-msg 的 hooks 下执行`npx --no-install commitlint --edit "$1"`指令。

```js
yarn husky add .husky/commmit-msg 'npx --no-install commitlint --edit "$1"'
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/abfda282c1e5433c90c6123ac939f7ac~tplv-k3u1fbpfcp-watermark.image?)

可能有些人提交代码，代码并不是很规范(例如未配置代码保存时格式化)。所以我们需要监听提交的钩子函数，来做一些代码格式化工作。所以我们依旧是使用`husky`来监听 git hooks 触发，然后做一些校验工作。

**所以需要监听`pre-commit`钩子来对代码进行格式化。**

```js
yarn husky add .husky/pre-commit "npx eslint --ext .js,.vue src"
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/37a414c9dcdb4cd1b31a1f4b92085cfb~tplv-k3u1fbpfcp-watermark.image?)

我们修改一个文件，测试发现。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f4e04ff4e2de44a6bec715e2e6277d75~tplv-k3u1fbpfcp-watermark.image?)

上面这种方式只能提示代码处做的位置，**并且还会检查 src 目录下的所有代码，浪费大量时间。我们只需要检测修改后的代码文件即可。** 所以我们需要使用[`lint-staged`](https://github.com/okonet/lint-staged)只检查本次修改更新的代码，并在出现错误的时候，自动修复并推送。

```js
// package.json
"gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "src/**/*.{js,vue}": [
      "eslint --fix",
      "git add"
    ]
  }
```

然后将`.husky/pre-commit`文件下的`npx eslint --ext .js,.vue src`修改成`npx lint-staged`。

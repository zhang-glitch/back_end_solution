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

## svg 图标使用

一般项目中，我们会使用到组件库提供的 svg 图标，如果不能满足条件，我们也会使用自定义的 svg 图标，那么如何使用呢？我们将对 svg 图标的使用封装成一个通用的组件。

在 webpack 中实现 svg 图标注册。使用[`require.context()`](https://webpack.docschina.org/guides/dependency-management/#requirecontext)来引入指定文件夹下的所有 svg 图标。

```js
import SvgIcon from '@/components/SvgIcon'

//
// 通过 require.context() 函数来创建自己的 context
const svgRequire = require.context('./svg', false, /\.svg$/)
// 此时返回一个 require 的函数，可以接受一个 request 的参数，用于 require 的导入。
// 该函数提供了三个属性，可以通过 require.keys() 获取到所有的 svg 图标
// 遍历图标，把图标作为 request 传入到 require 导入函数中，完成本地 svg 图标的导入
svgRequire.keys().forEach((svgIcon) => svgRequire(svgIcon))

export default (app) => {
  app.component('svg-icon', SvgIcon)
}
```

并且需要使用[`svg-sprite-loader`](https://github.com/JetBrains/svg-sprite-loader)插件来协助我们显示 svg 图标。

```js
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack(config) {
    // 设置 svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
```

但是在 vite 中，我们可以通过插件完成，[具体看这里](https://juejin.cn/post/7251878440327512124#heading-10)

## element-plus 表单验证要素

- el-form 指定 model,rules 字段。
- el-form-item 指定 prop 字段。

并且可以通过`validator`来自定义校验规则。[具体参考这里](https://element-plus.org/zh-CN/component/form.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99)

## 接口设计

对于接口的设计，如果可以参入后端设计，最好让后端都返回一个标识，来表示当前请求是否成功，方便我们在拦截器中做 message 提示。

```js
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    //   要根据success的成功与否决定下面的操作
    if (success) {
      ElMessage.success(message)
      // 成功返回解析后的数据
      return data
    } else {
      // 业务错误
      ElMessage.error(message) // 提示错误消息
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // 处理 token 超时问题
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // token超时
    }
    ElMessage.error(error.message) // 提示错误信息
    return Promise.reject(error)
  }
)
```

在响应拦截器统一处理 message 提示。让我们在页面逻辑中不需要在过多的判断，来处理 message 消息。

我们注意到上面出现错误，我们将返回一个 error promise。所以如果在页面中我们想要控制加载的状态。我们可以通过 try catch 来捕获错误。无论成功还是失败，都关闭加载状态。

```js
const store = useStore()
const loading = ref(false)
/**
 * 对于接口设计，最好都返回一个成功 / 失败的标识。让我们更好的在axios难解其中处理message提示，然后返回error promise。

 在代码逻辑中就不需要处理message了。只需要去判断按钮加载的状态即可。
 */
const handleLogin = async () => {
  loading.value = true
  try {
    await store.dispatch('user/postLogin', loginForm.value)
  } finally {
    loading.value = false
  }
}
```

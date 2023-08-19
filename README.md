## 代码编写规范

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
  rules: {
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
yarn husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07415392dd564a6b965bb73138de4af9~tplv-k3u1fbpfcp-watermark.image?)

可能有些人提交代码，代码并不是很规范(例如未配置代码保存时格式化)。所以我们需要监听提交的钩子函数，来做一些代码格式化工作。所以我们依旧是使用`husky`来监听 git hooks 触发，然后做一些校验工作。

**所以需要监听`pre-commit`钩子来对代码进行格式化。**

```js
yarn husky add .husky/pre-commit "npx eslint --ext .js,.vue src"
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/37a414c9dcdb4cd1b31a1f4b92085cfb~tplv-k3u1fbpfcp-watermark.image?)

我们修改一个文件，测试发现。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f4e04ff4e2de44a6bec715e2e6277d75~tplv-k3u1fbpfcp-watermark.image?)

上面这种方式只能提示代码出错的位置，**并且还会检查 src 目录下的所有代码，浪费大量时间。我们只需要检测修改后的代码文件即可。** 所以我们需要使用[`lint-staged`](https://github.com/okonet/lint-staged)只检查本次修改更新的代码，并在出现错误的时候，自动修复并推送。

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

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f61a766330aa48cfa067a19bc65f6641~tplv-k3u1fbpfcp-watermark.image?)

[案例代码](https://github.com/zhang-glitch/back_end_solution/tree/programming-specification)

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

## 退出登录

- 清除当前用户缓存的数据
- 清除掉权限相关的配置
- 返回登录页面

主动退出和被动退出

- 主动退出：用户点击退出按钮
- 被动退出：token 失效或者单点登录。（**这些都是后端判断完毕，返回不同的状态码，前端在拦截器中处理一下就行。**）

### 被动退出，主动处理

在前端判断 token 是否过期，过期后，直接退出。

- 登录成功后，我们保存一个时间戳在 localStorage 中。
- 设置一个过期时间，每次请求判断当前 token 是否在过期时间段内。

```js
/**
 * 获取时间戳
 */
export function getTimeStamp() {
  return getItem(TIME_STAMP)
}
/**
 * 设置时间戳
 */
export function setTimeStamp() {
  setItem(TIME_STAMP, Date.now())
}
/**
 * 是否超时
 */
export function isCheckTimeout() {
  // 当前时间戳
  const currentTime = Date.now()
  // 缓存时间戳
  const timeStamp = getTimeStamp()
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
```

## vite 中 js 使用 scss 变量

文件命名`...module.scss`。以`module.scss`为后缀。然后通过`:export`进行导出，即可在 js 中导入直接使用。[具体可查看这里](https://www.bluematador.com/blog/how-to-share-variables-between-js-and-sass)

```js
// sidebar
$menuText: #bfcbd9;
$menuActiveText: #ffffff;
$subMenuActiveText: #f4f4f5;

$menuBg: #304156;
$menuHover: #263445;

$subMenuBg: #1f2d3d;
$subMenuHover: #001528;

$sideBarWidth: 210px;

$hideSideBarWidth: 54px;
$tagViewsList:#42b983;

// 处理动画时长
$sideBarDuration: 0.28s;
// JS 与 scss 共享变量，在 scss 中通过 :export 进行导出，在 js 中可通过 ESM 进行导入
:export {
  menuText: $menuText;
  menuActiveText: $menuActiveText;
  subMenuActiveText: $subMenuActiveText;
  menuBg: $menuBg;
  menuHover: $menuHover;
  subMenuBg: $subMenuBg;
  subMenuHover: $subMenuHover;
  sideBarWidth: $sideBarWidth;
  tagViewsList:#42b983;
}
```

## 菜单列表处理

一般情况下，我们都会通过当前用户的路由列表来获取到对应的菜单列表。所以我们就需要去处理一些路由列表。

获取路由表

- [`router.options.routes`](https://router.vuejs.org/zh/api/interfaces/RouterOptions.html#Properties-routes): 获取初始路由表 （新增的路由表无法获取到）
- [`router.getRoutes()`](https://router.vuejs.org/zh/api/interfaces/Router.html#Methods-getRoutes): 获取所有路由列表。**并且可以获取父级路由和子级路由。**

由于`router.getRoutes()`获将二级路由也获取到当前列表中。所以我们需要将其过滤掉。我们只是用，嵌套路由下的列表即可。而无需将其提升到一级路由。

```js
/**
 * 获取全部二级路由
 通过当前嵌套路由的children来获取即可。
 */

function getRouteChildren(routes) {
  const _routes = []
  for (const item of routes) {
    if (item?.children?.length > 0) {
      _routes.push(...item.children)
    }
  }
  return _routes
}
```

过滤二级路由，因为我们菜单列表展示的和我们路由列表的结构是一样的。所以我们需要将二级路由过滤掉。

```js
/**
 * 过滤重复路由
 */
export function filterRoutes(routes) {
  // 获取二级路由
  const routeChildren = getRouteChildren(routes)
  return routes.filter((item) => {
    return !routeChildren.find((route) => route.path === item.path)
  })
}
```

然后就是处理那些路由是在菜单栏中可见的。这个需要根据你们的逻辑来判断。主要就是递归处理 route.children 中的路由而已。

下面来介绍 menu 组件的一些属性

```js
:collapse // 是否·折叠菜单
:default-active // 当前选中的菜单，这个和每个item的index的值相匹配。一般我们会使用path来作为index的值。
:background-color // 背景颜色
:text-color // 文字颜色
:active-text-color // 当前选中的文字颜色
:unique-opened="true" // 是否只展开一个submenu
:collapse-transition // 是否使用折叠动画·
router // 开启路由，他会将item的index作为路由的path。
```

在设计菜单组件的时候，我们需要将子菜单封装成一个·组件，这样便于我们处理嵌套菜单。

```js
<template>
  <!-- 判断是否直接展示menu-item还是submenu-item -->
  <el-sub-menu v-if="menu.children.length > 0" :index="menu.path">
    <template #title>
      <menu-item :title="menu.meta.title" :icon="menu.meta.icon"></menu-item>
    </template>
    <!-- 循环渲染，多层menu -->
    <side-bar-item
      v-for="route in menu.children"
      :menu="route"
      :key="route.path"
    ></side-bar-item>
  </el-sub-menu>
  <el-menu-item v-else :index="menu.path">
    <menu-item
      :title="menu.meta.title"
      :icon="menu.meta.icon"
      :iconName="menu.meta.iconName"
    ></menu-item>
  </el-menu-item>
</template>
```

[案例代码](https://github.com/zhang-glitch/back_end_solution/tree/layout-design)

## el-dropdown 中使用 el-tooltip 出现警告

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d66f0aba04c405eb87178d2576f29c6~tplv-k3u1fbpfcp-watermark.image?)
需要将 el-tooltip 组件包裹一层。

```js
 <el-dropdown @command="handleLanguageSelect" trigger="click">
  <!-- 这里需要包裹一层，不然会报错 -->
  <div>
    <el-tooltip :effect="effect" :content="$t('msg.navBar.lang')">
      <svg-icon
        id="guide-lang"
        icon="language"
        class="language-icon"
      ></svg-icon>
    </el-tooltip>
  </div>
  <template #dropdown>
    <el-dropdown-menu>
      <el-dropdown-item :disabled="language === 'zh'" command="zh">
        中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language === 'en'" command="en">
        English
      </el-dropdown-item>
    </el-dropdown-menu>
  </template>
</el-dropdown>
```

## 国际化

对于国际化，我们需要处理两部分。一部分是组件库的国际化，一部分是我们自己文本的国际化。

- 组件库国际化，我们可以使用对应组件库提供的 api 来完成。比如，element-plus。

```js
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

app.use(ElementPlus, {
  locale: store.getters.language === 'zh' ? zhCn : en
})
```

- 自定义国际化。我们需要定义对应的语言包。就是将对应的文本事先编写多种对应的语言。然后使用[`vue-i18n`](https://vue-i18n.intlify.dev/guide/introduction.html)来注册我们的语言包。

```js
import { createI18n } from 'vue-i18n'
import zhLocale from './lang/zh'
import enLocale from './lang/en'
import store from '@/store'

const messages = {
  en: {
    msg: {
      ...enLocale
    }
  },
  zh: {
    msg: {
      ...zhLocale
    }
  }
}

const i18nInstance = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  messages,
  locale: store.getters.language
})

export default i18nInstance
```

语言包

```js
// zh.js
export default {
  login: {
    title: '用户登录',
    loginBtn: '登录',
    usernameRule: '用户名为必填项',
    passwordRule: '密码不能少于6位',
    usernamePlaceholder: '请输入用户名',
    passwordPlaceholder: '请输入密码'
  }
}
```

```js
// en.js
export default {
  login: {
    title: 'User Login',
    loginBtn: 'Login',
    usernameRule: 'Username is required',
    passwordRule: 'Password cannot be less than 6 digits',
    usernamePlaceholder: 'please enter your username',
    passwordPlaceholder: 'please enter your password'
  }
}
```

## v-bind 的最佳实践（多个组件使用相同的 css）

对于多个组件都需要使用相同的 css 时，我们需要在每个组件根元素上绑定`v-bind='$attrs'`。然后只需要在使用该组件的父组件中设置对应的 class 即可将这些 class 加载对应的组件中，达到 css 复用的目的。

**对于`class`而言，单一根元素，会被主动加在根元素上。** 多个根元素，我们就需要使用`v-bind="$attrs"`来指定具体绑定到哪个元素上了。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cad15ccc9b7c4fa1b5df724c92f84973~tplv-k3u1fbpfcp-watermark.image?)

```js
// right-wrapper-item 会挂载到对应组件的根组件上。
 <!-- 主题更换 -->
  <theme-select class="right-wrapper-item"></theme-select>
  <!-- 国际化 -->
  <language-select
    effect="dark"
    class="right-wrapper-item"
  ></language-select>
```

如果不想让其挂载到根标签，我们需要设置`inheritAttrs: false`，来阻止这种默认行为。 **不管`inheritAttrs`设置成`true`还是`false`，都可以通过`attrs`获取到全部的非 props。包括`class, style`。**

```js
// 设置inheritAttrs: false， 添加的class,style，等等非props属性都不会挂载到根标签上。
defineOptions({
  inheritAttrs: false
})

const attrs = useAttrs()
console.log(attrs)
```

## 主题切换

了解了国际化，我们就来了解一下主题切换吧。他也是主要分为组件库的主题和我们自己内容的主题。

对于组件库的主题切换，我们就直接修改他的 css 变量就行了。例如 element-plus

- 获取当前 elemen-plus 的所有样式。我们可以通过 cdn 进行获取当前版本的 css 文件

```js
async function getElementPlusStyles() {
  const { version } = await import('element-plus/package.json')
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const styles = await axios(url)
  return styles.data
}
```

- 找到我们想要替换的样式部分，通过正则完成替换。

我们需要事先定义好，替换的颜色标志。（**根据 element-plus 提供的颜色值**）

```js
// element-plus 默认色值
const colorMap = {
  '#3a8ee6': 'shade-1',
  '#409eff': 'primary',
  '#53a8ff': 'light-1',
  '#66b1ff': 'light-2',
  '#79bbff': 'light-3',
  '#8cc5ff': 'light-4',
  '#a0cfff': 'light-5',
  '#b3d8ff': 'light-6',
  '#c6e2ff': 'light-7',
  '#d9ecff': 'light-8',
  '#ecf5ff': 'light-9'
}
```

用正则替换掉获取到的 css 文本中的对应的颜色值为标记。例如（#3a8ee6 => shade-1）

```js
/**
 * 将主题颜色对应的css值改成对应的关键标志
 */

async function generateElementPlusTemplate() {
  // 获取elementplus样式表
  let styles = await getElementPlusStyles()
  // element-plus 默认色值
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }

  Object.keys(colorMap).forEach((key) => {
    // 将主题颜色替换成对应的标志。 例如（#3a8ee6 => shade-1）
    styles = styles?.replace(new RegExp(key, 'ig'), colorMap[key])
  })
  return styles
}
```

将 styles 文本中的标志替换成我们当前的主题色，在此之前，我们还需要处理一下根据当前主题色生成其他对应的辅色。

这里需要使用到两个库来处理[`css-color-function`](https://www.npmjs.com/package/css-color-function)他是用来处理 color()生成 rgb 颜色值，[`rgb-hex`](https://www.npmjs.com/package/rgb-hex)他是将 rgb 颜色转换成 16 进制颜色值。

定义根据主色生成辅色对象

```js
//themeTemplate
{
  "shade-1": "color(primary shade(10%))",
  "light-1": "color(primary tint(10%))",
  "light-2": "color(primary tint(20%))",
  "light-3": "color(primary tint(30%))",
  "light-4": "color(primary tint(40%))",
  "light-5": "color(primary tint(50%))",
  "light-6": "color(primary tint(60%))",
  "light-7": "color(primary tint(70%))",
  "light-8": "color(primary tint(80%))",
  "light-9": "color(primary tint(90%))",
  "subMenuHover": "color(primary tint(70%))",
  "subMenuBg": "color(primary tint(80%))",
  "menuHover": "color(primary tint(90%))",
  "menuBg": "color(primary)"
}
```

```js
/**
 * @param {*} currentColor 当前主题色
 * 更改color模板对应的color函数，根据传入的颜色值，将其转化成对应的16进制颜色值
 */
export function generateColors(currentColor) {
  if (!currentColor) return
  // 定义颜色模板对象
  const colors = {
    primary: currentColor
  }

  Object.keys(themeTemplate).forEach((key) => {
    // 先将primary替换成对应的颜色值
    const theme = themeTemplate[key].replace('primary', currentColor)
    colors[key] = '#' + rgbHex(color.convert(theme))
  })
  return colors
}
```

- 把替换后的样式写入到 style 标签中，利用样式优先级的特性代替固有样式。

生成完毕后，我们就可以替换掉 styles 中的标志了。然后生成 style 再插入到 head 中。

```js
/**
 *
 * @param {*} currentColor 当前主题颜色
 *  修改样式表模板,生成最终element-plus
 */
export async function generateStyleTemplate(currentColor) {
  // 获取主题颜色模板对象
  const colors = generateColors(currentColor)
  // 获取当前styles模板
  let styles = await generateElementPlusTemplate()
  // 修改模板中对应位置的值
  Object.keys(colors).forEach((key) => {
    styles = styles.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + colors[key]
    )
  })

  return styles
}

/**
 *
 * @param {*} currentColor 当前主题颜色
 * 将样式表插入到head中
 */
export async function insertStyleToPage(currentColor) {
  const style = document.createElement('style')
  style.innerText = await generateStyleTemplate(currentColor)
  document.head.appendChild(style)
}
```

对于第三方包主题，他是不可控的，我们需要拿到他编译后的 css 进行色值替换，利用 style 内部样式表优先级高于外部样式表的特性，来进行主题替换。

对于自定义内容主题，我们只需要改变对应的 css 变量即可。在项目开发时，我们的 menu 菜单背景等，都是通过 js 变量的方式绑定到 css 中的。所以我们可以很轻松的改变 js 变量来达到 css 的变化。

比如在 vuex 中设置 getters，当主题色发生变化，该 getters 就会重新计算，然后就会得到新的颜色变量并赋值。

```js
 // scss变量, 这里就是修改自定义样式的主题的。当主题色发生变化，我们将重新计算附属主题变量的值
  cssVar(state, getters) {
    return {
      ...variables,
      // 这里需要一些css变量的值
      ...generateColors(getters.themeColor)
    }
  },
```

[案例代码](https://github.com/zhang-glitch/back_end_solution/tree/change-theme)

## 全屏

可以使用[`screenfull`](https://www.npmjs.com/package/screenfull)库去实现。通过`toggle`触发全屏，并监听他的 change 事件来监听全屏的切换更改展示图标。

```js
import { computed, onMounted, onUnmounted, ref } from 'vue'
import screenfull from 'screenfull'

const isFull = ref(false)
const iconName = computed(() =>
  isFull.value ? 'exit-fullscreen' : 'fullscreen'
)

// 监听变化
const change = () => {
  isFull.value = screenfull.isFullscreen
}

// 切换事件
const handleClick = () => {
  screenfull.toggle()
}

// 设置侦听器
onMounted(() => {
  screenfull.on('change', change)
})

// 删除侦听器
onUnmounted(() => {
  screenfull.off('change', change)
})
```

[案例代码](https://github.com/zhang-glitch/back_end_solution/)

## 搜索

全局搜索功能在后台管理系统中是非常常见的，主要是让用户快速定位到目标。所以我们可以使用[fuse.js](https://www.fusejs.io/)库，来协助我们完成。

由于 fuse 对收索的数据结构有特定要求，并结合当前我们的需求，搜索的关键字段需要是对象的直接属性。所以需要处理好数据。[这里是相关 demo](https://www.fusejs.io/examples.html)

处理数据

```js
/**
 * 筛选出可供搜索的路由对象
 * @param routes 路由表
 * @param basePath 基础路径，默认为 /
 * @param prefixTitle
 */
export const getFuseData = (routes, basePath = '/', prefixTitle = []) => {
  // 创建 result 数据
  let res = []
  // 循环 routes 路由
  for (const route of routes) {
    // 创建包含 path 和 title 的 item
    const data = {
      path: route.path,
      title: [...prefixTitle]
    }
    // 当前存在 meta 时，使用 i18n 解析国际化数据，组合成新的 title 内容
    // 动态路由不允许被搜索
    // 匹配动态路由的正则
    const re = /.*\/:.*/
    if (route.meta && route.meta.title && !re.exec(route.path)) {
      const i18ntitle = i18n.global.t(`msg.route.${route.meta.title}`)
      data.title = [...data.title, i18ntitle]
      res.push(data)
    }

    // 存在 children 时，迭代调用
    if (route.children) {
      const tempRoutes = getFuseData(route.children, data.path, data.title)
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}
```

初始化 fuse

```js
let fuse
const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool, {
    // 是否按优先级进行排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
    // name：搜索的键
    // weight：对应的权重
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}

// 处理搜索数据源，并初始化fuse
initFuse(generateStandardData.value)
```

然后调用`fuse.search(value)`方法并传入搜索关键字就可以得到搜索列表了。

如果搜索数据需要做到国际化，**我们是事先在搜索代码中已经将对应的字段转化了**。所以在切换国际化时，将不会被改变。这时候我们需要监听国际化的切换，然后再重新初始化一下 fuse 的数据源。

```js
watch(
  () => store.getters.language,
  () => {
    // 处理数据
    const generateStandardData = computed(() => {
      // 获取搜索数据源
      const originData = generateMenus(router.getRoutes())
      // 处理成标准数据
      return getFuseData(originData)
    })
    initFuse(generateStandardData.value)
  }
)
```

这里需要注意一下，我们在搜索时，一般使用的是`select`组件，如 element-plus 中的 select, 我们需要添加`remote`才可以将初始化的下拉字标去掉。然后绑定`remote-method`一个方法去处理搜索。

[案例代码](https://github.com/zhang-glitch/back_end_solution/)

## 自定义元素右键菜单

通过 web api [`contextMenu`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/contextmenu_event)去实现。

在元素中绑定`contextMenu`事件。并控制菜单的展示和隐藏，菜单的位置。菜单是我们自定义的组件。

```js
<mouse-menu
  v-show="isMenu"
  :style="menuStyle"
  :currentTagIndex="currentTagIndex"
  @close-menu="handleCloseMenu"
></mouse-menu>

/**
 * 鼠标右键,菜单展示
 */
const isMenu = ref(false)
const currentTagIndex = ref(0)
const menuStyle = reactive({
  left: 0,
  top: 0
})
const handleOpenMenu = (e, index) => {
  const { x, y } = e
  menuStyle.left = x + 'px'
  menuStyle.top = y + 'px'
  isMenu.value = true
  currentTagIndex.value = index
}
```

菜单组件。

```js
// mouse-menu
<template>
  <ul class="mouse-menu">
    <li @click="handleRefreshClick">
      {{ $t('msg.tagsView.refresh') }}
    </li>
    <li @click="handleCloseRightClick">
      {{ $t('msg.tagsView.closeRight') }}
    </li>
    <li @click="handleCloseOtherClick">
      {{ $t('msg.tagsView.closeOther') }}
    </li>
  </ul>
</template>

<script setup>
import { useStore } from 'vuex'

const props = defineProps({
  currentTagIndex: {
    type: Number,
    required: true
  }
})

const emits = defineEmits('closeMenu')

/**
 * 刷新
 */
const handleRefreshClick = () => {
  location.reload()
  emits('closeMenu')
}

/**
 * 关闭右侧
 */
const store = useStore()
const handleCloseRightClick = () => {
  store.commit('app/removeRightTags', props.currentTagIndex)
  emits('closeMenu')
}

/**
 * 关闭其他
 */
const handleCloseOtherClick = () => {
  store.commit('app/removeOtherTags', props.currentTagIndex)
  emits('closeMenu')
}
</script>

<style scoped lang="scss">
.mouse-menu {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
```

**我们需要注意，在点击完菜单项时，菜单并不会关闭，所以我们需要自定义关闭事件，触发关闭。** 但是如果用户不点击菜单项，那么菜单也不会关闭，所以我们需要在菜单显示的时候，给 body 添加事件，让其关闭。

```js
const closeMenu = () => {
  isMenu.value = false
}

/**
 * 监听变化,没点击时，关闭menu
 */
watch(isMenu, (val) => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})
```

[案例代码](https://github.com/zhang-glitch/back_end_solution/)

## 路由动效切换错误

[路由过度动效](https://router.vuejs.org/zh/guide/advanced/transitions.html)

```js
<router-view v-slot="{ Component, route }">
  <transition name="fade" mode="out-in">
    <keep-alive>
      <component :is="Component" :key="route.path"></component>
    </keep-alive>
  </transition>
</router-view>
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd227728d6584d9ea1f27167ee7eabe3~tplv-k3u1fbpfcp-watermark.image?)

**在我们使用动效路由时，我们的路由组件不能是多个根标签。** 不然会报警告不显示内容。

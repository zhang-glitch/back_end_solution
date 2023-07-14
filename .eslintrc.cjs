module.exports = {
  // 让当前项目整体生效
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: ['standard', 'plugin:vue/vue3-essential'],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue'],
  // 需要修改的启用规则及其各自的错误级别
  /**
   * off / 0 表示关闭规则
   * warn / 1 表示开启规则，但是只是警告级别错误（程序不会终止退出）
   * error / 2 表示开启规则，使用错误级别的错误 （程序会被终止退出）
   */
  rules: {
    // 'comma-dangle': 1
    'space-before-function-paren': 'off',
    'vue/multi-word-component-names': 'off'
  }
}

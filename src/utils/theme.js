import axios from 'axios'
import rgbHex from 'rgb-hex'
import color from 'css-color-function'
import themeTemplate from '@/constants/formula'

/**
 * 获取element-plus样式表
 */

async function getElementPlusStyles() {
  const { version } = await import('element-plus/package.json')
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const styles = await axios(url)
  return styles.data
}

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

const path = require('path')

const root = path.join(__dirname, './../')
const app = root
const src = path.join(root, 'src')
const tpl = path.join(src, 'tpl')
const dist = path.join(root, 'dist')
const static = path.join(dist, 'static')
const wp_views = path.join(src, 'views')
const wp_pages = path.join(wp_views, 'pages')

// 项目路径配置
module.exports = {
  root, // 根路径
  app, // app 路径
  dist, // 前端文件版本
  static, // 静态文件图片、字体
  src, // webpack src路径
  tpl, // webpack src路径
  wp_views, // webpack view路径
  wp_pages, // webpack page路径
}

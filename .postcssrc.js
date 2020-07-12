module.exports = {
  plugins: {
    // 自动添加浏览器前缀的 css 插件
    // 'autoprefixer': {
    //   // 配置浏览器信息
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // }, 
    'postcss-pxtorem': {
      // 根元素字体大小
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 设定从 px 转换 rem 的属性  * 默认所有属性
      propList: ['*']
    }
  }
}
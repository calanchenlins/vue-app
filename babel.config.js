module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [// 按需引入 element-ui
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      }
    ]
  ]
}

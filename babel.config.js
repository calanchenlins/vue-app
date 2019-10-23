module.exports = {
  presets: [
    // '@vue/app'
    ['@vue/app', { useBuiltIns: 'entry' }]
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

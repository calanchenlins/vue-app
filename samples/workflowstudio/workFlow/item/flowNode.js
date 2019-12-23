import editorStyle from '../defaultStyle'

export default function(G6) {
  G6.registerNode('process-route', {
    // 重写基础节点配置
    shapeType: 'rect',
    selectedColor: '#95D6FB',
    unSelectedColor: '#E7F7FE',
    borderColor: '#1890FE',
    iconWidth: 12,
    iconHeight: 12,
    iconPaddingLeft: 2,
    iconPaddingTop: 2,
    getShapeStyle(cfg) {
      cfg.size = [80, 44]
      cfg = this.initStyle(cfg)
      const width = cfg.size[0]
      const height = cfg.size[1]
      const x = cfg.x || (0 - width / 2)
      const y = cfg.y || (0 - height / 2)
      const style = {
        x: 0 - width / 2,
        y: 0 - height / 2,
        width,
        height,
        ...editorStyle.nodeStyle,
        fill: cfg.unSelectedColor,
        stroke: cfg.borderColor
      }
      return style
    }
  }, 'base-node')
}

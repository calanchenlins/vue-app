import G6 from '@antv/g6/src'
// import Minimap from '@antv/g6/build/minimap'
// import Grid from '@antv/g6/build/grid'
import Item from '@antv/g6/src/item/item'
import SingleShapeMixin from '@antv/g6/src/shape/single-shape-mixin'
import Util from '@antv/g6/src/util'

const editorStyle = {
  nodeActivedOutterStyle: { lineWidth: 0 },
  groupSelectedOutterStyle: { stroke: '#E0F0FF', lineWidth: 2 },
  nodeSelectedOutterStyle: { stroke: '#E0F0FF', lineWidth: 2 },
  edgeActivedStyle: { stroke: '#1890FF', strokeOpacity: 0.92 },
  nodeActivedStyle: { fill: '#F3F9FF', stroke: '#1890FF' },
  groupActivedStyle: { stroke: '#1890FF' },
  edgeSelectedStyle: { lineWidth: 2, strokeOpacity: 0.92, stroke: '#A3B1BF' },
  nodeSelectedStyle: { fill: '#F3F9FF', stroke: '#1890FF', fillOpacity: 0.4 },
  groupSelectedStyle: { stroke: '#1890FF', fillOpacity: 0.92 },
  nodeStyle: {
    stroke: '#CED4D9',
    fill: '#FFFFFF',
    shadowOffsetX: 0,
    shadowOffsetY: 4,
    shadowBlur: 10,
    shadowColor: 'rgba(13, 26, 38, 0.08)',
    lineWidth: 1,
    radius: 4,
    strokeOpacity: 0.7
  },
  edgeStyle: { stroke: '#A3B1BF', strokeOpacity: 0.92, lineWidth: 1, lineAppendWidth: 8, endArrow: true },
  groupBackgroundPadding: [40, 10, 10, 10],
  groupLabelOffsetX: 10,
  groupLabelOffsetY: 10,
  edgeLabelStyle: { fill: '#666', textAlign: 'center', textBaseline: 'middle' },
  edgeLabelRectPadding: 4,
  edgeLabelRectStyle: { fill: 'white' },
  nodeLabelStyle: { fill: '#666', textAlign: 'center', textBaseline: 'middle' },
  groupStyle: { stroke: '#CED4D9', radius: 4 },
  groupLabelStyle: { fill: '#666', textAlign: 'left', textBaseline: 'top' },
  multiSelectRectStyle: { fill: '#1890FF', fillOpacity: 0.08, stroke: '#1890FF', opacity: 0.1 },
  dragNodeHoverToGroupStyle: { stroke: '#1890FF', lineWidth: 2 },
  dragNodeLeaveFromGroupStyle: { stroke: '#BAE7FF', lineWidth: 2 },
  anchorPointStyle: { radius: 3.5, fill: '#fff', stroke: '#1890FF', lineAppendWidth: 12 },
  anchorHotsoptStyle: { radius: 12, fill: '#1890FF', fillOpacity: 0.25 },
  anchorHotsoptActivedStyle: { radius: 14 },
  anchorPointHoverStyle: { radius: 4, fill: '#1890FF', fillOpacity: 1, stroke: '#1890FF' },
  nodeControlPointStyle: { radius: 4, fill: '#fff', shadowBlur: 4, shadowColor: '#666' },
  edgeControlPointStyle: { radius: 6, symbol: 'square', lineAppendWidth: 6, fillOpacity: 0, strokeOpacity: 0 },
  nodeSelectedBoxStyle: { stroke: '#C2C2C2' },
  cursor: {
    panningCanvas: '-webkit-grabbing',
    beforePanCanvas: '-webkit-grab',
    hoverNode: 'move',
    hoverEffectiveAnchor: 'crosshair',
    hoverEdge: 'default',
    hoverGroup: 'move',
    hoverUnEffectiveAnchor: 'default',
    hoverEdgeControllPoint: 'crosshair',
    multiSelect: 'crosshair'
  },
  nodeDelegationStyle: {
    stroke: '#1890FF',
    fill: '#1890FF',
    fillOpacity: 0.08,
    lineDash: [4, 4],
    radius: 4,
    lineWidth: 1
  },
  edgeDelegationStyle: { stroke: '#1890FF', lineDash: [4, 4], lineWidth: 1 }
}

const Init = function(G6) {
  /**
   * 注册锚点工厂方法
  */
  G6.Shape.registerFactory('anchor', {
    defaultShapeType: 'marker'
  })
  /**
   * 注册自定义锚点
  */
  G6.Shape.registerAnchor('single-anchor', Util.mix({}, SingleShapeMixin, {
    itemType: 'anchor',
    drawShape(cfg, group) {
      const shapeType = this.shapeType
      const style = this.getShapeStyle(cfg)
      const shape = group.addShape(shapeType, {
        attrs: style
      })
      return shape
    },

    setState(name, value, item) {
      if (name === 'active-anchor') {
        if (value) {
          this.update({ style: { ...editorStyle.anchorPointHoverStyle }}, item)
        } else {
          this.update({ style: { ...editorStyle.anchorPointStyle }}, item)
        }
      }
    }
  }))
  G6.Shape.registerAnchor('marker', { shapeType: 'marker' }, 'single-anchor')
  const dashArray = [
    [0, 1],
    [0, 2],
    [1, 2],
    [0, 1, 1, 2],
    [0, 2, 1, 2],
    [1, 2, 1, 2],
    [2, 2, 1, 2],
    [3, 2, 1, 2],
    [4, 2, 1, 2]
  ]
  const interval = 9
  const lineDash = [4, 2, 1, 2]
  G6.registerNode('base-node', {
    icon: null,
    iconWidth: 14,
    selectedColor: '#eee',
    unSelectedColor: '#f9f9f9',
    borderColor: '#bbb',
    drawAnchor(group) {
      const bbox = group.get('children')[0].getBBox()
      this.getAnchorPoints().forEach((p, i) => {
        const anchorContainer = group.addGroup()
        const anchor = new Item({
          type: 'anchor',
          group: anchorContainer,
          capture: false,
          index: i,
          isActived: false,
          model: {
            style: {
              x: bbox.minX + bbox.width * p[0],
              y: bbox.minY + bbox.height * p[1],
              ...editorStyle.anchorPointStyle,
              cursor: editorStyle.cursor.hoverEffectiveAnchor
            }
          }
        })
        anchor.isAnchor = true
        anchor.toFront()
        let hotpot
        anchor.showHotpot = function() {
          hotpot = anchorContainer.addShape('marker', {
            attrs: {
              x: bbox.minX + bbox.width * p[0],
              y: bbox.minY + bbox.height * p[1],
              ...editorStyle.anchorHotsoptStyle
            }
          })
          hotpot.toFront()
          anchor.getKeyShape().toFront()
        }
        anchor.setActived = function() {
          anchor.update({ style: { ...editorStyle.anchorPointHoverStyle }})
        }
        anchor.clearActived = function() {
          anchor.update({ style: { ...editorStyle.anchorPointStyle }})
        }
        anchor.setHotspotActived = function(act) {
          hotpot &&
          (act
            ? hotpot.attr(editorStyle.anchorHotsoptActivedStyle)
            : hotpot.attr(editorStyle.anchorHotsoptStyle))
        }

        group.anchorShapes.push(anchorContainer)
        group.getAllAnchors = () => {
          return group.anchorShapes.map(c => {
            c.filter(a => a.isAnchor)
          })
        }
        group.getAnchor = (i) => {
          return group.anchorShapes.filter(a => a.get('index') === i)
        }
      })
    },
    drawShape(cfg, group) {
      const shapeType = this.shapeType
      const style = this.getShapeStyle(cfg)
      const shape = group.addShape(shapeType, {
        attrs: {
          ...style
        }
      })
      if (cfg.icon) {
        let attrs = {
          x: style.x + cfg.iconPaddingLeft,
          y: style.y + cfg.iconPaddingTop,
          width: cfg.iconWidth,
          height: cfg.iconHeight
        }
        if (shapeType === 'circle') {
          attrs = {
            x: style.x - style.r + cfg.iconPaddingLeft,
            y: style.y - style.r + cfg.iconPaddingTop,
            width: cfg.iconWidth,
            height: cfg.iconHeight
          }
        } else if (shapeType === 'path') {
          attrs = {
            x: cfg.iconPaddingLeft,
            y: cfg.iconPaddingTop,
            width: cfg.iconWidth,
            height: cfg.iconHeight
          }
        }
        group.icon = group.addShape('image', {
          attrs: {
            img: cfg.icon,
            ...attrs
          }
        })
        if (cfg.hideIcon) {
          group.icon.hide()
        }
      }
      group.anchorShapes = []
      group.showAnchor = (group) => {
        this.drawAnchor(group)
      }
      group.clearAnchor = (group) => {
        group.anchorShapes && group.anchorShapes.forEach(a => a.remove())
        group.anchorShapes = []
      }
      group.clearHotpotActived = (group) => {
        group.anchorShapes && group.anchorShapes.forEach(a => {
          if (a.isAnchor) { a.setHotspotActived(false) }
        })
      }
      return shape
    },
    setState(name, value, item) {
      const group = item.getContainer()
      if (name === 'show-anchor') {
        if (value) {
          group.showAnchor(group)
        } else {
          group.clearAnchor(group)
        }
      } else if (name === 'selected') {
        const rect = group.getChildByIndex(0)
        if (value) {
          rect.attr('fill', item.getModel().selectedColor)
        } else {
          rect.attr('fill', item.getModel().unSelectedColor)
        }
      } else if (name === 'hover') {
        const rect = group.getChildByIndex(0)
        const text = group.getChildByIndex(1)
        if (value) {
          rect.attr('cursor', editorStyle.cursor.hoverNode)
          if (text) { text.attr('cursor', editorStyle.cursor.hoverNode) }
        } else {
          rect.attr('cursor', 'default')
          if (text) { text.attr('cursor', 'default') }
        }
      }
    },
    getAnchorPoints() {
      return [
        [0.5, 0], // top
        [1, 0.5], // right
        [0.5, 1], // bottom
        [0, 0.5] // left
      ]
    },
    runAnimate(cfg, group) {
      if (cfg.active) {
        let totalArray = []
        let index = 0
        const shape = group.getFirst()
        shape.animate({
          onFrame(ratio) {
            for (let i = 0; i < 9; i += interval) {
              totalArray = totalArray.concat(lineDash)
            }
            const cfg = {
              lineDash: dashArray[index].concat(totalArray)
            }
            index = (index + 1) % interval
            return cfg
          },
          repeat: true
        }, 5000)
      }
    },
    afterDraw(cfg, group) {
      this.runAnimate(cfg, group)
    },
    afterUpdate(cfg, group) {
      const icon = group.get('group').icon
      if (cfg.hideIcon && icon && icon.get('visible')) {
        icon.hide()
      } else if (!cfg.hideIcon && icon && !icon.get('visible')) {
        icon.show()
      }
    },
    initStyle(cfg) {
      cfg.selectedColor = this.selectedColor
      cfg.unSelectedColor = this.unSelectedColor
      cfg.icon = this.icon
      cfg.iconWidth = this.iconWidth
      cfg.iconHeight = this.iconHeight
      cfg.iconPaddingTop = this.iconPaddingTop
      cfg.iconPaddingLeft = this.iconPaddingLeft
      return cfg
    }
  }, 'single-shape')
  G6.registerNode('task-node', {
    shapeType: 'rect',
    selectedColor: '#95D6FB',
    unSelectedColor: '#E7F7FE',
    borderColor: '#1890FF',
    iconWidth: 12,
    iconHeight: 12,
    iconPaddingLeft: 2,
    iconPaddingTop: 2,
    getShapeStyle(cfg) {
      cfg.size = [80, 44]
      cfg = this.initStyle(cfg)
      const width = cfg.size[0]
      const height = cfg.size[1]
      const style = {
        x: 0 - width / 2,
        y: 0 - height / 2,
        width,
        height,
        ...editorStyle.nodeStyle,
        fill: cfg.unSelectedColor,
        stroke: this.borderColor
      }
      return style
    }
  }, 'base-node')
  G6.registerNode('user-task-node', {
    icon: null,
    selectedColor: '#95D6FB',
    unSelectedColor: '#E7F7FE',
    borderColor: '#1890FF'
  }, 'task-node')
  /**
 * 重写G6内置的 single-shape
*/
  G6.registerNode('ext-single-shape', {
    drawAnchor(group) {
      const bbox = group.get('children')[0].getBBox()
      this.getAnchorPoints().forEach((p, i) => {
        const anchorContainer = group.addGroup()
        const anchor = new Item({
          type: 'anchor',
          group: anchorContainer,
          capture: false,
          index: i,
          isActived: false,
          model: {
            style: {
              x: bbox.minX + bbox.width * p[0],
              y: bbox.minY + bbox.height * p[1],
              ...editorStyle.anchorPointStyle
            }
          }
        })
        anchor.isAnchor = true
        anchor.toFront()
        let hotpot
        anchor.showHotpot = function() {
          hotpot = anchorContainer.addShape('marker', {
            attrs: {
              x: bbox.minX + bbox.width * p[0],
              y: bbox.minY + bbox.height * p[1],
              ...editorStyle.anchorHotsoptStyle
            }
          })
          hotpot.toFront()
          anchor.getKeyShape().toFront()
        }
        anchor.setActived = function() {
          anchor.update({ style: { ...editorStyle.anchorPointHoverStyle }})
        }
        anchor.clearActived = function() {
          anchor.update({ style: { ...editorStyle.anchorPointStyle }})
        }
        anchor.setHotspotActived = function(act) {
          hotpot &&
          (act
            ? hotpot.attr(editorStyle.anchorHotsoptActivedStyle)
            : hotpot.attr(editorStyle.anchorHotsoptStyle))
        }

        group.anchorShapes.push(anchorContainer)
        group.getAllAnchors = () => {
          return group.anchorShapes.map(c => {
            c.filter(a => a.isAnchor)
          })
        }
        group.getAnchor = (i) => {
          return group.anchorShapes.filter(a => a.get('index') === i)
        }
      })
    },
    drawShape(cfg, group) {
      const shapeType = this.shapeType
      const style = this.getShapeStyle(cfg)
      // 使用G进行绘图
      const shape = group.addShape(shapeType, {
        attrs: {
          ...style
        }
      })
      group.anchorShapes = []// 自定义扩展数组，用于保存Anchors
      group.showAnchor = (group) => {
        this.drawAnchor(group)
      }
      group.clearAnchor = (group) => {
        group.anchorShapes && group.anchorShapes.forEach(a => a.remove())
        group.anchorShapes = []
      }
      group.clearHotpotActived = (group) => {
        group.anchorShapes && group.anchorShapes.forEach(a => {
          if (a.isAnchor) { a.setHotspotActived(false) }
        })
      }
      return shape
    },
    setState(name, value, item) {
      const group = item.getContainer()
      const shape = group.get('children')[0] // 顺序根据 draw 时确定
      if (name === 'show-anchor') {
        if (value) {
          group.showAnchor(group)
        } else {
          group.clearAnchor(group)
        }
      }
      if (name === 'nodeSelected') {
        if (value) {
          shape.attr('fill', '#95D6FB')
        } else {
          shape.attr('fill', '#E7F7FE')
        }
      }
    }
  }, 'single-shape')
  /**
 * 基本的矩形，可以添加文本，默认文本居中
*/
  G6.registerNode('ext-rect', {
    shapeType: 'rect',
    getAnchorPoints(cfg) {
      return [
        [0.5, 0], // top
        [1, 0.5], // right
        [0.5, 1], // bottom
        [0, 0.5] // left
      ]
    },
    getShapeStyle(cfg) {
      cfg.size = [80, 44]
      const width = cfg.size[0]
      const height = cfg.size[1]
      const style = {
        x: 0 - width / 2, // 节点的位置在上层确定，所以这里仅使用相对位置即可
        y: 0 - height / 2,
        width,
        height,
        ...editorStyle.nodeStyle
      }
      return style
    }
  }, 'ext-single-shape')

  G6.registerBehavior('hoverNodeActived', {
    getEvents() {
      return {
        'node:mouseenter': 'onNodeEnter',
        'node:mouseleave': 'onNodeLeave',
        'anchor:mouseleave': 'onAnchorLeave'
      }
    },
    onAnchorLeave(e) {
      const node = e.item.getContainer().getParent()
      if (node && !this.graph.get('onDragEdge')) {
        this.graph.setItemState(node.get('item'), 'show-anchor', false)
      }
    },
    onNodeEnter(e) {
      const clazz = e.item.getModel().clazz
      if (clazz !== 'endEvent' && !this.graph.get('onDragEdge')) { this.graph.setItemState(e.item, 'show-anchor', true) }
    },
    onNodeLeave(e) {
      if (e.target.type !== 'marker' && !this.graph.get('onDragEdge')) {
        this.graph.setItemState(e.item, 'show-anchor', false)
      }
    }
  })
  G6.registerBehavior('clickSelected', {
    getDefaultCfg() {
      return {
        multiple: false
      }
    },
    getEvents() {
      return {
        'node:click': 'onClick',
        'edge:click': 'onClick',
        'edge:mouseover': 'onEdgeMouseOver',
        'edge:mouseleave': 'onEdgeMouseLeave',
        'canvas:click': 'onCanvasClick',
        'node:mouseover': 'onNodeMouseOver'
      }
    },
    onClick(e) {
      this._clearSelected()
      this.graph.setItemState(e.item, 'selected', true)
      let selectedItems = this.graph.get('selectedItems')
      if (!selectedItems) { selectedItems = [] }
      selectedItems = [e.item.get('id')]
      this.graph.set('selectedItems', selectedItems)
      this.graph.emit('afteritemselected', selectedItems)
    },
    onNodeMouseOver(e) {
      if (this.graph.getCurrentMode() === 'edit') { this.graph.setItemState(e.item, 'hover', true) } else { this.graph.setItemState(e.item, 'hover', false) }
    },
    onEdgeMouseOver(e) {
      if (this.graph.getCurrentMode() === 'edit' && !e.item.hasState('selected')) { this.graph.setItemState(e.item, 'hover', true) }
    },
    onEdgeMouseLeave(e) {
      if (this.graph.getCurrentMode() === 'edit' && !e.item.hasState('selected')) { this.graph.setItemState(e.item, 'hover', false) }
    },
    onCanvasClick() {
      this._clearSelected()
    },
    _clearSelected() {
      let selected = this.graph.findAllByState('node', 'selected')
      selected.forEach(node => {
        this.graph.setItemState(node, 'selected', false)
      })
      selected = this.graph.findAllByState('edge', 'selected')
      selected.forEach(edge => {
        this.graph.setItemState(edge, 'selected', false)
      })
      this.graph.set('selectedItems', [])
      this.graph.emit('afteritemselected', [])
    }
  })
  G6.registerBehavior('hoverAnchorActived', {
    getEvents() {
      return {
        'anchor:mouseenter': 'onAnchorEnter',
        'anchor:mousemove': 'onAnchorEnter',
        'anchor:mouseleave': 'onAnchorLeave'
      }
    },
    onAnchorEnter(e) {
      if (!this.graph.get('onDragEdge')) { this.graph.setItemState(e.item, 'active-anchor', true) }
    },
    onAnchorLeave(e) {
      if (!this.graph.get('onDragEdge')) {
        const node = e.item.getContainer().getParent()
        if (node) {
          this.graph.setItemState(e.item, 'active-anchor', false)
        }
      }
    }
  })
  G6.registerBehavior('dragPanelItemAddNode', {
    getEvents() {
      return {
        'canvas:mouseup': 'onMouseUp'
      }
    },
    onMouseUp(e) {
      if (this.graph.get('onDragAddNode')) {
        const p = this.graph.getPointByClient(e.clientX, e.clientY)
        if (p.x > 0 && p.y > 0) { this._addNode(p) }
      }
    },
    _addNode(p) {
      if (this.graph.get('onDragAddNode')) {
        const addModel = this.graph.get('addModel')
        const timestamp = new Date().getTime()
        const id = addModel.lableName + timestamp
        const x = p.x
        const y = p.y
        this.graph.add('node', {
          ...addModel,
          x: x,
          y: y,
          id: id,
          ...editorStyle.nodeStyle,
          label: addModel.lableName,
          shape: 'user-task-node'
        })
      }
    }
  })
}
export default
{
  G6,
  Init
}

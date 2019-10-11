import editorStyle from '../defaultStyle'

export default function(G6) {
  G6.registerBehavior('dragPanelItemAddNode', {
    getDefaultCfg() {
      return {

      }
    },
    getEvents() {
      return {
        'canvas:mousemove': 'onMouseMove',
        'canvas:mouseup': 'onMouseUp',
        'canvas:mouseleave': 'onMouseLeave'
      }
    },
    onMouseMove(e) {
      if (this.graph.get('onDragAddNode')) {
        let delegateShape = this.graph.get('addDelegateShape')
        const addModel = this.graph.get('addModel')
        const width = parseInt(addModel.size.split('*')[0])
        const height = parseInt(addModel.size.split('*')[1])
        const point = this.graph.getPointByClient(e.x, e.y)
        const x = point.x
        const y = point.y
        if (!delegateShape) {
          const parent = this.graph.get('group')
          delegateShape = parent.addShape('rect', {
            attrs: {
              width,
              height,
              x: x - width / 2,
              y: y - height / 2,
              ...editorStyle.nodeDelegationStyle
            }
          })
          delegateShape.set('capture', false)
          this.graph.set('addDelegateShape', delegateShape)
        }
        delegateShape.attr({ x: x - width / 2, y: y - height / 2 })
        this.graph.paint()
        this.graph.emit('afternodedrag', delegateShape)
      }
    },
    onMouseUp(e) {
      if (this.graph.get('onDragAddNode')) {
        const p = this.graph.getPointByClient(e.clientX, e.clientY)
        this._addNode(p)
        const width = this.graph.get('width')
        const height = this.graph.get('height')
        let widthFactor = 1
        let heightFactor = 1
        if (p.x > 0 && p.x < width && p.y > 0 && p.y < height) {
          return
        }
        if (p.x < 0) {
          widthFactor = (width - p.x) / width
        } else if (p.x > width) {
          widthFactor = p.x / width
        }

        if (p.y < 0) {
          heightFactor = (height - p.y) / height
        } else if (p.y > height) {
          heightFactor = p.y / height
        }
        // const zoomFactor = widthFactor > heightFactor ? widthFactor : heightFactor
        // debugger
        // this.graph.changeSize(width * zoomFactor, height * zoomFactor)
        // this.graph.paint()
      }
    },
    onMouseLeave(e) {
      if (this.graph.get('onDragAddNode')) {
        this._clearDelegate()
        this.graph.emit('afternodedragend')
      }
    },
    _clearDelegate() {
      if (this.graph.get('onDragAddNode')) {
        const delegateShape = this.graph.get('addDelegateShape')
        if (delegateShape) {
          delegateShape.remove()
          this.graph.set('addDelegateShape', null)
          this.graph.paint()
        }
      }
    },
    _addNode(p) {
      if (this.graph.get('onDragAddNode')) {
        const addModel = this.graph.get('addModel')
        const timestamp = new Date().getTime()
        const id = addModel.lableName + timestamp
        const x = p.x
        const y = p.y
        var addNode = this.graph.add('node', {
          x: x,
          y: y,
          id: id,
          ...editorStyle.nodeStyle,
          label: addModel.lableName,
          shape: 'process-route',
          testcfg: 'tt',
          nodeObjData: {}
        })
        const kk = addNode.getModel()
        this.graph.emit('afterItemAdd', {})
        // 新增节点
        addNode.set('nodeStatus', 'add')
      }
    }
  })
}

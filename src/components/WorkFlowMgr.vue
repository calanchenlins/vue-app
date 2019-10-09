<template>
  <div>
    <el-container>
      <el-header />
      <el-container>
        <el-aside width="150px">
          <el-collapse accordion>
            <el-collapse-item v-for="(procType) in procSteps" :key="procType.id">
              <template slot="title">
                <i class="header-icon el-icon-info" />
                <p style="padding-left:20px">{{ procType.typeName }}</p>

              </template>
              <div v-for="(step) in procType.steps" :key="step.id" :data-item="step.typeName">
                <img
                  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTA3IDYxIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDcgNjE7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRkZGN0U2O3N0cm9rZTojRkZBOTQwO3N0cm9rZS1taXRlcmxpbWl0OjEwO30KCS5zdDF7ZmlsbDojRkZBOTQwO30KPC9zdHlsZT4KPHRpdGxlPnRhc2tfMTwvdGl0bGU+CjxnIGlkPSLlm77lsYJfMS0yIj4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04LjksMC41aDg5LjJjNC42LDAsOC40LDMuOCw4LjQsOC40djQzLjJjMCw0LjYtMy44LDguNC04LjQsOC40SDguOWMtNC42LDAtOC40LTMuOC04LjQtOC40VjguOQoJCUMwLjUsNC4zLDQuMywwLjUsOC45LDAuNXoiLz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik01Ni45LDEzLjVsOS43LDkuN2gtOC44Yy0wLjYsMC0xLjEtMC42LTEuMS0xLjF2LTguNkg1Ni45eiBNNDUuOCwzNi41Yy0wLjYsMC0xLjEsMC42LTEuMSwxLjEKCQljMCwwLjYsMC42LDEuMSwxLjEsMS4xSDU5YzAuNiwwLDEuMS0wLjYsMS4xLTEuMWMwLTAuNi0wLjYtMS4xLTEuMS0xLjFINDUuOHogTTQ1LjgsMzEuMWMtMC42LDAtMS4xLDAuNi0xLjEsMS4xCgkJYzAsMC42LDAuNiwxLjEsMS4xLDEuMWg2LjZjMC42LDAsMS4xLTAuNiwxLjEtMS4xYzAtMC42LTAuNi0xLjEtMS4xLTEuMUg0NS44eiBNNjYuNywyNS40djE1LjRjMCwxLjktMS41LDMuMi0zLjIsMy4ySDQzLjgKCQljLTEuOSwwLTMuMi0xLjUtMy4yLTMuMnYtMjRjMC0xLjksMS41LTMuMiwzLjItMy4yaDEwLjlWMjNjMCwxLjUsMS4xLDIuNiwyLjYsMi42aDkuNFYyNS40eiIvPgo8L2c+Cjwvc3ZnPgo="
                  style="width: 80px; height: 44px;"
                  @dragstart="nodeDragStartHandler(step.name, $event)"
                  @dragend="nodeDragEndHandler($event)"
                >
                <div>{{ step.name }}</div>
                <el-divider />
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-aside>
        <el-main>
          <el-container>
            <el-main>
              <el-card class="box-card" body-style="{ padding: '10px' }">
                <div id="workFlowPanel" />
              </el-card>
            </el-main>
            <el-aside width="300px">
              <div id="workFlowMiniMap" />
              <el-aside />
            </el-aside>
          </el-container>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
import G6 from '@antv/g6/src'
import Minimap from '@antv/g6/build/minimap'
import Grid from '@antv/g6/build/grid'
import G6Init from '../workFlow/index'
const minimap = new Minimap({
  size: [320, 180],
  container: 'workFlowMiniMap'
})
export default {
  data() {
    return {
      procSteps: [
        {
          id: 1,
          typeName: '金加工类',
          steps: [
            {
              id: 11,
              name: '点焊'
            }
          ]
        },
        {
          id: 2,
          typeName: '装配类',
          steps: [
            {
              id: 21,
              name: '组装'
            }
          ]
        }
      ],
      workFlow: null
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      // 整个组件渲染完成后
      this.workFlow = new G6.Graph({
        container: 'workFlowPanel',
        width: 1600,
        height: 900,
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'clickSelected'],
          view: [],
          // 定义的 behavior 指定到这里，就可以支持Behavior中定义的交互
          edit: ['drag-canvas', 'zoom-canvas', 'clickSelected', 'dragPanelItemAddNode', 'hoverAnchorActived', 'hoverNodeActived', 'dragNode', 'dragEdge', 'itemAlign']
        },
        plugins: [minimap, new Grid()],
        nodeStyle: {
          default: {
            fill: '#40a9ff',
            stroke: '#096dd9'
          }
        },
        edgeStyle: {
          default: { stroke: '#A3B1BF' }
        }
      })
      this.workFlow.setMode('edit')
      this.workFlow.on('afterItemSelected', (items) => {
        if (items && items.length > 0) {
          const item = this.workFlow.findById(items[0])
          var j = item.getModel()
          console.log('显示明细表')
          // this.setState({ selectedModel: { ...item.getModel() } });
        } else {
          // this.setState({ selectedModel: this.state.processModel });
          console.log('隐藏明细表')
        }
      })
      window.workFlow = this.workFlow
      const data = {
        // 点集
        nodes: [{
          id: 'node1', // String，该节点存在则必须，节点的唯一标识
          x: 100, // Number，可选，节点位置的 x 值
          y: 200 // Number，可选，节点位置的 y 值
        }, {
          id: 'node2', // String，该节点存在则必须，节点的唯一标识
          x: 300, // Number，可选，节点位置的 x 值
          y: 200 // Number，可选，节点位置的 y 值
        }],
        // 边集
        edges: [{
          source: 'node1', // String，必须，起始点 id
          target: 'node2' // String，必须，目标点 id
        }]
      }
      // this.workFlow.data(data) // 读取 Step 2 中的数据源到图上
      // this.workFlow.render() // 渲染图
    })
  },
  methods: {
    nodeDragStartHandler(message, event) {
      // const addModel = this.getNodeConfig(message)
      // const ghost = createDOM('<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"' + ' style="opacity:0"/>')
      // event.dataTransfer.setDragImage(ghost, 0, 0)
      this.workFlow.set('onDragAddNode', true)
      this.workFlow.set('addModel', { lableName: message })
    },
    nodeDragEndHandler(event) {
      // 触发G6 canvas鼠标释放事件
      this.workFlow.emit('canvas:mouseup', event)// 同步调用
      this.workFlow.set('onDragAddNode', false)
      this.workFlow.set('addModel', null)
    },
    /**
     * 获取节点配置
    */
    getNodeConfig(nodeName) {
      switch (nodeName) {
        case 'signalCatch': return 'signal-catch-node'
        default: return 'task-node'
      }
    }
  }
}
</script>

<style>

</style>

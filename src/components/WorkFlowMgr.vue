<template>
  <div>
    <el-container>
      <el-header height="50px">
        <el-row><el-tag>标签一</el-tag></el-row>
      </el-header>
      <el-container>
        <el-aside width="12%">
          <el-input v-model="productCategory.filterText" placeholder="输入关键字进行过滤" />
          <el-tree
            ref="tree"
            class="filter-tree"
            :data="productCategory.data"
            :props="productCategory.defaultProps"
            :filter-node-method="filterNode"
            accordion
            :expand-on-click-node="true"
            :indent="5"
            @node-click="handleNodeClick"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <div>
                <span style="margin:3px">{{ node.label }}</span>
                <template v-if="node.level === 2">
                  <el-tooltip class="item" effect="dark" content="新建加工路径" placement="right-start">
                    <el-button size="mini" icon="el-icon-plus" style="margin-left:165%" circle @click.stop="() => addTreeNode(data)" />
                  </el-tooltip>

                </template>
                <template v-if="node.level === 3">

                  <el-button-group>
                    <el-tooltip class="item" effect="dark" content="重命名" placement="right-start">
                      <el-button size="mini" icon="el-icon-edit" circle @click.stop="() => reNameTreeNode(data)" />
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除加工路径" placement="right-start">
                      <el-button size="mini" icon="el-icon-delete" circle @click.stop="() => delTreeNode(data)" />
                    </el-tooltip>
                  </el-button-group>

                </template>
              </div>

            </span>
          </el-tree>
        </el-aside>
        <el-aside width="10%">
          <el-collapse accordion>
            <el-collapse-item v-for="(procType) in procSteps" :key="procType.id">
              <template slot="title">
                <i class="header-icon el-icon-info" style="padding-left:20px" />
                <p style="padding-left:10px">{{ procType.typeName }}</p>
              </template>
              <div v-for="(step) in procType.steps" :key="step.id" :data-item="step.typeName">
                <img
                  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTA3IDYxIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDcgNjE7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRkZGN0U2O3N0cm9rZTojRkZBOTQwO3N0cm9rZS1taXRlcmxpbWl0OjEwO30KCS5zdDF7ZmlsbDojRkZBOTQwO30KPC9zdHlsZT4KPHRpdGxlPnRhc2tfMTwvdGl0bGU+CjxnIGlkPSLlm77lsYJfMS0yIj4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04LjksMC41aDg5LjJjNC42LDAsOC40LDMuOCw4LjQsOC40djQzLjJjMCw0LjYtMy44LDguNC04LjQsOC40SDguOWMtNC42LDAtOC40LTMuOC04LjQtOC40VjguOQoJCUMwLjUsNC4zLDQuMywwLjUsOC45LDAuNXoiLz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik01Ni45LDEzLjVsOS43LDkuN2gtOC44Yy0wLjYsMC0xLjEtMC42LTEuMS0xLjF2LTguNkg1Ni45eiBNNDUuOCwzNi41Yy0wLjYsMC0xLjEsMC42LTEuMSwxLjEKCQljMCwwLjYsMC42LDEuMSwxLjEsMS4xSDU5YzAuNiwwLDEuMS0wLjYsMS4xLTEuMWMwLTAuNi0wLjYtMS4xLTEuMS0xLjFINDUuOHogTTQ1LjgsMzEuMWMtMC42LDAtMS4xLDAuNi0xLjEsMS4xCgkJYzAsMC42LDAuNiwxLjEsMS4xLDEuMWg2LjZjMC42LDAsMS4xLTAuNiwxLjEtMS4xYzAtMC42LTAuNi0xLjEtMS4xLTEuMUg0NS44eiBNNjYuNywyNS40djE1LjRjMCwxLjktMS41LDMuMi0zLjIsMy4ySDQzLjgKCQljLTEuOSwwLTMuMi0xLjUtMy4yLTMuMnYtMjRjMC0xLjksMS41LTMuMiwzLjItMy4yaDEwLjlWMjNjMCwxLjUsMS4xLDIuNiwyLjYsMi42aDkuNFYyNS40eiIvPgo8L2c+Cjwvc3ZnPgo="
                  style="width: 80px; height: 44px;"
                  @dragstart="nodeDragStartHandler(step.name, $event)"
                  @dragend="nodeDragEndHandler($event)"
                >
                <div>{{ step.name }}</div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-aside>
        <el-main>
          <el-container>
            <el-main>
              <div id="workFlowPanel" ref="workFlowContainer" />
            </el-main>
            <el-aside width="20%" class="panel-detail">
              <el-row>
                <div id="workFlowMiniMap" ref="miniMapContainer" />
              </el-row>
              <el-row>
                <el-table
                  :data="selectedNodeObjData.tableData"
                  style="width: 100%"
                >
                  <el-table-column
                    label="Date"
                    prop="date"
                  />
                  <el-table-column
                    label="Name"
                    prop="name"
                  />
                  <el-table-column
                    align="right"
                  >
                    <template slot="header" slot-scope="scope">
                      <el-button
                        size="mini"
                        type="danger"
                        @click="addTableRow(scope)"
                      >Delete</el-button>
                    </template>
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="danger"
                        @click="delTableRow(scope.$index, scope.row)"
                      >Delete</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
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
const mockData = [
  {
    typeId1: '', // 大类
    typeName1: '',
    typeId2: '', // 小类
    typeName2: '',
    procRouteId: 111, // 加工路径Id
    procRouteName: '加工路径1-A-1',
    procRouteInfo: [
      {
        id: 'node1', // step_id 工步组件Id
        label: '点焊', // step_name 工步组件名称
        stepNum: 1,
        tableData1: [],
        tableData2: []
      },
      {
        id: 'node2', // step_id 工步组件Id
        label: '组装', // step_name 工步组件名称
        stepNum: 2,
        tableData1: [],
        tableData2: []
      }
    ]
  }
]
class ProcRouteInfo {
  constructor(id, label) {
    this.id = id
    this.label = label
    this.graphRenderData = {// G6渲染数据
      nodes: [],
      edges: []
    }
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')'
  }
}
let procRouteKey = new Date().getTime()
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
      workFlow: null,
      productCategory: {
        filterText: '',
        data: [
          {
            id: 1,
            label: '类别 1',
            children: [
              {
                id: 11,
                label: '类 A',
                children: [
                  {
                    id: 111,
                    label: '加工路径1-A-1',
                    graphRenderData: {// G6渲染数据
                      nodes: [
                        {
                          id: 'node1', // step_id 工步组件Id
                          label: '点焊', // step_name 工步组件名称
                          nodeObjData:
                          {
                            tableData: [{
                              date: '2016-05-02',
                              name: '王小虎1',
                              address: '上海市普陀区金沙江路 1518 弄'
                            }, {
                              date: '2016-05-04',
                              name: '王小虎1',
                              address: '上海市普陀区金沙江路 1517 弄'
                            }, {
                              date: '2016-05-01',
                              name: '王小虎1',
                              address: '上海市普陀区金沙江路 1519 弄'
                            }, {
                              date: '2016-05-03',
                              name: '王小虎1',
                              address: '上海市普陀区金沙江路 1516 弄'
                            }]
                          }
                        },
                        {
                          id: 'node2',
                          label: '组装',
                          nodeObjData:
                          {
                            cs: 'cs'
                          }
                        }
                      ],
                      edges: [
                        {
                          source: 'node1',
                          target: 'node2'
                        }
                      ]
                    }
                  },
                  {
                    id: 112,
                    label: '加工路径1-A-2',
                    graphRenderData: {// G6渲染数据
                      nodes: [
                        {
                          id: 'node1', // step_id 工步组件Id
                          label: '点焊', // step_name 工步组件名称
                          nodeObjData:
                          {
                            cs: 'cs'
                          }
                        },
                        {
                          id: 'node2',
                          label: '组装',
                          nodeObjData:
                          {
                            cs: 'cs'
                          }
                        }
                      ],
                      edges: [
                        {
                          source: 'node1',
                          target: 'node2'
                        }
                      ]
                    }
                  }
                ]
              }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      },
      procRoutes: {
        filterText: '',
        data: [
          {
            id: 1,
            label: '一级 1',
            children: [
              {
                id: 4,
                label: '二级 1-1',
                children: [
                  {
                    id: 9,
                    label: '三级 1-1-1'
                  },
                  {
                    id: 10,
                    label: '三级 1-1-2'
                  }
                ]
              }
            ]
          }
        ]
      },
      selectedNodeObjData: {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      },
      selectedRouteId: -1
    }
  },
  watch: {
    'productCategory.filterText': function(val) {
      debugger
      this.$refs.tree.filter(val)
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      // 由于G6无法使用 width: 100% ，获取父级容器宽度给 Graph
      const workFlowWidth = this.$refs.workFlowContainer.offsetWidth
      const workFlowHeight = 600
      const miniMapWidth = this.$refs.miniMapContainer.offsetWidth
      const miniMapHeight = workFlowHeight / workFlowWidth * miniMapWidth
      const minimap = new Minimap({
        size: [miniMapWidth, miniMapHeight],
        container: 'workFlowMiniMap'
      })
      // 整个组件渲染完成后
      this.workFlow = new G6.Graph({
        container: 'workFlowPanel',
        width: workFlowWidth,
        height: 600,
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'clickSelected'], //
          view: [],
          // 定义的 behavior 指定到这里，就可以支持Behavior中定义的交互
          edit: [
            'drag-canvas',
            'zoom-canvas',
            'clickSelected',
            'dragPanelItemAddNode',
            'hoverAnchorActived',
            'hoverNodeActived',
            'dragNode',
            'dragEdge',
            'itemAlign'
          ] //
        },
        plugins: [minimap, new Grid()],
        defaultNode: {
          shape: 'process-route'
        },
        defaultEdge: {
          shape: 'flow-polyline-round'
        },
        layout: {
          type: 'dagre',
          nodesep: 10, // 同层节点间距
          ranksep: 30, // 层级间距
          rankdir: 'LR', // 布局方向
          align: 'DR' // 节点对齐方向
        }
        // minZoom: 1,
        // maxZoom: 3
      })
      this.workFlow.setMode('edit')
      const self = this
      this.workFlow.on('afterItemSelected', items => {
        debugger
        if (items && items.length > 0) {
          const item = this.workFlow.findById(items[0])
          // 将节点的 nodeObjData 赋值给表格组件绑定的变量
          // 表格组件中的绑定数组 和 tem.getModel().nodeObjData 是同一个对象
          const nodeModel = item.getModel()
          nodeModel.nodeObjData = nodeModel.nodeObjData || {}
          nodeModel.nodeObjData.tableData = nodeModel.nodeObjData.tableData || []
          self.selectedNodeObjData = nodeModel.nodeObjData
        } else {
          self.selectedNodeObjData = { tableData: [] }
        }
      })
      window.workFlow = this.workFlow
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
      this.workFlow.emit('canvas:mouseup', event) // 同步调用
      this.workFlow.set('onDragAddNode', false)
      this.workFlow.set('addModel', null)
    },
    /**
     * 获取节点配置
     */
    getNodeConfig(nodeName) {
      switch (nodeName) {
        case 'signalCatch':
          return 'signal-catch-node'
        default:
          return 'task-node'
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    /**
     * 选择加工路径，进行渲染，保存所有节点数据
     */
    handleNodeClick(data, node, self) {
      debugger
      // const srcData = this.productCategory
      // const graphData = this.workFlow.save()
      // const editId = this.selectedRouteId
      debugger
      if (node.level === 3) {
        if (this.selectedRouteId === node.id) {
          return
        }
        this.selectedRouteId = node.id
        this.selectedNodeObjData = { tableData: [] }
        if (data.graphRenderData.nodes.length === 0) {
          this.workFlow.clear()
          this.workFlow.paint()
          this.workFlow.zoomTo(1)
          return
        }
        this.workFlow.read(data.graphRenderData)
        this.workFlow.fitView(5)
        // if (this.workFlow.getZoom() > 5) {
        //   this.workFlow.zoomTo(4)
        // }
      }
    },
    addTreeNode(data) {
      this.$prompt('请输入加工路径名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '名称格式不正确'
      }).then(({ value }) => {
        // 请求Guid
        this.$message({
          type: 'success',
          message: '创建成功'
        })
        console.log('button')
        debugger
        const newChild = new ProcRouteInfo(procRouteKey++, value)
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    reNameTreeNode(data) {
      this.$prompt('请输入加工路径名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputErrorMessage: '名称格式不正确'
      }).then(({ value }) => {
        data.label = value
        this.$message({
          type: 'success',
          message: '重命名成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    delTreeNode(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    /**
     * 必须使用非变异方法修改数组，否则 item.getModel().nodeObjData 不会发生改变
     */
    delTableRow(index, row) {
      this.selectedNodeObjData.tableData.splice(index, 1)
    },
    addTableRow(scope) {
      // const h = this.productCategory
      debugger
      this.selectedNodeObjData.tableData.push({
        date: '2016-05-04',
        name: '王小虎casdsdc',
        address: '上海市普陀区金沙江路 1517 弄'
      })
      debugger
    }
  }
}
</script>

<style>
.el-main {
  padding: 0px !important;
}
.el-header,
.el-aside {
  width: 100%;
  padding: 8px 0;
  background-color: #fff;
  border: 1px solid #e9e9e9;
  box-shadow: 0 8px 12px 0 rgba(0, 52, 107, 0.04);
}
.el-collapse {
  border-top: 0px solid #ebeef5 !important;
}
.panel-detail {
  background: #f0f2f5;
  border-right: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
}
.el-button--mini.is-circle {
    padding: 5px !important;
}
/* #workFlowPanel > canvas{
  width: 100% !important;
  height: 100%;
} */
/* #canvas_1{
  width: 100% !important;
} */
</style>

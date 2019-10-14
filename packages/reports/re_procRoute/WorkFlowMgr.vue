<template>
  <div>
    <el-container>
      <el-container>
        <el-aside width="10%">
          <el-input v-model="productCategory.filterText" placeholder="输入关键字进行过滤" />
          <el-tree
            ref="tree"
            node-key="id"
            class="filter-tree"
            :data="productCategory.data"
            :props="productCategory.defaultProps"
            :filter-node-method="filterNode"
            accordion
            :expand-on-click-node="true"
            :indent="2"
            :highlight-current="true"
            style="font-size: 14px;"
            @node-click="handleNodeClick"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <div style="width:100%">
                <span style="margin:3px">{{ node.label }}</span>
                <template v-if="node.level === 2">
                  <el-divider direction="vertical" />
                  <el-tooltip class="item" effect="dark" content="新建加工路径" placement="right-start">
                    <el-button size="mini" icon="el-icon-plus" circle @click.stop="() => addGraph(data)" />
                  </el-tooltip>

                </template>

                <template v-if="node.level === 3">
                  <template v-if="data.status==='Modified'">
                    <el-divider direction="vertical" />
                    <span style="color:#FF9800;">M</span>
                  </template>
                  <template v-else-if="data.status==='Added'">
                    <el-divider direction="vertical" />
                    <span style="color:#009688;">A</span>
                  </template>

                </template>
              </div>

            </span>
          </el-tree>
        </el-aside>
        <el-aside width="8%">
          <el-collapse accordion>
            <el-collapse-item v-for="(procType) in nodeComponents" :key="procType.id">
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
              <el-card shadow="hover" body-style="padding:10px">
                <el-row>
                  <el-col :span="11">
                    <div class="graph-status">
                      <span>状态：</span><span style="font-weight: bolder;color: #409EFF;">生效</span><span style="font-weight: bolder;color: #F56C6C;">失效</span>
                      <el-divider direction="vertical" />
                      <span>编号：{{ graphId }}</span>
                      <el-divider direction="vertical" />
                      <span>名称：{{ graphName }}</span>
                      <el-divider direction="vertical" />
                      <span>模式：{{ graphMode }}</span>
                      <el-divider direction="vertical" />
                      <el-tooltip class="item" effect="dark" content="切换模式" placement="bottom">
                        <el-switch v-model="currGraph.editMode" :width="30" :disabled="canChangeMode" @change="(val)=>changeGraphMode(val)" />
                      </el-tooltip>

                    </div>
                  </el-col>
                  <el-col :span="13">
                    <el-divider direction="vertical" />
                    <el-tooltip class="item" effect="dark" content="删除元素" placement="bottom">
                      <el-button size="medium" type="plain" class="el-icon-delete tool-panel-button" :disabled="canDelItem" @click="graphDelItem()" />
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="放大" placement="bottom">
                      <el-button size="medium" type="plain" class="el-icon-zoom-in tool-panel-button" :disabled="canChangeMode" @click="zoomIn()" />
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="缩小" placement="bottom">
                      <el-button size="medium" type="plain" class="el-icon-zoom-out tool-panel-button" :disabled="canChangeMode" @click="zoomOut()" />
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="适应屏幕" placement="bottom">
                      <el-button size="medium" type="plain" class="el-icon-full-screen tool-panel-button" :disabled="canChangeMode" @click="fitScreen()" />
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="切换网格" placement="bottom">
                      <el-button size="medium" type="plain" class="el-icon-s-grid tool-panel-button" @click="setGrid()" />
                    </el-tooltip>
                    <el-divider direction="vertical" />
                    <el-tooltip class="item" effect="dark" content="重命名加工路径名称" placement="bottom">
                      <el-button size="mini" type="warning" :disabled="!currGraph.editMode" @click.stop="() => reNameGraph()">重命名</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="失效本条加工路径！" placement="bottom">
                      <el-button size="mini" type="danger" :disabled="!currGraph.editMode" @click="drafGraph()">失效</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除本条加工路径，且无法撤回！" placement="bottom">
                      <el-button size="mini" type="danger" :disabled="!currGraph.editMode" @click="delGraph()">删除</el-button>
                    </el-tooltip>
                    <el-button size="mini" type="primary" icon="el-icon-upload" :disabled="!currGraph.editMode" @click="saveGraph()">提交</el-button>
                  </el-col>
                </el-row>

              </el-card>

              <div @dragover.prevent @drop="nodeDropHandler($event)">
                <el-card :style="gridStyle" body-style="padding:0px">
                  <div id="workFlowPanel" ref="workFlowContainer" />
                </el-card>

              </div>

            </el-main>
            <el-aside width="30%" class="panel-detail">
              <el-row>
                <div id="workFlowMiniMap" ref="miniMapContainer" />
              </el-row>
              <el-row>
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>节点信息</span>
                    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                  </div>
                  <div>
                    <el-table :data="currGraph.selectedNodeObjData.tableData" style="width: 100%">
                      <el-table-column label="Date" prop="date" />
                      <el-table-column label="Name" prop="name" />
                      <el-table-column align="right">
                        <template v-if="canEditItem" slot="header" slot-scope="scope">
                          <el-button size="mini" type="primary" @click="addTableRow(scope)">新增行</el-button>
                        </template>
                        <template v-if="canEditItem" slot-scope="scope">
                          <el-button size="mini" type="danger" @click="delTableRow(scope.$index, scope.row)">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </el-card>
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
import registerItem from './workFlow/item'
import registerBehavior from './workFlow/behavior'
registerItem(G6)
registerBehavior(G6)
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
let procRouteKey = new Date().getTime()
export default {
  data() {
    return {
      nodeComponents: [// 节点组件列表
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
      productCategory: {// 图纸集目录 树形展示 包括图纸名称、图纸状态
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
                    status: 'Unchanged' // 状态只显示生效/失效  Added Modified Unchanged
                  },
                  {
                    id: 112,
                    label: '加工路径1-A-2',
                    status: 'Unchanged' // Added Modified Unchanged
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
      graphSet: [// 图纸集 G6渲染数据
        {
          id: 111,
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
      ],
      // 当前 graph实例 状态
      currGraph: {
        id: -1, // 图纸Id 和 图纸所在树形节点Id 相同
        label: '',
        editMode: false,
        isItemSelected: false,
        selectedNodeObjData: {// 选中节点数据模型
          tableData: []
        }
      },
      gridStyle: {
        'background-color': '#fff0'
      }
    }
  },
  computed: {
    canChangeMode() {
      return this.currGraph.id === -1
    },
    canDelItem() {
      return !(this.currGraph.isItemSelected && this.currGraph.editMode)
    },
    canEditItem() {
      return (this.currGraph.isItemSelected && this.currGraph.editMode)
    },
    graphMode() {
      return this.currGraph.editMode ? '编辑' : '只读'
    },
    graphId() {
      return this.currGraph.id === -1 ? '  ' : this.currGraph.id
    },
    graphName() {
      const id = this.currGraph.id
      const state = this._getCurrGraphState(id)
      return state.label || '请选择路径'
    },
    graphState() {
      const id = this.currGraph.id
      const state = this._getCurrGraphState(id)
      return state.status || ''
    }
  },
  watch: {
    'productCategory.filterText': function(val) {
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
        height: 800,
        modes: {
          default: [], //
          view: ['drag-canvas', 'zoom-canvas', 'clickSelected'],
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
      this._setGraphMode('view')
      this.workFlow.set('AutoRendering', false)
      this._initEvents()
      window.workFlow = this.workFlow
    })
  },
  methods: {
    _initEvents() {
      const self = this
      this.workFlow.on('afterItemSelected', items => {
        if (items && items.length > 0) {
          self.currGraph.isItemSelected = true
          const item = this.workFlow.findById(items[0])
          // 将节点的 nodeObjData 赋值给表格组件绑定的变量
          // 表格组件中的绑定数组 和 tem.getModel().nodeObjData 是同一个对象
          const nodeModel = item.getModel()
          nodeModel.nodeObjData = nodeModel.nodeObjData || {}
          nodeModel.nodeObjData.tableData = nodeModel.nodeObjData.tableData || []
          self.currGraph.selectedNodeObjData = nodeModel.nodeObjData
        } else {
          self.currGraph.isItemSelected = false
          self.currGraph.selectedNodeObjData = { tableData: [] }
        }
      })
      // beforeadditem
      this.workFlow.on('afteradditem', (e) => {
        if (e.model.shape === 'process-route' && !self.workFlow.get('AutoRendering')) {
          const node = this.$refs.tree.getNode(self.currGraph.id)
          if (node.data.status === 'Unchanged') {
            node.data.status = 'Modified'
            debugger
          }
        }
      })
      this.workFlow.on('afterremoveitem', (e) => {
        if (!self.workFlow.get('AutoRendering')) {
          const node = this.$refs.tree.getNode(self.currGraph.id)
          if (node.data.status === 'Unchanged') {
            node.data.status = 'Modified'
            debugger
          }
        }
      })
    },
    // 删除图纸后，重置工作区
    _clearWorkspace() {
      this.workFlow.set('AutoRendering', true)
      this.workFlow.clear()
      this.workFlow.paint()
      this.workFlow.zoomTo(1)
      this._setGraphMode('view')
      this.currGraph.id = -1
      this.currGraph.label = ''
      this.currGraph.editMode = false
      this.currGraph.isItemSelected = false
      this.currGraph.selectedNodeObjData = { tableData: [] }
      this.workFlow.set('AutoRendering', false)
      debugger
    },
    _renderWorkspace(graphNodeData) {
      this.workFlow.set('AutoRendering', true)
      this._clearWorkspace()
      this.workFlow.set('AutoRendering', true)
      this.currGraph.id = graphNodeData.id
      this.currGraph.label = graphNodeData.label
      const graphData = this.graphSet.find((n) => n.id === graphNodeData.id)
      if (graphData.graphRenderData.nodes.length === 0) {
        this.workFlow.set('AutoRendering', false)
        return
      }
      this.workFlow.read(graphData.graphRenderData)
      this.fitScreen()
      this.workFlow.set('AutoRendering', false)
      debugger
    },
    // 设置工作模状态
    _setGraphMode(mode) {
      this.workFlow.setMode(mode)
      this.currGraph.mode = mode
    },
    _getCurrGraphState(id) {
      if (this.$refs.tree && id !== -1) {
        const node = this.$refs.tree.getNode(id)
        return node.data
      }
      return {}
    },
    nodeDragStartHandler(message, event) {
      // const addModel = this.getNodeConfig(message)
      // const ghost = createDOM('<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"' + ' style="opacity:0"/>')
      // event.dataTransfer.setDragImage(ghost, 0, 0)

      console.log('DragStart')

      this.workFlow.set('onDragAddNode', true)
      this.workFlow.set('addModel', { lableName: message })
    },
    nodeDropHandler(event) {
      console.log('drop')
      // 触发G6 canvas鼠标释放事件
      this.workFlow.emit('canvas:mouseup', event) // 同步调用
      this.workFlow.set('onDragAddNode', false)
      this.workFlow.set('addModel', null)
    },
    nodeDragEndHandler(event) {
      console.log('DragEnd')
    },

    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    /**
     * 选择加工路径，进行渲染，保存所有节点数据
     */
    handleNodeClick(data, node, self) {
      if (node.level === 3) {
        if (this.currGraph.id === data.id) {
          return
        }
        // 切换图纸

        const state = this._getCurrGraphState(this.currGraph.id)
        if (state.status === 'Added' || state.status === 'Modified') {
          this._saveGraphDraft()
        }
        this._renderWorkspace(data)
      }
    },
    addGraph(data) {
      const self = this

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

        const newChild = { id: procRouteKey++, label: value, status: 'Added' }
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
        self.graphSet.push({
          id: newChild.id,
          graphRenderData: {// G6渲染数据
            nodes: [],
            edges: []
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    reNameGraph() {

    },
    delTreeNode(node, data) {
      // 请求删除 加工路径  param: data.id
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    /**
     * 必须使用非变异方法修改数组，否则 item.getModel().nodeObjData 不会发生改变
     */
    delTableRow(index, row) {
      this.currGraph.selectedNodeObjData.tableData.splice(index, 1)
    },
    addTableRow(scope) {
      // const h = this.productCategory

      this.currGraph.selectedNodeObjData.tableData.push({
        date: '2016-05-04',
        name: '王小虎casdsdc',
        address: '上海市普陀区金沙江路 1517 弄'
      })
    },
    changeGraphMode(val) {
      if (val) {
        this._setGraphMode('edit')
      } else {
        this._setGraphMode('view')
      }
    },
    graphDelItem() {
      const selectedItem = this.workFlow.get('selectedItems')
      if (selectedItem && selectedItem[0]) {
        const id = selectedItem[0]
        const item = this.workFlow.findById(id)
        this.workFlow.removeItem(item)
      }
      this.workFlow.set('selectedItems', [])
      this.workFlow.emit('afterItemSelected', [])
    },
    _saveGraphDraft() {
      const graphId = this.currGraph.id
      const srcData = this.graphSet.find(n => n.id === graphId)
      const graphEditData = this.workFlow.save()
      // 清空edge的锚点
      const edges = graphEditData.edges.map(n => {
        return { source: n.source, target: n.target }
      })
      srcData.graphRenderData = { nodes: graphEditData.nodes, edges: edges }
    },
    saveGraph() {
      // 保存到服务器
    },
    delGraph() {
      const node = this.$refs.tree.getNode(this.currGraph.id)
      this.$refs.tree.remove(node)
      this._clearWorkspace()
      // 请求删除 加工路径  param: this.currGraph.id
    },
    fitScreen() {
      this.workFlow.fitView(50)
      if (this.workFlow.getZoom() > 4) {
        this.workFlow.zoomTo(3)
      }
    },
    zoomIn() {
      this.workFlow.zoom(1.1, this.workFlow.get('viewController')._getViewCenter())
    },
    zoomOut() {
      this.workFlow.zoom(0.9, this.workFlow.get('viewController')._getViewCenter())
    },
    setGrid() {
      if (this.gridStyle['background-color'] === '#fff') {
        this.gridStyle['background-color'] = '#fff0'
      } else {
        this.gridStyle['background-color'] = '#fff'
      }
    }
  }
}
</script>

<style scoped>
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
.tool-panel-button {
    border: 0px solid #DCDFE6 !important;
    padding: 5px 10px !important;
    font-size: 14px;
    border-radius: 4px;
}
.tool-panel-divider{
  margin: 4px;
  border-left: 1px solid #E9E9E9;
}
.tool-panel-button+.tool-panel-button{
    margin-left: 0px !important;
}
.graph-status>span{
  font-size: small;
}
</style>

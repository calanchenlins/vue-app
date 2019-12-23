<template>
  <div id="app">
    <work-flow-mgr :node-components="nodeComponents" :graph-tree="graphTree" :graph-set="graphSet" />
  </div>
</template>

<script>
// import 文件夹默认寻找index文件
import WorkFlowMgr from '@app/samples/workflowstudio/WorkFlowMgr'
const graphTreeSrcData = []
const graphTree = [ // 图纸集目录 树形展示 包括图纸名称、图纸状态
  {
    id: 1,
    label: '路径管理',
    children: []
  }
]
debugger
graphTreeSrcData.forEach(n => {
  let topLevelDirectory = graphTree[0].children.find(c => c.id === n.product_type_id)
  if (!topLevelDirectory) {
    topLevelDirectory = {
      id: n.product_type_id,
      label: n.product_type_name,
      children: []
    }
    graphTree[0].children.push(topLevelDirectory)
  }
  const node = {
    id: n.route_id, // 路径Id
    label: n.route_name, // 路径名称
    status: 'Unchanged', // 状态只显示生效/失效  Added Modified Unchanged,
    st_flag: n.st_flag
  }
  topLevelDirectory.children.push(node)
})
if (graphTree[0].children.length === 0) {
  graphTree[0].children.push({
    id: '1-1',
    label: '默认产品类别',
    children: []
  })
}
export default {
  name: 'App',
  components: {
    WorkFlowMgr
  },
  data() {
    return {
      nodeComponents: [ // 节点组件列表
        {
          id: 1,
          typeName: '金加工类',
          steps: [
            {
              id: 11,
              name: '点焊'
            },
            {
              id: 12,
              name: '激切'
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
      graphTree: graphTree, // 图纸集目录 树形展示 包括图纸名称、图纸状态
      graphSet: []// 图纸集 G6渲染数据
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>

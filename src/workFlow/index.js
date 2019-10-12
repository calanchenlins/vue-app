import registerItem from './item'
import registerBehavior from './behavior'
import G6 from '@antv/g6/src'
import Item from '@antv/g6/src/item/item'
registerItem(G6)
registerBehavior(G6)
const G6Extension = {
  G6,
  Item
}
export default G6Extension

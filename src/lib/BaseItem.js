import Util from '@antv/g6/src/util'
class BaseItem {
  constructor() {
    const defaultCfg = {
      /**
         * id
         * @type {string}
         */
      id: null,

      /**
         * 类型
         * @type {string}
         */
      type: 'item',

      /**
         * data model
         * @type {object}
         */
      model: {},

      /**
         * g group
         * @type {G.Group}
         */
      group: null,

      /**
         * is open animate
         * @type {boolean}
         */
      animate: false,

      /**
         * visible - not group visible
         * @type {boolean}
         */
      visible: true,
      /**
         * capture event
         * @type {boolean}
         */
      event: true,
      /**
         * key shape to calculate item's bbox
         * @type object
         */
      keyShape: null,
      /**
         * item's states, such as selected or active
         * @type Array
         */
      states: []
    }
    this._cfg = defaultCfg
  }
  getType() {
    return 'anchor'
  }
  getContainer() {
    return this.get('group')
  }
  /**
     * 获取属性
     * @internal 仅内部类使用
     * @param  {String} key 属性名
     * @return {*} 属性值
     */
  get(key) {
    return this._cfg[key]
  }

  /**
     * 设置属性
     * @internal 仅内部类使用
     * @param {String|Object} key 属性名，也可以是对象
     * @param {*} val 属性值
     */
  set(key, val) {
    if (Util.isPlainObject(key)) {
      this._cfg = Util.mix({}, this._cfg, key)
    } else {
      this._cfg[key] = val
    }
  }
}
export default BaseItem

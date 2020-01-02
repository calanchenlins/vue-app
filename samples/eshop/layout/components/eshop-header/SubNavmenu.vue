<template>
  <div class="eshop-header-menu">
    <ul>
      <li v-for="menu in data" :key="menu.id" :style="submenuStyleObject">
        <div>
          <a>{{ menu.name }}</a>
          <ul class="eshop-header-submenu">
            <li v-for="subMenu in menu.subItem" :key="subMenu.id">
              <a>{{ subMenu.name }}</a>
            </li>
          </ul>
        </div>

      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      /*       data: [{ id: 0, name: '时装秀' }, { id: 1, name: '时装秀' }, { id: 2, name: '时装秀' }, { id: 3, name: '时装秀' }], */
      showtest: true,
      data: [
        {
          id: 0,
          name: '手袋1',
          subItem: [
            { id: 0, name: '手提包1' }, { id: 1, name: '手提包1' }, { id: 2, name: '手提包1' }, { id: 3, name: '手提包1' }
          ]
        },
        {
          id: 1,
          name: '手袋2',
          subItem: [
            { id: 0, name: '手提包1' }, { id: 1, name: '手提包1' }, { id: 2, name: '手提包1' }, { id: 3, name: '手提包1' }
          ]
        },
        {
          id: 2,
          name: '手袋3',
          subItem: [
            { id: 0, name: '手提包1' }, { id: 1, name: '手提包1' }, { id: 2, name: '手提包1' }, { id: 3, name: '手提包1' }
          ]
        }
      ]
    }
  },
  computed: {
    submenuStyleObject: function() {
      const _width = 100 / this.data.length
      return {
        width: _width + '%'
      }
    }
  }
}
</script>
<style>
.eshop-header-menu li {
    list-style-type:none;/*设置li元素的前缀样式*/
}
/*设置子菜单水平分布*/
.eshop-header-menu>ul >li {
    display: inline-block;
}
/*设置悬浮菜单居中、最大宽度、宽度比例*/
.eshop-header-menu{
    margin: 0 auto;
    max-width: 1200px;
    width: 30%;
}
.eshop-header-submenu >li >a{
    display: block;
/*     padding: 10px 5px 15px 0px;; */
    font-size: 12px;
    line-height: 12px;
    color: #646060;
}
.eshop-header-submenu >li{
    display: block;
    margin: 10px 0px 20px 0px;
    font-family: 'FuturaLT-Book','GucciChinese';
}
.eshop-header-submenu{
    text-align: left;
    padding: 0;
}
.eshop-header-submenu > li{
        text-align: left;
}
.eshop-header-menu li{
    text-align: left;
}
</style>


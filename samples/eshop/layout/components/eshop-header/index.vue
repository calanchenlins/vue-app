<template>
  <div class="eshop-header-background">
    <div class="eshop-navbar-logo">
      <a href="/zh">
        <img src="https://res.gucci.cn/images/common/gucci-logo@2x.png">
      </a>
    </div>
    <div class="eshop-nav-bar">
      <div class="eshop-nav-menu">
        <ul>
          <li v-for="levelOne in data" :key="levelOne.id">
            <a>
              <span>{{ levelOne.name }}
              </span>
            </a>
          </li>
        </ul>
      </div>
      <div class="eshop-nav-brand">
        <SubNavmenu />
      </div>
    </div>
  </div>
</template>
<script>
import SubNavmenu from './SubNavmenu'
export default {
  components: {
    SubNavmenu
  },
  data() {
    return {
      data: [{ id: 0, name: '时装秀' }, { id: 1, name: '时装秀' }, { id: 2, name: '时装秀' }, { id: 3, name: '时装秀' }],
      showtest: true
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style>
.eshop-header-background{
  background: #1B1B1B;
  text-align:center;
}
/*设置所有span字体*/
.eshop-nav-bar  ul > li > a > span {
    margin: 5px 0 0px;
    height: 51px;
    padding: 0 15px;
    line-height: 30px;
    font-size: 14px;
    letter-spacing: 1.34px;
    font-family: 'Futura-LT-Medium', 'GucciChinese';
}
.eshop-nav-menu li{
    display: inline;/*li为块状元素,独占一行*/
    list-style-type:none;/*设置li元素的前缀样式*/
}
/*重写ul浏览器默认样式*/
.eshop-nav-menu > ul{
    margin-block-start: 0px;
    margin-block-end: 0px;
}

/*父级元素*/
.eshop-nav-bar{
  position: relative;/*元素相对自身偏移,原位置仍占据文档流*/
  z-index: auto;
}
/*显示元素*/
.eshop-nav-menu {
  position: relative;
  z-index: 2;
  /*如果不设置背景色,只能看到隐藏元素的背景色*/
  background: #1B1B1B;
}
/*隐藏元素*/
.eshop-nav-brand{
  top: 0%;
  width: 100%;/*宽度与父元素相同*/
  position: absolute;
  z-index: -1;
  background-color: rgba(255, 255, 255, 0.95);
  opacity: 0;
  transition: opacity .6s,top .6s;
}
/* .eshop-nav-menu > li > a > span:hover {
} */
.eshop-nav-menu:hover + .eshop-nav-brand {
  z-index: 1;
  opacity: 1;
  top: 100%
}
.eshop-nav-brand:hover{
  z-index: 1;
  opacity: 1;
  top: 100%
}
.eshop-nav-menu > ul > li > a > span {
  color: rgb(255, 255, 255);
}
.eshop-nav-brand > ul> li > a > span {
    color: #313131;
}

/*设置hover下标三角形*/
.eshop-nav-menu >ul> li > a  {
	position: relative;
}
.eshop-nav-menu >ul> li > a > span {
	display: inline-block;
}
.eshop-nav-menu >ul> li > a > span:hover::after { position: absolute; }
.eshop-nav-menu >ul> li > a > span:hover::after { content: "\1F783"; right:  40%; top: 50%;z-index: 1; }

</style>


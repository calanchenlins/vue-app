<template>
  <div class="eshop-background">
    <el-container class="gpu-cube">
      <el-main>
        <el-row>
          <el-col v-for="product in productList" :key="product.id" :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
            <div class="parent-div">
              <div class="show-div">
                <el-image src="https://res.gucci.cn/resources/2019/5/8/15572886001567096_ts_470X470.png" fit="cover">
                  <div slot="placeholder" class="image-slot">
                    加载中
                    <span class="dot">...</span>
                  </div>
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline" />
                  </div>
                </el-image>
              </div>
              <div class="hover-div">
                <div>
                  <el-carousel indicator-position="none" :autoplay="false" arrow="always">
                    <div class="icon-basket">
                      <el-tooltip content="点击加入购物车" placement="bottom">
                        <el-badge :value="cartCount" :max="99">
                          <span class="el-icon-shopping-cart-2" style="cursor:pointer;" @click="addToCart" />
                        </el-badge>
                      </el-tooltip>

                    </div>
                    <el-carousel-item v-for="item in 4" :key="item">
                      <router-link :to="product.pictureFileName">
                        <el-image
                          src="https://res.gucci.cn/resources/2019/6/2/15594566339957184_ws_470X470.jpg"
                          fit="cover"
                        >
                          <div slot="placeholder" class="image-slot">
                            加载中
                            <span class="dot">...</span>
                          </div>
                          <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline" />
                          </div>
                        </el-image>
                      </router-link>
                    </el-carousel-item>
                  </el-carousel>
                  <div class="esh-catalog-name">
                    <span>{{ product.name }}</span>
                  </div>
                  <div class="esh-catalog-price">
                    <span>{{ product.price }}</span>
                  </div>
                  <div class="esh-catalog-buy-now">
                    <span>立即购买</span>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getProducts } from '@app/samples/eshop/api/index'
export default {
  name: 'Catalog',
  data() {
    return {
      src:
        'https://res.gucci.cn/resources/2019/5/8/15572886001567096_ws_470X470.jpg',
      productList: [],
      cartCount: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const params = {
        pageSize: 40,
        pageIndex: 1
      }
      debugger
      getProducts(params).then(response => {
        debugger
        this.productList = response.items
      })
    },
    addToCart() {
      this.cartCount++
      this.$notify({
        title: '',
        message: '成功加入购物车',
        type: 'success'
      })
    }
  }
}
</script>

<style>
.vertical-center {
  /*设置元素垂直居中*/
  display: flex; /*Flex布局*/
  display: -webkit-flex; /* Safari */
  align-items: center; /*指定垂直居中*/
}
.esh-catalog-product {
  margin-left: 5%;
  margin-right: 5%;
  width: 90%;
  height: 100%;
}
.esh-catalog-thumbnail {
  max-width: 370px;
  width: 100%;
}
.esh-catalog-name {
  height: 44px;
  overflow: hidden;
  font-size: 14px;
  text-align: center;
  text-transform: uppercase;
}
.esh-catalog-price {
  height: 32px;
  font-size: 14px;
  text-align: center;
  letter-spacing: 1px;
}
.esh-catalog-price::before {
  content: "$";
}
.esh-catalog-buy-now {
  height: 32px;
  font-size: 12px;
  text-align: center;
  color: #1b1b1b;
  letter-spacing: 1px;
}
.el-image {/*设置el-image水平居中*/
    margin: auto;
    width: 100%;/*如果不设置宽度，水平居中无效*/
}

.el-row{
  max-width: 1890px;
  margin: auto;
}
/*七阶层叠
1.层叠上下文
2.负z-index
3.block块状水平盒子(display:block)
4.float元素
5,display:inline/inline-block
6.z-index:auto;或z-index:0;
7.正z-index
*/
/*浏览器默认样式中设置了div为display:block,所以div是块级元素*/
.eshop-background{
  background-color:#fff;
}
.parent-div{/*父级层*/
  position: relative;/*元素相对自身偏移,原位置仍占据文档流*/
  margin:1px;
  z-index: auto;
  background-color:#e6e6e6;
}
/*两个块级子元素，设置position且z-index>=0时,为block层叠水平*/
/*两个块级子元素，设置position且z-index<0时,为负z-index层叠水平*/
.show-div {/*默认显示层,display:block层叠水平*/
  position: relative;
  z-index: auto;
  background-color:#e6e6e6;
}
.hover-div {/*隐藏层*/
  position: absolute;/*绝对定位,父元素设置为position:relative,以父元素为基点,不占据文档流*/
  z-index: -1;
  top: 0%;
  width: 100%;/*宽度与父元素相同*/
  background-color:#fff;
  border: solid 1px #e6e6e6;
}
.parent-div:hover>.hover-div {
  /*设置为0的话,在hover-div多余部分,没有效果*/
  z-index: 1;
}
/*覆盖走马灯默认300px的高度*/
.el-carousel__container{
  height: 100%;
}
/*将显示的元素置为relative,使得父元素被撑开*/
.el-carousel__item.is-active.is-animating{
  position: relative;
}
/*设置Gpu硬件加速*/
.gpu-cube {
   -webkit-transform: translateZ(0);
   -moz-transform: translateZ(0);
   -ms-transform: translateZ(0);
   -o-transform: translateZ(0);
   transform: translateZ(0);
   /* Other transform properties here */
}
.icon-basket{
    position:absolute;
    z-index:3;
    right: 10%;
    top: 20%;
    display: block;
    font-size: 44px;
    color: #606266;
    transition: color .15s linear;
}
</style>


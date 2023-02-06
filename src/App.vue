<template>
  <router-view />
  <!-- 登录页面不需要显示底部组件 -->
  <footerMusic v-if="$store.state.isFooterShow"></footerMusic>
</template>

<script>
import footerMusic from './components/item/FooterMusic.vue';

export default{
  components:{footerMusic}
}
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
// 最大组件设置100%否则子组件的宽高100%不生效
body,html,#app{
  // height: 100%;
  width: 100%;
}
// 整个页面黑白滤镜
// html{
//   -webkit-filter: grayscale(100%);
//   -moz-filter: grayscale(100%);
//   -ms-filter: grayscale(100%);
//   -o-filter: grayscale(100%);
//   filter: grayscale(100%);
//   filter: gray;
//  }
.icon {
  width: .5rem;
  height: .5rem;
}
a{
  color: black;
}
</style>

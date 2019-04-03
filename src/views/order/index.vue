<template>
  <div class="order-inde">
    <button>添加地图</button>
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted () {
    var map = new BMap.Map('container')
    var point = new BMap.Point(116.404, 39.915)
    map.centerAndZoom(point, 15)
  }
}
</script>

<style scoped>
  .order-inde{
    width: 90%;
    margin: 0 auto
  }
 #container{
   width: 400px;
   height: 300px;
   }
</style>

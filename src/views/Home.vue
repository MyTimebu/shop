<template>
  <div class="home">
    <div class="center">
      <div class="tou"><img src="../assets/1.png"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style>
  .home{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content:center;
    align-items: center;
    position: relative;
    background-color: #006ae2
  }
  .center{
    width: 500px;
    height: 300px;
    background-color: #fff;
  }
  .tou{
    width: 100px;
    position: absolute;
    left: 620px;
    top:130px;
    height: 100px;
    border: 10px solid #fff;
    border-radius: 50%;
    box-shadow: 1px 10px 15px 1px;
  }
  .tou>img{
    width: 100%;
    height: 100%;
    border-radius: 50%
  }
</style>

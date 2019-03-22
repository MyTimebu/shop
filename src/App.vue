<template>
  <div id="app">
      <!-- <router-link to="/"></router-link> -->
      <!-- <router-link to="/about">About</router-link> -->
    <router-view/>
  </div>
</template>

<style>
#app {
 width: 100%;
 height: 100%;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<template>
  <div class="container-fluid">
    <div id="app">
      <home class="row"></home>
    </div>
  </div>
</template>

<script>
  import Home from './components/Home'

  export default {
    name: 'app',
    components: {
      Home
    }
  }
</script>

<style>
  .container-fluid{
    background-color: #e3e3e3;
  }
</style>
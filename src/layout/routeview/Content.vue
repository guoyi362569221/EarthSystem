<template>
<div class="content" >
  <!--<transition name="fade">-->
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
  <!--</transition>-->
</div>
</template>
<script>
export default {
  name: 'mainContent',
  data() {
    return {

    }
  },
  methods: {

  },
  created() {

  },
  mounted() {

  }
}
</script>

<style scoped lang='less'>
.content {
    width: 100%;
    height: 100%;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}
</style>

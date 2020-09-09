<template lang="html">
	<div class="left-menu-collapse">
		<div :class="['left-menu-collaps-title',{'open':show,'fold':isFold}]" @click.stop="setShow">
			<el-tooltip :disabled=$store.state.leftmenu.menu_flag class="left-menu-tooltip" effect="dark" :content="title" placement="left-start">
				<div class="left-menu-collaps-title-icon">
					<i :class="icon" :style="{'color':iconColor}"></i>
				</div>
			</el-tooltip>
			<div class="left-menu-collaps-title-text">
				{{title}}
			</div>
			<span :class="['con-collapse-title-icon',{'open':show}]">	<i class="el-icon-arrow-down"></i></span>
		</div>

		<div :class="['left-menu-collaps-content',{'fold':isFold}]" id="left-menu-collaps-content">
			<slot></slot>
		</div>

	</div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    isShow: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    isFold: {
      type: Boolean,
      default: false,
    },
    iconColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      show: this.isShow,
    };
  },
  methods: {
    setShow(e) {
      if (e === "init") {
        if (!this.show === true) {
          this.$_jQuery(this.$el)
            .parent()
            .find(".left-menu-collaps-content")
            .animate({
              height: "toggle",
            });
        }
      } else {
        this.$_jQuery(this.$el)
          .parent()
          .find(".left-menu-collaps-content")
          .animate({
            height: "toggle",
          });
        this.show = !this.show;
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.setShow("init");
    });
  },
};
</script>

<style lang="less" scoped>
@import url("./assets/style/style.less");
</style>

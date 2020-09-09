<template>
	<div class="main-body">
		<header-nav></header-nav>
		<div class="left-fixed-right-auto">
			<left-control></left-control>
			<div class="right-content" :style="{'bottom':footerHt+'px'}">
				<div class="content"  :style="{'top':headerHt+tagsviewHt+'px'}">
					<!--<bread></bread>-->
					<keep-alive>
						<router-view></router-view>
					</keep-alive>
				</div>
			</div>
			<!--<bootom-footer></bootom-footer>-->
		</div>
	</div>
</template>
<script>
	import HeaderNav from '../header-nav/headerNav.vue';
	import LeftControl from '../left-menu/LeftMenu.vue';

	export default {
		name: 'mainBody',
		components: {
			HeaderNav, LeftControl
		},
		data() {
			return {
				headerHt:80,
				footerHt:0,
				tagsviewShow:false,
                tagsviewHt:false?35:0
			}
		},


		created: function () {
        },

        deactivated(){
            this.$store.dispatch('set_menu_show');
		},

		activated(){
            this.$store.dispatch('set_menu_hide');
		}

	}
</script>
<style scoped lang='less'>

	.content {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: auto;
		color:#3d3a38;
		font-size: 14px;
		
	}

	.tagsview{
		position: relative;
	}

	.right-content {
		position: absolute;

		/*bottom: 40px;*/
		top: 0;
		left: 0;
		right: 0;
		/*margin-bottom: 60px;*/
	}
</style>

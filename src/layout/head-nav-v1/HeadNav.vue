<template>
	<div class="head-nav" :style="{'height':headerHt+'px'}">
		<div :style="{'height':headerHt+'px'}">
			<img class="logoImg" style="height: 75px;margin-left:18px ;margin-right: 80px" src="../../assets/logo.png" alt="">
			<div class="menuDiv">
				<div style="width: 100%;height: 37px;">
					<div class="userInfo">
						<div class="userNameDiv">
							<i class="fa fa-user" style="margin-right: 5px"></i>
							<span> 您好，AAAA</span>
						</div>

						<span class="currTime">{{currTime}}</span>

						<div class="logoutDiv" @click='setPassWord'>
							<i class="fa fa-edit"></i>
							<span>修改密码</span>
						</div>

						<div class="logoutDiv" @click='logout'>
							<i class="fa fa-power-off logout"></i>
							<span>退出</span>
						</div>

					</div>
				</div>
				<div class="meunDiv_div">
					<div style="height: 100%;width: 20px;position: absolute;background-color: #00ad94;right: -10px;">
						
					</div>
					<el-menu style="" v-if='model==="left"' unique-opened router mode="horizontal">
						<template v-for='(item,index) in mainMenu'>
							<el-submenu v-if="item.name==='更多'" :index="item.path" :key='item.path' :style="{width:menuWidth+'px'}">
								<template slot="title">
									<div style="transform: skew(30deg);">
										<i :class="item.icon  +' icon'" :style="{'color':'#fff'}"></i> {{item.name}}
									</div>
								</template>
								<el-menu-item v-for='(child,cindex) in item.children' :key='child.path' :index='child.path'>
									<i :class="child.icon  +' icon'"></i> {{child.name}}
								</el-menu-item>
							</el-submenu>

							<el-menu-item v-else :index="item.path" :key='item.path' :style="{width:menuWidth+'px'}">
								<div id="" style="transform: skew(30deg);">

									<i :class="item.icon"></i>
									<span slot="title">{{item.name}}</span> </div>
							</el-menu-item>

						</template>

					</el-menu>

					<el-menu v-else class="top-menu" unique-opened router  mode="horizontal">
						<template v-for="(route,index) in mainMenu">
							<el-submenu :index="route.path" :style="{width:menuWidth+'px'}" v-if="route.children.length>1">

								<template slot="title">

									<i :class="route.icon  +' icon'" :style="{'color':'#fff'}"></i> {{route.name}}

								</template>

								<template v-for='(child,cindex) in route.children'>
									<el-submenu :key='parseRouterUrl(route.path+"/"+child.path)' :index='parseRouterUrl(route.path+"/"+child.path)' v-if="child.children&&child.children.length>1">
										<template slot="title">

											<i :class="child.icon  +' icon'" :style="{'color':'#fff'}"></i> {{child.name}}

										</template>

										<template v-for='(c,cindex) in child.children'>
											<el-submenu :key='parseRouterUrl(route.path+"/"+child.path+"/"+c.path)' :index='parseRouterUrl(route.path+"/"+child.path+"/"+c.path)' v-if="c.children&&c.children.length>1">
												<template slot="title">
													<i :class="c.icon  +' icon'" :style="{'color':'#fff'}"></i> {{c.name}}
												</template>

												<el-menu-item v-for='(d,cindex) in c.children' :key='parseRouterUrl(route.path+"/"+child.path+"/"+c.path+"/"+d.path)' :index='parseRouterUrl(route.path+"/"+child.path+"/"+c.path+"/"+d.path)'>
													<i :class="d.icon  +' icon'"></i> {{d.name}}
												</el-menu-item>
											</el-submenu>

											<el-menu-item v-else :key='parseRouterUrl(route.path+"/"+child.path+"/"+c.path)' :index='parseRouterUrl(route.path+"/"+child.path+"/"+c.path)'>
												<i :class="c.icon  +' icon'"></i> {{c.name}}
											</el-menu-item>
										</template>

									</el-submenu>

									<el-menu-item v-else :key='parseRouterUrl(route.path+"/"+child.path)' :index='parseRouterUrl(route.path+"/"+child.path)'>

										<i :class="child.icon  +' icon'"></i> {{child.name}}
									</el-menu-item>
								</template>
							</el-submenu>

							<el-menu-item v-else :style="{width:menuWidth+'px'}" :index="route.path" :key='route.path'>
								<!--<i :class="route.icon"></i>-->
								<i :class="route.icon +' icon'"></i> {{route.name}}
								<!-- {{item.path}} -->
							</el-menu-item>

						</template>
					</el-menu>

					<div class="toolDiv">

						<!--<el-popover ref="popover2" placement="top-start" title="快捷菜单" width="290" trigger="hover">
							<div style="height:350px">
								<el-scrollbar style="height:100%; width:100%;" tag="div" wrap-class="favsTable" view-class="favsTable">

									<el-table class="favsTable" @row-click="openPath" :data="favoriteTags" style="width: 100%">
										<el-table-column label="功能名称" width="130">
											<template slot-scope="scope">
												<el-tag size="medium">{{ scope.row.name }}</el-tag>
											</template>
										</el-table-column>
										<el-table-column label="登录显示" width="80">
											<template slot-scope="scope">

												<el-switch v-model="scope.row.showcollectstatus" @change="changeFavStatus(scope.row,evt)">
												</el-switch>
											</template>
										</el-table-column>
										<el-table-column label="取消收藏" width="80">
											<template slot-scope="scope">
												<el-button type="danger" size="mini" icon="el-icon-delete" style="padding: 3px 9px" @click="handleCancelFav(scope.row,evt)"></el-button>
											</template>
										</el-table-column>
									</el-table>
								</el-scrollbar>
							</div>
						</el-popover>

						<i v-popover:popover2 id="headerIconOfTag" :class="['fa fa-send circle', {'bounce':addNewTag}]"></i>

						<el-popover ref="popover1" placement="top-start" title="标题" width="200" trigger="hover" content="系统切换">
						</el-popover>

						<i v-popover:popover1 class="fa fa-exchange circle"></i>-->

					</div>

				</div>
			</div>
		</div>

	</div>
</template>

<script>

	import HeadNavJs from './HeadNav.js';

	export default HeadNavJs;
</script>

<style scoped lang='css'>
	@import url(./assets/style/style.css);
	.icon {
		margin-right: 4px;
	}
	
	.el-menu {
		display: inline-block;
		text-align: center;
	}
	
	.head-nav {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1001;
		color: #FFF;
		font-size: 14px;
		background: url(assets/images/top-bg.jpg) no-repeat 100%;
	}
	
	.min-header {
		width: 100%;
		height: 20px;
		background-color: #222425;
	}
	
	.userInfo {
		display: inline-block;
		position: absolute;
		right: 10px;
		height: 33px;
		line-height: 33px;
		font-size: 12px;
		color: #fff;
	}
	
	.userInfo>div {
		position: relative;
		display: inline-block;
	}
	
	.logout {
		text-align: center;
		cursor: pointer;
	}
	
	.el-dropdown {
		color: #FFF;
	}
	
	.logoutDiv {
		cursor: pointer;
		padding: 0 5px 0 8px;
	}
	
	.userNameDiv {
		font-size: 12px !important;
	}
	
	.currTime {
		width: 200px;
	}
	
	.menuDiv {
		float: right;
	}
	
	.meunDiv_div {
		height: 38px;
		/*background: url(assets/images/nav-bg.png) no-repeat ;*/
		display: inline-block;
		margin-right: 10px;
		position: relative;
	}
	
	.toolDiv {
		display: none;
		padding: 0 15px;
		height: 38px;
		line-height: 38px !important;
	}
	
	.toolDiv>i {
		margin: 0 15px;
		cursor: pointer;
	}
	
	.circle {
		border: solid 1px #fff;
		border-radius: 50%;
		padding: 3px;
	}
	
	@-webkit-keyframes bounce {
		0%,
		20%,
		53%,
		80%,
		100% {
			-webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
			transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
		}
		40%,
		43% {
			-webkit-transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
			transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
			-webkit-transform: translate3d(0, -30px, 0);
			transform: translate3d(0, -30px, 0);
		}
		70% {
			-webkit-transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
			transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
			-webkit-transform: translate3d(0, -15px, 0);
			transform: translate3d(0, -15px, 0);
		}
		90% {
			-webkit-transform: translate3d(0, -4px, 0);
			transform: translate3d(0, -4px, 0);
		}
	}
	
	@keyframes bounce {
		0%,
		20%,
		53%,
		80%,
		100% {
			-webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
			transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
		}
		40%,
		43% {
			-webkit-transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
			transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
			-webkit-transform: translate3d(0, -30px, 0);
			transform: translate3d(0, -30px, 0);
		}
		70% {
			-webkit-transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
			transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
			-webkit-transform: translate3d(0, -15px, 0);
			transform: translate3d(0, -15px, 0);
		}
		90% {
			-webkit-transform: translate3d(0, -4px, 0);
			transform: translate3d(0, -4px, 0);
		}
	}
	
	.bounce {
		-webkit-animation: bounce 1.2s ease-in infinite;
		-o-animation: bounce 1.2s ease-in infinite;
		animation: bounce 1.2s ease-in infinite;
		animation-iteration-count: 3;
		/*规定小红块跳动的次数*/
	}

	.el-menu--horizontal>.el-menu-item{
		color: #fff;
	}
</style>
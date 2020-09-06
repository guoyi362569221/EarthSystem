<template>
	<div class="head-nav" :style="{'height':headerHt+'px'}">
		<div :style="{'height':headerHt+'px'}">
			<!-- <img class="logoImg" style="height: 75px;margin-left:18px ;margin-right: 80px" src="../../assets/logo.png" alt=""> -->
			<!-- <div class="sysLogInfo">东北地质灾害监测预警平台</div> -->
			<div class="sysLogInfo">大气精细化管理应用</div>
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
							<el-menu-item :style="{width:menuWidth+'px'}" :index="route.path" :key='route.path'>
								<!--<i :class="route.icon"></i>-->
								<i :class="route.icon +' icon'"></i> {{route.name}}
								<!-- {{item.path}} -->
							</el-menu-item>

						</template>
					</el-menu>
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

	.sysLogInfo{
		float: left;
		height: 100%;
		width: 480px;
		/* margin-left:18px ; */
		background: url(../../assets/logo.png) 18px 13px no-repeat;
		line-height: 75px;
		text-indent: 90px;
		font-size: 29px;
		font-family: 微软雅黑;
		font-weight: bold;
		letter-spacing: 3px;
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
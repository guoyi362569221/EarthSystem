<template lang="html">
	<div class="header-nav" :style="{'height':'75px'}">
		<div class="sysLogInfo">大气精细化管理应用</div>
		<div class="head-nav-menu" id="head-nav-menu" v-show="menuShow">
			<div class="back-div" :style="{'width':128*(mainRouters.length)+'px'}"></div>
			<div class="hover-box" v-show="setHovboxShow"></div>
			<ul id="head-menu-ul">
				<li v-for="(item,index) in  mainRouters" @click="changeRouter(item,index,'one')" v-if="mainRouters.length>0" :style="{'width':headMenuWidth+'px'}" :class="['item',{'isMore':item.isMore,'active-header-router':item.path===$store.state.router.headerCurRouter}]">
					<div class="item-menu-right-line" v-show="index!==0">
					</div>
					<div class="item-menu-top-line" style="">
					</div>
					<span>
              <i :class="item.icon"></i>
            </span> {{item.name}}
					<span>
            <i v-if="item.isMore" class="fa fa-chevron-down isArrow" aria-hidden="true"></i>
            </span>
					<ul v-if="item.isMore" class="drop-ul">
						<li v-for="drop in overRouters" @click.stop="changeRouter(drop,null,'two')" :class="['drop-item',{'active-header-router':drop.path===$store.state.router.headerCurRouter}]">
							<div class="drop-left">
								<span>
                    <i :class="drop.icon"></i>
                  </span>
							</div>
							<div class="drop-right">
								{{drop.name}}
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="quit-menu">
			<div class="userNameDiv">
				<i class="fa fa-user" style="margin-right: 5px"></i>
				<!-- <span> 您好，AAAA</span> -->
				<span class="currTime">{{currTime}}</span>
			</div>

			<!-- <div class="logoutDiv" @click='setPassWord'>
				<i class="fa fa-edit"></i>
				<span>修改密码</span>
			</div> -->

			<div class="logoutDiv" @click='logout'>
				<i class="fa fa-power-off logout"></i>
				<span>退出</span>
			</div>
		</div>
	</div>
</template>

<script>
import { utils } from "../../utils/utils";
import _ from "lodash";
import { dateUtils } from "../../utils/dateUtils.js";

export default {
  name: "header-nav",
  components: {},
  data() {
    return {
      name: "header-nav",
      type: "layout",
      config: {},
      access: false,
      isConfigLoaded: false,
      headerHt: 75,
      footerHt: 0,
      headMenuWidth: 128,
      routeList: this.$router.options.routes,
      isMore: false,
      menuShow: true,
      allMenu: [],
      overRouters: [],
      mainRouters: [],
      provPredTableData: [],
      monitorTableData: [],
      predTableColumns: [],
      isShowOverRoutes: false,
      setHovboxShow: true,
      infinite: true,
      playInterval: null,
      currTime: "",
    };
  },
  methods: {
    changeRouter(item, index, type) {
      if (item !== this.$store.state.router.headerCurRouter && item.path) {
        this.$router.push(item.path);
        if (type === "one") {
          this.setTransition(item);
        }
      }
    },
    setTransition(route) {
      this.setHovboxShow = true;
      let cRoute = route || this.$route.matched[0];
      let hasRoutes = this.mainRouters.filter((item) => {
        return item.path === cRoute.path;
      });

      if (hasRoutes.length === 0) {
        this.$_jQuery(".header-nav .hover-box").stop(true, true).animate(
          {
            right: 14,
          },
          300
        );
        if (this.overRouters.length === 0) {
          this.setHovboxShow = false;
        }
      } else {
        let cloneData = this.mainRouters || _.cloneDeep(this.allMenu);
        let newData = cloneData.filter((item) => {
          return item.children && item.children.length > 0;
        });
        let num = 0;
        for (let i = 0; i < newData.length; i++) {
          if (cRoute.path === newData[i].path) {
            break;
          }
          num++;
        }
        this.$_jQuery(".header-nav .hover-box")
          .stop(true, true)
          .animate(
            {
              right:
                (this.mainRouters.length - 1 - num) * this.headMenuWidth + 14,
            },
            300
          );
      }
    },
    updateUI() {
      let cloneData = _.cloneDeep(this.allMenu);
      let newData = cloneData.filter((item) => {
        return item.children && item.children.length > 0;
      });
      //      let cWidth=this.$_jQuery("#head-nav-menu").width();
      let wth = this.$_jQuery(window).width();
      let logoWidth = 475;
      let cWidth = wth - (logoWidth + 300);
      this.menuShow = wth < logoWidth + 300 ? false : true;
      let num = cWidth / this.headMenuWidth;
      if (this.menuShow) {
        if (num + 1 > newData.length) {
          this.mainRouters = newData;
          this.overRouters = [];
          this.isMore = false;
        } else {
          this.isMore = true;
          let listNum = parseInt(num);
          let overArr = [];
          let mainArr = [];
          for (let i = listNum; i < newData.length; i++) {
            overArr.push(newData[i]);
          }
          for (let x = 0; x < listNum; x++) {
            mainArr.push(newData[x]);
          }
          let obj = {
            name: "更多",
            isMore: true,
          };
          if (overArr.length > 0) {
            mainArr.push(obj);
          }

          this.mainRouters = mainArr;
          this.overRouters = overArr;
        }
        this.$nextTick(() => {
          this.setTransition();
        });
      }
    },
    calcWidthIsOver() {
      let wth = this.$_jQuery(window).width();
      let logoWidth = 475;
      let userInfoWidth = wth - (logoWidth + 100);
      if (this.headMenuWidth * (this.routeList.length + 1) > userInfoWidth) {
        this.isMore = true;
      } else {
        this.isMore = false;
      }
    },

    /**
     * 退出登录
     */
    logout() {
      this.$confirm("你确定退出登录么?", "确认退出", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let delViews = this.$store.dispatch("delAllViews");
        let removUserInfo = this.$store.dispatch("remove_userinfo");
        let delFavoriteTags = this.$store.dispatch("delAllFavoriteTags");
        Promise.all([delViews, removUserInfo, delFavoriteTags]).then(() => {
          this.$router.go({ path: "/login", force: true });
        });
        // this.$store.dispatch('remove_userinfo').then(() => {
        //     this.$router.push('/login');
        // });
      });
    },
    /**
     * 弹出框-修改密码或者系统设置
     * @param {string} cmditem 弹框类型
     */
    setDialogInfo(cmditem) {
      if (!cmditem) {
        this.$message("菜单选项缺少command属性");
        return;
      }
      switch (cmditem) {
        case "info":
          this.$router.push({
            path: "/mng/edit",
            // query: {
            //     id: this.$store.state.user.userinfo.info['Id']
            // }
          });
          break;
        case "pass":
          this.dialog.show_pass = true;
          this.dialog.title = "修改密码";
          this.dialog.user_info = {
            name: "ASDFG",
            oldPassword: "",
            newPassword: "",
            password_confirm: "",
          };
          break;
        case "set":
          this.$router.push({
            path: "/mng/edit",
            // query: {
            //     id: this.$store.state.user.userinfo.info['Id']
            // }
          });
          break;
        case "logout":
          this.logout();
          break;
      }
    },

    dealWarnData(res) {
      //处理预警的数据

      let predRes = res[0].data || [];
      this.provPredTableData = this.dealForecast(predRes);
    },
    dealForecast(predRes) {
      //处理预报的预警数据
      let tableData = [];
      let provinceCode = this.config.provinceCode;
      for (let i = 0; i < predRes.length; i++) {
        let obj = {};
        obj["type"] =
          predRes[i].warningcitycode === provinceCode ? "省级" : "市级";
        obj["warnTime"] = predRes[i]["warningdate"].split("T")[0];
        obj["timeRange"] =
          predRes[i]["starttime"].split("T")[0] +
          " 至 " +
          predRes[i]["endtime"].split("T")[0];
        obj["level"] = this.setLevel(predRes[i]["warninglevel"]).level;
        obj["levelColor"] = this.setLevel(predRes[i]["warninglevel"]).color;
        obj["primarypollutant"] = predRes[i]["primarypollutant"]
          ? utils.addSubToLabel(predRes[i]["primarypollutant"].toUpperCase())
          : "-";
        obj["modelname"] = predRes[i]["modelname"];
        let citys = predRes[i]["cities"].split(",");
        obj["cityname"] = _.uniq(citys);
        tableData.push(obj);
      }
      return tableData;
    },
    dealMonitor(res) {
      //处理实况的预警数据
      let arr = [];
      for (let i = 0; i < res.length; i++) {
        let obj = {};
        let sTime = dateUtils.strToDate(res[i]["starttime"].replace("T", " "));
        let eTime = dateUtils.strToDate(res[i]["endtime"].replace("T", " "));
        obj["timeRange"] =
          dateUtils.dateToStr("YYYY-MM-DD HH时", sTime) +
          " 至 " +
          dateUtils.dateToStr("YYYY-MM-DD HH时", eTime);
        obj["cityname"] = [res[i]["warningcity"]];
        obj["primarypollutant"] = res[i]["primarypollutant"]
          ? utils.addSubToLabel(res[i]["primarypollutant"])
          : "-";
        obj["warnTime"] = dateUtils.dateToStr(
          "YYYY-MM-DD HH时",
          dateUtils.strToDate(res[i]["warningdate"].replace("T", " "))
        );
        obj["warnContent"] = this.config.warnContent;

        arr.push(obj);
      }
      return arr;
    },
    setLevel(val) {
      let obj = {
        color: "",
        level: "",
      };
      let colors = ["#fc0409", "orange", "#f9e50e", "#0552ff"];
      let levels = ["Ⅰ级", "Ⅱ级", "Ⅲ级", "Ⅳ级"];
      let value = Number(val);
      if (!isNaN(value)) {
        obj["color"] = colors[value - 1];
        obj["level"] = levels[value - 1];
      }
      obj["color"] = obj["color"] ? obj["color"] : "#fff";
      obj["level"] = obj["level"] ? obj["level"] : val;
      return obj;
    },
  },
  created() {
    this.allMenu = [];
    let routes = this.$router.options.routes;
    routes.forEach((item) => {
      if (!item.hidden) {
        this.allMenu.push(item);
      }
    });

    this.currTime = dateUtils.dateToStr(
      "yyyy年MM月dd日 周w hh:mm:ss",
      new Date()
    );
    setInterval(() => {
      this.currTime = dateUtils.dateToStr(
        "yyyy年MM月dd日 周w hh:mm:ss",
        new Date()
      );
    }, 1000);
  },
  mounted() {
    let routers = _.cloneDeep(this.allMenu);
    let newRoutes = routers.filter((item) => {
      return item.children && item.children.length > 0;
    });
    this.mainRouters = newRoutes;
    this.routeList = newRoutes;
    this.$nextTick(() => {
      this.updateUI();
    });
    this.$_jQuery(window).resize(() => {
      this.updateUI();
    });
  },
  computed: {},
  activated() {
    this.$nextTick(() => {
      this.setHovboxShow = false;
      this.updateUI();
    });
  },
  deactivated: function () {
    if (this.playInterval) {
      window.clearInterval(this.playInterval);
      this.playInterval = null;
    }
  },
  watch: {
    $route(to, from, next) {
      this.setTransition(to.matched[0]);
    },
  },
};
</script>

<style scoped>
@import url(./assets/style/style.less);
.header-nav {
  width: 100%;
  position: absolute;
  background-color: #009581;
  z-index: 11;
  font-size: 14px;
  background: url(assets/images/top-bg.jpg) no-repeat 100%;
  outline: none;
}

#head-menu-ul {
  float: right;
  /* overflow: hidden; */
  box-sizing: border-box;
  margin-top: 37px;
  border-right: none;
  background: none;
  margin-right: 14px;
  position: relative;
}

li {
  list-style: none;
}

.item {
  height: 100%;
  height: 38px;
  line-height: 38px;
  color: #fff;
  float: left;
  cursor: pointer;
  text-align: center;
  z-index: 111;
  /* border-top: 1px #ddd solid; */
  box-sizing: border-box;
  position: relative;
  /*font-weight: 500;*/
}

.item-menu-right-line {
  width: 1px;
  height: 20px;
  position: absolute;
  background-color: #008b77;
  transform: skew(-30deg);
  margin-top: 9px;
  margin-left: -0.5px;
}

.item-menu-top-line {
  width: 100%;
  height: 3px;
  background-color: #008b77;
  position: absolute;
  top: 0;
  margin-top: -1px;
  margin-left: 10px;
  display: none;
  /*transition: all .3s;*/
  animation: identifier 0.3s;
}

.item:hover .item-menu-top-line {
  display: block;
}
.back-div {
  transform: skew(-30deg);
  bottom: 0px;
  right: 14px;
  height: 38px;
  background-color: #00ad94;
  position: absolute;
}
.hover-box {
  position: absolute;
  background-color: #008572;
  z-index: 10;
  width: 128px;
  height: 38px;
  bottom: 0px;
  right: 17px;
  transform: skew(-30deg);
}

.item.active-header-router {
  color: #fff;
  transition: color 0.3s;
}

.head-nav-menu {
  float: right;
  /*width: 50%;*/
  position: relative;
  /*margin-left: -10px;;*/
}

.drop-item {
  height: 40px;
  width: 200px;
  line-height: 40px;
  border-bottom: 1px solid #ddd;
  color: #fff;
}

.drop-item:hover {
  color: #fff;
  background-color: #008572;
}

.drop-item.active-header-router {
  background-color: #008572;
}

.drop-ul {
  position: absolute;
  right: 10px;
  /* top: 70px; */
  z-index: 111;
  display: none;
  color: #000;
  margin-top: 0px;
  box-sizing: border-box;
  border-bottom: none;
  /*border-radius: 5px;*/
  overflow: hidden;
  background-color: #00ad94;
  border-top: 1px solid #ddd;
}

.isMore {
  position: relative;
}

.isMore:hover .drop-ul {
  display: block;
}

.isArrow {
  transform: rotate(0deg);
  transition: all 0.3s;
}

.isMore:hover .isArrow {
  transform: rotate(180deg);
}

.drop-left {
  float: left;
  width: 40px;
  text-align: center;
}

.drop-right {
  float: left;
}

@keyframes identifier {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

.quit-menu {
  position: absolute;
  height: 37px;
  color: #fff;
  top: 0;
  right: 0;
  line-height: 37px;
  font-size: 12px;
  padding-right: 20px;
}

.userNameDiv {
  float: left;
}

.currTime {
  padding-left: 5px;
}

.logoutDiv {
  float: left;
  padding-left: 10px;
  cursor: pointer;
}
.warning-div {
  float: left;

  position: relative;
  padding-top: 9px;
  height: 100%;
  margin-right: 20px;
}
.warningBtn {
  /* width: 75px;*/
  height: 18px;

  border: 1px solid #fac909;

  background: #fac909;
  border-radius: 20px;
  text-align: left;
  line-height: 16px;
  color: #010001;
  cursor: pointer;
  float: left;
  padding-left: 5px;
  padding-right: 5px;
  transition: all 0.5s;
  outline: none;
}
.warningBtn.noWarning {
  background: rgba(255, 255, 255, 0);
  color: rgb(0, 228, 0);
  border: 1px solid rgb(0, 228, 0);
  /* color: #fff;
		border: 1px solid #fff; */
}

/* .warningNum{
		width: 20px;
		height: 16px;
		background-color: #e6a23c;
		float: left;
		margin-top: 9.5px;
		margin-left: -5px;
		border-top-right-radius: 16px;
		border-bottom-right-radius: 16px;
	} */
@-webkit-keyframes flash {
  from,
  50%,
  to {
    box-shadow: 0 1px 2px rgba(255, 255, 255, 0.1);
  }

  25%,
  75% {
    box-shadow: 0 1px 15px rgba(255, 255, 255, 1);
  }
}

@keyframes flash {
  from,
  50%,
  to {
    box-shadow: 0 1px 2px rgba(255, 255, 255, 0.1);
  }

  25%,
  75% {
    box-shadow: 0 1px 15px rgba(255, 255, 255, 1);
  }
}

.flash {
  -webkit-animation-name: flash;
  animation-name: flash;
}
.animated {
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  transition: all;
}
.animated.infinite {
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-duration: 10s;
  animation-duration: 10s;
}

.sysLogInfo {
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
  letter-spacing: 4px;
  color: #fff;
}
</style>

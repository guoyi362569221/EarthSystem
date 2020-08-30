import {utils} from "../../utils/utils";
import {dateUtils} from '../../utils/dateUtils';
import {gbs} from '../../config/index';

export default {
    name: 'head-nav-v1',
    data() {
        return {
            headerHt: 75,
            footerHt: 0,
            model: 'left' || 'top',
            menuWidth: 130,
            allMenu: [],
            mainMenu: [],
            moreMenu: [],
            dialog: {
                show_access: false,
                show_set: false,
                show_pass: false,
                title: '修改密码',
                user_info: {
                    name: '',
                    oldPassword: '',
                    newPassword: '',
                    password_confirm: ''
                },

                set_info: {
                    login_style: '',
                    disabled_update_pass: [],
                    select_users: []
                },

                user_info_rules: {
                    oldPassword: [{
                        required: true,
                        message: '旧密码不能为空！',
                        trigger: 'blur'
                    }],
                    newPassword: [{
                        required: true,
                        message: '新密码不能为空！',
                        trigger: 'blur'
                    }, {
                        trigger: 'blur',
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请再次输入密码'));
                            } else {
                                if ('' !== this.dialog.user_info.newPassword) {
                                    this.$refs.user_info.validateField('password_confirm');
                                }
                                callback();
                            }
                        }
                    }],
                    password_confirm: [{
                        required: true,
                        message: '确认密码不能为空！',
                        trigger: 'blur'
                    }, {
                        trigger: 'blur',
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请再次输入密码'));
                            } else if (value !== this.dialog.user_info.newPassword) {
                                callback(new Error('两次输入密码不一致!'));
                            } else {
                                callback();
                            }
                        }
                    }],
                }
            },
            currTime: '',
            tagTableMaxHt: 350,
            addNewTag: false
        }
    },

    computed: {
        // favoriteTags() {
        //     return this.$store.state.favoriteTag.favoriteTags.map(tag => {
        //         return {
        //             path: tag.path,
        //             name: tag.name,
        //             collectsatus: tag.collectsatus,
        //             showcollectstatus: tag.showcollectstatus,
        //             favorite: true
        //         }
        //     });
        // }
    },

    created() {
        this.allMenu = [];
        let routes = this.$router.options.routes;
        routes.forEach(item => {
            if (!gbs.access && process.env['NODE_ENV'] === 'development') {
                if (!item.hidden) {
                    this.allMenu.push(item)
                }
            }
            // else if ((!item.hidden && this.$store.state.user.userinfo.web_routers.indexOf(item.path) > -1) || (item.meta && item.meta.noAccess)) {
                this.allMenu.push(item)
            // }
        });
        this.mainMenu = utils.deepCopy(this.allMenu);
        this.currTime = dateUtils.dateToStr('yyyy年MM月dd日 周w hh:mm:ss', new Date());
        setInterval(() => {
            this.currTime = dateUtils.dateToStr('yyyy年MM月dd日 周w hh:mm:ss', new Date());
        }, 1000);

    },

    mounted() {

        // if (this.$store.state.user.userinfo.info) {
            // this.dialog.user_info.name = this.$store.state.user.userinfo.info.name;
        // }

        // this.$$lib_$(window).resize(() => {
        //     this.setUI();
        // });

        // this.$root.eventBus.$off('addFavriteTag');


        // this.$root.eventBus.$on('addFavriteTag', () => {
        //     this.addNewTag = true;
        // });

//      document.getElementById("headerIconOfTag").removeEventListener('animationend', () => {
//          this.addNewTag = false;
//      });
//
//      document.getElementById("headerIconOfTag").addEventListener('animationend', () => {
//          this.addNewTag = false;
//      });

        if (this.$refs.popoverElScrollBar) this.$refs.popoverElScrollBar.update();
    },

    destroyed() {
        // this.$root.eventBus.$off('addFavriteTag');
    },

    activated() {
        // this.setUI();
    },


    methods: {
        // setUI() {

        //     let menuWth = this.menuWidth * this.allMenu.length;
        //     let wth = this.$$lib_$(window).width();
        //     let logoWidth = 475;
        //     let userInfoWidth = this.$$lib_$('.toolDiv').width() + 50;

        //     let realWidth = wth - logoWidth - userInfoWidth;
        //     if (realWidth >= menuWth) {
        //         this.mainMenu = utils.deepCopy(this.allMenu);
        //     }
        //     else {
        //         let num = Math.floor(realWidth / this.menuWidth);
        //         if (num <= 0)
        //             this.mainMenu = [];
        //         else {

        //             this.mainMenu = this.allMenu.slice(0, num - 1);
        //             this.moreMenu = this.allMenu.slice(num - 1);
        //             let children = this.moreMenu.map(item => {
        //                 return {
        //                     path: item.path,
        //                     name: item.name,
        //                     icon: item.icon,
        //                     children: item.children || []
        //                 }
        //             });


        //             let moreMenuItem = {
        //                 path: '/',
        //                 name: '更多',
        //                 icon: 'icon-3clear-radar-c',
        //                 children: []
        //             };
        //             moreMenuItem.children = children;
        //             this.mainMenu.push(moreMenuItem);
        //         }
        //     }

        // },

        parseRouterUrl(url) {
            if (url.substr(0, 3) === '///') {
                return url.substr(2);
            }
            else
                return url;
        },

        /**
         * 退出登录
         */
        logout() {
            this.$confirm('你确定退出登录么?', '确认退出', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                let delViews = this.$store.dispatch('delAllViews');
                let removUserInfo = this.$store.dispatch('remove_userinfo');
                let delFavoriteTags = this.$store.dispatch('delAllFavoriteTags');
                Promise.all([delViews, removUserInfo, delFavoriteTags]).then(() => {
                    this.$router.go({path: '/login', force: true});
                });
                // this.$store.dispatch('remove_userinfo').then(() => {
                //     this.$router.push('/login');
                // });
            });
        },

        setPassWord() {
            this.dialog.show_pass = true;
            this.dialog.title = '修改密码';
            // this.dialog.user_info = {
            //     name: this.$store.state.user.userinfo.info.name,
            //     oldPassword: '',
            //     newPassword: '',
            //     password_confirm: ''
            // };
        },

        /**
         * 弹出框-修改密码或者系统设置
         * @param {string} cmditem 弹框类型
         */
        setDialogInfo(cmditem) {
            if (!cmditem) {
                console.log('test');
                this.$message('菜单选项缺少command属性');
                return;
            }
            switch (cmditem) {
                case 'info':
                    this.$router.push({
                        path: '/mng/edit',
                        // query: {
                        //     id: this.$store.state.user.userinfo.info['Id']
                        // }
                    });
                    break;
                case 'pass':
                    this.dialog.show_pass = true;
                    this.dialog.title = '修改密码';
                    // this.dialog.user_info = {
                    //     name: this.$store.state.user.userinfo.info.name,
                    //     oldPassword: '',
                    //     newPassword: '',
                    //     password_confirm: ''
                    // };
                    break;
                case 'set':
                    this.$router.push({
                        path: '/mng/edit',
                        // query: {
                        //     id: this.$store.state.user.userinfo.info['Id']
                        // }
                    });
                    break;
                case 'logout':
                    this.logout();
                    break;
            }
        },

        /**
         * 修改密码
         * @param  {object} userinfo 当前修改密码的表单信息
         */
        updUserPass(userinfo) {
            // this.$refs[userinfo].validate((valid) => {
            //     if (valid) {
            //         this.$$updatePsw({
            //             data: {
            //                 id: this.$store.state.user.userinfo.info.id,
            //                 oldPassword: sha.SHA256(this.dialog[userinfo].oldPassword).toUpperCase(),
            //                 newPassword: sha.SHA256(this.dialog[userinfo].newPassword).toUpperCase()
            //             },
            //             fn: data => {
            //                 if (data === true) {
            //                     this.dialog.show_pass = false;
            //                     this.$message.success('修改密码成功！');
            //                 }

            //             }
            //         });
            //     }
            // });
        },

        handleCancelFav(data) {
            let tag = {
                path: data.path,
                name: data.name,
                favorite: false
            };
            // this.$store.dispatch('delFavoriteTags', tag);
            // this.$store.dispatch('updateVisitedViews', tag);
            // this.$$updateUserFun({
            //     data: [{
            //         userid: this.$store.state.user.userinfo.info.id,
            //         funid: tag.path,
            //         collectsatus: 0,
            //         showcollectstatus: 0
            //     }

            //     ],
            //     fn: data => {
            //         if (data) {

            //             this.$message({
            //                 message: tag.name + ' 功能已取消收藏!',
            //                 type: 'success'
            //             });
            //         }
            //     },
            //     errFun: err => {

            //         this.$message({
            //             message: tag.name + ' 功能取消收藏失败!',
            //             type: 'error'
            //         });
            //     }
            // });
        },
        changeFavStatus(row) {
            let tag = {
                path: row.path,
                name: row.name,
                collectsatus: row.collectsatus,
                showcollectstatus: row.showcollectstatus
            };
            // this.$store.dispatch('updateFavoriteTags', tag);
            // this.$$updateUserFun({
            //     data: [{
            //         userid: this.$store.state.user.userinfo.info.id,
            //         funid: row.path,
            //         collectsatus: 1,
            //         showcollectstatus: row.showcollectstatus ? 1 : 0
            //     }
            //     ],
            //     fn: data => {
            //         // if (data) {
            //         //     this.$message({
            //         //         message: row.name + ' 功能已取消登录打开!',
            //         //         type: 'success'
            //         //     });
            //         // }
            //     },
            //     errFun: err => {

            //         this.$message({
            //             message: row.name + ' 功能设置失败!',
            //             type: 'error'
            //         });
            //     }
            // });
        },

        openPath(row, evt) {
            if (evt.target.nodeName.toUpperCase() === 'DIV')
                this.$router.push(row.path);
        }
    }
}

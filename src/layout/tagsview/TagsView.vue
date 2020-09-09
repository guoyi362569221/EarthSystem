<template>
    <div class="tags-view-container">
        <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
            <router-link ref='tag' class="tags-view-item noselect" :class="isActive(tag)?'active':''"
                         v-for="tag in Array.from(visitedViews)"
                         :to="tag.path" :key="tag.path" @contextmenu.prevent.native="openMenu(tag,$event)">
                {{tag.name}}
                <span class='el-icon-close' @click.prevent.stop='closeSelectedTag(tag)'></span>
            </router-link>
        </scroll-pane>
        <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
            <li v-if='selectedTag.favorite'  @click="cancelFavoriteTag(selectedTag)">取消收藏</li>
            <li v-else @click="favoriteTag(selectedTag,$event)">收藏</li>
            <li @click="closeSelectedTag(selectedTag,$event)">关闭</li>
            <li @click="closeOthersTags">关闭其他</li>
            <!--<li @click="closeAllTags">关闭所有</li>-->
        </ul>

        <div class="ball_container">
            <transition-group name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                <div class="ball" v-for="(ball,index) in balls" :key="index" v-show="ball.show">
                    <span class="inner inner_hook fa fa-circle"></span>
                </div>
            </transition-group>
        </div>

    </div>
</template>

<script>
    import ScrollPane from '3clear/comm/ScrollPane/ScrollPane.vue';
    export default {
        components: {ScrollPane},
        data() {
            return {
                balls: [// 定义多个对象，表示页面中做多同时运动的小球
                    {
                        show: false
                    }
                ],
                dropBalls: [], // 下落的小球

                visible: false,
                top: 0,
                left: 0,
                selectedTag: {}
            }
        },
        computed: {
            visitedViews() {
                return this.$store.state.tagsView.visitedViews
            }
        },
        watch: {
            $route() {
                this.addViewTags();
                this.moveToCurrentTag()
            },
            visible(value) {
                if (value) {
                    document.body.addEventListener('click', this.closeMenu)
                } else {
                    document.body.removeEventListener('click', this.closeMenu)
                }
            }
        },
        mounted() {
            this.addViewTags();

        },
        methods: {

            drop() {
                // console.log(ele);// 获取到点击的那个添加按钮
                for (let i = 0; i < this.balls.length; i++) {
                    let ball = this.balls[i];
                    if (!ball.show) {
                        ball.show = true; // 表示可以有下落动画
//                        ball.el = ele;
                        this.dropBalls.push(ball);
                        return; // 跳出循环
                    }
                }
            },
            beforeEnter(ele) { // 下落小球的下落之前的运动函数钩子
                let len = this.balls.length;
                while (len--) {
                    let ball = this.balls[len];
                    if (ball.show) {
//                        let rect = ball.el.getBoundingClientRect(); // 小球盒模型
                        let x = -(window.innerWidth-this.left-parseInt(this.$store.state.leftmenu.width)-260); // 小球距离购物车图标的位置
                        let y = - (this.top-70);
                        ele.style.display = '';
                        ele.style.webkitTransform = `translate3d(0,${y}px,0)`;
                        ele.style.transform = `translate3d(0,${y}px,0)`;
                        let inner = ele.getElementsByClassName('inner_hook')[0];
                        inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                        inner.style.transform = `translate3d(${x}px,0,0)`;
                    }
                }
            },
            enter(ele) { // 下落小球的下落时的运动函数钩子
                ele.offsetHeight; // 触发浏览器重绘，offsetWidth、offsetTop等方法都可以触发
                this.$nextTick(() => { // 改回运动初始状态
                    ele.style.webkitTransform = 'translate3d(0, 0, 0)';
                    ele.style.transform = 'translate3d(0,0,0)';
                    let inner = ele.getElementsByClassName('inner_hook')[0];
                    inner.style.webkitTransform = 'translate3d(0,0,0)';
                    inner.style.transform = 'translate3d(0,0,0)';
                });
            },
            afterEnter(ele) { // 下落小球的下落之后的运动函数钩子
                this.$root.eventBus.$emit('addFavriteTag');
                let ball = this.dropBalls.shift();
                if (ball) {
                    ball.show = false;
                    ele.style.display = 'none';
                }
            },

            generateRoute() {
                if (this.$route.name) {
                    return this.$route
                }
                return false
            },
            isActive(route) {
                return route.path === this.$route.path || route.name === this.$route.name
            },

            favoriteTag(tag){
                this.drop();
                tag.showcollectstatus =true;
                tag.collectsatus = true;
                this.$store.dispatch('addFavoriteTags', tag);
                tag.favorite = true;
                this.$store.dispatch('updateVisitedViews', tag);
            },

            cancelFavoriteTag(tag){
                tag.favorite = false;
                this.$store.dispatch('delFavoriteTags', tag);
                this.$store.dispatch('updateVisitedViews', tag);
            },

            addViewTags() {
                const route = this.generateRoute();

                if (!route||route.path==='/'||route.path==='/login') {
                    return false
                }
                let favoriteTags = this.$store.state.favoriteTag.favoriteTags;
                let favorite = false;
                favoriteTags.forEach(currTag=>{
                    if(currTag.path === route.path)
                        favorite = true;
                });
                let tag = {
                    path:route.path,
                    name:route.name,
                    favorite:favorite
                };
                this.$store.dispatch('addVisitedViews', tag)
            },
            moveToCurrentTag() {
                const tags = this.$refs.tag;
                this.$nextTick(() => {
                    for (const tag of tags) {
                        if (tag.to === this.$route.path) {
                            this.$refs.scrollPane.moveToTarget(tag.$el)
                            break
                        }
                    }
                })
            },
            closeSelectedTag(view) {
                this.$store.dispatch('delVisitedViews', view).then((views) => {
                    if (this.isActive(view)) {
                        const latestView = views.slice(-1)[0];
                        if (latestView) {
                            this.$router.push(latestView.path)
                        } else {
                            this.$router.push('/')
                        }
                    }
                })
            },
            closeOthersTags() {
                this.$router.push(this.selectedTag.path);
                this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
                    this.moveToCurrentTag()
                })
            },
            closeAllTags() {
                this.$store.dispatch('delAllViews');
                this.$router.push('/')
            },
            openMenu(tag, e) {
                this.visible = true;
                this.selectedTag = tag;
                this.left = e.clientX-parseInt(this.$store.state.leftmenu.width)
                this.top = e.clientY-75
            },
            closeMenu() {
                this.visible = false
            }
        }
    }
</script>

<style lang="css" scoped>


    .tags-view-container .tags-view-wrapper {
        background: #455054;
        height: 35px;
        /*border-bottom: 1px solid #d8dce5;*/
        /*box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);*/
    }
    .tags-view-container .tags-view-wrapper .tags-view-item {
        display: inline-block;
        position: relative;
        height: 26px;
        line-height: 26px;
        border: 1px solid #3c4548;
        color: #fff;
        background: #777f82;
        padding: 0 10px;
        font-size: 12px;
        margin-left: 5px;
        /*margin-top: 4px;*/
        margin-top: 4px;
        border-right: none;
    }


    .tags-view-item .el-icon-close:before {
        transform: scale(.8);
        display: inline-block;
        vertical-align: 0px;
    }

    .tags-view-container .tags-view-wrapper .tags-view-item:first-of-type {
        margin-left: 15px;
    }

    .tags-view-container .tags-view-wrapper .tags-view-item:last-of-type {
        border-right: 1px solid #777f82;
    }

    .tags-view-container .tags-view-wrapper .tags-view-item.active{
        background-color: #e9ecf3;
        color: #434343;
        /* border-color: #42b983; */
        /* border-top: 3px solid #e3ae0d; */
        border-bottom: none;
        font-weight: bold;
    }


    .tags-view-container .tags-view-wrapper .tags-view-item.active::before {
        content: '';
        background: #f6c02d;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 2px;

    }

    .tags-view-item .el-icon-close {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        -webkit-transform-origin: 100% 50%;
        transform-origin: 100% 50%;
        color: #f6c02d;
        font-size: 16px;
        font-weight: bold;
        margin-left: 2px;
        vertical-align: -2px;
    }

    .tags-view-item .el-icon-close:hover {
        background-color: #e3ae0d;
        color: #fff;
    }

    .tags-view-container .contextmenu {
        margin: 0;
        background: #fff;
        z-index: 10001;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        -webkit-box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    }
    .tags-view-container .contextmenu>li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
    }
    .tags-view-container .contextmenu>li:hover {
        background: #eee;
    }


    a, a:focus, a:hover {
        cursor: pointer;
        text-decoration: none;
    }


</style>

<style  lang="css">

    .ball_container .ball {
        position: fixed;
        right: 220px;
        top: 30px;
        color: #00a0dc;
        z-index: 9999;
    }
    .ball_container .ball.drop-enter,
    .ball_container .ball.drop-enter-active {
        transition: all 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41);
    }
    .ball_container .ball.drop-enter .inner,
    .ball_container .ball.drop-enter-active .inner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #00a0dc;
        transition: all 0.5s linear;
    }
</style>

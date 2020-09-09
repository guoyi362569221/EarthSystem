export default {
    name: 'left-menu',
    data() {

        return {
            menu_list: [],
            win_size: {
                height: '',
            },
            rightMenuVisible:false,
            leftWidth: 0,
            iconSize: '14px',
            headerHt: 75,
            footerHt: 0,
            access: false,
            env: process.env['NODE_ENV'],
            colors: ['#fc6e19', '#369cef', '#33ca53', '#fab33e', '#615caf', '#6ad3c3', '#489ff9']
        }
    },
    methods: {
        setSize() {
            this.win_size.height = this.$_jQuery(window).height() + "px";
        },
        toggleMenu() {
            this.$store.dispatch(this.$store.state.leftmenu.menu_flag ? 'set_menu_close' : 'set_menu_open');
            this.leftWidth = this.$store.state.leftmenu.width;
            this.iconSize = this.$store.state.leftmenu.menu_flag ? '14px' : '15px';
            this.$root.eventBus.$emit('toggleMenu');
        },
        updateCurMenu(rt) {
            let route = rt || this.$route;
            if (route.matched.length) {
                let rootPath = route.matched[0].path,
                    fullPath = route.path;
                this.$store.dispatch('set_cur_route', {
                    rootPath,
                    fullPath
                });
                let routes = this.$router.options.routes;
                for (let i = 0; i < routes.length; i++) {
                    if (routes[i].path === rootPath && !routes[i].hidden) {
                        this.menu_list = routes[i].children;
                        break;
                    }
                }

                if ('left' === "top" || (this.menu_list[0].isFullPage && this.menu_list.length === 1 && !this.menu_list[0].children)) {
                    this.leftWidth = '0px';
                } else {
                    this.leftWidth = this.$store.state.leftmenu.width;
                }
            } else {
                this.$router.push('/404');
            }
        },

        getColors(idx) {
            return this.colors[idx % this.colors.length];
        }
    },

    computed:{
        menuWidth(){
            return this.$store.state.leftmenu.width;
        }
    },

    created() {

        this.setSize();
        this.$_jQuery(window).resize(() => {
            this.setSize();
        });
        this.updateCurMenu();

    },
    mounted() {
        // console.log(this.$store.state.user.userinfo.access);
    },
    watch: {
        $route(to, from) {
            this.updateCurMenu(to);
        }
    }
}
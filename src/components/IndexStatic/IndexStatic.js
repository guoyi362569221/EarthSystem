export default {
  components: {},
  data: function () {
    return {
    };
  },
  created() {
    this.$$onResize(this.onResize);
  },
  mounted() {

  },
  watch: {
  },
  methods: {
    onResize() {
    },
  },
  activated: function () {
    this.onResize();
  },

  deactivated: function () {

  },
};

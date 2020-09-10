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
  methods: {
    onResize() {
      alert('')
    },
  },
  activated: function () {
    this.onResize();
  },

  deactivated: function () {

  },
};

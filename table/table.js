define(['vue', 'text!tableTempl', 'pagination2'], function(Vue, templ) {
  Vue.component('fd-table', {
    template: templ,
    props: {
      columns: {
        type: Array
      },
      tabledata: {
        type: Array
      },
      showhandle: {
        type: Boolean,
        default: false
      },
      pagination: {
        type: Boolean,
        default: false
      },
      total: {
        type: Number,
        default: 0
      },
      pageSize: {
        type: Number,
        default: 10
      },
      pageIndex: {
        type: Number,
        default: 1
      }
    },
    methods: {
      pagechange: function (page) {
        this.$emit('pagechange', page);
      }
    }
  })
})
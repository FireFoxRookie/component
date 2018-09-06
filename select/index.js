define(['vue', 'vueClickOutSide', 'text!selectTempl'], function(Vue, vueClickOutSide, templ) {
  // 添加ku
  Vue.use(vueClickOutSide);
  Vue.component('hy-select', {
    template: templ,
    props: {
      label: {
        type: String,
        default: '标签名'
      },
      value: {
        type: [String, Number],
        default: ''
      },
      search: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: []
      },
      placeholder: {
        type: String,
        default: '请选择'
      }
    },
    data: function() {
      return {
        select: {
          name: '',
          code: ''
        },
        dupSelect: {
          name: '',
          code: ''
        },
        dupData: [],
        optionData: [],
        isDrop: false
      }
    },
    created: function() {
      this.init();
    },
    computed: {
      isread: function() {
        if(this.search) {
          if(this.isDrop) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }
    },
    watch: {
      'select.name': function (newVal) {
        if(!this.search){
          return;
        }
        if (newVal === '') {
          this.optionData = JSON.parse(JSON.stringify(this.dupData));
          return;
        }
        for(var i=0; i<this.optionData.length; i++) {
          if(this.optionData[i].name.indexOf(newVal) < 0) {
            this.optionData.splice(i, 1);
            i--;
          }
        }
      },
      data: function (newval) {
        this.optionData = JSON.parse(JSON.stringify(this.data));
        this.dupData = JSON.parse(JSON.stringify(this.data));
      }
    },
    methods: {
      // 下拉列表item的点击事件
      listClick: function(label, value) {
        this.select.name = label;
        this.select.code = value;
        this.isDrop = false;
        this.$emit('selected', this.select);
      },
      // 将原有的内容复制给现有的
      copySelect: function() {
        for (var key in this.dupSelect) {
          this.select[key] = this.dupSelect[key]
        }
      },
      init: function() {
        this.optionData = JSON.parse(JSON.stringify(this.data));
        this.dupData = JSON.parse(JSON.stringify(this.data)); //将data深拷贝给dupData
        // for(var i = 0; i < this.data.length; i++) {
        //   if(this.data[i].code === this.value) {
        //     this.select.name = this.data[i].name;
        //     this.select.code = this.data[i].code;
        //     return;
        //   }
        // }
      },
      // 下拉箭头的点击事件
      dropClick: function() {
        if(this.isDrop) {
          this.copySelect();
        };
        this.isDrop = !this.isDrop;
      },
      // input框的点击事件
      showDrop: function() {
        this.isDrop = true;
      },
      clickOutSide: function() {
        this.isDrop = false;
      }
    }
  })
})
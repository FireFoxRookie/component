define(['vue', 'text!noticeTempl'], function(Vue, templ) {
  Vue.component('notice', {
    template: templ,
    data: function () {
      return {
        iconUrl: '../images/tip-success.png'
      }
    },
    props: {
      text: {
        type: [String, Object],
        default: '提示'
      },
      title: {
        type: String,
        default: '标题'
      },
      type: {
        type: String,
        default: 'success'
      },
      isShow: {
        type: Boolean,
        default: false
      }
    },
    created: function () {
      this.switchIcon(this.type);
    },
    watch: {
      type: function(val) {
        this.switchIcon(val);
      },
      isShow: function(val) {
        if(val) {
          var _this = this;
          setTimeout(function () {
            _this.$emit('close')
          }, 800);
        }
      }
    },
    methods: {
      close: function () {
        this.$emit('close');
      },
      switchIcon: function (val) {
        switch(val) {
          case 'success': 
            this.iconUrl = '../images/tip-success.png';
            break;
          case 'error':
            this.iconUrl = '../images/tip-error.png';
            break;
          case 'warning':
            this.iconUrl = '../images/tip-warning.png';
            break;
        }
      }
    }
  })
})
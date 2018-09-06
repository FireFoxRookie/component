define(["vue", "text!pagination2Templ"], function(Vue, templ) {
  Vue.component("pagination2", {
    template: templ,
    data: function() {
      return {
        curPage: this.pageIndex,
        size: 0,
        inputPage: "",
        ishowTip: false
      };
    },
    created: function() {
      this.getSize(this.total);
    },
    mounted: function() {
      this.setWidth();
    },
    watch: {
      pageIndex: function(newVal) {
        this.curPage = newVal;
      },
      total: function(newVal) {
        this.getSize(newVal);
        this.setWidth();
      }
    },
    props: {
      total: {
        type: Number
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
      numClick: function(index) {
        this.curPage = index;
        this.moveList();
      },
      getSize: function(val) {
        this.size = Math.ceil(val / this.pageSize);
      },
      setWidth: function() {
        var dom = document.getElementById("paginationNum");
        if (this.size <= 5) {
          dom.style.width = this.size * 30 + (this.size - 1) * 10 + "px";
        } else {
          dom.style.width = "190px";
        }
      },
      moveList: function() {
        if (this.curPage <= this.size - 2 && this.curPage >= 3) {
          $(".pagination-num-list").css(
            "left",
            -(this.curPage - 3) * 40 + "px"
          );
        } else if (this.curPage > this.size - 2 && this.size > 5) {
          $(".pagination-num-list").css("left", -(this.size - 5) * 40 + "px");
        } else if (this.curPage < 3) {
          $(".pagination-num-list").css("left", "0px");
        }
        this.$emit("pagechange", this.curPage);
      },
      pre: function() {
        this.curPage -= 1;
        this.moveList();
      },
      next: function() {
        this.curPage += 1;
        this.moveList();
      },
      toLast: function() {
        this.curPage = this.size;
        this.moveList();
      },
      jump: function() {
        var pageNum = Number(this.inputPage);
        var _this = this;
        if (isNaN(pageNum)) {
          this.ishowTip = true;
          setTimeout(function() {
            _this.ishowTip = false;
            _this.inputPage = "";
          }, 1000);
          return;
        }
        if (parseInt(pageNum) > this.size) {
          this.curPage = this.size;
        } else if (parseInt(pageNum) <= 1) {
          this.curPage = 1;
        } else {
          this.curPage = parseInt(pageNum);
        }
        this.moveList();
      }
    }
  });
});

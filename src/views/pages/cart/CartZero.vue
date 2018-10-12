<template>
<div>
    <div class="nav">
        <div class="main-width clearfix">
            <router-link  to="/index" class="logo fl"><img   src="../../../assets/img/logo-red.png"></router-link>
            <ul class="nav_title fl">
                <li>LPL赛事用椅</li>
                <li>电竞座椅</li>
                <li>办公座椅</li>
                <li>家居座椅</li>
                <li>新品</li>
                <li>电脑桌</li>
                <li>配件</li>
                <li>选款建议</li>
            </ul>
            <div class="search_wrap fr"><input v-model="keyword" >
                <button class="search_btn" @click="gosearch()"><i class="icon-new icon-search"></i></button>
            </div>
        </div>
    </div>
	<div class="successCart clearfix">

		<div class="succeessImg">
			<img src="../../../assets/img/queren.png" alt="">
			<div class="succeessText">
				<h4>已成功加入购物车！</h4>
				<h6>{{routerParams.itemNo}} </h6>
			</div>
		</div>
		<div class="successBtn">
			<a class="goback" @click="$router.go(-1)">返回上一页</a>
			<router-link :to="{ path: '/cart' }" class="gocart">去购物车结算</router-link>
		</div>
	</div>
	    <div class="Msucceess clearfix" v-if="tuijian.length>0">
            <div class="h5">
                <h5>搭配推荐</h5>
            </div>
            <div class="likeList">
                <ul class="clearfix" >
                    <li  v-for="(x,index) in tuijian" :key="index" :class="{none:x.show}" style="display:none">
                    	<router-link :to="{ path: '/sort/sortDetail',query:{id:x.list.id} }" >
                        <p class="stamp stampRed" v-if="x.activity!=''">{{x.activity}}</p>
                        <img class="likeListImg" :src="x.list.model_img | imgfilter" alt="">
                        <h5>{{x.model_no}}</h5>
                        <p class="des">{{x.list.model_name}}</p>
                        <p class="red">¥ {{x.list.sale_price | pricefilter}}</p>
                        <!--<button class="gocart">加入购物车</button>-->
                        </router-link>
                        
                    </li>
                </ul>
                <div class="likebtn changepage">
                    <Icon type="ios-arrow-back"  @click="prev()"/><Icon type="ios-arrow-forward"  @click="next()"/>
                </div>
            </div>
        </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      routerParams: {},
      tuijian: [],
      poptuijian: [],
      pushtuijian: [],
      index: 4,
      keyword: '',
      opt_search_hover:false,
      // zeroid:'',
    };
  },
  methods: {
    getParams() {
      // 取到路由带过来的参数
      this.routerParams = this.$route.query.cartBefore;
      // 将数据放在当前组件的数据内
    },
    gettuijian() {
      if (this.routerParams.id != "") {
        this.$axios({
          method: "get",
          url: `/product/other/${this.routerParams}`
        }).then(res => {
          if (res.code == "200") {
            for (let i = 0; i < res.object.length; i++) {
              if (i < 4) {
                res.object[i].show = true;
              } else {
                res.object[i].show = false;
              }
            }
            this.tuijian = res.object;
          }
        });
      }
    },
    next() {
      if (this.index < this.tuijian.length) {
        let i = this.index - 4;
        this.tuijian[this.index].show = true;
        this.tuijian[i].show = false;
        this.index++;
      }
    },
    prev() {
      if (this.index > 4) {
        let i = this.index - 5;
        this.tuijian[this.index - 1].show = false;
        this.tuijian[i].show = true;
        this.index--;
      }
    },
    gosearch(){
        this.$router.push({path: '/sort',query:{keyword:this.keyword}});
        this.$bus.$emit('val', this.keyword)  
    },
  },
    beforeDestroy () {
            this.$bus.$off('val')
    },
  mounted() {
    this.getParams();
    this.gettuijian();
  }
};
</script>

<style scoped="scoped">
.successCart {
  margin: 53px auto 70px;
  width: 100%;
  max-width: 1200px;
}

.successCart .succeessImg {
  float: left;
  width: 50%;
  padding-left: 13px;
}

.successCart .succeessImg > img {
  float: left;
  vertical-align: middle;
}

.successCart .succeessText {
  padding-left: 13px;
  height: 64px;
  line-height: 32px;
  float: left;
}

.successCart .succeessText h4 {
  font-size: 30px;
  color: black;
}

.successCart .succeessText h6 {
  font-size: 14px;
  font-family: "微软雅黑";
  color: rgb(141, 141, 141);
}

.successCart .successBtn {
  float: right;
  margin-top: 15px;
}

.successCart .successBtn a {
  text-align: center;
  padding: 15px 55px;
  box-sizing: border-box;
  font-size: 16px;
}
.none {
  display: block !important;
}
.successCart .goback {
  border: 1px solid rgb(210, 210, 210);
  color: rgb(160, 160, 160);
  margin-right: 12px;
}

.successCart .gocart {
  background-color: rgb(226, 24, 24);
  color: rgb(255, 255, 255);
}
.Msucceess {
  width: 100%;
  max-width: 1200px;
  margin: 0px auto;
  margin-bottom: 56px;
}
.Msucceess .h5 {
  height: 1px;
  margin-top: 40px;
  text-align: center;

  border-top: 1px solid rgb(204, 204, 204);
}
.Msucceess .h5 h5 {
  position: relative;
  top: -18px;
  font-weight: 100;
  background: #fff;
  display: inline-block;
  width: 320px;
  text-align: center;
  font-size: 24px;
  color: rgb(110, 110, 110);
}
.Msucceess .likeList {
  margin-top: 36px;
}
.Msucceess .likeList li {
  float: left;
  width: calc(25% - 15px);
  padding: 15px;
  background-color: rgb(246, 246, 246);
  margin-right: 15px;
  text-align: center;
  margin-bottom: 10px;
}
.Msucceess .stamp {
  width: 51px;
  height: 22px;
  box-sizing: border-box;
  font-size: 12px;
  font-weight: 700;
}
.Msucceess .stampRed {
  color: rgb(251, 84, 104);
  border: 2px solid rgb(226, 24, 24);
}
.Msucceess .likeList h5 {
  margin-top: 20px;
  font-size: 13px;
  color: black;
  font-weight: 900;
}
.Msucceess .des {
  color: #888888;
  font-weight: 300;
  overflow: hidden;
  font-size: 13px;
  height: 20px;
}
.Msucceess .red {
  margin: 5px;
  color: #ff0037;
  font-size: 13px;
  font-weight: 900;
}
.Msucceess .gocart {
  width: 100px;
  height: 25px;
  box-sizing: border-box;
  border: 0;
  color: rgb(141, 141, 141);
  font-size: 13px;
  background-color: rgb(246, 246, 246);
}
.Msucceess .gocart span {
  width: 100px;
  height: 25px;
  font-weight: 700;
  border: 1px solid rgb(160, 160, 160);
  padding: 4px 10px;
}
.Msucceess .likebtn {
  margin: 21px auto;
  width: 100px;
  text-align: center;
}
.Msucceess .likebtn a {
  padding: 7px 8px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(204, 204, 204);
  font-weight: 900;
  font-size: 13px;
  color: black;
  margin-right: 5px;
  cursor: pointer;
}
.Msucceess .likebtn .gray {
  color: #888888;
}
.likeListImg {
  width: 80%;
}
</style>
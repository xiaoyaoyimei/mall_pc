<template>
<div>
    <!--<div class="nav">
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
    </div>-->
    <app-nav></app-nav>
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
                <h5>热销产品</h5>
            </div>
            <div class="floor">
                 <ul class="clearfix" >
                    <li  v-for="(x,index) in tuijian" :key="index" :class="{none:x.show}" style="display:none">
                    	<router-link :to="{ path: '/sort/sortDetail',query:{id:x.list.id} }" >
                    		  <em v-if="x.activity!=''">{{x.activity}}</em>
                    		 <img class="likeListImg" :src="x.list.model_img | imgfilter" :alt="x.list.model_name">
                        <h6>{{x.model_no}}</h6>
                        <p>{{x.list.model_name}}</p>
                        <span class="color-newred">¥ {{x.list.sale_price | pricefilter}}</span>
                        </router-link>
                    </li>
                </ul>
                <div class="likebtn changepage" v-show="pageShow">
                    <Icon type="ios-arrow-back"  @click="prev()"/><Icon type="ios-arrow-forward"  @click="next()"/>
                </div>
            </div>
        </div>
</div>
</template>

<script>
		import AppNav from '@/components/Nav'
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
      pageShow:false
    };
  },
  components: {
			AppNav,
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
            if(res.object.length>4){
            	this.pageShow=true
            }
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
    },
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
  float: left;
  position: relative;
  top: 5px;
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
 margin-bottom: 50px;
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

</style>
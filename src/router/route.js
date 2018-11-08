import Full from '@/container/Full'
import UFull from '@/container/UFull'
import HFull from '@/container/HFull'
import CFull from '@/container/CFull'
import registerContent from "@/container/RegisterContent"
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/store'
import {getToken} from '@/base/auth'
Vue.use(VueRouter)
const routes = [{
		path: '/',
		redirect: '/index',
		component: Full,
		zname:'首页',
		name:'首页',
		children: [{
				path: '/index',
				meta: {
				title: 'home',
				keepAlive: true
				},
				component: () =>
					import('@/views/pages/Home.vue'),
			},
			{
				name: '新品频道',
				path: '/newchannel',
				component: () =>
					import('@/views/pages/NewChannel.vue'),
			},
			{
				name: '/activity',
				path: '/activity',
				component: resolve => require(['@/views/pages/Activity.vue'], resolve),
			},
			{
				path: '/sort',
				name: '/sort',
				component: () =>
					import('@/views/pages/Sort.vue'),
			},
			{
				name: '/seckill',
				path: '/seckill',
				component: resolve => require(['@/views/pages/SecKill.vue'], resolve),
			},
			{
				name: '/secdetail',
				path: '/secdetail',
				component: resolve => require(['@/views/pages/SecDetail.vue'], resolve),
			},
			{
				path: "/sort/sortDetail",
				name: '详情',
				component: resolve => require(['@/views/pages/SortDetail.vue'], resolve),
			},
			{
		
				path: '/tousu',
				name: '/tousu',
				component: resolve => require(['@/views/tousu.vue'], resolve)
			},
		]
	},
	{
		path: '/cart',
		component: CFull,
		redirect: '/cart',
		children: [
			{
				name: '/cartzero',
				path: '/cartzero',
				meta: {
					requireAuth: true
				},
				component: resolve => require(['@/views/pages/cart/CartZero.vue'], resolve)
			},
			{
				name: '/cart',
				path: '/cart',
				component: resolve => require(['@/views/pages/cart/CartOne.vue'], resolve),
			},
			{
				name: '/carttwo',
				path: '/carttwo',
				meta: {
					requireAuth: true
				},
				component: resolve => require(['@/views/pages/cart/CartTwo.vue'], resolve)
			},
			{
				name: '/cartthree',
				path: '/cartthree',
				meta: {
					requireAuth: true
				},
				component: resolve => require(['@/views/pages/cart/CartThree.vue'], resolve),
			},
			{
				name: '/gopay',
				path: '/gopay',
				meta: {
					requireAuth: true
				},
				component: resolve => require(['@/views/pages/cart/CartFour.vue'], resolve),
			},
			{
				name: '/paysuccess',
				path: '/paysuccess',
				meta: {
					requireAuth: true
				},
				component: resolve => require(['@/views/pages/cart/PaySuccess.vue'], resolve),
			},
		]
	},

	{
		path: '/user',
		name: '/user',
		zname:'个人中心',
		component: UFull,
		redirect: '/user/orderlist',
		children: [{
				meta: {
					requireAuth: true
				},
				name: 'orderlist',
				path: 'orderlist',
				zname:'订单列表',
				component: resolve => require(['@/views/pages/userCenter/OrderList.vue'], resolve),
			},
			{
				meta: {
					requireAuth: true
				},
				zname:'评价晒单',
				name: '/user/evaluate',
				path: '/user/evaluate',
				component: resolve => require(['@/views/pages/userCenter/Evaluate.vue'], resolve),
			},
				{
				meta: {
					requireAuth: true
				},
				zname:'售后服务',
				name: '/user/aftersales',
				path: '/user/aftersales',
				component: resolve => require(['@/views/pages/userCenter/AfterSales.vue'], resolve),
			},
			{
				meta: {
					requireAuth: true
				},
				zname:'售后服务详情',
				name: '/user/Aftersalesdetail',
				path: '/user/Aftersalesdetail',
				component: resolve => require(['@/views/pages/userCenter/AfterSalesdetail.vue'], resolve),
			},
			
			{
				meta: {
					requireAuth: true
				},
				zname:'订单详情',
				name: '/order/detail',
				path: '/order/detail',
				component: resolve => require(['@/views/pages/userCenter/OrderDetail.vue'], resolve),
			},
				{
				meta: {
					requireAuth: true
				},
				zname:'查看物流',
				name: '/order/express',
				path: '/order/express',
				component: resolve => require(['@/views/pages/userCenter/Express.vue'], resolve),
			},
			{
				meta: {
					requireAuth: true
				},
				zname:'我的地址',
				name: '/user/address',
				path: '/user/address',
				component: resolve => require(['@/views/pages/userCenter/Address.vue'], resolve)
			},
			{
				meta: {
					requireAuth: true
				},
				name: 'mycoupon',
				path: 'mycoupon',
				zname:'我的优惠券',
				component: resolve => require(['@/views/pages/userCenter/MyCoupon.vue'], resolve)
			},
			{
				meta: {
					requireAuth: true
				},
				name: 'couponcenter',
				path: 'couponcenter',
				zname:'优惠券中心',
				component: resolve => require(['@/views/pages/userCenter/CouponCenter.vue'], resolve)
			},
			{
				meta: {
					requireAuth: true
				},
				name: 'changePwd',
				path: 'changePwd',
				zname:'更改密码',
				component: resolve => require(['@/views/pages/userCenter/ChangePwd.vue'], resolve)
			},
			{
				meta: {
					requireAuth: true
				},
				name: 'myinfo',
				path: 'myinfo',
				zname:'我的信息',
				component: resolve => require(['@/views/pages/userCenter/MyInfo.vue'], resolve)
			},
				{
				meta: {
					requireAuth: true
				},
				name: 'news',
				path: 'news',
				zname:'消息通知',
				component: resolve => require(['@/views/pages/userCenter/News.vue'], resolve)
			},
			{
				meta: {
					requireAuth: true
				},
				name: 'mylike',
				path: 'mylike',
				zname:'喜欢的商品',
				component: resolve => require(['@/views/pages/userCenter/MyLike.vue'], resolve)
			},
			{
				name: 'contactus',
				path: 'contactus',
				zname:'联系我们',
				component: resolve => require(['@/views/pages/userCenter/Contactus.vue'], resolve)
			},
		]
	},
	{
		path: '/help',
		name: '/help',
		component: HFull,
		redirect: '/help/gwzn',
		children: [{
				name: 'gwzn',
				path: 'gwzn',
				component: () =>
					import('@/views/pages/help/gwzn.vue'),
			},
			{

				name: 'psfs',
				path: 'psfs',
				component: () =>
					import('@/views/pages/help/psfs.vue'),
			},
			{
				name: 'zffs',
				path: 'zffs',
				component: () =>
					import('@/views/pages/help/zffs.vue'),
			},
			{
				name: 'cjwt',
				path: 'cjwt',
				component: () =>
					import('@/views/pages/help/cjwt.vue'),
			},
			{
				name: 'bxzc',
				path: 'bxzc',
				component: () =>
					import('@/views/pages/help/bxzc.vue'),
			},
			{
				name: 'thhzc',
				path: 'thhzc',
				component: () =>
					import('@/views/pages/help/thhzc.vue'),
			},
			{
				name: 'thhlc',
				path: 'thhlc',
				component: () =>
					import('@/views/pages/help/thhlc.vue'),
			},
			{
				name: 'bxzt',
				path: 'bxzt',
				component: () =>
					import('@/views/pages/help/bxzt.vue'),
			},
			{
				name: 'shfw',
				path: 'shfw',
				component: () =>
					import('@/views/pages/help/shfw.vue'),
			},
			{
				name: 'xxty',
				path: 'xxty',
				component: () =>
					import('@/views/pages/help/xxty.vue'),
			},
			{
				name: 'hzzs',
				path: 'hzzs',
				component: () =>
					import('@/views/pages/help/hzzs.vue'),
			},
			{
				name: 'azsp',
				path: 'azsp',
				component: () =>
					import('@/views/pages/help/azsp.vue'),
			},
			{
				name: 'tsjy',
				path: 'tsjy',
				component: () =>
					import('@/views/pages/help/tsjy.vue'),
			},
			{
				name: 'gsjs',
				path: 'gsjs',
				component: () =>
					import('@/views/pages/help/gsjs.vue'),
			},
			{
				name: 'scjj',
				path: 'scjj',
				component: () =>
					import('@/views/pages/help/scjj.vue'),
			},
			{
				name: 'zzzc',
				path: 'zzzc',
				component: () =>
					import('@/views/pages/help/zzzc.vue'),
			},
			{
				name: 'lxwm',
				path: 'lxwm',
				component: () =>
					import('@/views/pages/help/lxwm.vue'),
			},
			{
				name: 'fwtk',
				path: 'fwtk',
				component: () =>
					import('@/views/pages/help/fwtk.vue'),
			},
			{
				name: 'xyfw',
				path: 'xyfw',
				component: () =>
					import('@/views/pages/help/xyfw.vue'),
			},
			{
				name: 'zffw',
				path: 'zffw',
				component: () =>
					import('@/views/pages/help/zffw.vue'),
			},
			{
				name: 'yszc',
				path: 'yszc',
				component: () =>
					import('@/views/pages/help/yszc.vue'),
			},
		]
	},

	{
		path: '/login',
		component: registerContent,
		redirect: '/login',
		children: [{
				path: '/login',
				name: '/login',
				component: resolve => require(['@/views/Login.vue'], resolve)
			},
			{
				path: '/register',
				name: '注册',
				component: resolve => require(['@/views/Register.vue'], resolve)
			},
			{
				path: '/resetPassword',
				name: '/resetPassword',
				component: resolve => require(['@/views/ResetPassword.vue'], resolve)
			},
				{
				path: '/resettwo',
				name: '/resettwo',
				component: resolve => require(['@/views/ResetTwo.vue'], resolve)
			}
		]
	},

	{
		path: '/*',
		component: resolve => require(['@/views/errorPages/404.vue'], resolve)
	},
]

if(localStorage.getItem('token')) {
	store.commit('LOGIN', {
		token: localStorage.getItem('token'),
		userId: localStorage.getItem('userId')
	})
}
const router = new VueRouter({
	routes,
	scrollBehavior(to, from, savedPosition) {
		if(savedPosition) {
			return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop
			  }
			  return { x: 0, y: to.meta.savedPosition || 0 }
		}
	}
});
router.beforeEach((to, from, next) => {
	if(to.matched.some(r => r.meta.requireAuth)) {
		if(store.state.token) {
			next();
		} else {
			next({
				path: '/login',
				query: {
					redirect: to.fullPath
				}
			})
		}
	} else {
		next();
	}
})
export default router;
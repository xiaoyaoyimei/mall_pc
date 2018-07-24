import Full from '@/container/Full'
import UFull from '@/container/UFull'
import HFull from '@/container/HFull'
import registerContent from "@/container/RegisterContent"
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/store'
Vue.use(VueRouter)
const routes =  [
				  {
					path: '/',
				  redirect: '/index',
          component: Full,
          children: [
            {
						path: '/index',
						component: () => import('@/views/pages/Home.vue'),
					},
					{
						name:'新品频道',
						path: '/newchannel',
						component:() => import('@/views/pages/NewChannel.vue'),
					},
				     {
						name:'/activity',
						path: '/activity',
						component:resolve => require(['@/views/pages/Activity.vue'], resolve),
					},
					{
						path: '/sort',
						name: '/sort',
						component: () => import('@/views/pages/Sort.vue'),
					},
					{
						name:'/seckill',
						path: '/seckill',
						component:resolve => require(['@/views/pages/SecKill.vue'], resolve),
					},
					{
						name:'/secdetail',
						path: '/secdetail',
						component:resolve => require(['@/views/pages/SecDetail.vue'], resolve),
					},
					{
						path:"/sort/sortDetail",
						name:'详情',
						component:resolve=>require(['@/views/pages/SortDetail.vue'], resolve),
					},
					{
						name:'购物车',
						path: '/cart',
						component:resolve => require(['@/views/pages/cart/CartOne.vue'], resolve),
					},
					{
						name:'/carttwo',
						path: '/carttwo',
						meta:{requireAuth:true},
						component:resolve => require(['@/views/pages/cart/CartTwo.vue'], resolve)
					},
					{
						name:'/cartthree',
						path: '/cartthree',
						meta:{requireAuth:true},
						component:resolve => require(['@/views/pages/cart/CartThree.vue'], resolve),
					},
					{
						name:'/gopay',
						path: '/gopay',
						meta:{requireAuth:true},
						component:resolve => require(['@/views/pages/cart/CartFour.vue'], resolve),
					},
					{
						name:'/paysuccess',
						path: '/paysuccess',
						meta:{requireAuth:true},
						component:resolve => require(['@/views/pages/cart/PaySuccess.vue'], resolve),
					},

					]
				},
				{
				path: '/user',
				name:'/user',
				component: UFull,
				redirect: '/user/orderlist',
				children:[
				            {
				            meta:{requireAuth:true},
				         	name:'orderlist',
				   			path: 'orderlist',
				 	   		component:resolve => require(['@/views/pages/userCenter/OrderList.vue'], resolve),
				         },     
				         { 	meta:{requireAuth:true},
				         	name:'/order/detail',
				   			path: '/order/detail',
				 	   		component:resolve => require(['@/views/pages/userCenter/OrderDetail.vue'], resolve),
				      	},
						{
							meta:{requireAuth:true},
							name:'/user/address',
					   		path: '/user/address',
				 		   	component:resolve => require(['@/views/pages/userCenter/Address.vue'],resolve)
						},
						{
						name:'mycoupon',
				   		path:'mycoupon',
			 		   	component:resolve => require(['@/views/pages/userCenter/MyCoupon.vue'],resolve)
						},
						{
						name:'couponcenter',
				   		path:'couponcenter',
			 		   	component:resolve => require(['@/views/pages/userCenter/CouponCenter.vue'],resolve)
						},
					{
						meta:{requireAuth:true},
					name:'changePwd',
			   		path:'changePwd',
		 		   	component:resolve => require(['@/views/pages/userCenter/ChangePwd.vue'],resolve)
				},
					{
						meta:{requireAuth:true},
					name:'myinfo',
			   		path:'myinfo',
		 		   	component:resolve => require(['@/views/pages/userCenter/MyInfo.vue'],resolve)
				},
				{
					name:'setting',
			   		path:'setting',
		 		   	component:resolve => require(['@/views/pages/userCenter/MySetting.vue'],resolve)
				}	
			]
				},
					{
				path: '/help',
				name:'/help',
				component: HFull,
				redirect: '/help/gwzn',
				children:[
				            {
				         	name:'gwzn',
				   				path: 'gwzn',
				 	   			component:() => import('@/views/pages/help/gwzn.vue'),
				         },     
				         { 
				         	
				         	name:'psfs',
				   			  path: 'psfs',
				 	   			component:() => import('@/views/pages/help/psfs.vue'),
				      	},
								{
									name:'zffs',
							   		path: 'zffs',
						 		   	component:() => import('@/views/pages/help/zffs.vue'),
								},
								{
									name:'cjwt',
							   		path: 'cjwt',
						 		   	component:() => import('@/views/pages/help/cjwt.vue'),
								},
								{
									name:'bxzc',
							   		path: 'bxzc',
						 		   	component:() => import('@/views/pages/help/bxzc.vue'),
								},
								{
									name:'thhzc',
							   		path: 'thhzc',
						 		   	component:() => import('@/views/pages/help/thhzc.vue'),
								},
								{
									name:'thhlc',
							   		path: 'thhlc',
						 		   	component:() => import('@/views/pages/help/thhlc.vue'),
								},
									{
									name:'bxzt',
							   		path: 'bxzt',
						 		   	component:() => import('@/views/pages/help/bxzt.vue'),
								},
										{
									name:'shfw',
							   		path: 'shfw',
						 		   	component:() => import('@/views/pages/help/shfw.vue'),
								},
								{
									name:'xxty',
							   		path: 'xxty',
						 		   	component:() => import('@/views/pages/help/xxty.vue'),
								},
								{
									name:'azsp',
							   		path: 'azsp',
						 		   	component:() => import('@/views/pages/help/azsp.vue'),
								},
								{
									name:'tsjy',
							   		path: 'tsjy',
						 		   	component:() => import('@/views/pages/help/tsjy.vue'),
								},
													{
									name:'gsjs',
							   		path: 'gsjs',
						 		   	component:() => import('@/views/pages/help/gsjs.vue'),
								},
								{
									name:'scjj',
							   		path: 'scjj',
						 		   	component:() => import('@/views/pages/help/scjj.vue'),
								},
								{
									name:'zzzc',
							   		path:'zzzc',
						 		   	component:() => import('@/views/pages/help/zzzc.vue'),
								},
								{
									name:'lxwm',
							   		path:'lxwm',
						 		   	component:() => import('@/views/pages/help/lxwm.vue'),
								},
										{
									name:'fwtk',
							   		path: 'fwtk',
						 		   	component:() => import('@/views/pages/help/fwtk.vue'),
								},
								{
									name:'xyfw',
							   		path: 'xyfw',
						 		   	component:() => import('@/views/pages/help/xyfw.vue'),
								},
								{
									name:'zffw',
							   		path:'zffw',
						 		   	component:() => import('@/views/pages/help/zffw.vue'),
								},
								{
									name:'yszc',
							   		path:'yszc',
						 		   	component:() => import('@/views/pages/help/yszc.vue'),
								},
			]
				},
			
		{
			path: '/login', 
			component:  registerContent,
			redirect: '/login',
			children:[
				{
					path: '/login',
					name: '/login',
					component:  resolve => require(['@/views/Login.vue'], resolve)
				},
				{
					path: '/register',
					name: '注册',
					component:  resolve => require(['@/views/Register.vue'], resolve)
				},
				{
					path:'/resetPassword',
					name:'/resetPassword',
					component:resolve => require(['@/views/ResetPassword.vue'], resolve)
				}
			]
		},
		
		{
			path: '/*',
			 component:resolve => require(['@/views/errorPages/404.vue'],resolve)
		},
	]

if (localStorage.getItem('token')) {  
store.commit('LOGIN',{token: localStorage.getItem('token'),userId:localStorage.getItem('userId')})  
}  
const router = new VueRouter({
    routes,
   scrollBehavior (to, from, savedPosition) {
		  if (savedPosition) {
		    return savedPosition
		  } else {
		    return { x: 0, y: 0 }
		  }
		}
});

router.beforeEach((to, from, next) => {  
		if (to.matched.some(r => r.meta.requireAuth)) { 
			if (store.state.token) {  
			next();  
			}  
			else {  
			next({  
					path: '/login',  
					query: {redirect: to.fullPath}  
			})  
			}  
		}  
		else {  
		next();  
		}  
}) 
export default router;

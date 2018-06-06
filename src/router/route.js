const _import = require('./_import_' + process.env.NODE_ENV);
import Full from '@/container/Full'
import UFull from '@/container/UFull'
import registerContent from "@/container/RegisterContent"
let routes =  [
				{
					path: '/',
				    redirect: '/index',
                    component: Full,
                    children: [
                    {
						path: '/index',
						component:resolve => require(['@/views/pages/Home.vue'], resolve),
					},
					{
						name:'新品频道',
						path: '/newchannel',
						component:resolve => require(['@/views/pages/NewChannel.vue'], resolve),
					},
					{
						name:'/typesort',
						path: '/typesort',
						component:resolve => require(['@/views/pages/TypeSort.vue'], resolve),
					},
					{
							path: '/sort',
							name: '/sort',
							component:  resolve => require(['@/views/pages/Sort.vue'], resolve)
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
							name:'/paysuccess',
							path: '/paysuccess',
							meta:{requireAuth:true},
							component:resolve => require(['@/views/pages/cart/CartFour.vue'], resolve),
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
					name:'mylove',
			   		path:'mylove',
		 		   	component:resolve => require(['@/views/pages/userCenter/MyLove.vue'],resolve)
				},
					{
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
			path: '/login', 
			name: 'login',
			component:  registerContent,
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
			]
		},
		
		{
			path: '/*',
			 component:resolve => require(['@/views/errorPages/404.vue'],resolve)
		},
	]

export default routes;

<template>
	<div class="order">
		<h4 class="C_deListTit">收货地址</h4>
		<i-form v-ref:form-validate1 :model="formValidate1" :rules="ruleValidate1" :label-width="100">
        <Form-item label="省份" prop="province">
           <i-select :model.sync="formValidate1.province" placeholder="请选择省份">
                <i-option value="beijing">北京市</i-option>
                <i-option value="shanghai">上海市</i-option>
                <i-option value="shenzhen">深圳市</i-option>
            </i-select>
        </Form-item>
        <Form-item label="城市" prop="city">
           <i-select :model.sync="formValidate1.city" placeholder="请选择城市">
                <i-option value="beijing">北京市</i-option>
                <i-option value="shanghai">上海市</i-option>
                <i-option value="shenzhen">深圳市</i-option>
            </i-select>
        </Form-item>
        <Form-item label="区域" prop="area">
            <i-select :model.sync="formValidate1.area" placeholder="请选择区域">
                <i-option value="beijing">北京市</i-option>
                <i-option value="shanghai">上海市</i-option>
                <i-option value="shenzhen">深圳市</i-option>
            </i-select>
        </Form-item>
        <Form-item label="详细地址 ：" prop="address">
            <i-input :value.sync="formValidate1.detailaddress" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></i-input>
        </Form-item>
		<Form-item label="邮政编码 ：" prop="zip_code">
			<i-input :value.sync="formValidate1.name" placeholder="请输入姓名"></i-input>
		</Form-item>
		<Form-item label="收货人 ：" prop="person">
			<i-input :value.sync="formValidate1.name" placeholder="请输入姓名"></i-input>
		</Form-item>
		<Form-item label="手机号 ：" prop="phone">
			<i-input :value.sync="formValidate1.name" placeholder="请输入姓名"></i-input>
		</Form-item>
        <Form-item>
            <i-button type="primary" @click="handleSubmit('formValidate1')">提交</i-button>
            <i-button type="ghost" @click="handleReset('formValidate1')" style="margin-left: 8px">重置</i-button>
        </Form-item>
    </i-form>
	<i-table width="924" border :columns="addaddressTiltle" :data="addressList"></i-table>
	</div>
</template>

<script>
	export default {
    data () {
        return {
			formValidate1: {
                    province: '',
                    city: '',
                    area: '',
                    address: '',
                    zip_code: '',
                    person: '',
                    phone: ''
                },
				ruleValidate1: {
                    person: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    province: [
                        { required: true, message: '省份不能为空', trigger: 'change' },
                    ],
                    city: [
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    area: [
                        { required: true, message: '请选择区域', trigger: 'change' }
                    ],
                    address: [
                        { required: true, message: '详细地址不能为空', trigger: 'blur' }
                    ],
                    phone: [
                       { required: true, message: '电话不能为空', trigger: 'blur' },
                    ],
                    zip_code: [
                         { required: true, message: '邮编不能为空', trigger: 'blur' },
                    ]
                },
			// self: this,
                addaddressTiltle: [
                    {
                        title: "收货人",
						key: 'person',
						width:'100px',
                    },
                    {
                        title: '电话',
						key: 'phone',
						width:'120px',
                    },
					{
						title: '省份',
						width:'100px',
                        key: 'province'
                    },
					 {
						title: '城市',
						width:'100px',
                        key: 'city'
                    },
                    {
						title: '地区',
						width:'100px',
                        key: 'area'
                    },
                    {
						title: '详细地址',
						width:'152px',
                        key: 'address'
                    },
					{
						title: '邮编',
						width:'100px',
                        key: 'zip_code'
                    },
                    {
						title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, '设为默认'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                addressList: [
                    {
                        person: '王小明',
                        phone: 18888888888,
						province: '北京',
                        city: '北京市',
						area: '朝阳区',
                        address: 'dsdsdsdsdsdqds',
						zip_code: '674200',
					},
					{
                        person: '王小明',
                        phone: 18888888888,
						province: '北京',
                        city: '北京市',
						area: '朝阳区',
                        address: 'dsdsdsdsdsdqds',
						zip_code: '674200',
                    },
                ]
            }
      },
    //   filters: {
	// 	  formatXz(value) {
	// 	    if (!value) return ''
	// 	    	value = value.toString()
	// 			const statusMap = {
	// 				  	"Y":true,
	// 				    'N':false,
	// 				}
	// 			return statusMap[value]
	// 	  }
	// 	},
       methods:{
		//    show (index) {
        //         this.$Modal.info({
        //             title: '用户信息',
        //             content: `姓名：${this.addressList[index].person}<br>电话：${this.addressList[index].phone}<br>省份：${this.addressList[index].province}<br>城市：${this.addressList[index].city}<br>区域：${this.addressList[index].area}<br>详细地址：${this.addressList[index].address}<br>邮政编码：${this.data6[index].zip_code}`
        //         })
        //     },
            remove (index) {
                this.addressList.splice(index, 1);
            },
       	//     getAddressList(){
       	//     	      	this.$axios({
		// 				    method: 'post',
		// 				    url:'/address',
		// 				}).then((res)=>{
		// 					if(res.status=='200'){
		// 					 this.addressList=res.data;
		// 					}
		// 					for(let i=0;i<this.addressList.length;i++){
		// 						if(this.addressList[i].isDefault=='N'){
		// 							this.addressList[i].isDefault=false;
		// 						}else{
		// 							this.addressList[i].isDefault=true;
		// 						}
		// 					}
		// 				});
       	//    },
       	//    updateDefault(value){
       	//    	this.$axios({
		// 				    method: 'post',
		// 				    url:'/address/updateDefault?id='+value+'&isDefault=Y',
		// 				}).then((res)=>{
		// 					if(res.status=='200'){
		// 						this.getAddressList();
		// 					}
		// 				})
       	//    },
			  handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
       	//    handleDelete(value){
       	//    	   this.$Modal.confirm({
        //             title: '确认删除',
        //             content: '<p>确认删除该条地址</p>',
        //             onOk: () => {
        //                  	this.$axios({
		// 					    method: 'post',
		// 					    url:'/address/delete?id='+value+'',
		// 					}).then((res)=>{
		// 						if(res.status=='200'){
		// 							this.getAddressList();
		// 						}
		// 				})
        //             },
        //             onCancel: () => {
        //                 this.$Message.info('取消删除');
        //             }
        //         });
       	   		
       	//    }
	      },
	      mounted(){
	      	// this.getAddressList();
	      }
   }
</script>

<style scoped="scoped"  lang="scss">
.order{
    width: 100%;
    max-width: 1100px;
    min-height: 900px;
    margin: 0 auto;
}
.C_deListTit {
    border-bottom: 1px solid #e7e7e7;
    line-height: 36px;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 900;
    max-width: 1026px;
}
  .addaddress{
  	position: fixed;
  	bottom:0;
  	background: #ed1844;
  	width: 100%;color:#fff;
  	padding:10px 0;
  	cursor: pointer;
  	a{
  		color:#fff;
  		text-align: center;
  	}
  }
  .address { 
  	background: #fff;
  	padding:10px;
  	font-size: 14px;
		 li p{
		  	display: flex;
		  	padding:3px 0
		  	}
		  	label{
		  		cursor: pointer;
		  	}
		  	span:first-child{
		  		flex:1
		  		}
		  		i{
		  			margin-left:10px;
		  			margin-right:5px;
		  			
		  		}
		  }
</style>
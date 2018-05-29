<template>
	<div class="order">
		<h2><router-link to="/user/address"><Icon type="ios-arrow-thin-left"></Icon></router-link>添加新地址
		<span @click="addSubmit">保存</span></h2>
	<Form :model="addForm" ref="addForm" label-position="left" :label-width="100" :rules="ruleValidate"  style="background: #fff;"> 
        <FormItem label="收货人" prop="person">
            <Input v-model="addForm.person" placeholder="收货人"></Input>
        </FormItem>
        <FormItem label="手机号" prop="phone">
            <Input v-model="addForm.phone" placeholder="联系电话"></Input>
        </FormItem>
        <FormItem label="固定电话" >
            <Input v-model="addForm.tel" placeholder="固定电话"></Input>
        </FormItem>
        <FormItem label="所在地区"  prop="selectedOptionsAddr">
        	 <Cascader  v-model="addForm.selectedOptionsAddr" :data="addressOption"></Cascader>
        </FormItem>
         <FormItem label="详细地址" prop="address">
            <Input v-model="addForm.address" placeholder="详细地址"></Input>
        </FormItem>
    </Form>
	</div>
</template>

<script>
   export default {
    data () {
        return {
        	  addressOption: [],
			  addForm: {
		                    person: '',
		                    phone: '',
		                    selectedOptionsAddr:[],
		                    address:'',
		                    tel:'',
		                },
		            ruleValidate: {
	                    person: [
	                        { required: true, message: '收货人不能为空', trigger: 'blur' }
	                    ],
	                    phone: [
	                        { required: true, message: '手机号不能为空', trigger: 'blur' },
	                    ],
                        selectedOptionsAddr: [
                        { required: true, type: 'array',message: '请选择省市区', trigger: 'blur' }
                    	],
                    	address:[
	                        { required: true, message: '详细地址不能为空', trigger: 'blur' },
	                    ]
                   },
			  }
		
      	},
    	      methods: {
    	      	getAddressOption(){
    	      		  	this.$axios({
						    method: 'post',
						    url:'/common/address',
						}).then((res)=>{
							if(res.status=='200'){
							 this.addressOption=res.data;
							}
						});
    	      	},
    	      	addSubmit(){
    	      		   this.$refs['addForm'].validate((valid) => {
					if (valid) {
							let temp=this.addForm;
							temp.receiveProvince=this.addForm.selectedOptionsAddr[0];
							temp.receiveCity=this.addForm.selectedOptionsAddr[1];
							temp.receiveDistrict=this.addForm.selectedOptionsAddr[2];
							delete temp['selectedOptionsAddr']
							let para = Object.assign({}, temp);
								this.$axios({
							    method: 'post',
							    url:'/address/insert',
							    data:para,
								}).then((res)=>{
							        this.$Message.success('提交成功');
									this.$refs['addForm'].resetFields();
									this.$router.push('/user/address')  
							});
					}
				});
    	      	}
			    },
			         mounted() {
			this.getAddressOption();
		}
   }
</script>

<style scoped="scoped"  lang="scss">
  .addaddress{
  	position: fixed;
  	bottom:0;
  	background: #ed1844;
  	width: 100%;color:#fff;
  	text-align: center;
  	padding:10px 0;
  	cursor: pointer;
  }
  .address{
  	text-align: center;
  	color:#666;
  	margin-top:60px;
  }
  .ivu-form-item{
  	border-bottom: 1px solid #eee;
  	padding: 10px;
  	margin-bottom:0;
  }
</style>
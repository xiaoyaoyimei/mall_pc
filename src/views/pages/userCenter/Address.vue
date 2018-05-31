<template>
	<div class="order">
		<h4 class="C_deListTit">收货地址</h4>
		<i-form ref="formCustom" :model="formCustom" :rules="ruleValidate" class="width" :label-width="100">
        <form-item label="所在地区"  prop="selectedOptionsAddr">
        	 <Cascader  v-model="formCustom.selectedOptionsAddr" :data="addressOption"></Cascader>
        </form-item>
        <form-item label="详细地址 ：" prop="address">
            <i-input v-model="formCustom.address" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入详细"></i-input>
        </form-item>
		<!-- <form-item label="邮政编码 ：" prop="zip_code">
			<i-input v-model="formCustom.zip_code" placeholder="请输入邮编"></i-input>
		</form-item> -->
		<form-item label="收货人 ：" prop="person">
			<i-input v-model="formCustom.person" placeholder="请输入姓名"></i-input>
		</form-item>
		<form-item label="手机号 ：" prop="phone">
			<i-input v-model="formCustom.phone" placeholder="请输入手机号"></i-input>
		</form-item>
        <form-item>
            <i-button type="primary" @click="handleSubmit('formCustom')">提交</i-button>
            <i-button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</i-button>
        </form-item>
    </i-form>
	<i-table width="924" border :columns="addaddressTiltle" :data="addressList"></i-table>
	</div>
</template>

<script>
	export default {
    data () {
        return {
            addressOption: [],
			formCustom: {
                    selectedOptionsAddr:[],
                    address: '',
                    // zip_code: '',
                    person: '',
                    phone: ''
                },
				ruleValidate: {
                    selectedOptionsAddr: [
                        { required: true, type: 'array',message: '请选择省市区', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '详细地址不能为空', trigger: 'blur' }
                    ],
                    // zip_code: [
                    //      { required: true, message: '邮编不能为空', trigger: 'blur' },
                    // ],
                    person: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],

                    phone: [
                       { required: true, message: '电话不能为空', trigger: 'blur' },
                    ],

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
                        key: 'receiveProvince'
                    },
					 {
						title: '城市',
						width:'100px',
                        key: 'receiveCity'
                    },
                    {
						title: '地区',
						width:'100px',
                        key: 'receiveDistrict'
                    },
                    {
						title: '详细地址',
						width:'252px',
                        key: 'address'
                    },
                    {
						title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            if(params.row.isDefault == "N"){
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.show(params.index)
                                                }
                                            }
                                    }, '设为默认'),
                                    h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.index)
                                                }
                                            }
                                    }, '删除')
                                ]);
                            }
                            
                        }
                    }
                ],
                addressList: [
                ]
            }
      },
      filters: {
		  formatXz(value) {
		    if (!value) return ''
		    	value = value.toString()
				const statusMap = {
					  	"Y":true,
					    'N':false,
					}
				return statusMap[value]
		  }
		},
       methods:{
            remove (index) {
                let value = this.addressList[index].id;
                this.$Modal.confirm({
                    title: '确认删除',
                    content: '<p>确认删除该地址</p>',
                    onOk: () => {
                         	this.$axios({
							    method: 'post',
							    url:'/address/delete?id='+value+'',
							}).then((res)=>{
								if(res.code=='200'){
									this.getAddressList();
								}
						})
                    },
                    onCancel: () => {
                        this.$Message.info('取消删除');
                    }
                });
            },
            getAddressOption(){
                this.$axios({
                    method: 'post',
                    url:'/common/address',
                }).then((res)=>{
                        this.addressOption=res;
                });
    	    },
       	    getAddressList(){
       	    	      	this.$axios({
						    method: 'post',
						    url:'/address',
						}).then((res)=>{
                             this.addressList=res;
						});
              },
              show(index){
                    let value = this.addressList[index].id;
                  this.$axios({
						    method: 'post',
						    url:'/address/updateDefault?id='+value+'&isDefault=Y',
						}).then((res)=>{
								this.getAddressList();
						})
              },
       	   chooseDD(value){
       	   	 let fromc = localStorage.getItem('fromc');
       	   	   if(fromc!=undefined){
	       	   	  	    if(fromc=='miaosha'){
	       	   	  	    	
	       	   	  	    	this.$router.push({name:'/secdetail',params:{address:value}})  
	       	   	  	    }else {
	       	   	  	    	 this.$router.push({name:'/carttwo',params:{address:value}})  
	       	   	  	    }
       	   	  	    }else{
       	   	  	    	return;
       	   	  	    }
       	   	   
       	   },
			handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                       let temp=this.formCustom;
							temp.receiveProvince=this.formCustom.selectedOptionsAddr[0];
							temp.receiveCity=this.formCustom.selectedOptionsAddr[1];
							temp.receiveDistrict=this.formCustom.selectedOptionsAddr[2];
							delete temp['selectedOptionsAddr']
                            let para = Object.assign({}, temp);
								this.$axios({
							    method: 'post',
							    url:'/address/insert',
							    data:para,
								}).then((res)=>{
									if(res.code=='200'){
							        this.$Message.success('提交成功');
									this.$refs['formCustom'].resetFields();
									this.getAddressList();
									}else if(res.code=='401'){
										this.$Message.error(res.msg);
										return ;
									}else{
										this.$Message.error(res.msg);
										return ;
									}
							});
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },

	      },
	      mounted(){
              this.getAddressList();
              this.getAddressOption();
	      }
   }
</script>

<style lang="scss">
.order{
    width: 100%;
    max-width: 1100px;
    min-height: 900px;
    margin: 0 auto;
}
.width{
    width: 920px;
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
<template>
	<div class="account_address_wrap">
		<button class="btn-add" @click="modaladdr=true">新增收货地址</button>
         <Modal v-model="modaladdr" title="新增收货地址" @on-ok="add" :loading="loading"   :mask-closable='false'>
				<Form :model="addForm" ref="addForm" label-position="left" :label-width="100" :rules="ruleValidate"  class="P15"> 
					<FormItem label="收货人" prop="person">
						<Input v-model="addForm.person" placeholder="收货人" autocomplete="off"></Input>
					</FormItem>
					<FormItem label="手机号" prop="phone">
						<Input v-model="addForm.phone" placeholder="手机号" autocomplete="off"></Input>
					</FormItem>
					<FormItem label="固定电话" >
						<Input v-model="addForm.tel" placeholder="固定电话" autocomplete="off"></Input>
					</FormItem>
			        <FormItem label="所在地区"  prop="selectedOptionsAddr">
        		 <Cascader  v-model="addForm.selectedOptionsAddr" :data="addressOption"></Cascader>
        		</FormItem>
					<FormItem label="详细地址" prop="address">
						<Input v-model="addForm.address" placeholder="详细地址"></Input>
					</FormItem>
				</Form>
		</Modal>
		
		   <Modal ref='modaleditaddr' v-model="modaleditaddr" title="编辑收货地址" @on-ok="editaddr" :loading="loading" :mask-closable='false'>
					  	<Form :model="editForm" ref="editForm" label-position="left" :label-width="100" :rules="ruleValidate"  class="P15" > 
				        <FormItem label="收货人" prop="person">
				            <Input v-model="editForm.person" placeholder="收货人"></Input>
				        </FormItem>
				        <FormItem label="手机号" prop="phone">
				            <Input v-model="editForm.phone" placeholder="手机号"></Input>
				        </FormItem>
				        <FormItem label="固定电话" >
				            <Input v-model="editForm.tel" placeholder="固定电话"></Input>
				        </FormItem>
				        <FormItem label="所在地区"  prop="selectedOptionsAddr">
				        	 <Cascader  v-model="editForm.selectedOptionsAddr" :data="addressOption"></Cascader>
				        </FormItem>
				         <FormItem label="详细地址" prop="address">
				            <Input v-model="editForm.address" placeholder="详细地址"></Input>
				        </FormItem>
				    </Form>
			    </Modal>
		
		
    <ul class="address-list ">
    	<li v-for="(item,index) in addressList" :key="index" class="clearfix">
    		<Icon type="close" class="icon-delete" @click.native="deleteAddr(item.id)"></Icon>
    	<p><span>收货人:</span>{{item.person}} <span class="default" v-if="item.isDefault=='Y'">默认地址</span></p>
         <p><span>所在地区:</span>{{item.receiveProvince}}{{item.receiveCity}}{{item.receiveDistrict}}</p>
    	<p><span>地址:</span>{{item.address}}</p>
    	<p><span>手机:</span>{{item.phone}}</p>
    	<p><span>固定电话:</span>{{item.tel}}</p>
    	<div class="opt"><button @click="secAdd(item)" class="sec" v-if="secShow">选择该地址</button>
    		<button  @click="editmodal(item)">编辑</button><button v-if="item.isDefault=='N'"   @click="updateDefault(item.id)">设为默认</button> </div>
      </li>
    </ul>
	</div>
</template>

<script>
	 import { validatePHONE } from '@/assets/js/validate';
	export default {
    data () {
    		 const validatePhone = (rule, value, callback) => {
	      	 	if(value.length<0){
	      	 		 callback(new Error('手机号不能为空'));
	      	 	}
	          else if (!validatePHONE(value)) {
	            callback(new Error('请输入正确的手机号'));
	          } else {
	            callback();
	          }
        	};
        return {
        	secShow:false,
        	modaleditaddr:false,
        	modaladdr:false,
        	loading:true,
            addressOption: [],
		  	addForm: {
                    person: '',
                    phone: '',
                    selectedOptionsAddr:[],
                    address:'',
                    tel:'',
                },
                     editForm: {
		                    person: '',
		                    phone: '',
		                    selectedOptionsAddr:[],
		                    address:'',
		                    tel:'',
		                },
			ruleValidate: {
                    selectedOptionsAddr: [
                        { required: true, type: 'array',message: '请选择省市区', trigger: 'change' }
                    ],
                    address: [
                        { required: true, message: '详细地址不能为空', trigger: 'blur' }
                    ],
                    person: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    phone: [
                       { required: true, validator: validatePhone, trigger: 'blur' },
                    ],

                },
                addressList: []
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
       	//设为默认
       	   updateDefault(value){
       	   	this.$axios({
						    method: 'post',
						    url:'/address/updateDefault?id='+value+'&isDefault=Y',
						}).then((res)=>{
								this.getAddress();
						})
       	   },
       	   //新增地址
       	add(){
       		    setTimeout(() => {
                    this.loading = false;
                    this.$nextTick(() => {
                    this.loading = true;
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
									if(res.code=='200'){
								    this.modaladdr = false;
									this.$refs['addForm'].resetFields();
									this.getAddress();
									this.$Message.success('修改成功');
									}else if(res.code=='401'){
										this.$Message.error(res.msg);
										return ;
									}else{
										this.$Message.error(res.msg);
										return ;
									}
							});
					}
				});
                    });
                }, 2000);
       	},
       	//删除地址
            deleteAddr(value) {
                this.$Modal.confirm({
                    title: '确认删除',
                    content: '<p>确认删除该地址</p>',
                    onOk: () => {
                         	this.$axios({
							    method: 'post',
							    url:'/address/delete?id='+value+'',
							}).then((res)=>{
								if(res.code=='200'){
									this.getAddress();
								}
						})
                    },
                    onCancel: () => {
                        this.$Message.info('取消删除');
                    }
                });
            },
            //显示编辑地址
                 editmodal(item){
            		this.modaleditaddr=true;
            	    this.editForm.id=item.id;
			        this.editForm.person=item.person;
			        this.editForm.phone=item.phone;
			        this.editForm.tel=item.tel;
			        this.editForm.selectedOptionsAddr=[item.receiveProvince,item.receiveCity,item.receiveDistrict];
			        this.editForm.address=item.address;
            },
                editaddr () {
                   setTimeout(() => {
                    this.loading = false;
                    this.$nextTick(() => {
                        this.loading = true;
		                this.$refs['editForm'].validate((valid) => {
							if (valid) {
									let temp=this.editForm;
									let id=temp.id;
									temp.receiveProvince=this.editForm.selectedOptionsAddr[0];
									temp.receiveCity=this.editForm.selectedOptionsAddr[1];
									temp.receiveDistrict=this.editForm.selectedOptionsAddr[2];
									delete temp['selectedOptionsAddr']
									delete temp['id']
									let para = Object.assign({}, temp);
										this.$axios({
									    method: 'post',
									    url:'/address/update?id='+id,
									    data:para,
										}).then((res)=>{
											this.modaleditaddr = false;
											this.$refs['editForm'].resetFields();
											this.getAddress();
											this.$Message.success('地址修改成功');
									});
							}
						});
                    });
                }, 2000);
            },
            getAddressOption(){
                this.$axios({
                    method: 'post',
                    url:'/common/address',
                }).then((res)=>{
                        this.addressOption=res;
                });
    	    },
       	    getAddress(){
       	    	if(this.$route.query.fromc=='secdetail'){
       	    		this.secShow=true;
       	    	}else{
       	    		this.secShow=false;
       	    	}
       	    	      	this.$axios({
						    method: 'post',
						    url:'/address',
						}).then((res)=>{
                             this.addressList=res;
						});
              },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            secAdd(item){
            	 localStorage.setItem("secaddress",JSON.stringify(item))
            	 //运费
            	 this.$router.push({name: '/secdetail',query:{skuId:this.$route.query.skuId}}) ;
            }
	      },
	      mounted(){
              this.getAddress();
              this.getAddressOption();
	      }
   }
</script>

<style lang="scss" scoped="scoped">
.icon-delete {
	float: right;
	cursor: pointer;
}
.account_address_wrap{
	background: #fff;
	padding: 20px;
}
.btn-add{
	cursor: pointer;
	display: inline-block;
    vertical-align: middle;
    color: #fff;
    font-weight: 700;
    padding: 0 14px;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    background: #0099ff;
    border:1px solid #0099ff;
    margin-bottom: 10px;
}
.address-list{
	li{
		border: 2px solid #e6e6e6;
	    margin: 0 0 10px;
	    padding: 10px;
	    cursor: pointer;
	    p{
	    	line-height: 22px;
	    	color:#333;
	    	span{
	    		width: 100px;
		text-align: right;
		display: inline-block;
		margin-right: 5px;
		color:#999
	    	}
	    .default{
			margin: 0 0 0 10px;
		    font-size: 12px;
		    background: #ffaa45;
		    padding: 2px;
		    color: #fff;
		    font-weight: 400;
		    color: #fff;
		    width: 56px;
		}
	    }
	}
	li:hover{
		background:#f9f9f9
	}
}

.opt{
	button{
		float: right;
		color:#0099ff;
	background: 0 none;
	border:0 none;
	cursor: pointer;
	margin-right: 15px;
	font-size: 14px;
	}
}
.opt .sec{
	float: left;
	border:1px solid #0099ff;
}
</style>
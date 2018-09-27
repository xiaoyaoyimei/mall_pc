<template>
	<div style="padding:40px;">
		<div class="myaccountImg">
			<img :src="userinfo.iconUrl | imgfilter" alt="">
			<div>
				<h2>HI {{userinfo.nickName}}</h2>
				<button @click="modalaccout=true">修改个人信息</button>
				<button @click="logout" style="margin-left: 20px;color:#333">退出登录</button>
			</div>
		</div>
		<div class="myaccountText">
			<p class="p">绑定手机：{{userinfo.customerMobile}}</p>
			<p class="p">密码设置：用于保护帐号信息和登录安全 <button><span  @click="modalpwd=true">修改</span> </button></p>
		</div>
		<div class="placeorderaddress">
			<h5>收货地址</h5>
			<ul class="myaccountaddress clearfix">
				<li class="default" v-for="(item,index) in addressList" :key="index">
					<h6 class="name">{{item.person}} <span class="active" v-if="item.isDefault=='Y'">默认地址</span></h6>
					<p class="phone">{{item.phone}}</p>
					<div class="address">{{item.receiveProvince}}{{item.receiveCity}}{{item.receiveDistrict}}{{item.address}}</div>
					<button class="addressedit" @click="editmodal(item)">修改</button>
					<button class="addressedel" @click="deleteAddr(item.id)">删除</button>
					<button class="addressemo" v-if="item.isDefault=='N'" @click="updateDefault(item.id)">设为默认</button>

				</li>
				<li>
					<div class="addaddress" @click="modaladdr=true">
						<div>+</div>
						<p>添加新地址</p>
					</div>
				</li>
			</ul>
		</div>

		<Modal v-model="modaladdr" title="新增收货地址" @on-ok="add" :loading="loading" :mask-closable='false' style="width:600px;">
            <Form :model="addForm" ref="addForm" label-position="left"  :rules="ruleValidate" style="padding: 15px;"> 
                <FormItem label="" prop="person" class="mdalText">
                    <Input v-model="addForm.person"  placeholder="收货人" autocomplete="off"></Input>
                </FormItem>
                <FormItem label="" prop="phone" class="mdalTextphone">
                    <Input v-model="addForm.phone"  placeholder="联系电话" autocomplete="off"></Input>
                </FormItem>
                <FormItem label=""  prop="selectedOptionsAddr">
                    <Cascader  v-model="addForm.selectedOptionsAddr" :data="addressOption"></Cascader>
                </FormItem>
                <FormItem label="" prop="address" class="modaladdress modaladdressaddr">
                    <Input v-model="addForm.address" placeholder="详细地址"></Input>
                </FormItem>
            </Form>
		</Modal>

		<Modal ref='modaleditaddr' v-model="modaleditaddr" title="编辑收货地址" @on-ok="editaddr" :loading="loading" style="width:600px;" :mask-closable='false'>
			<Form :model="editForm" ref="editForm" label-position="left" :rules="ruleValidate" style="padding: 15px;">
				<FormItem label="" prop="person" class="mdalText">
                    <Input v-model="editForm.person" placeholder="收货人"></Input>
                </FormItem>
                <FormItem label="" prop="phone" class="mdalTextphone">
                    <Input v-model="editForm.phone" placeholder="联系电话"></Input>
                </FormItem>
                <FormItem label=""  prop="selectedOptionsAddr">
                        <Cascader  v-model="editForm.selectedOptionsAddr" :data="addressOption"></Cascader>
                </FormItem>
                    <FormItem label="" prop="address" class="modaladdress modaladdressaddr">
                    <Input v-model="editForm.address" placeholder="详细地址"></Input>
                </FormItem>
			</Form>
		</Modal>

		<Modal ref='modalpwd' class="modalpwd" v-model="modalpwd" title="修改密码" @on-ok="handleOkpwd" :loading="loading" :mask-closable='false'>
			<Form ref="pwd" :model="pwd" :label-width="30" :rules="pwdValidate">
				<FormItem label="" prop="newpass">
					<i-input v-model="pwd.newpass" placeholder="请输入新密码" type="password"></i-input>
				</FormItem>
				<FormItem label="" prop="newpassagian">
					<i-input v-model="pwd.newpassagian" placeholder="请确认新密码" type="password"></i-input>
				</FormItem>
			</Form>
		</Modal>

		<Modal ref='modalaccout' v-model="modalaccout" title="修改个人信息" @on-ok="handleOk" class="modalaccout clearfix" :loading="loading" :mask-closable='false'>
			<Form ref="userinfo" :model="userinfo" :label-width="150">
				<FormItem label="设置头像" class="conWrap">
					<div class="user-con-wrap ">
						<div class="demo-upload-list" v-for="item in uploadList">
							<template v-if="item.status === 'finished'">
								<img :src="item.url |imgfilter " class="origin_tx" />
								<div class="demo-upload-list-cover">
									<Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
								</div>
							</template>
							<template v-else>
								<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
							</template>
						</div>
						<Upload ref="upload" :default-file-list="uploadList" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="5120" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" type="drag" :action="uploadUrl" style="display: inline-block;width:5.8rem;">
							<div style="width:5.8rem;height:5.8rem;line-height:5.8rem;">
								<Icon type="camera" size="20"></Icon>
							</div>
						</Upload>
					</div>
				</FormItem>
				<FormItem label="用户名:" prop="nickName">
					<i-input v-model="userinfo.nickName" placeholder="请输入用户名"></i-input>
				</FormItem>
				<FormItem label="生日:" prop="birthday">
						<DatePicker type="date" placeholder="Select date" :value="userinfo.birthday" formate="yyyy-MM-dd" @on-change="handleChange"></DatePicker>
				</FormItem>	
				<FormItem label="性别:" prop="sex">
					<radio-group v-model="userinfo.sex">
						<radio label="M">男</radio>
						<radio label="F">女</radio>
						<radio label="S">保密</radio>
					</radio-group>
				</FormItem>

			</Form>
		</Modal>
		<modal title="查看 头像大图" v-model="visible">
			<img :src="bigimg | imgfilter" v-if="visible" style="width: 100%">
		</modal>
	</div>
</template>

<script>
	import { validatePHONE } from '@/assets/js/validate';
	export default {
		data() {
			const validatePhone = (rule, value, callback) => {
				if(value.length < 0) {
					callback(new Error('手机号不能为空'));
				} else if(!validatePHONE(value)) {
					callback(new Error('请输入正确的手机号'));
				} else {
					callback();
				}
			};
			return {
				modalaccout: false,
				addressList: [],
				modaleditaddr: false,
				modaladdr: false,
				loading: true,
				addressOption: [],
				addForm: {
					person: '',
					phone: '',
					selectedOptionsAddr: [],
					address: '',
					tel: '',
				},
				editForm: {
					person: '',
					phone: '',
					selectedOptionsAddr: [],
					address: '',
					tel: '',
				},
				ruleValidate: {
					selectedOptionsAddr: [{
						required: true,
						type: 'array',
						message: '请选择省市区',
						trigger: 'change'
					}],
					address: [{
						required: true,
						message: '详细地址不能为空',
						trigger: 'blur'
					}],
					person: [{
						required: true,
						message: '姓名不能为空',
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						validator: validatePhone,
						trigger: 'blur'
					}, ],

				},
				//修改密码
				modalpwd: false,
				pwdloading: false,
				pwd: {
					newpass: '',
					newpassagian: '',
				},
				pwdValidate: {
					newpass: [{
							required: true,
							message: '请输入新密码',
							trigger: 'blur'
						},
						{
							type: 'string',
							min: 6,
							message: '新密码不能少于6位',
							trigger: 'blur'
						}
					],
					newpassagian: [{
							required: true,
							message: '请输入确认密码',
							trigger: 'blur'
						},
						{
							type: 'string',
							min: 6,
							message: '确认密码不能少于6位',
							trigger: 'blur'
						}
					],

				},
				visible: false,
				loading: false,
				uploadList: [{
					'url': ''
				}],
				uploadUrl: this.$axios.defaults.baseURL + '/upload/upload?path=account',
				imgSrc: '',
				userinfo: {
					birthday: '',
					sex: '',
					nickName: '',
					iconUrl: '',
					customerMobile: ''
				},
			}
		},
		methods: {
			//退出登录
				logout: function () {
				var _this = this;
				   this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认退出吗?</p>',
                    onOk: () => {
		                    this.$axios({
							    method: 'post',
							    url:'/customer/logout',
							}).then((res)=>{
								     if (res.code !== 200) {
				                 		 this.$Message.error(res.msg);
				              		} 
				              		else{
										sessionStorage.removeItem('token');
				                       	sessionStorage.removeItem('userId');
				    					_this.$router.push('/login');
			    					}
							});
		                       
                    },
                    onCancel: () => {
                        this.$Message.info('取消退出');
                    }
                });
			},
			      	//设为默认
       	   updateDefault(value){
       	   	this.$axios({
						    method: 'post',
						    url:'/address/updateDefault?id='+value+'&isDefault=Y',
						}).then((res)=>{
								this.getAddress();
						})
       	   },
			//修改密码
			handleOkpwd() {
				this.loading = false
				if(this.pwd.newpass != this.pwd.newpassagian) {
					this.$Message.error('两次密码不一致,请重新输入');
					return;
				}
				this.$refs['pwd'].validate((valid) => {
					if(valid) {
						this.loading = true
						this.$axios({
							method: 'post',
							url: '/customer/update/password?password=' + this.pwd.newpass,
						}).then((res) => {
							if(res.code == '200') {
								this.$Message.success('密码修改成功');
								this.loading = false
							}
						});
					}
				})
			},
			//新增地址
			add() {
				setTimeout(() => {
					this.loading = false;
					this.$nextTick(() => {
						this.loading = true;
						this.$refs['addForm'].validate((valid) => {
							if(valid) {
								let temp = this.addForm;
								temp.receiveProvince = this.addForm.selectedOptionsAddr[0];
								temp.receiveCity = this.addForm.selectedOptionsAddr[1];
								temp.receiveDistrict = this.addForm.selectedOptionsAddr[2];
								delete temp['selectedOptionsAddr']
								let para = Object.assign({}, temp);
								this.$axios({
									method: 'post',
									url: '/address/insert',
									data: para,
								}).then((res) => {
									if(res.code == '200') {
										this.modaladdr = false;
										this.$refs['addForm'].resetFields();
										this.getAddress();
										this.$Message.success('新增成功');
									} else if(res.code == '401') {
										this.$Message.error(res.msg);
										return;
									} else {
										this.$Message.error(res.msg);
										return;
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
							url: '/address/delete?id=' + value + '',
						}).then((res) => {
							if(res.code == '200') {
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
			editmodal(item) {
				this.modaleditaddr = true;
				this.editForm.id = item.id;
				this.editForm.person = item.person;
				this.editForm.phone = item.phone;
				this.editForm.tel = item.tel;
				this.editForm.selectedOptionsAddr = [item.receiveProvince, item.receiveCity, item.receiveDistrict];
				this.editForm.address = item.address;
			},
			editaddr() {
				setTimeout(() => {
					this.loading = false;
					this.$nextTick(() => {
						this.loading = true;
						this.$refs['editForm'].validate((valid) => {
							if(valid) {
								let temp = this.editForm;
								let id = temp.id;
								temp.receiveProvince = this.editForm.selectedOptionsAddr[0];
								temp.receiveCity = this.editForm.selectedOptionsAddr[1];
								temp.receiveDistrict = this.editForm.selectedOptionsAddr[2];
								delete temp['selectedOptionsAddr']
								delete temp['id']
								let para = Object.assign({}, temp);
								this.$axios({
									method: 'post',
									url: '/address/update?id=' + id,
									data: para,
								}).then((res) => {
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
			getAddressOption() {
				this.$axios({
					method: 'post',
					url: '/common/address',
				}).then((res) => {
					this.addressOption = res;
				});
			},
			getAddress() {
				if(this.$route.query.fromc == 'secdetail') {
					this.secShow = true;
				} else {
					this.secShow = false;
				}
				this.$axios({
					method: 'post',
					url: '/address',
				}).then((res) => {
					this.addressList = res;
				});
			},
			handleView(item) {
				this.bigimg = item.url;
				this.visible = true;
			},
			handleChange(date) {
				this.userinfo.birthday = date;
			},
			handleFormatError(file) {
				this.$Notice.warning({
					title: '文件格式不符要求',
					desc: '该 ' + file.name + ' 文件不正确, 请选择 .jpg 或者.png文件'
				});
			},
			handleMaxSize(file) {
				this.$Notice.warning({
					title: '文件过大',
					desc: '该  ' + file.name + ' 文件过大, 请小于 5M.'
				});
			},
			//获取个人信息
			getUser() {
				this.$axios({
					method: 'post',
					url: '/account',
				}).then((res) => {
					this.userinfo = Object.assign({}, res);
					this.uploadList[0].url = this.userinfo.iconUrl;
				});
			},
			//上传图片
			handleSuccess(res) {
				if(res.code == '200') {
					this.uploadList[0].url = res.msg
				}
			},
			handleOk() {
				this.$refs['userinfo'].validate((valid) => {
					if(valid) {
						this.loading = true
						this.$axios({
							method: 'post',
							url: '/account/update',
							data: {
								"birthday": this.userinfo.birthday,
								"sex": this.userinfo.sex,
								"nickName": this.userinfo.nickName,
								"iconUrl": this.uploadList[0].url
							}
						}).then((res) => {
							if(res.code == '200') {
								this.$Message.success('个人信息修改成功');
								this.loading = false;
								this.getUser();
							}
						});
					}
				})
			},
		},
		mounted() {
			this.getUser(),
				this.getAddressOption();
			this.getAddress();
		}
	}
</script>

<style scoped="scoped">
	.myaccountImg {
		margin-top: 10px;
		padding-bottom: 57px;
		border-bottom: #c6c6c6 1px solid;
	}
	
	.myaccountImg img {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		border: 1px solid #c6c6c6;
		vertical-align: middle;
	}
	
	.myaccountImg div {
		display: inline-block;
		margin-left: 35px;
		position: relative;
		top: 15px;
	}
	
	.myaccountImg h2 {
		font-weight: 400;
		font-size: 24px;
		color: #333333;
	}
	
	.myaccountImg button {
		font-weight: 400;
		font-size: 14px;
		color: #FF0000;
		line-height: 16px;
		border: none;
		background-color: #ffffff;
		margin-top: 10px;
	}
	
	.new .p {
		font-weight: 400;
		font-size: 14px;
		color: #666666;
		line-height: 48px;
		margin-bottom: 0px;
	}
	
	.new .p button {
		float: right;
		width: 50%;
		text-align: left;
		border: none;
		background-color: #ffffff;
	}
	
	.p span {
		display: inline-block;
		width: 124px;
		height: 31px;
		text-align: center;
		line-height: 31px;
		background-color: #f0f0f0;
		border: 1PX solid #c6c6c6;
	}
	
	.red span {
		color: #FF0000;
		background-color: #ffffff;
		border: 1PX solid #FF0000;
	}
	
	.new .newcenterbody .p:hover {
		color: #666666;
	}
	
	.myaccountText {
		margin-top: 35px;
		padding-bottom: 35px;
		border-bottom: 1px solid #c6c6c6;
		margin-bottom: 53px;
	}
	
	.myaccountaddress {
		padding-top: 0px;
	}
	
	.myaccountaddress li {
		margin-right: 30px;
	}
	/*地址*/
	
	.placeorderaddress h5 {
		font-size: 18px;
		width: 73px;
		height: 24px;
		font-weight: 300;
		margin-bottom: 20px;
	}
	
	.placeorderaddress .default {
		border: 1px solid #FF0000;
	}
	span.active{
		    font-size: 12px;
    color: #0099ff;
    font-weight: bold;
	}
	.placeorderaddress li {
		float: left;
		width: 250px;
		margin-right: 15px;
		border: 1px solid #999999;
		height: 210px;
		position: relative;
		margin-bottom: 25px;
	}
	
	.placeorderaddress li .name {
		font-size: 18px;
		padding-top: 35px;
		padding-left: 25px;
		font-weight: 300;
	}
	
	.placeorderaddress li .phone {
		padding-top: 20px;
		padding-left: 25px;
	}
	
	.placeorderaddress .address {
		padding-left: 25px;
		overflow: hidden;
		max-height: 55px;
		padding-right: 25px;
	}
	
	.placeorderaddress .addressedit {
		position: absolute;
		bottom: 5px;
		right: 0px;
		width: 50px;
		border: none;
		background-color: #fff;
		color: #ff0000;
	}
	.placeorderaddress .addressedel{
		position: absolute;
		bottom: 5px;
		right: 50px;
		width: 50px;
		border: none;
		background-color: #fff;
		color: #ff0000;
	}
	.placeorderaddress .addressemo{
		position: absolute;
		bottom: 5px;
		right: 100px;
		width: 50px;
		border: none;
		background-color: #fff;
		color: #ff0000;
	}
	.placeorderaddress .addaddress {
		width: 60%;
		margin: 80px auto;
		cursor: pointer;
	}
	
	.placeorderTable .placeorderspan {
		position: relative;
		top: 15px;
		display: inline-block;
		height: 40px;
		width: 300px;
		overflow: hidden;
	}
	
	.placeorderaddress .addaddress div {
		background-color: #c6c6c6;
		width: 33px;
		height: 33px;
		margin: 0 auto;
		border-radius: 50%;
		text-align: center;
		line-height: 28px;
		font-weight: 700;
		font-style: normal;
		font-size: 30px;
		color: #FFFFFF;
	}
	
	.placeorderaddress .addaddress p {
		font-weight: 400;
		font-size: 18px;
		color: #999999;
		text-align: center;
	}
	 .mdalText{
		display: inline-block;
		width: 260px;
		margin-right: 10px;
		height: 45px;
		line-height: 45px;   
	}
	.mdalTextphone{
		display: inline-block;
		width: 260px;
		height: 45px;
		line-height: 45px;  
	}
	.modaladdress{
		height: 45px;
		line-height: 45px;
		width: 535px;
		margin-top: 15px;
	}
	.modaladdressaddr{
		height: 90px;
		line-height: 90px;
	}
	.modalFoot{
		height: 90px;
		background-color: #F2F2F2;
		padding: 0px 25px;
		width: 100%;
		text-align: center;
	}
	.conWrap{
		position: relative;
		width: 120px!important;
		height: 150px!important;
		float: left!important;
	}
	.origin_tx{
		width: 107px;
		height: 107px;
		border-radius: 50%;
		
	}
</style>
<style>
.ivu-modal-header-inner{
    font-size: 18px;
    font-weight: 400;
    color: #000000;
    padding-left: 25px;
    height:60px;
    line-height: 60px;

}
.ivu-modal-close .ivu-icon-ios-close-empty{
    color: #000000;
    font-weight: 900;
}
.ivu-modal-header {
    height:60px;
    line-height: 60px;
    width: 100%;
    background-color: #F2F2F2;
    padding: 0px;
}
.ivu-input{
    height: 45px;
    line-height: 45px;
    border: 1px solid #cccccc;
    border-radius: 0px;
}
.modaladdressaddr .ivu-input{
    height: 90px;
    line-height: 90px;
    border-radius: 0px;
}
.ivu-modal{
    width: 600px!important;
}
.ivu-modal-footer{
    height: 90px;
    background-color: #F2F2F2;
    padding: 0px 25px;
    width: 100%;
    text-align: center;
}
.ivu-btn-text{
    margin-top: 20px;
    margin-right: 15px;
    padding: 10px 50px;
    color: #FFFFFF;
    border: none;
    background-color: #888888;
    border-radius: 0px;
}
.ivu-btn-primary{
    background-color: #ff0000;
    margin-top: 20px;
    margin-right: 15px;
    padding: 10px 50px;
    color: #FFFFFF;
    border: none;
    border-radius: 0px;
}
.modalaccout .ivu-modal-header{
	display: none;
}

.modalaccout .ivu-modal-close{
	width: 34px;
	height: 33px;
	font-weight: 700;
	font-size: 14px;
	color: #999999;
	 border-radius: 50%;
	 background-color:#f0f0f0;
	 text-align:center;
}
.conWrap .ivu-upload{
	position: absolute ;
	top:0px;
	left:0px;
	width:107px;
	height:107px;
	opacity: 0;
}
.conWrap .ivu-form-item-content{
}
.conWrap  .ivu-form-item-label{
	position: absolute;
	bottom:0px;
	width:100%;
	left:0px;
	text-align:center;
	font-size: 14px;
	color: #333333;
	font-weight: 400;
}
.conWrap .demo-upload-list-cover{
	display: none;

}
.modalaccout .ivu-form-item {
    float: right;
    width: 400px;
}
.modalaccout .ivu-modal-body{
	height: 300px;
	padding:100px 30px;
}
.conWrap .ivu-form-item-label{
	width:107px!important;
}
.conWrap .ivu-form-item-content{
	margin-left:0px!important;
}
.modalaccout .ivu-modal-footer{
	background-color:#fff;
	border-top: none;
	padding:0px;
	border-radius:6px;
}
.modalaccout .ivu-date-picker{
	width:250px;
}
.modalaccout .ivu-btn-text, .modalpwd .ivu-btn-text{
	display: none;
}

.modalpwd .ivu-modal-header{
	height: 50px;
	background-color:#fff;
	border-bottom: none;
	border-radius:6px;
}
.modalpwd .ivu-modal-footer{
	background-color:#fff;
	border-top: none;
	padding:0px;
	border-radius:6px;
	text-align:left;
	padding-left:30px;
	height:50px;
}
.modalpwd .ivu-modal-header-inner{
	padding:0px 54px 0px;
	height: 50px;
	font-size: 24px;
	color: #999999;
}
.modalpwd .ivu-modal-content{
	padding:50px;
}
.modalpwd .ivu-modal-close{
	width: 34px;
	height: 33px;
	font-weight: 700;
	font-size: 14px;
	color: #999999;
	 border-radius: 50%;
	 background-color:#f0f0f0;
	 text-align:center;
}
.modalpwd  .ivu-modal-body{
	padding-bottom:0px;
}
.modalpwd .ivu-btn-primary{
	margin-top:0px;
	margin-left:16px;
}
</style>

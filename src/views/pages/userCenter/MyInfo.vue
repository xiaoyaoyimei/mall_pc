<template>
	<div>
		<div class="myaccountImg">
			<img :src="userinfo.iconUrl | imgfilter" alt="">
			<div>
				<h2>HI {{userinfo.nickName}}</h2>
				<button @click="modalaccout=true">修改个人信息</button>
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
					<h6 class="name">{{item.person}} <span class="default" v-if="item.isDefault=='Y'">默认地址</span></h6>
					<p class="phone">{{item.phone}}</p>
					<div class="address">{{item.receiveProvince}}{{item.receiveCity}}{{item.receiveDistrict}}{{item.address}}</div>
					<button class="addressedit" @click="editmodal(item)">修改</button>
					<button @click="deleteAddr(item.id)">删除</button>
					<button v-if="item.isDefault=='N'" @click="updateDefault(item.id)">设为默认</button>

				</li>
				<li>
					<div class="addaddress" @click="modaladdr=true">
						<div>+</div>
						<p>添加新地址</p>
					</div>
				</li>
			</ul>
		</div>

		<Modal v-model="modaladdr" title="新增收货地址" @on-ok="add" :loading="loading" :mask-closable='false'>
			<Form :model="addForm" ref="addForm" label-position="left" :label-width="100" :rules="ruleValidate" class="P15">
				<FormItem label="收货人" prop="person">
					<Input v-model="addForm.person" placeholder="收货人" autocomplete="off"></Input>
				</FormItem>
				<FormItem label="手机号" prop="phone">
					<Input v-model="addForm.phone" placeholder="手机号" autocomplete="off"></Input>
				</FormItem>
				<FormItem label="固定电话">
					<Input v-model="addForm.tel" placeholder="固定电话" autocomplete="off"></Input>
				</FormItem>
				<FormItem label="所在地区" prop="selectedOptionsAddr">
					<Cascader v-model="addForm.selectedOptionsAddr" :data="addressOption"></Cascader>
				</FormItem>
				<FormItem label="详细地址" prop="address">
					<Input v-model="addForm.address" placeholder="详细地址"></Input>
				</FormItem>
			</Form>
		</Modal>

		<Modal ref='modaleditaddr' v-model="modaleditaddr" title="编辑收货地址" @on-ok="editaddr" :loading="loading" :mask-closable='false'>
			<Form :model="editForm" ref="editForm" label-position="left" :label-width="100" :rules="ruleValidate" class="P15">
				<FormItem label="收货人" prop="person">
					<Input v-model="editForm.person" placeholder="收货人"></Input>
				</FormItem>
				<FormItem label="手机号" prop="phone">
					<Input v-model="editForm.phone" placeholder="手机号"></Input>
				</FormItem>
				<FormItem label="固定电话">
					<Input v-model="editForm.tel" placeholder="固定电话"></Input>
				</FormItem>
				<FormItem label="所在地区" prop="selectedOptionsAddr">
					<Cascader v-model="editForm.selectedOptionsAddr" :data="addressOption"></Cascader>
				</FormItem>
				<FormItem label="详细地址" prop="address">
					<Input v-model="editForm.address" placeholder="详细地址"></Input>
				</FormItem>
			</Form>
		</Modal>

		<Modal ref='modalpwd' v-model="modalpwd" title="修改密码" @on-ok="handleOkpwd" :loading="loading" :mask-closable='false'>
			<Form ref="pwd" :model="pwd" :label-width="150" :rules="pwdValidate">
				<FormItem label="新密码:" prop="newpass">
					<i-input v-model="pwd.newpass" placeholder="请输入新密码" type="password"></i-input>
				</FormItem>
				<FormItem label="确认密码:" prop="newpassagian">
					<i-input v-model="pwd.newpassagian" placeholder="请确认新密码" type="password"></i-input>
				</FormItem>
			</Form>
		</Modal>

		<Modal ref='modalaccout' v-model="modalaccout" title="修改个人信息" @on-ok="handleOk" :loading="loading" :mask-closable='false'>
			<Form ref="userinfo" :model="userinfo" :label-width="150">
				<FormItem label="当前头像 :">
					<div class="user-con-wrap">
						<div class="demo-upload-list" v-for="item in uploadList">
							<template v-if="item.status === 'finished'">
								<img :src="item.url  " class="origin_tx" />
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
				<FormItem label="性别:" prop="sex">
					<radio-group v-model="userinfo.sex">
						<radio label="M">男</radio>
						<radio label="F">女</radio>
						<radio label="S">保密</radio>
					</radio-group>
				</FormItem>
				<FormItem label="出生日期:">
					<FormItem prop="birthday">
						<DatePicker type="date" placeholder="Select date" :value="userinfo.birthday" formate="yyyy-MM-dd" @on-change="handleChange"></DatePicker>
					</FormItem>
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
					this.uploadList[0].url = this.global_.imgurl+this.userinfo.iconUrl;
				});
			},
			//上传图片
			handleSuccess(res) {
				if(res.code == '200') {
					this.uploadList[0].url = this.global_.imgurl + res.msg
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
								this.loading = false
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
</style>
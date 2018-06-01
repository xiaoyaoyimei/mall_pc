<template>
		<div class="order">
			<div class="C_personInfo">
				<Form ref="userinfo" :model="userinfo" :rules="ruleValidate" :label-width="80">
					<div class="C_deListTit"><span>更多个人信息</span><span class="fr C_xiugai">修改个人信息</span></div>
					<FormItem label="当前头像 ：" class="iconUrl" prop="iconUrl">
						 <Upload
							ref="upload"
							:show-upload-list="false"
							:on-success="handleSuccess"
							:format="['jpg','jpeg','png']"
							:max-size="2048"
							:on-format-error="handleFormatError"
							:on-exceeded-size="handleMaxSize"
							multiple
							type="drag"
						:action="uploadUrl"
							 style="width:100px;height:100px;" >
							<Row class="series1">
								<Col span="15"><img style="width:100px;height:100px;margin-left:0px;"  :src="imgSrc" ></Col>
								<Col span="6"><Button class='btn' type="ghost" icon="ios-cloud-upload-outline">选择头像</Button></Col>
							</Row>  
						</Upload>
					</FormItem>
					<FormItem label="用户名:" prop="nickName">
						<i-input v-model="userinfo.nickName" style="max-width:200px;" placeholder="请输入姓名"></i-input>
					</FormItem>
					<FormItem label="性别:" prop="sex">
						<radio-group v-model="userinfo.sex">
							<radio label="M">男</radio>
							<radio label="F">女</radio>
						</radio-group>
					</FormItem>					
					<FormItem label="出生日期:">
						<Row>
							<i-col span="3">
								<FormItem prop="birthday">
									<DatePicker  type="date" confirm placeholder="选择日期"   v-model="userinfo.birthday"></DatePicker >
								</FormItem>
							</i-col>
						</Row>
					</FormItem>
					<FormItem>
						<i-button type="primary" @click="handleOk('userinfo')">提交</i-button>
						<i-button type="ghost" @click="handleReset('userinfo')" style="margin-left: 8px">重置</i-button>
					</FormItem>
				</Form>
			</div>
		</div>
</template>

<script>
		export default {
	    data () {
	        return {
				imageSrc:this.global_.imgurl,
				uploadUrl:this.$axios.defaults.baseURL+'upload/upload?path=accout',
				imgSrc:'',
				show:true,
				userinfo: {
                    birthday: '',
                    sex: '',
                    nickName: '',
                    iconUrl: '',
                },
				ruleValidate: {
                    nickName: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    birthday: [
                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
				}
			}
	      },
	      methods:{
			handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不符要求',
                    desc: '该 ' + file.name + ' 文件不正确, 请选择 .jpg 或者.png文件'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '文件过大',
                    desc: '该  ' + file.name + ' 文件过大, 请小于 2M.'
                });
            },
          	handleSuccess(res){
            	if(res.code == '200'){
					this.iconUrl=this.imageSrc + res.msg;
					console.log(iconUrl);
              	}          
          	},
          	handlePhoto(){
          		let self=this;
            	this.fang_.editUser(self,{"iconUrl":this.iconUrl});
          	},
	       	xshow(){
	      		this.show=!this.show;
	      	},
	      	getUser(){
	      		this.$axios({
					method: 'post',
					url:'/account',
				}).then((res)=>{
					this.userinfo = Object.assign({},res);
					this.imgSrc = this.userinfo.iconUrl ;
				});
	      	},
	      	 handleChange(date) {
                this.userinfo.birthday = date;
            },
	      	//日期插件事件
	      	 handleClick() {
                this.open = !this.open;
            },
	      	   handleClear() {
                this.open = false;
                  this.show=!this.show;
            },
			handleSuccess(res){
            if(res.code == '200'){
				this.userinfo.iconUrl=res.msg;
				this.imgSrc=  res.msg
              }          
          	},
            handleOk(name) {
            	this.$refs[name].validate((valid) => {
                    if (valid) {
						let s = JSON.stringify(this.userinfo.birthday);
						 let indexOf1 = s.split('T');
						 this.userinfo.birthday = indexOf1[0].replace('\"',"");
						 let temp=this.userinfo;
						alert(JSON.stringify(temp))
            	      	this.$axios({
						    method: 'post',
						    url:'/account/update',
						    data:{"birthday":temp.birthday,"sex":this.userinfo.sex,"nickName":this.userinfo.nickName,"iconUrl":this.userinfo.iconUrl}
						}).then((res)=>{
							if(res.code=='200'){
							 this.$Message.success('修改成功');
							  this.show=!this.show;
							}
						});
                this.open = false;
					}else{
					console.log('1')
					}

            })
		  },
		},
	      mounted(){
	      	this.getUser()
	      }
	}

</script>

<style>
.order{
    width: 100%;
    max-width: 1100px;
    min-height: 900px;
    margin: 0 auto;
}
.layout {
    background-color: #f4f4f4!important;
}
.iconUrl{
	position: relative;
}
.iconUrl .btn{
	opacity: 0;
	width: 100px;
	height: 100px;
	position: absolute;
	top: 0px;
	left: -70px;
}
.series1 img{
	margin-left:1rem;
  width:6.2rem;
}
.ivu-upload-drag{
	line-height: 0px;
}
table{
	border-collapse: collapse;
}
table input{
	border:none;
}
.C_deListTit {
	border-bottom: 1px solid #e7e7e7;
	line-height: 36px;
	margin-bottom: 10px;
	font-size: 14px;
	font-weight: 900;
	max-width: 926px;
}
.C_changePass {
	margin-bottom: 30px;
}
.C_xiugai {
  display: inline-block;
  background: url(../../../assets/img/spring1.png) no-repeat -236px -17px;
  width: 113px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
.fr{
	float:right;
}
.C_xiugai:hover {
  background: url(../../../assets/img/spring1.png) no-repeat -236px -59px;
  color: #fff;
}
</style>
<template>
		<div class="order">
			<div class="C_personInfo">
				<form action="" class="C_pInfoSub">
					<div class="C_changePass" >
						<div class="C_deListTit"><span>账号密码</span><span class="fr C_xiugai">修改密码</span></div>
							<table >
								<tr>
									<td class="C_tdFis"><i class="red">*</i>当前密码:</td>
									<td class="C_tdSec"><input id="pre_password" name="pre_password" type="password"><span id="pre_passwordmsg"  ></span></td>
								</tr>
								<tr>
									<td class="C_tdFis"><i class="red">*</i>新密码:</td>
									<td  class="C_tdSec"><input id="password" name="password" type="password"><span id="passwordmsg"  ></span></td>
								</tr>
								<tr>
									<td class="C_tdFis"><i class="red">*</i>确认新密码:</td>
									<td  class="C_tdSec"><input id="re_password" name="re_password" type="password"><span id="re_passwordmsg" ></span></td>
								</tr>
						</table>
						<button type="button" id="submitpassword" class="C_tijiao">提交</button>
					</div>
				</form>
				<i-form v-ref:form-validate :model="formValidate" :rules="ruleValidate" :label-width="80">
					<div class="C_deListTit"><span>更多个人信息</span><span class="fr C_xiugai">修改个人信息</span></div>
					<Form-item label="当前头像 ：" class="iconUrl" prop="iconUrl">
						 <Upload
							:action="uploadUrl"
							:on-success="handleSuccess"
							:show-upload-list='false' >
							<Row class="series1">
								<Col span="15"><img  src="../../../assets/img/setting.png"></Col>
								<Col span="6"><Button class='btn' type="ghost" icon="ios-cloud-upload-outline">选择头像</Button></Col>
							</Row>  
						</Upload>
					</Form-item>
					<Form-item label="用户名 ：" prop="name">
						<i-input :value.sync="formValidate.name" placeholder="请输入姓名"></i-input>
					</Form-item>
					<Form-item label="性别" prop="gender">
						<Radio-group :model.sync="formValidate.gender">
							<Radio value="male">男</Radio>
							<Radio value="female">女</Radio>
						</Radio-group>
					</Form-item>					
					<Form-item label="出生日期 ：">
						<Row>
							<i-col span="3">
								<Form-item prop="date">
									<Date-picker type="date" placeholder="选择日期" :value.sync="formValidate.date"></Date-picker>
								</Form-item>
							</i-col>
							<i-col span="1" style="text-align: center">-</i-col>
							<i-col span="3">
								<Form-item prop="time">
									<Time-picker type="time" placeholder="选择时间" :value.sync="formValidate.time"></Time-picker>
								</Form-item>
							</i-col>
						</Row>
					</Form-item>
					<Form-item>
						<i-button type="primary" @click="handleSubmit('formValidate')">提交</i-button>
						<i-button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</i-button>
					</Form-item>
				</i-form>
			</div>
		</div>
</template>

<script>
		export default {
	    data () {
	        return {
	        	userinfo:{
	        		birthday: "",
					sex: "",
					nickName: "",
					iconUrl: "",
					},
				imageSrc:this.global_.imgurl,
                uploadUrl:this.$axios.defaults.baseURL+'upload/upload?path=accout',
				show:true,
				formValidate: {
                    name: '',
                    gender: '',
                    date: '',
                    time: '',
                },
				ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],

                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
                    ],
				}
			}
	      },
	      methods:{
	       xshow(){
	      		this.show=!this.show;
	      	},
	      	getUser(){
	      				this.$axios({
					    method: 'post',
					    url:'/account',
					}).then((res)=>{
						this.userinfo = Object.assign({},res.data);
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
                this.userinfo.iconUrl=this.imageSrc + res.msg;
              }          
          	},
            handleOk() {
            	let self=this;
            	      	this.$axios({
						    method: 'post',
						    url:'/account/update',
						    data:{'birthday':this.userinfo.birthday}
						}).then((res)=>{
							if(res.data.code=='200'){
							 this.$Message.success('修改成功');
							  this.show=!this.show;
							}
						});
                this.open = false;
               
            }
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
	top: 15px;
	left: -70px;
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
.C_tijiao {
  margin-left: 820px;
  margin-top: 10px;
  width: 80px;
  height: 32px;
  background-color: rgba(212, 0, 0, 0.8);
  color: #fff;
  cursor: pointer;
  line-height: 32px;
  font-size: 14px;
}
.C_changePass table {
	margin-left: 326px;
}
.C_changePass table tr {
	margin-top: 6px;
}
.C_tdFis {
	text-align: right;
	padding-right: 10px;
}
.C_tdSec input {
	width: 200px;
	height: 28px;
	border: 1px solid #e7e7e7;
}
.C_moreInfo td,
.C_bseInfo td {
	border: 1px solid #9c9999;
}
.C_moreInfo,
.C_bseInfo {
	margin-bottom: 16px;
}
.C_customMask {
  border: 1px solid #CBCBCB;
  margin-top: 16px;
  border-radius: 2px;
  min-width: 986px;
}
.C_customMask .customMask {
  background-color: #EFEFEF;
}
.C_customMask .customMask .C_maskGame {
  border-top: 1px solid #CBCBCB;
}
.C_customMask .customMask > div .C_maskFir {
  font-size: 16px;
  font-weight: 900;
  margin-left: 16px;
}
.C_customMask .customMask > div > div {
  padding: 0 10px;
  display: inline-block;
  height: 48px;
  line-height: 48px;
}
.C_customMask .customMask > div > div input {
  vertical-align: middle;
  margin: 0 4px;
}
.C_customMask .customMask > div > div span {
  font-size: 14px;
  vertical-align: middle;
}
</style>
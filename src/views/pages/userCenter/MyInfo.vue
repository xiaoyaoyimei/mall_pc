<template>
		<div class="order">
			<div class="order_h2">个人信息</div>
				<Form ref="userinfo" :model="userinfo"  :label-width="150">
					<FormItem label="当前头像 :">
						<div class="user-con-wrap">
						    <div class="demo-upload-list" v-for="item in uploadList">
						        <template v-if="item.status === 'finished'">
						            <img :src="item.url|imgfilter"  class="origin_tx"/>
						            <div class="demo-upload-list-cover">
						                <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
						            </div>
						        </template>
						        <template v-else>
						            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
						        </template>
						    </div>
						    <Upload
						        ref="upload"
						         :default-file-list="uploadList"
						        :show-upload-list="false"
						        :on-success="handleSuccess"
						        :format="['jpg','jpeg','png']"
						        :max-size="5120"
						        :on-format-error="handleFormatError"
						        :on-exceeded-size="handleMaxSize"
						        type="drag"
						        :action="uploadUrl"
						         style="display: inline-block;width:5.8rem;">
						        <div style="width:5.8rem;height:5.8rem;line-height:5.8rem;">
						            <Icon type="camera" size="20"></Icon>
						        </div>
						    </Upload> 
						</div>
					</FormItem>
					<FormItem label="用户名:" prop="nickName">
						<i-input v-model="userinfo.nickName" style="max-width:200px;" placeholder="请输入用户名"></i-input>
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
										<DatePicker type="date" placeholder="Select date" style="width: 200px" :value="userinfo.birthday" formate="yyyy-MM-dd"   @on-change="handleChange"></DatePicker>
								</FormItem>
					</FormItem>
					<FormItem>
						<i-button type="primary" @click="handleOk('userinfo')" :loading="loading">提交</i-button>
					</FormItem>
				</Form>
				    <modal title="查看 头像大图" v-model="visible">
       				 <img :src="bigimg | imgfilter" v-if="visible" style="width: 100%">
   			 </modal>
		</div>
</template>

<script>
		export default {
	    data () {
	        return {
	        	loading:false,
	        	visible: false,
	        	uploadList: [
	        	 {'url':''}
	        	 ],
				uploadUrl:this.$axios.defaults.baseURL+'upload/upload?path=accout',
				imgSrc:'',
				userinfo: {
                    birthday: '',
                    sex: '',
                    nickName: '',
                },
			}
	      },
	      methods:{
	      	handleView (item) {
                this.bigimg = item.url;
                this.visible = true;
            },
			handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不符要求',
                    desc: '该 ' + file.name + ' 文件不正确, 请选择 .jpg 或者.png文件'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '文件过大',
                    desc: '该  ' + file.name + ' 文件过大, 请小于 5M.'
                });
            },
            //获取个人信息
	      	getUser(){
	      		this.$axios({
					method: 'post',
					url:'/account',
				}).then((res)=>{
					this.userinfo = Object.assign({},res);
					this.uploadList[0].url = this.userinfo.iconUrl;
				});
	      	},
	      	 handleChange(date) {
                this.userinfo.birthday = date;
            },
            //上传图片
			handleSuccess(res){
            if(res.code == '200'){
				this.uploadList[0].url=res.msg
              }          
          	},
            handleOk(name) {
            	this.$refs[name].validate((valid) => {
                    if (valid) {
                    	this.loading=true
            	      	this.$axios({
						    method: 'post',
						    url:'/account/update',
						    data:{"birthday": this.userinfo.birthday,"sex":this.userinfo.sex,"nickName":this.userinfo.nickName,"iconUrl":this.uploadList[0].url}
						}).then((res)=>{
							if(res.code=='200'){
							 this.$Message.success('个人信息修改成功');
							 this.loading=false
							}
						});
					}
                })
		 	 },
		},
	      mounted(){
	      	this.getUser()
	      }
	}

</script>

<style scoped="scoped">
	.order{
		background: #fff;
		padding: 20px;
	}
.order_h2{
	font-size: 20px;
font-weight: normal;
margin-bottom: 20px;
}
    .demo-upload-list{
        display: inline-block;
        width:92px;
        height: 92px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
<template>
    <div>
        <div class="tousu">
                <Form ref="tousuForm" class="form" :model="tousuForm" label-position="left" :label-width="100" :rules="ruleInline" inline>
                <h4>投诉建议</h4>
                <p>对于您给的支持和帮助，深表感谢</p>
                <FormItem label="姓名:" class="formitem" prop="userId">
                <input type="text" placeholder="" class="input" v-model="tousuForm.userId">
                	</FormItem>
                <FormItem label="手机号:" class="formitem" prop="mobile">
                    <input type="text" class="input" placeholder=""  v-model="tousuForm.mobile">
                </FormItem>
                <FormItem label="问题描述:" class="formitem" prop="content">
                    <textarea   type="textarea" rows='5' cols="100"  placeholder=""  v-model="tousuForm.content"></textarea>
                </FormItem>
                <FormItem label="上传图片:" class="formitem" >
                    <div>
                    <div class="demo-upload-list" style="width:260px;text-align:left" v-for="item in uploadList">
                        <template v-if="item.status === 'finished'">
                            <img width="50px;" :src="item.url  | imgfilter">
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                    </div>
                    <Upload ref="evaupload" :show-upload-list="false" 
                        :default-file-list="defaultList" 
                        :on-success="evauploadhandleSuccess" :format="['jpg','jpeg','png']" 
                        :max-size="2048" :on-format-error="handleFormatError" 
                        :on-exceeded-size="handleMaxSize" 
                        :before-upload="evahandleBeforeUpload" multiple type="drag" :action="uploadUrl" v-if="showFile" style="display: inline-block;width:80px;">
                        <div style="width: 78px;height:78px;line-height: 78px;">
                            <Icon type="ios-camera" size="20"></Icon>
                        </div>
                    </Upload>
                    </div>
                    <!-- <input type="text" class="input" placeholder=""  v-model="tousuForm.imageUrl"> -->
                </FormItem>
               <Button  class="btn" long :loading="loading"  @click="toususubmit()">提交</Button>
            </Form>
        </div>
    </div>
</template>
<script>
    import store from '@/store/store';
	import { validatePHONE } from '@/assets/js/validate';
    export default {
      name: 'login',
      data() {
      	 const validatePhone = (rule, value, callback) => {
      	 	if(value==undefined){
      	 		 callback(new Error('手机号不能为空'));
      	 	}
          else if (!validatePHONE(value)) {
            callback(new Error('请输入正确的手机号'));
          } else {
          	
            callback();
          }
        };
        return {
            uploadUrl: this.$axios.defaults.baseURL + '/upload/upload?path=account',
            tousuForm:{
                userId: '',
                mobile: '',
                content: '',
                imageUrl: '',
            },
            uploadList: [],
            defaultList:[],
            ruleInline: {
                    userId: [
                            { required: true, message: '请输入姓名', trigger: 'blur' },
                            //  { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
                    ],
                    mobile: [
                                { required: true,  trigger: 'blur',  validator: validatePhone }
                            
                    ],
                    content: [
                            { required: true, message: '请输入内容', trigger: 'blur' },
                    ],
            },
          loading: false,
          showDialog: false,
          showFile:true
        }
      },
         watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    },
    methods: {
        toususubmit() {
        var _this=this;
        this.loading = false;
        this.$nextTick(() => {
            _this.$refs.tousuForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    let tousuForm=this.tousuForm;
                    tousuForm.imageUrl = this.defaultList[0]
                    this.$axios({
                        method: 'post',
                        url: '/advice/insert',
                        data:tousuForm
                    }).then((res) => {
                        if(res.code == '200') {
                            this.loading = false
                            this.$Message.success('投诉成功');
                            this.$router.push( '/index' );
                        
                        }else{
                            this.$Message.success('投诉失败');
                        }
                    });                    
                    }
                })
            });
        },
        evauploadhandleSuccess(res, file){
					if(res.code == '200') {
					file.url = res.msg;
                    file.name = res.msg;
                    this.showFile =false;
				}
		},
        handleFormatError(file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件格式不正确,请选择 jpg 或 png.'
            });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: '文件大小超过限制',
                desc: '上传文件 太大，不超过2M.'
            });
        },
        evahandleBeforeUpload(){
            let checkeva = this.uploadList.length < 5;
                    if(!checkeva) {
                            this.$Notice.warning({
                                title: '最多可上传5张图片.'
                            });
                        }
                        return checkeva;
        },
      },
    mounted() {
        this.uploadList=this.$refs.evaupload.fileList;
	}
    }
</script>
<style scope='scope'>
   
    .tousu{
        text-align: center;
        width: 800px;
        margin: 0px auto;
        padding: 30px 0;
        background-color: #ffffff;
        top: 60px;
        right: 100px;        
    }
    .tousu h4{
        font-size: 24px;
        font-weight: 400;
        color: #333333;
        height: 71px;
        line-height: 51px;
        padding-bottom: 40px;
        padding-left: 25px;
        border-bottom: 1px solid #CCCCCC;
        margin-bottom: 40px;
        text-align: left;

    }
    .form input{
        width: 260px;
        height: 50px;
        line-height: 50px;
        padding-left: 15px;
        border: 1px solid #CCCCCC;
        font-weight: 400;
        font-size: 14px;
        color: #999999;
    }
   .form textarea{
       padding: 25px;
       border:  1px solid #CCCCCC;
       color: #999999;
   }
    .tousu .btn{
        width: 150px;
        height: 50px;
        line-height: 35px;
        font-weight: 400;
        font-size: 14px;
        background-color: #ff0000;
        color: #ffffff;
        border-radius:0px;
        margin-left: 25px;
    }
    .btn{
        display:block;
    }
    .tousu p{
    font-weight: 400;
    color: #999999;
    font-size: 24px;
    text-align:left;
    margin-bottom: 50px;
    padding-left: 25px;
    }
</style>
<style>
    .tousu .ivu-form-item-label{
        height: 50px!important;
        line-height: 30px!important;
        padding-left: 15px ;
        font-weight: 400;
        font-size: 14px;
        color: #999999;
    }
    .tousu .formitem{
        display:block!important;
        text-align:left;
        color: #999999;
    }
</style>


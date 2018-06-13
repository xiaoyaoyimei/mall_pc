<template>
<div class="layout">
        <Layout>
             <app-header></app-header>
            <Layout >
                <Content style="min-height: 520px;position:relative">
                   <router-view/>
                </Content>
            </Layout>
             <app-footer></app-footer>
        </Layout>
</div>
</template>

<script>
import AppHeader from '@/components/RegisterHeader'
import AppFooter from '@/components/RegisterFooter'

	export default {
			data(){
				return {
				}
			},
        components:{
        	AppHeader,
        	AppFooter,
        }
       }
</script>
<style  lang='scss'>
.layout{
    background-color:#fff;
    min-height:980px;
}

.login_wrap {
    position: absolute;
    top: 0;
    right: 0;
    float: right;
    width: 380px;
    padding: 9px 38px 38px;
    margin: 66px 100px 0px 0px;
    background-color: #fff;
    border: 1px solid #d6d6d6;
    box-shadow: 0px 0px 4px 0px #d6d6d6;
    border-radius: 2px;
    min-height: 412px;
    text-align: left;
    .div{
        .lTitle{
            margin-bottom: 15px;
            font-size: 20px;
            color: #666;	
            margin-top: 20px;
        }
        .Rform{
            position: relative;
            .Rphone{
                width: 302px;
            }
            .R-check{
                position: absolute;
                right: 0px;
                top: 0px;
                background-color: #fff;
                height: 40px;
                border-radius: 0;
            }
        }
        .ul{
            overflow: hidden;
            border-bottom: 1px solid #eeeeee;
            .li{
                float: left;
                width: 60px;
                height: 65px;
                img{
                    width: 49px;
                    height: 49px;
                }
            }
        }
        .loginInput{
            width: 300px;
        }
        .loginBtn{
                display: block;
                width: 300px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background-color: #0092d8;
                color: #fff;
                margin: 20px 0px 17px 0px;
                border: 0px;
                cursor: pointer;
                border-radius: 2px;
                -webkit-transition: all .2s ease-in-out;
                -moz-transition: all .2s ease-in-out;
                -ms-transition: all .2s ease-in-out;
                -o-transition: all .2s ease-in-out;
                transition: all .2s ease-in-out;
        }
        .login-link{
            text-align: left;
            a{
                color:#999;
            }
            a:hover{
                color:#0092d8;
            }
            .resetPassword{
                float: right;
            }
        }
    }
}
.login_wrap_main {
    width: 1190px;
    margin: 0 auto;
    position: relative;
    height: 620px;
    .loginA{
        position: absolute;
        right: 520px;
        top: 66px;
        width: 560px;
        height: 485px;
        display: table-cell;
        .aImg{
            margin: auto;
            vertical-align: middle;
            height: 485px;
            border-radius: 50%;
        }
    }
}
.login-link{
    font-size: 14px;
}

.lLogin	.login_wrap .ivu-input{
    width: 300px;
    height: 40px;
    line-height: 40px;
    border-radius: 0;
}
.lLogin	.login_wrap .ivu-btn{
	padding: 0px;
}
.ivu-layout{
    background-color:#fff;
}
.login{
    margin: 0px auto;
    padding:0px 15px;
    background: #fff;
    overflow: hidden;
    width:100%;
    text-align:center;
    .login2{
        background: #fff;
        padding: 0px 15px;
        .R-check{
            margin-bottom:24px;
            width:100%;
            border-radius:0px;
            font-size:16px;
        }
    }
    .btn-login{
        width: 100%;
        border-radius: 0px;
        padding:10px 0;
        font-size:20px;
    }
    .re{
        float: right;
        margin-top:40px;
        color:#333;
        font-size:16px;
    }
}
.reg{
    padding: 20px;
    .h3{
        margin-bottom: 20px;
    }

}
.page-reg{
    .ivu-input{
        font-size: 16px;
        height:40px;
        border-radius:0px;
        width:302px;
    }

}
.login{
    .ivu-input{
        font-size: 16px;
        height:40px;
        border-radius:0px;
        width:302px;
    }
    .ivu-form{
        overflow:hidden;
    }
    .ivu-btn:hover, .ivu-input:hover{
        border:1px solid #dddee1;
    }
    .ivu-form .ivu-form-item-label{
        font-size: 16px;
        border: 1px solid #bdbdbd;
        border-right:none;
        background:#f6f6f6;
        text-align:center;
        height:38px;
    }
    .ivu-form-item-error .ivu-input, .ivu-form-item-error .ivu-input:hover{
        border:1px solid #dddee1;
    }
    .ivu-form-item-error .ivu-input:focus, .ivu-input:focus,.ivu-btn:focus{
        box-shadow: 0 0 0 2px rgba(153, 153, 153, 0.2);
    }
    .loginBtn{
        padding:0px;
    }
}
</style>

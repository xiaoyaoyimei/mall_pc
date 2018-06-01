import global_ from '@/base/baseParam';
//图片加服务器前缀地址
var imgfilter = (value) => {
  if (!value) {
    return ''
  }
  value = value.toString()
   return  global_.imgurl+value
}
//去除空格
var trim=(value)=>{
	if (!value) {
    return ''
  }
   value = value.toString()
   return  value.trim()
}
//价格.00
var pricefilter=(value)=>{
		if (!value) {
    return ''
  }
   return   Number(value).toFixed(2)
}
export { imgfilter, trim ,pricefilter}

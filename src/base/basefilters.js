import global_ from '@/base/baseParam';
//图片加服务器前缀地址
var imgfilter = (value) => {
  if (!value) {
    return ''
  }
  value = value.toString()
   return  global_.imgurl+value
}
var timefilter =   (value, formatString)=> {
  formatString = formatString || 'YYYY-MM-DD';
  // return moment(value).format(formatString); // value可以是普通日期 20170723
  return moment.unix(value).format(formatString); // 这是时间戳转时间
};
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
   return  '￥'+parseInt(value).toFixed(2)
}
export { imgfilter, trim ,pricefilter,timefilter}
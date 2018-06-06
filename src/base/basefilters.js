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
var pricefilter=(num)=>{
	 num = parseFloat(num); 
        var SUM="";
        var sumFol = num.toFixed(2);
        var sumtotalStr = sumFol;
        var sumEndStr = sumtotalStr.slice(sumtotalStr.indexOf("."));
        var sumStr = sumtotalStr.slice(0,sumtotalStr.indexOf("."));
            var count=0;
            if (sumStr.toString().length % 3 == 0) {
                count = sumStr.toString().length/3;
            }else{
                count = (sumStr.toString().length-sumStr.toString().length%3)/3;
            }
            var text = "";
            for(let i=0;i<count;i++) {
                if((count-i-1)*3+sumStr.toString().length%3!=0) {
                    text=","+sumStr.slice((count-i-1)*3+sumStr.toString().length%3,(count-i-1)*3+sumStr.toString().length%3+3)+text;
                }else {
                    text=sumStr.slice((count-i-1)*3+sumStr.toString().length%3,(count-i-1)*3+sumStr.toString().length%3+3)+text;
                }
            }
            SUM = sumStr.slice(0,sumStr.toString().length % 3)+text+sumEndStr;
            return SUM; 
        return sumFol ;
}
export { imgfilter, trim ,pricefilter}

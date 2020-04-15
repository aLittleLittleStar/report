import { Message } from 'element-ui'
// 公共的js
//日期格式转换
export function FromDates(StringDate) {
  let T = ""
  let N = ""
  let Y = ""
  let R = ""
  for (let i = 0; i < StringDate.length; i++) {
    N = StringDate.substring(0, 4) + "-"
    Y = StringDate.substring(4, 6) + "-"
    R = StringDate.substring(6, 8)
    T = N + Y + R
    return T
  }
}
//日期时间去横杠
export function FromDatesCancle(StringDate) {
  let CanTime = []
  for (let i = 0; i < StringDate.length; i++) {
    if (StringDate[i] !== "-") {
      CanTime.push(StringDate[i])
    }
  }
  return CanTime.join('')
}

// 请求接口 下载文件
export function downFlie(url) {
  var downloadElement = document.createElement('a');
  downloadElement.style.display = 'none';
  downloadElement.href = url;
  document.body.appendChild(downloadElement);
  downloadElement.click(); //点击下载
  document.body.removeChild(downloadElement); //下载完成移除元素
}
// 打开文件地址下载文件
export function downFlieByUrl(fileName,url) {
  var downloadElement = document.createElement('a');
  var reg = /([^\.\/\\]+)\.([a-z]+)$/i;
  var resultArr = reg.exec(url);//匹配文件名和后缀
  if(!fileName){fileName = resultArr[1] || (new Date().getTime()).toString()}
  downloadElement.style.display = 'none';
  downloadElement.href = url;
  downloadElement.download = fileName; //下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); //点击下载
  document.body.removeChild(downloadElement); //
}
export function isMobile() {
  if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){
      return true;
    }
    else {
      return false;
    }
}
// 弹出框的函数
export function showMessage(type, text,time, onClose) {
  Message({
    type: type || 'info',
    message: text || '',
    showClose: true,
    duration: time || 2000,
    onClose: onClose || function(){}
  })
}
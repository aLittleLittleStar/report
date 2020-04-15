export function formatNumberRgx (num, type) {
  if (!num && num !== 0) {
    return '-'
  }
  let parts = num.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}
export function filterFileName (file, type) {
  if (!file) {
    return ''
  }
  file = file.split('/');
  return file[file.length - 1]
}
export function filterDate (value) {
  if(value){
    return value.split('-').join('/');
  }
}
export function filterCharging (value) {
  let typeObj = {registration:"注册",activation:"激活"}
  return typeObj[value] ? typeObj[value] : '--';
}
export function filterCustomerType (value) {
  let typeObj = {normal:"直客",agency:"代理"}
  return typeObj[value] ? typeObj[value] : '--';
}
export function filterRadioType(value) {
  let typeObj = {yes:"是",no:"否"}
  return typeObj[value] ? typeObj[value] : '--';
}

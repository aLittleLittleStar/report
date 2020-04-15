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

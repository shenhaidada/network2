export function usernameValidate(username: string) {
  let usernameError: string = ''
  if (username === '') {
    usernameError = '请输入用户名'
  } else if (new String(username).length > 20) {
    usernameError = '用户名长度最多20'
  } else {
    // 校验通过
    usernameError = ''
  }
  return usernameError
}
// 密码校验
export function passwordValidate(password: string) {
  let passwordError: string = ''
  if (password === '') {
    passwordError = '请输入密码'
  } else {
    passwordError = ''
  }
  return passwordError
}

// 设备名校验
export function deviceNameValidate(device: string) {
  let deviceNameError: string = ''
  if (device === '') {
    deviceNameError = '请输入设备名'
  } else if (new String(device).length > 20) {
    deviceNameError = '设备名长度最多20'
  } else {
    // 校验通过
    deviceNameError = ''
  }
  return deviceNameError
}

// 设备区域校验
export function deviceAreaValidate(device: string) {
  let deviceAreaError: string = ''
  if (device === '') {
    deviceAreaError = '请输入设备区域名'
  } else if (new String(device).length > 20) {
    deviceAreaError = '设备区域名长度最多20'
  } else {
    // 校验通过
    deviceAreaError = ''
  }
  return deviceAreaError
}
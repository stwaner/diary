/**
 * 验证Email
 * @param email email地址，格式：zhangsan@zuidaima.com，zhangsan@xxx.com.cn，xxx代表邮件服务商
 * @return 验证成功返回true，验证失败返回false
 */ 
export function checkEmail (email) { 
  const regex = "\\w+@\\w+\\.[a-z]+(\\.[a-z]+)?"
  return Pattern.matches(regex, email)
}
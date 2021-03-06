const charReg = /^[a-zA-Z0-9_]+$/;

const emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

export const EmailRules = [
  v => !!v || '邮箱不能为空',
  v => (v && emailReg.test(v)) || '邮箱格式非法'
];

export const UsernameRules = [
  v => !!v || '用户名不能为空',
  v => (v && v.length >= 3 && v.length <= 32) || '用户名长度为 3 到 32 个字符',
  v => (v && charReg.test(v)) || '用户名包含非法字符'
];

export const PasswordRules = [
  v => !!v || '密码不能为空',
  v => (v && v.length >= 3 && v.length <= 16) || '密码长度为 3 到 16 个字符',
  v => (v && charReg.test(v)) || '密码包含非法字符'
];

export const PasswordRules2 = [
  v => (v.length === 0 || (v && v.length >= 3 && v.length <= 16)) || '密码长度为 3 到 16 个字符',
  v => (v.length === 0 || (v && charReg.test(v))) || '密码包含非法字符'
];

export function notEmpty(s) {
  return v => !!v || `${s}不能为空`;
}

const digitsReg = /^\d+$/;
export function isDigits(s) {
  return v => (v && digitsReg.test(v)) || `${s}只能包含数字`;
}
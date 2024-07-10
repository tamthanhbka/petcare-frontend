export const signupValidate = (password: string, confirmPassword: string) => {
  if (password !== confirmPassword) return "Mật khẩu xác nhận không đúng!";
  return false;
};

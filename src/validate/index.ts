export const signupValidate = (password: string, confirmPassword: string) => {
  if (password !== confirmPassword) return "ConfirmPassword is incorrect";
  return false;
};

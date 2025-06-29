export interface ILoginUser {
  email: string;
  password: string;
}

export interface ISignUpUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
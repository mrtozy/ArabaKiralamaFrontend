export interface ChangePasswordModel {
    userId:number;
    oldPassword:string;
    newPassword:string;
    repeatNewPassword:string;
}
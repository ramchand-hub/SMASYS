import sha256 from "sha256"
export const successResponse = (message: string, data: any = null) => ({
  success: true,
  message,
  data
});

export const errorResponse = (message: string, errors: any = null) => ({
  success: false,
  message,
  errors
});


export  function getencryptpassword(password:any) {
    return sha256.x2(password);
}
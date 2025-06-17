import { HttpStatus } from "./HttpStatus";
export declare const get: <T>(path: string, acceptedResponseCodes: HttpStatus[]) => Promise<T>;
export declare const getWithJWT: <T>(path: string, acceptedResponseCodes: HttpStatus[]) => Promise<T>;
export declare const post: <T>(path: string, body: any, acceptedResponseCodes: HttpStatus[]) => Promise<T>;
export declare const postWithJWT: <T>(path: string, body: any, acceptedResponseCodes: HttpStatus[]) => Promise<T>;
export declare const putWithJWT: <T>(path: string, body: any, acceptedResponseCodes: HttpStatus[], token: any) => Promise<T>;
export declare const deleteWithJWT: (path: string, acceptedResponseCodes: HttpStatus[]) => Promise<void>;
export declare const postFormWithJWT: <T>(path: string, formData: FormData, acceptedResponseCodes: HttpStatus[]) => Promise<T>;

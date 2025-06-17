type User = {
    userName: string;
    fullName: string;
    userRole: string[];
    token: string;
};
export declare const isUserLoggedIn: () => boolean;
export declare const saveUser: (userName: string, userRole: string[], fullName: string, token: string) => void;
export declare const getUser: () => User | null;
export declare const clearUser: () => void;
export declare const isLoggedInUserAdmin: () => boolean;
export declare const getToken: () => string | null;
export declare const isLoggedInUserCustomer: () => boolean;
export {};

type User = {
    userName: string;
    fullName: string;
    userRole: string[];
    token: string;
};

export const isUserLoggedIn = () => {
    return getUser() !== null;
};

export const saveUser = (userName: string, userRole: string[], fullName: string, token: string) => {
    localStorage.setItem('userName', userName);
    localStorage.setItem('userRole', JSON.stringify(userRole));
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('token', token);
};

export const getUser = (): User | null => {
    const userName = localStorage.getItem('userName');
    const fullName = localStorage.getItem('fullName');
    const userRoleStr = localStorage.getItem('userRole');
    const token = localStorage.getItem('token');

    if (userName && fullName && userRoleStr && token) {
        const userRole: string[] = JSON.parse(userRoleStr);
        return {token: token, userName, fullName, userRole: userRole};
    }

    return null;
};

export const clearUser = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('fullName');
    localStorage.removeItem('token');
};

export const isLoggedInUserAdmin = (): boolean => {
    if (!isUserLoggedIn()) {
        return false;
    }
    const user = getUser();
    const token = localStorage.getItem('token');
    return !!token && Array.isArray(user?.userRole) && user.userRole.some(role => role.toUpperCase() === 'ROLE_ADMIN');
};

export const getToken: () => string | null = () =>{
    return localStorage.getItem('token');
}
export const isLoggedInUserCustomer = () => {
    if(!isUserLoggedIn()) {
        return false
    }
    const user = getUser();
    const token = localStorage.getItem('token');
    return !!token && Array.isArray(user?.userRole) && user.userRole.some(role => role.toUpperCase() === 'ROLE_USER');
}
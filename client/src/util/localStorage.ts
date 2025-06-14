type User = {
    userName: string;
    userId: string;
    userRole: string;
    token: string;
};

export const isUserLoggedIn = () => {
    return getUser() !== null;
};

export const saveUser = (userId: string, userRole: string, userName: string, token: string) => {
    localStorage.setItem('userId', userId);
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('userName', userName);
    localStorage.setItem('token', token);
};

export const getUser = (): User | null => {
    const userName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    const token = localStorage.getItem('token');

    if (userName && userId && userRole && token) {
        return {token: token, userName, userId, userRole: userRole.toLowerCase()};
    }

    return null;
};

export const clearUser = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
};

export const isLoggedInUserAdmin = () => {
    if(!isUserLoggedIn()) {
        return false
    }
    const user = getUser();
    const token = localStorage.getItem('token');
    return user?.userRole.toLowerCase() === 'admin' && !!token;
}

export const getToken: () => string | null = () =>{
    return localStorage.getItem('token');
}
export const isLoggedInUserCustomer = () => {
    if(!isUserLoggedIn()) {
        return false
    }
    const user = getUser();
    return user?.userRole.toLowerCase() === 'customer';
}
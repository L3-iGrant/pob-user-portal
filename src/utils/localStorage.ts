export const saveAuthTokenToLocalStorage = (key: string) => {
    localStorage.setItem('authToken', key);
}

export const saveUserIdToLocalStorage = (id: string) => {
    localStorage.setItem('userId', id);
}

export const saveUserOrgToLocalStorage = (org: string) => {
    localStorage.setItem('userOrg', org);
}

export const saveUserTypeToLocalStorage = (userType: string) => {
    localStorage.setItem('userType', userType);
}

export const getAuthTokenFromLocalStorage = () => {
    return localStorage.getItem('authToken');
}


export const getUserIdFromLocalStorage = () => {
    return localStorage.getItem('userId');
}

export const getUserOrgFromLocalStorage = () => {
    return localStorage.getItem('userOrg');
}

export const getUserTypeFromLocalStorage = () => {
    return localStorage.getItem('userType');
}

export const clearAuthTokenFromLocalStorage = () => {
    localStorage.removeItem('authToken');
}

export const clearUserIdFromLocalStorage = () => {
    localStorage.removeItem('userId');
}

export const clearUserOrgFromLocalStorage = () => {
    localStorage.removeItem('userOrg');
}

export const clearUserTypeFromLocalStorage = () => {
    localStorage.removeItem('userType');
}
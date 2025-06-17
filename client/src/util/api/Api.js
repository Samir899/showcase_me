import { getToken } from "../localStorage";
import { HttpStatus } from "./HttpStatus";
export const get = async (path, acceptedResponseCodes) => {
    const response = await fetch(path);
    const responseData = await response.json();
    if (!acceptedResponseCodes.includes(response.status)) {
        throw new Error(responseData.message);
    }
    return responseData;
};
export const getWithJWT = async (path, acceptedResponseCodes) => {
    const tokenString = getToken();
    const response = await fetch(path, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${tokenString}`
        },
    });
    const responseData = await response.json();
    if (!acceptedResponseCodes.includes(response.status)) {
        throw new Error(responseData.message);
    }
    return responseData;
};
export const post = async (path, body, acceptedResponseCodes) => {
    const response = await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    try {
        const responseData = await response.json();
        if (!acceptedResponseCodes.includes(response.status)) {
            throw new Error(responseData.message);
        }
        return responseData;
    }
    catch {
        throw new Error("Server Unavailable. Please try again later.");
    }
};
export const postWithJWT = async (path, body, acceptedResponseCodes) => {
    const tokenString = getToken();
    const response = await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenString}`
        },
        body: JSON.stringify(body),
    });
    console.log("response: ", response);
    const responseData = await response.json();
    if (!acceptedResponseCodes.includes(response.status)) {
        throw new Error(responseData.message);
    }
    return responseData;
};
export const putWithJWT = async (path, body, acceptedResponseCodes, token) => {
    const response = await fetch(path, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body),
    });
    const responseData = await response.json();
    if (!acceptedResponseCodes.includes(response.status)) {
        throw new Error(responseData.message);
    }
    return responseData;
};
export const deleteWithJWT = async (path, acceptedResponseCodes) => {
    const token = getToken();
    const response = await fetch(path, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!acceptedResponseCodes.includes(response.status)) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || `Delete failed with status ${response.status}`);
    }
};
export const postFormWithJWT = async (path, formData, acceptedResponseCodes) => {
    const tokenString = getToken();
    const response = await fetch(path, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${tokenString}`
            // Do NOT set Content-Type manually here!
        },
        body: formData,
    });
    try {
        const responseData = await response.json();
        if (!acceptedResponseCodes.includes(response.status)) {
            throw new Error(responseData.message || 'Unexpected response');
        }
        return responseData;
    }
    catch {
        throw new Error('Server Unavailable. Please try again later.');
    }
};

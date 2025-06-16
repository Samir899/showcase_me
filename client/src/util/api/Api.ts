import {getToken} from "../localStorage";
import {HttpStatus} from "./HttpStatus";

export const get = async <T>(path: string, acceptedResponseCodes: HttpStatus[]): Promise<T> => {
  const response = await fetch(path);
  const responseData = await response.json();

  if (!acceptedResponseCodes.includes(response.status as HttpStatus)) {
    throw new Error(responseData.message);
  }

  return responseData;
};
export const getWithJWT = async <T>(path: string, acceptedResponseCodes : HttpStatus[]): Promise<T> => {
  const tokenString = getToken();
  const response = await fetch(path, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${tokenString}`
    },
  });
  const responseData = await response.json();

  if(!acceptedResponseCodes.includes(response.status as HttpStatus)) {
    throw new Error(responseData.message)
  }

  return responseData;
};
export const post = async <T>(
    path: string,
    body: any,
    acceptedResponseCodes: HttpStatus[]
): Promise<T> => {
  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  try{
    const responseData = await response.json();
    if(!acceptedResponseCodes.includes(response.status as HttpStatus)) {
      throw new Error(responseData.message)
    }
    return responseData;
  }catch{
    throw new Error("Server Unavailable. Please try again later.")
  }
};

export const postWithJWT = async <T>(
    path: string,
    body: any,
    acceptedResponseCodes: HttpStatus[],
): Promise<T> => {
  const tokenString = getToken();
  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenString}`
    },
    body: JSON.stringify(body),
  });
  console.log("response: " , response)
  const responseData = await response.json();

  if(!acceptedResponseCodes.includes(response.status as HttpStatus)) {
    throw new Error(responseData.message)
  }
  return responseData;
};

export const putWithJWT = async <T>(
    path: string,
    body: any,
    acceptedResponseCodes: HttpStatus[],
    token: any
): Promise<T> => {
  const response = await fetch(path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body),
  });

  const responseData = await response.json();

  if(!acceptedResponseCodes.includes(response.status as HttpStatus)) {
    throw new Error(responseData.message)
  }
  return responseData;
};
export const deleteWithJWT = async (
    path: string,
    acceptedResponseCodes: HttpStatus[]
): Promise<void> => {
  const token = getToken();
  const response = await fetch(path, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!acceptedResponseCodes.includes(response.status as HttpStatus)) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || `Delete failed with status ${response.status}`);
  }
};
export const postFormWithJWT = async <T>(
    path: string,
    formData: FormData,
    acceptedResponseCodes: HttpStatus[],
): Promise<T> => {
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
    if (!acceptedResponseCodes.includes(response.status as HttpStatus)) {
      throw new Error(responseData.message || 'Unexpected response');
    }
    return responseData;
  } catch {
    throw new Error('Server Unavailable. Please try again later.');
  }
};

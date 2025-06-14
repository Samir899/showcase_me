export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export const get = async <T>(path: string, acceptedResponseCodes : HttpStatus[]): Promise<T> => {
  const response = await fetch(path);
  const responseData = await response.json();

  if(acceptedResponseCodes.indexOf(response.status) === -1) {
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

  const responseData = await response.json();

  if (acceptedResponseCodes.indexOf(response.status) === -1) {
    throw new Error(responseData.message || 'Unexpected response');
  }

  return responseData;
};

export const postWithJWT = async <T>(
    path: string,
    body: any,
    acceptedResponseCodes: HttpStatus[],
    token: any
): Promise<T> => {
  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body),
  });

  const responseData = await response.json();

  if (acceptedResponseCodes.indexOf(response.status) === -1) {
    throw new Error(responseData.message || 'Unexpected response');
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

  if (acceptedResponseCodes.indexOf(response.status) === -1) {
    throw new Error(responseData.message || 'Unexpected response');
  }
  return responseData;
};
export const deleteWithJWT = async (
    path: string,
    acceptedResponseCodes: HttpStatus[],
    token: string
): Promise<void> => {
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
import api from './apiClient';


export async function createUser(data: any): Promise<any> {
  try {
    const response = await api.post('/auth/register', data);
    return response.data;
  } catch (error) {
    console.error("createUser API error:", error);
    throw error;
  }
}

export async function loginUser(data: any): Promise<any> {
  try {
	const response = await api.post('/auth/login', data);
	console.log(response, "Login response!!")
	return response.data;
  } catch (error) {
	console.error("loginUser API error:", error);
	throw error;
  }
}


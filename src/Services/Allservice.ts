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

export async function create_student(data: any): Promise<any> {
	try {
		const response = await api.post('/students/createStudent', data);
		console.log(response, "create_student response!!")
		return response;
	} catch (error) {
		console.error("create_student API error:", error);
		throw error;
	}
}

export async function studentList(): Promise<any> {
	try {
		const response = await api.get('/students/getStudentsList');
		console.log(response, "studentList response!!")
		return response.data;
	} catch (error) {
		console.error("studentList API error:", error);
		throw error;
	}
}

export async function create_teacher(data: any): Promise<any> {
	try {
		const response = await api.post('/teachers/createTeacher', data);
		return response;
	} catch (error) {
		console.error("create_teacher API error:", error);
		throw error;
	}
}

export async function teachersList(page: any, pagesize: any): Promise<any> {
	try {
		const response = await api.get('/teachers/getTeachersList',
			{
				params: {
					page,
					pagesize
				}

			}
		);
		return response;
	} catch (error) {
		console.error("teachersList API error:", error);
		throw error;
	}
}
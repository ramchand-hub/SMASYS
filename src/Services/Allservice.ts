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
		return response.data;
	} catch (error) {
		console.error("loginUser API error:", error);
		throw error;
	}
}

export async function create_student(data: any): Promise<any> {
	try {
		const response = await api.post('/students/createStudent', data);
		return response;
	} catch (error) {
		console.error("create_student API error:", error);
		throw error;
	}
}

export async function update_student(studentId: string, data: any): Promise<any> {
	try {
		const response = await api.put(`/students/updateStudent/${studentId}`, data);
		return response;
	} catch (error) {
		console.error("update_student API error:", error);
		throw error;
	}
}

export async function deleteStudent(studentId: string): Promise<any> {
	try {
		const response = await api.delete(`/students/deleteStudent/${studentId}`,
		);
		return response;
	} catch (error) {
		console.error("deleteStudent API error:", error);
		throw error;
	}
}

export async function studentList(page: any, pagesize: any, searchquery:any): Promise<any> {
	try {
		const response = await api.get('/students/getStudentsList',
			{
				params: {
					page,
					pagesize,
					searchquery
				}

			}
		);
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

export async function teachersList(page: any, pagesize: any, searchquery:string): Promise<any> {
	try {
		const response = await api.get('/teachers/getTeachersList',
			{
				params: {
					page,
					pagesize,
					searchquery
				}

			}
		);
		return response.data;
	} catch (error) {
		console.error("teachersList API error:", error);
		throw error;
	}
}

export async function updateTeacher(teacherId: string, data: any): Promise<any> {
	try {
		const response = await api.put(`/teachers/updateTeacher/${teacherId}`, data
		);
		return response;
	} catch (error) {
		console.error("updateTeacher API error:", error);
		throw error;
	}
}

export async function deleteTeacher(teacherId: string): Promise<any> {
	try {
		const response = await api.delete(`/teachers/deleteTeacher/${teacherId}`,
		);
		return response;
	} catch (error) {
		console.error("deleteTeacher API error:", error);
		throw error;
	}
}
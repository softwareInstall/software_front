import http from '../httpService';

interface LoginInfo {
    username: string,
    password: string,
}


export const Login = async (data: LoginInfo): Promise<string> => {
    try {
        const response = await http.post('/api/v1/auth/login', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data.data;
    } catch (error) {
        console.error('登录失败:', error);
        throw error;
    }
};

export const checkToken = async (token: string): Promise<boolean> => {
    try {
        const response = await http.get('/api/v1/auth/check_token?token=' + token);
        return response.data.data;
    } catch (error) {
        console.error('校验失败:', error);
        throw error;
    }
};
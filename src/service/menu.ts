import http from '../httpService';
import {Software} from '../type/download_types'

export const getMenuData = async (platform: string): Promise<Software[] | null> => {
    try {
        const response = await http.get(`/api/v1/software?platform=` + platform);
        return response.data.data.items as Software[];
    } catch (error) {
        console.error('获取数据失败:', error);
        return null;
    }
};
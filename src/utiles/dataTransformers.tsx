import {Software} from "../type/download_types";
import {RedditSquareFilled} from "@ant-design/icons";
import React from "react";
import {getMenuData} from "../service/menu";

export const transformData = (data: Software[] | []) => {
    // @ts-ignore
    return data.map((item) => {
        // 使用软件的 id 作为 key
        const key = `sub${item.id}`;
        const label = item.name;
        const latest_version = item.latest_version;
        const latest_release_date = item.latest_release_date;
        const latest_download_url = item.latest_download_url;

        // 判断是否有版本信息
        if (item.versions && item.versions.length > 0) {
            return {
                key: key,
                label: label,
                latest_version: latest_version,
                latest_release_date: latest_release_date,
                latest_download_url: latest_download_url,
                icon: <RedditSquareFilled />,
                children: item.versions.map((version) => ({
                    key: version.id.toString(),
                    label: `${version.version}`,
                    release_date: version.release_date,
                    description: version.description,
                    download_url: version.download_url,
                    latest_version: version.latest_version,
                    latest_release_date: version.latest_release_date,
                    latest_download_url: version.latest_download_url,
                })),
            };
        } else {
            return {
                key: key,
                label: label,
                icon: <RedditSquareFilled />,
                children: [],
            };
        }
    });
};


/**
 * 获取历史软件数据
 * @param key 平台标识
 * @returns 转换后的菜单项数组
 */
export const getHisMenuItems = async (key: string): Promise<any[]> => {
    try {
        const result = await getMenuData(key);
        return transformData(result || []);
    } catch (err) {
        console.error('获取平台数据失败:', err);
        return [];
    }
};
// 定义 Version 类型
export interface Version {
    id: number;
    version: string;
    release_date: string; // 使用 string 类型接收 ISO 日期格式
    description: string;
    download_url: string;
    latest_version: string;
    latest_release_date: string;
    latest_download_url: string;
}

// 定义 Software 类型
export interface Software {
    id: number;
    name: string;
    latest_version: string;
    latest_release_date: string;
    latest_download_url: string;
    versions: Version[]; // versions 是一个 Version 类型的数组
}


export interface VersionMenu {
    label: string;
    release_date: string; // 使用 string 类型接收 ISO 日期格式
    description: string;
    download_url: string;
    latest_version: string;
    latest_release_date: string;
    latest_download_url: string;
}
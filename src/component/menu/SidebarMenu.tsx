import React, {useState, useEffect, useRef} from 'react';
import type { MenuProps } from 'antd';
import { Menu, Layout } from 'antd';
import Download from "../Download/Download";
import Admin from "../admin/Admin";
import './SidebarMenu.css';
import '../Header/header.css'
import { getHisMenuItems } from "../../utiles/dataTransformers";
import {checkToken} from "../../service/auth";

// 定义菜单项类型
type MenuItem = Required<MenuProps>['items'][number];
const { Header, Content, Footer } = Layout;

interface SidebarMenuProps {
    // 可以通过 props 传递自定义菜单项
    menuItems?: MenuItem[];
    // 初始折叠状态
    defaultCollapsed?: boolean;
    // 折叠状态变化时的回调函数
    onCollapse?: (collapsed: boolean) => void;
}
const SidebarMenu: React.FC<SidebarMenuProps> = () => {
    const platformInfo = [
        {key: '1', label: 'Windows版本'},
        {key: '2', label: '麒麟V10版本'}]
    const [selectedVersion, setSelectedVersion] = useState<any>(null); // 存储选中的版本数据
    const [HisMenuItems, setHisMenuItems] = useState<any>(null); // 存储菜单数据
    const [platform, setPlatform] = useState<any>('1'); // 存储平台数据
    const [platformList, setPlatformList] = useState<any>(platformInfo); // 存储平台数据
    const hasExecuted = useRef(false); // 使用 useRef 来标记是否已经执行过
    const [showUpload,  setShowUpload] = useState(false);

    useEffect(() => {
        const fetchDefaultMenu = async (platform: string) => {
            const data = await getHisMenuItems(platform);
            setHisMenuItems(data);
        };
        fetchDefaultMenu(platform);
    }, [platform]);

    // token check
    useEffect(() => {
        if (hasExecuted.current) return; // 如果已经执行过，直接返回
        hasExecuted.current = true; // 标记为已执行

        const token = localStorage.getItem('token');
        if (token) {
            checkToken(token).then((isValid) => {
                if (isValid) {
                    const updatedPlatformInfo = [...platformInfo, { key: '3', label: '安装包上传' }];
                    setPlatformList(updatedPlatformInfo);
                }
            });
        }
    }, []);

    // 处理菜单选择
    const handleMenuSelect: MenuProps['onSelect'] = ({key}) => {
        // 查找选中的菜单项数据
        const findSelectedVersion = (items: any[]): any => {
            for (const item of items) {
                if (item.key === key) {
                    return item;
                }
                if (item.children) {
                    const found = findSelectedVersion(item.children);
                    if (found) return found;
                }
            }
            return null;
        };

        const versionData = findSelectedVersion(HisMenuItems);
        setSelectedVersion(versionData);
    };

    // 处理平台选择
    const handlePlatSelect: MenuProps['onSelect'] = async ({key}) => {
        if (key === "3"){
            setShowUpload(true);
        }else{
            setShowUpload(false);
        }
        setSelectedVersion(null);
        setPlatform(key);
    };

    return (
        <Layout>
            <Header style={{display: 'flex', alignItems: 'center', background: '#2aae67'}}>
                <Menu
                    className="header-menu-sidebar"
                    defaultSelectedKeys={['1']}
                    mode="horizontal"
                    items={platformList}
                    style={{flex: 1, minWidth: 0}}
                    onSelect={handlePlatSelect}
                />
            </Header>
            <Content>
                {showUpload? (<Admin />):
                    (<div style={{display: 'flex', height: '100vh'}}>
                    <div style={{width: 256, overflowY: 'auto', display: 'flex', height: '100vh'}}>
                        <Menu
                            mode="inline"
                            className="custom-menu-sidebar"
                            items={HisMenuItems}
                            onSelect={handleMenuSelect}

                        />
                    </div>
                    <div style={{flex: 1, padding: '20px', overflowY: 'auto', background: '#f4f4f4'}}>
                        {selectedVersion ? (
                            <Download
                                key={selectedVersion.key} // 单独传递 key
                                label={selectedVersion.label}
                                latest_version={selectedVersion.latest_version}
                                latest_release_date={selectedVersion.latest_release_date}
                                release_date={selectedVersion.release_date}
                                description={selectedVersion.description}
                                download_url={selectedVersion.download_url}
                                latest_download_url={selectedVersion.latest_download_url}
                            />
                        ) : (<h1 style={{textAlign: 'center'}}>选择软件以及版本进行下载安装</h1>)}
                    </div>
                </div>)}
            </Content>
            <Footer style={{textAlign: 'center'}}>
                Soft Design ©{new Date().getFullYear()} Created by B
            </Footer>
        </Layout>
    );
};

export default SidebarMenu;
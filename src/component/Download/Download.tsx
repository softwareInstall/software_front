import React from 'react';
import './Download.css';

import { VersionMenu } from '../../type/download_types'

const Download: React.FC<VersionMenu> = (SoftwareInfo) => {
    let version = SoftwareInfo.label;
    let latest_version = SoftwareInfo.latest_version;
    let latest_release_date = SoftwareInfo.latest_release_date;
    let release_date = SoftwareInfo.release_date;
    let description = SoftwareInfo.description;
    let download_url = SoftwareInfo.download_url;
    let latest_download_url = SoftwareInfo.latest_download_url;
    return (
        <div className="faq__detail">
            <div className="header">
                <h1>发布信息</h1>
            </div>

            <div className="versions">
                <div className="version current">
                    <h3>当前选择版本</h3>
                    <p><strong>发布日期：</strong> {release_date}</p>
                    <p><strong>版本号：</strong> {version}</p>
                    <p>
                        <strong>下载：</strong>
                        <a href={download_url} target="_blank" rel="noopener noreferrer">下载该版本</a>
                    </p>
                </div>

                <div className="version latest">
                    <h3>最新版本</h3>
                    <p><strong>发布日期：</strong> {latest_release_date}</p>
                    <p><strong>版本号：</strong> {latest_version}</p>
                    <p>
                        <strong>下载：</strong>
                        <a href={latest_download_url} target="_blank" rel="noopener noreferrer">下载该版本</a>
                    </p>
                </div>
            </div>

            <div className="updates">
                <h3>更新内容</h3>
                <div className="update-content">
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default Download;
import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Input, Space, message } from 'antd';
import './Login.css';
import {Login} from "../../service/auth";
import { useAuth } from '../../AuthContext';

const LoginForm: React.FC = () => {
    // 定义状态变量及其类型
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const { login } = useAuth();


    const warning = (errMsg: string) => {
        messageApi.open({
            type: 'warning',
            content: errMsg,
        });
    };

    // 处理表单提交事件
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        warning("请填写账号密码");
        // 简单的表单验证
        if (!username.trim() || !password.trim()) {
            warning("请填写账号密码");
            return;
        }

        // 在此处处理登录逻辑
        try {
            const token = await Login({
                username: username,
                password: password
            });
            login(token);
            localStorage.setItem('token', token);
            window.location.href = '/download';
        } catch (error) {
            warning('登录失败:' + error);
        }
    };

    return (
        <div className='fullscreen-center'>
            {contextHolder}
            <div className='loginContainer'>
            <div className='loginCard'>
                <h2 className='loginTitle'>登录</h2>
                <form onSubmit={handleSubmit} className='loginForm'>
                    <div className='loginInputGroup'>
                        <Input
                            size="large"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="请输入账号"
                            prefix={<UserOutlined />}
                        />
                    </div>
                    <div className='loginInputGroup'>
                        <Space direction="horizontal">
                            <Input.Password
                                placeholder="输入密码"
                                size="large"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                            />
                            <Button size="large" style={{ width: 90 }} onClick={() => setPasswordVisible((prevState) => !prevState)}>
                                {passwordVisible ? 'Hide' : 'Show'}
                            </Button>
                        </Space>
                    </div>
                    <button type="submit" className='loginButton'>
                        登录
                    </button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default LoginForm;
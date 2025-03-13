import React, { createContext, useState, useContext, ReactNode } from 'react';

// 定义 Context 的类型
interface AuthContextProps {
    token: string | null;
    login: (newToken: string) => void;
    logout: () => void;
}

// 创建 Context，默认值为未认证状态
const AuthContext = createContext<AuthContextProps>({
    token: null,
    login: () => {},
    logout: () => {},
});

// 定义 Provider 的 Props
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token') || null);

    const login = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// 自定义 Hook 方便在组件中使用 Context
export const useAuth = (): AuthContextProps => {
    return useContext(AuthContext);
};
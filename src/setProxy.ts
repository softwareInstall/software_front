import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import express from 'express';
const setupProxy = (app: express.Application) => {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://127.0.0.1:8000/api',
            changeOrigin: true,
            secure: false,
            followRedirects: true,
        } as Options)
    );

    // 如果需要配置多个代理路径，可以继续添加
    // 例如：
    /*
    app.use(
      '/another-api',
      createProxyMiddleware({
            pathRewrite: {
                '^/api': '',
            },
        target: 'http://localhost:9000',
        changeOrigin: true,
        secure: false,
      })
    );
    */
};

export default setupProxy;
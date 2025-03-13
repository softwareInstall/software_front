import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Upload, Button, message, Row, Col, Card } from 'antd';
import type { UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { getSoftwareList } from '../../service/admin';
import './Admin.css';

const { Dragger } = Upload;
const { Option } = Select;

const Admin: React.FC = () => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]); // 管理文件列表状态
    const [softwareList, setSoftwareList] = useState<Array<{value: string, label: string}>>([]);

    useEffect(() => {
        fetchEnvironmentList();
    }, []);

    const fetchEnvironmentList = async () => {
        try {
            const response = await getSoftwareList();
            setSoftwareList(response.data || []);
        } catch (error) {
            message.error('获取环境列表失败');
        }
    };

    // 文件上传配置
    const uploadProps: UploadProps = {
        name: 'file',
        multiple: true,
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        fileList, // 绑定文件列表
        beforeUpload: (file) => {
            const isZip = file.type === "application/zip";
            if (!isZip) {
                message.error("只允许上传 ZIP 文件!");
            }
            return isZip;
        },
        onChange(info) {
            setFileList(info.fileList as any); // 更新文件列表状态,使用类型断言
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} 文件上传成功`);
            } else if (status === 'error') {
                message.error(`${info.file.name} 文件上传失败`);
            }
        },
        onDrop(e) {
            console.log("拖拽的文件", e.dataTransfer.files);
        },
    };

    // 表单提交
    const onFinish = (values: any) => {

        console.log("表单数据:", values);
        console.log("文件列表:", fileList); // 提交时包含文件列表
        message.success("表单提交成功!");
    };

    return (
        <div className="admin-container">
            <Row justify="center" style={{ marginTop: "50px" }}>
                <Col xs={24} sm={20} md={16} lg={12} xl={10}>
                    <Card title="软件版本发布" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            style={{ maxWidth: 600, margin: '0 auto', padding: '24px' }}
                        >
                            <Form.Item
                                label="版本号"
                                name="version"
                                rules={[
                                    { required: true, message: "请输入版本号!" },
                                    { pattern: /^\d+\.\d+\.\d+$/, message: "版本号格式应为 x.x.x" },
                                ]}
                            >
                                <Input placeholder="例如：1.0.0" />
                            </Form.Item>

                            <Form.Item
                                label="软件"
                                name="software"
                                rules={[{ required: true, message: '请选择或输入软件' }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="请选择或输入软件"
                                    optionFilterProp="children"
                                    allowClear
                                    mode="tags"
                                >
                                    {softwareList.map(item => (
                                        <Option key={item.value} value={item.value}>{item.label}</Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="上传文件"
                                name="files"
                                rules={[{ required: true, message: '请上传文件' }]}
                            >
                                <Dragger {...uploadProps}>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
                                    <p className="ant-upload-hint">
                                        支持单个或批量上传
                                    </p>
                                </Dragger>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    提交
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Admin;
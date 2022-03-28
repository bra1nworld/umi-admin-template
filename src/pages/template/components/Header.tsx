import React from 'react';
import { useDispatch, connect } from 'umi';
import TemplateModel from '../models/template';
import { Row, Col, Form, Input, Select, Button, Space } from 'antd';

import { mapStateToProps, HeaderProps } from './HeaderFunc';

const TemplateHeader = ({ queryTemplate, fetchLoading }: HeaderProps) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm<Partial<TemplateItem>>();

  const onFinish = (query: Partial<TemplateItem>) => {
    // 去空
    (Object.keys(query) as Array<keyof TemplateItem>).forEach((key) => {
      if (query[key] === undefined) {
        delete query[key];
      }
    });
    queryTemplate.query = query;
    dispatch(TemplateModel.actions.loadDataAct(queryTemplate));
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <Form {...layout} form={form} onFinish={onFinish}>
      <Row>
        <Col span={5}>
          <Form.Item name="packageName" label="应用包名">
            <Input placeholder="请输入" />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item name="name" label="应用名称">
            <Input placeholder="请输入" />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item name="work" label="适配功能">
            <Select allowClear style={{ width: 150 }} placeholder="请选择">
              <Select.Option value="模糊定位">模糊定位</Select.Option>
              <Select.Option value="存储隔离">存储隔离</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col>
          <Space>
            <Button type="primary" htmlType="submit" disabled={fetchLoading}>
              查询
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
              }}
            >
              重置
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
};

export default connect(mapStateToProps)(TemplateHeader);

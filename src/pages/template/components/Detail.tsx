import React from 'react';
import { useDispatch, connect } from 'umi';
import TemplateModel from '../models/template';
import { Form, Modal, Button } from 'antd';

type DetailProps = {
  toggleItemDetail: TemplateItem | undefined;
};

const TemplateDetail = ({ toggleItemDetail }: DetailProps) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    const { toggleItemDetailAct } = TemplateModel.actions;
    dispatch(toggleItemDetailAct(null));
  };

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  if (!toggleItemDetail) return null;

  const { name, packageName, work, sign, jira } = toggleItemDetail;

  return (
    <>
      <Modal
        title="详情"
        visible={Boolean(toggleItemDetail)}
        closable={false}
        footer={
          <Button type="primary" onClick={handleClose}>
            {'确定'}
          </Button>
        }
      >
        <Form {...layout} name="control-ref">
          <Form.Item label="应用包名">{packageName}</Form.Item>
          <Form.Item label="应用名称">{name}</Form.Item>
          <Form.Item label="使用功能">{work}</Form.Item>
          <Form.Item label="签名">{sign}</Form.Item>
          <Form.Item label="关联JIRA">{jira}</Form.Item>
        </Form>
      </Modal>
    </>
  );
};

function mapStateToProps(state: DataState): DetailProps {
  return {
    toggleItemDetail: state.template.toggleItemDetail,
  };
}
export default connect(mapStateToProps)(TemplateDetail);

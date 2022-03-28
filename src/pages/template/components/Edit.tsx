import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'umi';
import TemplateModel from '../models/template';
import { Modal, Form, Input, Select } from 'antd';
import * as _ from 'lodash';

type EditProp = {
  toggleItemEdit?: NullableEmptyAbleData<TemplateItem>;
  updateLoading: boolean | undefined;
  addLoading: boolean | undefined;
};

const TemplateEdit = ({
  toggleItemEdit,
  updateLoading,
  addLoading,
}: EditProp) => {
  const dispatch = useDispatch();
  const { toggleItemEditAct, addItemAct, updateItemAct } =
    TemplateModel.actions;

  const [confirmDisable, setConfirmDisable] = useState(true);

  // ------------formItem标签写法待优化-------------------
  const [form] = Form.useForm<Partial<TemplateItem>>();

  // ------------form表单赋值待优化-------------------
  useEffect(() => {
    // toggleItemEdit为null时，form未初始化，无法执行方法
    if (!toggleItemEdit) return;

    if (isEditPage()) {
      // 编辑界面赋值
      form.setFieldsValue(toggleItemEdit);
    } else {
      // 新建界面清空
      form.resetFields();
    }
  }, [form, toggleItemEdit]);

  // 关闭
  const handleClose = () => {
    dispatch(toggleItemEditAct(null));
  };

  // 编辑
  const handleEditConfirm = async () => {
    const formData = form.getFieldsValue();
    if (!isFormDataChanged(formData, toggleItemEdit)) return;

    dispatch(
      updateItemAct({
        ...(toggleItemEdit as TemplateItem),
        ...formData,
      }),
    );
  };

  // 新增
  const handleAddConfirm = async () => {
    dispatch(addItemAct(form.getFieldsValue()));
  };

  const isEditPage = () => {
    // 新增传入为{},编辑为DataItem
    return toggleItemEdit && Object.keys(toggleItemEdit).length > 0;
  };

  // 深比较form表单值是否变化
  const isFormDataChanged = (
    formData: Partial<TemplateItem>,
    initData: NullableEmptyAbleData<TemplateItem>,
  ) => {
    return (Object.keys(formData) as Array<keyof TemplateItem>).some((key) =>
      _.isEqual(formData[key], (initData as TemplateItem)[key]),
    );
  };

  // 检测表单
  const asyncValidate = async () => {
    try {
      // ------------form表单校验待优化-------------------
      await form.validateFields([
        'packageName',
        'name',
        'work',
        'sign',
        'jira',
      ]);
    } catch ({ errorFields }) {
      setConfirmDisable(errorFields.length);
    }
  };

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  return (
    <>
      <Modal
        width={800}
        title={isEditPage() ? '编辑' : '新增'}
        onCancel={handleClose}
        onOk={isEditPage() ? handleEditConfirm : handleAddConfirm}
        cancelText="取消"
        okText="确认"
        confirmLoading={isEditPage() ? updateLoading : addLoading}
        destroyOnClose
        visible={Boolean(toggleItemEdit)}
        okButtonProps={{
          disabled: confirmDisable,
        }}
      >
        <Form {...layout} form={form} onValuesChange={() => asyncValidate()}>
          <Form.Item
            name="packageName"
            label="应用包名"
            rules={[
              {
                required: true,
                message: '请输入单个包名!',
              },
            ]}
          >
            <Input placeholder="请输入单个包名" />
          </Form.Item>
          <Form.Item
            name="name"
            label="应用名称"
            rules={[
              {
                required: true,
                message: '请输入应用名称!',
              },
            ]}
          >
            <Input placeholder="请输入应用名称" />
          </Form.Item>
          <Form.Item
            name="work"
            label="适配功能"
            rules={[
              {
                required: true,
                message: '请输入应用名称!',
              },
            ]}
          >
            <Select allowClear style={{ width: 150 }}>
              <Select.Option value="模糊定位">模糊定位</Select.Option>
              <Select.Option value="存储隔离">存储隔离</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="sign"
            label="签名"
            rules={[
              {
                required: true,
                message: '请输入签名!',
              },
            ]}
          >
            <Input placeholder="请输入签名" />
          </Form.Item>
          <Form.Item
            name="jira"
            label="关联JIRA"
            rules={[
              {
                required: true,
                message: '请输入单个JIRA链接!',
              },
            ]}
          >
            <Input placeholder="请输入单个JIRA链接" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

function mapStateToProps(state: DataState): EditProp {
  return {
    toggleItemEdit: state.template.toggleItemEdit,
    updateLoading: state.loading.effects['template/update-template'],
    addLoading: state.loading.effects['template/add-template'],
  };
}
export default connect(mapStateToProps)(TemplateEdit);

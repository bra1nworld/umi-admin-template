import React, { useState } from 'react';
import { TableProps, ColumnType } from 'antd/lib/table';
import { Space, Button, Modal, Row, Col, Table } from 'antd';
import { useDispatch } from 'umi';
import templateModel from '../models/template';

export interface IProps extends TableProps<TemplateItem> {
  loading?: boolean;
}

export function TableList(props: IProps): JSX.Element {
  const [choosedItemIdArr] = useState<string[]>([]);

  const { toggleItemDetailAct, toggleItemEditAct, deleteItemsAct } =
    templateModel.actions;

  const dispatch = useDispatch();

  // 新增
  const addItem = () => {
    dispatch(toggleItemEditAct({}));
  };

  // 批量删除
  const multiDelete = () => {
    if (choosedItemIdArr.length < 1) {
      Modal.info({
        content: '未选中任何数据！',
      });
      return;
    }

    Modal.confirm({
      content: `删除后将无法恢复。确定删除吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        dispatch(deleteItemsAct(choosedItemIdArr));
      },
    });
  };

  const Actions = (item: TemplateItem) => {
    return (
      <Space>
        <Button
          type="link"
          onClick={() => {
            Modal.confirm({
              content: `删除后将无法恢复。确定删除${item.name}吗？`,
              okText: '确定',
              cancelText: '取消',
              onOk: () => {
                dispatch(deleteItemsAct([item.id]));
              },
            });
          }}
        >
          {'删除'}
        </Button>
        <Button
          type="link"
          onClick={() => {
            dispatch(toggleItemEditAct(item));
          }}
        >
          {'编辑'}
        </Button>
        <Button
          type="link"
          onClick={() => {
            dispatch(toggleItemDetailAct(item));
          }}
        >
          {'详情'}
        </Button>
      </Space>
    );
  };

  const columns: Array<ColumnType<TemplateItem>> = [
    {
      dataIndex: 'packageName',
      title: '应用包名',
    },
    {
      dataIndex: 'name',
      title: '应用名称',
    },
    {
      dataIndex: 'work',
      title: '适配功能',
    },
    {
      dataIndex: 'operater',
      title: '操作人',
    },
    {
      dataIndex: 'updatedAt',
      title: '修改时间',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => Actions(record),
    },
  ];

  const tableProps: TableProps<TemplateItem> = {
    ...props,
    columns,
    rowKey: (recode: TemplateItem) => recode.id,
  };

  return (
    <>
      <Row>
        <Col style={{ textAlign: 'right' }}>
          <Space>
            <Button type="primary" onClick={addItem}>
              新增
            </Button>
            <Button onClick={multiDelete}>批量删除</Button>
          </Space>
        </Col>
      </Row>
      {/* <Table {...tableProps}></Table> */}
      <Table {...tableProps}></Table>
    </>
  );
}

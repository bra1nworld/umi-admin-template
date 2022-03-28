import React, { useEffect, useMemo } from 'react';
import { useDispatch, connect } from 'umi';
import TableList from './components/TableList';
import TemplateModel from './models/template';
import TemplateDetail from './components/Detail';
import TemplateEdit from './components/Edit';
import TemplateHeader from './components/Header';

type Prop = {
  data: TablePage.State<TemplateItem>;
  fetchLoading: boolean | undefined;
};

const Template = ({ data, fetchLoading }: Prop) => {
  const dispatch = useDispatch();

  const updatePagination = (pagination: PaginationProps) => {
    dispatch(TemplateModel.actions.loadDataAct({ pagination, query }));
  };

  useEffect(() => {
    updatePagination(pagination);
  }, []);

  const {
    pageQuery: { pagination, query },
    table: { items, ...paginationResult },
  } = useMemo(() => {
    return data || {};
  }, [data.table, data.pageQuery]);

  return (
    <>
      <TemplateHeader />
      <TableList
        dataSource={items}
        loading={fetchLoading}
        pagination={{
          showSizeChanger: true,
          ...paginationResult,
        }}
        onChange={updatePagination}
      />
      <TemplateDetail></TemplateDetail>
      <TemplateEdit></TemplateEdit>
    </>
  );
};

function mapStateToProps(state: DataState): Prop {
  return {
    data: state.template,
    fetchLoading: state.loading.effects['template/fetch-template'],
  };
}
export default connect(mapStateToProps)(Template);

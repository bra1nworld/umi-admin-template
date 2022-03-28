export type HeaderProps = {
  queryTemplate: TablePage.Query<TemplateItem>;
  fetchLoading: boolean | undefined;
};

export function mapStateToProps(state: DataState): HeaderProps {
  return {
    queryTemplate: state.template.pageQuery,
    fetchLoading: state.loading.effects['template/fetch-template'],
  };
}

// since TS 2.9 we are able to import types into global modules declaration using import() syntax:
// if use import ("antd") directly,type.d.ts is module file instead of global declaration file

type PaginationProps = import('antd').PaginationProps;
type Loading = import('umi').Loading;

type DvaEffect = {
  call: (...args: any[]) => any;
  put: (...args: any[]) => any;
  select: (...args: any[]) => any;
};

// Record<string, never> is {}

// eslint 会对类型为{} 报错，特殊处理
// toggleItemEdit的方法采用取巧的方式设置三种状态，待优化
type NullableEmptyAbleData<Data> =
  | Data
  | null
  | undefined
  | Record<string, never>;

declare namespace TablePage {
  interface State<Item> {
    table: Table<Item>;
    pageQuery: Query<Item>;
    toggleItemDetail?: Item;
    toggleItemEdit?: NullableEmptyAbleData<Item>;
  }

  interface Query<Item> {
    query: Partial<Item>;
    pagination: PaginationProps;
  }

  interface Table<Item> {
    items: Item[];
    current: number;
    pageSize: number;
    total: number;
  }
}

interface TemplateItem {
  id: string;
  packageName: string;
  name: string;
  work: string;
  operater: string;
  updatedAt: string;
  sign: string;
  jira: string;
}

interface DataState {
  template: TablePage.State<TemplateItem>;
  loading: Loading;
}

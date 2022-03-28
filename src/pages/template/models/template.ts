import * as api from '../services/template';
import { createAction } from '@/utils/modelUtils';

type ID = string;

const namespace = 'template';
const action = <T>(type: string) => createAction<T>(`${namespace}/${type}`);

export const EXCEPTION = 'exception';
export const FETCH_TEMPLATE = 'fetch-template';
export const ADD_TEMPLATE = 'add-template';
export const UPDATE_TEMPLATE = 'update-template';
export const SAVE_TEMPLATE = 'save-template';
export const UPDATE_TEMPLATE_QUERY = 'update-template-query';
export const TOGGLE_TEMPLATE_DETAIL = 'toggle-template-detail';
export const TOGGLE_TEMPLATE_EDIT = 'toggle-template-edit';
export const DELETE_TEMPLATE = 'delete-template';

export default {
  namespace,
  state: {
    // 将查询与结果状态分离
    table: {
      items: [],
      current: 1,
      pageSize: 10,
      total: 0,
    },
    // query 作为状态同步是为了某些特殊场景（翻页到第n页，新增数据后刷新表格，定位到之前的页数）
    pageQuery: {
      query: {},
      pagination: {
        current: 1,
        pageSize: 10,
      },
    },
    toggleItemDetail: null,
    toggleItemEdit: null,
  },
  actions: {
    loadDataAct: action<TablePage.Query<TemplateItem>>(FETCH_TEMPLATE),
    updateQueryAct: action<TablePage.Query<TemplateItem>>(
      UPDATE_TEMPLATE_QUERY,
    ),
    toggleItemDetailAct: action<TemplateItem | null>(TOGGLE_TEMPLATE_DETAIL),
    toggleItemEditAct:
      action<NullableEmptyAbleData<TemplateItem>>(TOGGLE_TEMPLATE_EDIT),
    deleteItemsAct: action<string[]>(DELETE_TEMPLATE),
    updateItemAct: action<TemplateItem>(UPDATE_TEMPLATE),
    addItemAct: action<Partial<TemplateItem>>(ADD_TEMPLATE),
  },

  effects: {
    *[EXCEPTION](action: { error: any }, { put }: DvaEffect): any {
      yield put({
        type: '@app/message/error',
        error: action.error,
      });
    },

    *[FETCH_TEMPLATE](
      { payload }: { payload: TablePage.Query<TemplateItem> },
      { call, put }: DvaEffect,
    ): any {
      let callResult;
      try {
        callResult = yield call(api.getTemplate, payload);
      } catch (ex) {
        yield put({
          type: EXCEPTION,
          error: ex,
        });
        return;
      }
      if (callResult.data) {
        const result = callResult.data;
        yield put({
          type: SAVE_TEMPLATE,
          payload: result,
        });
      }
      yield put({
        type: UPDATE_TEMPLATE_QUERY,
        payload: payload,
      });
    },
    *[ADD_TEMPLATE](
      { payload }: { payload: Partial<TemplateItem> },
      { call, put, select }: DvaEffect,
    ): any {
      let callResult;
      try {
        callResult = yield call(api.addTemplate, payload);
      } catch (ex) {
        yield put({
          type: EXCEPTION,
          error: ex,
        });
        return;
      }

      // 更新成功刷新页面
      if (callResult.data.result === 'success') {
        // 关闭编辑页
        yield put({
          type: TOGGLE_TEMPLATE_EDIT,
          payload: null,
        });

        // 刷新表格
        const pageQuery: TablePage.State<TemplateItem> = yield select(
          ({ template }: { template: TablePage.State<TemplateItem> }) => {
            return template.pageQuery;
          },
        );

        yield put({
          type: FETCH_TEMPLATE,
          payload: pageQuery,
        });
      }
    },
    *[UPDATE_TEMPLATE](
      { payload }: { payload: TemplateItem },
      { call, put, select }: DvaEffect,
    ): any {
      let callResult;
      try {
        callResult = yield call(api.updateTemplate, payload);
      } catch (ex) {
        yield put({
          type: EXCEPTION,
          error: ex,
        });
        return;
      }

      // 更新成功刷新页面
      if (callResult.data.result === 'success') {
        // 关闭编辑页
        yield put({
          type: TOGGLE_TEMPLATE_EDIT,
          payload: null,
        });

        // 刷新表格
        const pageQuery: TablePage.State<TemplateItem> = yield select(
          ({ template }: { template: TablePage.State<TemplateItem> }) => {
            return template.pageQuery;
          },
        );

        yield put({
          type: FETCH_TEMPLATE,
          payload: pageQuery,
        });
      }
    },
    *[DELETE_TEMPLATE](
      { payload }: { payload: Array<ID> },
      { call, put, select }: DvaEffect,
    ): any {
      let callResult;
      try {
        callResult = yield call(api.deleteTemplate, payload);
      } catch (ex) {
        yield put({
          type: EXCEPTION,
          error: ex,
        });
        return;
      }

      // 更新成功刷新页面
      if (callResult.data.result === 'success') {
        const template: TablePage.State<TemplateItem> = yield select(
          ({ template }: { template: TablePage.State<TemplateItem> }) => {
            return template;
          },
        );
        const { table, pageQuery } = template;
        const itemSize = table.items.length;
        const current = pageQuery.pagination.current as number;
        if (itemSize - payload.length === 0 && current > 1) {
          pageQuery.pagination.current = current - 1;
          yield put({
            type: UPDATE_TEMPLATE_QUERY,
            payload: pageQuery,
          });
        }
        yield put({
          type: FETCH_TEMPLATE,
          payload: pageQuery,
        });
      }
    },
  },
  reducers: {
    [SAVE_TEMPLATE](
      state: TablePage.State<TemplateItem>,
      { payload }: { payload: TemplateItem[] },
    ): any {
      return { ...state, table: payload };
    },

    [UPDATE_TEMPLATE_QUERY](
      state: TablePage.State<TemplateItem>,
      { payload }: { payload: TablePage.Query<TemplateItem> },
    ): any {
      return {
        ...state,
        pageQuery: payload,
      };
    },

    [TOGGLE_TEMPLATE_DETAIL](
      state: TablePage.State<TemplateItem>,
      { payload }: { payload: TemplateItem | null },
    ): any {
      return {
        ...state,
        toggleItemDetail: payload,
      };
    },

    [TOGGLE_TEMPLATE_EDIT](
      state: TablePage.State<TemplateItem>,
      { payload }: { payload: NullableEmptyAbleData<TemplateItem> },
    ): any {
      return {
        ...state,
        toggleItemEdit: payload,
      };
    },

    [EXCEPTION](
      state: TablePage.State<TemplateItem>,
      action: { error: any },
    ): any {
      return {
        ...state,
        error: action.error,
      };
    },
  },
};

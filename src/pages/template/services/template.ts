import request from '@/utils/request';
import { AxiosPromise } from 'axios';

export function getTemplate(
  params: TablePage.Query<TemplateItem>,
): AxiosPromise {
  return request('/api/template', { method: 'GET', params });
}

export function deleteTemplate(data: string[]): AxiosPromise {
  return request('/api/template/delete', { method: 'DELETE', data });
}

export function updateTemplate(data: TemplateItem): AxiosPromise {
  return request('/api/template/update', { method: 'POST', data });
}
export function addTemplate(data: Partial<TemplateItem>): AxiosPromise {
  return request('/api/template/add', { method: 'POST', data });
}

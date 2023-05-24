import request from '@/utils/request';
export const delTableListApi = (
  ids: string[] | number[]
): Promise<IResponse> => {
  return request.post({ url: '/example/delete', data: { ids } });
};

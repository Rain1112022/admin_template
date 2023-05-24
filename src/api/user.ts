import request from '@/utils/request';
import type { UserLoginType } from './types';

export default {
  login(data: UserLoginType): Promise<IResponse<UserLoginType>> {
    return request.post({
      url: '/user/login',
      data,
    });
  },

  getUserInfo(token: string): Promise<IResponse> {
    return request.get({
      url: '/user/info',
      params: { token },
    });
  },
};

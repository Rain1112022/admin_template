import request from '@/utils/request';

export default {
  testToken() {
    return request.get({
      url: '/token/test',
    });
  },
};

import { create } from 'apisauce';
import qs from 'qs';

export const API = create({
  baseURL: 'https://api.bangtin.vn/v1'
});

export const API_V2 = create({
  baseURL: 'https://api.bangtin.vn/v2'
});

API.addRequestTransform(request => {
  if (request.method === 'get') {
    if (request.params instanceof Object) {
      if (request.url.indexOf('?') > 0) {
        request.url += `&${qs.stringify(request.params)}`;
      } else {
        request.url += `?${qs.stringify(request.params)}`;
      }

      request.params = null;
    }
  }

  return request;
});

API_V2.addRequestTransform(request => {
  if (request.method === 'get') {
    if (request.params instanceof Object) {
      if (request.url.indexOf('?') > 0) {
        request.url += `&${qs.stringify(request.params)}`;
      } else {
        request.url += `?${qs.stringify(request.params)}`;
      }

      request.params = null;
    }
  }

  return request;
});

export const withToken = (token, request, ...args) => {
  if (args.length === 1) {
    args.push(null);
    if (token) {
      args.push({
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return request(...args);
  }

  if (args.length === 2) {
    if (token) {
      args.push({
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return request(...args);
  }

  throw new Error('withToken - Arguments number must be 1 or 2');
};

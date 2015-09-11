const axios = require('axios');

export default class HttpClient {
  constructor(host, req, isServer) {
    ['get', 'post', 'put', 'patch', 'delete'].forEach(
      (method) => {
        this[method] = (path, data, options) => {
          const request = {};

          request.url = host + HttpClient.formatUrl(path);
          request.method = method;

          if (data) {
            request.data = data;
          }

          if (options && options.params) {
            request.params = options.params;
          }

          if (isServer && req.get('cookie')) {
            request.headers = request.headers || {};
            request.headers.cookie = req.get('cookie');
          }

          return axios(request);
        };
      });
  }

  static formatUrl(path) {
    return path[0] !== '/' ? '/' + path : path;
  }
}

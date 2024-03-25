type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const METHODS: Record<Method, Method> = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

interface Options {
    headers?: Record<string, string>;
    method?: Method;
    data?: Record<string, unknown>;
    timeout?: number;
}

type QueryString = string;

type HTTPMethod = (url: string, options?: Options) => Promise<XMLHttpRequest>

function queryStringify(data: Record<string, unknown>): QueryString {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class HTTPTransport {
  get: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.GET }, options?.timeout);

  post: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.POST }, options?.timeout);

  put: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.PUT }, options?.timeout);

  delete: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.DELETE }, options?.timeout);

  request(url: string, options: Options = {}, timeout: number = 5000): Promise<XMLHttpRequest> {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && data ? `${url}${queryStringify(data as Record<string, unknown>)}` : url, // Предполагается, что data - это объект
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = () => reject(new Error('Request was aborted'));
      xhr.onerror = () => reject(new Error('Request failed'));

      xhr.timeout = timeout;
      xhr.ontimeout = () => reject(new Error('Request timeout exceeded'));

      if (!isGet && data) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send();
      }
    });
  }
}

const fetch =  require('isomorphic-fetch');

const getResponseBody = (response) => {
  const bodyIsEmpty = response.status === 204;
  if (bodyIsEmpty) {
    return Promise.resolve();
  }
  return response.json();
};

 const performRequest = (uri, requestData = {}) => {
    return new Promise((resolve, reject) => {
      fetch(uri, requestData)
        .then(getResponseBody)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  const get = (uri, headers) => {
    let requestData = {
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
    };
    if (headers) requestData.headers = Object.assign({}, requestData.headers, headers);
    return performRequest(uri, requestData);
  }

  const post = (uri, data, headers) => {
    let requestData = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
     if (headers) requestData.headers = Object.assign({}, requestData.headers, headers);
    return performRequest(uri, requestData);
  }

  const delet = (uri, data, headers) =>{
    let requestData = {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    if (headers) requestData.headers = Object.assign({}, requestData.headers, headers);
    return performRequest(uri, requestData);
  }

  const put = (uri, data, headers) => {
    let requestData = {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    if (headers) requestData.headers = Object.assign({}, requestData.headers, headers);
    return performRequest(uri, requestData);
  }

  const patch = (uri, data, headers) =>{
    let requestData = {
      method: 'patch',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    if (headers) requestData.headers = Object.assign({}, requestData.headers, headers);
    return performRequest(uri, requestData);
  }

module.exports = {
  get,
  post,
  put,
  delet,
  patch
}

const { ipcRenderer } = require('electron');
const Promise = require('promise');


const actions = {
  test: 'test-asyc-action',
  subcribe: 'subcribe-to-action'
};

ipcRenderer.send(actions.subcribe);

const makeid = (size = 20) => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < size; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

const createRequest = (arg) => { return {  conctionId: makeid(), arg }; };

const service = (action, object) => {
  return new Promise((resolve, reject) =>{
    const request = createRequest(object);
    console.log(request);
    ipcRenderer.on(request.conctionId, (e, con) => {
      ipcRenderer.removeAllListeners(request.conctionId);
      if (con.success) {
        resolve(con.respose);
      } else {
        reject(con);
      }
    });
    ipcRenderer.send(action, request);
  });
};

const subcribe = (action, func) => {
  ipcRenderer.on(action, func);
};
const unsubcribe = (action, func) => {
  ipcRenderer.removeListener(action, func);
};

module.exports = {
  service,
  unsubcribe,
  subcribe,
  actions
};

const { ipcMain } = require('electron');
const sendSubcribe = [];

const success = (respose) => { return { success: true, respose } };

const error = (respose) => { return { success: false, respose } };

const subcribe = (action, func) => {
  ipcMain.on(action, (event, request) => {
    console.log(action, request); 
    const respose = (res) => { event.sender.send(request.conctionId, res); }
    const e = {
      action,
      success: (arg) => { respose(success(arg)) },
      error: (arg) => { respose(error(arg)) },
    } 
    func(e, request.arg);
  })
}

ipcMain.on('subcribe-to-action', (event) => {
  sendSubcribe.push(event);
})

const send = (action, arg) => {
  sendSubcribe.map((e) => {
    e.sender.send(action, arg);
  })
}

/*//Test
subcribe('test-asyc-action', (e) => {  setTimeout(()=>(e.success('async pong')),5000) });
setInterval(()=>{send('test-subcribe','Test')},10000);
//*/
module.exports = {
  subcribe,
  send,
  error,
  success
}

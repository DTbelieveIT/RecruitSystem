import appConfig from '../../config/app.config'
import socketClient from 'socket.io-client'

function createInterface(method) {
    return function (path, data, cb) {
        if (typeof this.token === 'string' && this.token !== '') {
            data.token = this.token;
        }
        this.emit('message', { method: method, path: path, data: data }, cb);
    };
}

function setToken(newToken) {
    this.token = newToken;
}

function socketWrap(socket) {
    socket.token = '';
    socket.get = createInterface('GET');
    socket.post = createInterface('POST');
    socket.put = createInterface('PUT');
    socket.delete = createInterface('DELETE');
    socket.setToken = setToken;
    return socket;
}

const serverUrl = process.env.NODE_ENV === 'production' ?
    `http://${appConfig.server}:${appConfig.port}/` :
    `http://${appConfig.serverDev}:${appConfig.portDev}/`
export default socketWrap(socketClient(serverUrl));

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _snekfetch = require('snekfetch');

var _snekfetch2 = _interopRequireDefault(_snekfetch);

var _Constants = require('./Constants');

var _Post = require('./Post');

var _Post2 = _interopRequireDefault(_Post);

var _Collection = require('./Collection');

var _Collection2 = _interopRequireDefault(_Collection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Client {
  static authenticate(username, password, type) {
    const client = new Client(null, type);
    return client._req('post', '/auth/login', { alias: username, pass: password }).then(({ access_token }) => {
      client.accessToken = access_token;
      return client;
    });
  }

  static authenticateToken(token) {
    const client = new Client(token, 'https');
	return client;
  }

  constructor(accessToken, type = 'https') {
    if (!_Constants.Endpoints[type]) throw new Error('Invalid WriteAs endpoint type');
    this.endpoint = _Constants.Endpoints[type];
    this.accessToken = accessToken;
  }

  createPost(body, { title, font, lang, rtl, crosspost } = {}) {
    return this._req('post', '/posts', { body, title, font, lang, rtl, crosspost }).then(p => new _Post2.default(this, p));
  }

  getPost(id) {
    return this._req('get', `/posts/${id}`).then(p => new _Post2.default(this, p));
  }

  createCollection(name, alias) {
    return this._req('post', '/collections', { name, alias }).then(c => new _Collection2.default(this, c));
  }

  getCollection(alias) {
    return this._req('get', `/collections/${alias}`).then(c => new _Collection2.default(this, c));
  }

  _req(method, path, data) {
    const req = _snekfetch2.default[method](`${this.endpoint}${path}`);
    if (data) req.send(data);
    return req.then(r => r.body.data);
  }
}
exports.default = Client;

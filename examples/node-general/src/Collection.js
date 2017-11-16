'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Post = require('./Post');

var _Post2 = _interopRequireDefault(_Post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Collection {
  constructor(client, data) {
    this.client = client;
    this.alias = data.alias;
    this.title = data.title;
    this.description = data.description;
    this.styleSheet = data.style_sheet;
    this.email = data.email;
    this.totalPosts = data.totalPosts;
  }

  getPosts() {
    return this.client._req('get', `/collections/${this.alias}/posts`).then(a => a.posts.map(p => new _Post2.default(this.client, p)));
  }

  pinPost(post, position) {
    return this.client._req('post', `/collections/${this.alias}/pin`, {
      id: post.id || post,
      position
    }).then(() => this);
  }

  unpinPost(post) {
    return this.client._req('post', `/collections/${this.alias}/unpin`, { id: post.id || post }).then(() => this);
  }

  movePosts(posts) {
    return this.client._req('post', `/collections/${this.alias}/collect`, posts).then(() => this);
  }

  delete() {
    return this.client._req('delete', `/collections/${this.alias}`);
  }
}
exports.default = Collection;

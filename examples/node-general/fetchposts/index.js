var wa = require('../src/index.js');

/// --- CONFIGURATION ---
var token = '';
var blog = '';
/// --- END CONFIGURATION


// Fetch posts from blog
var client = wa.default.authenticateToken(token);
var data = { 'alias' : blog };
var blog = new wa.Collection(client, data);
b = blog.getPosts();

b.then( posts =>
  // TODO: Do something with the `posts` returned here
  console.log(posts)
);

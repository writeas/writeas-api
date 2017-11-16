/**
 * A simple utility for getting an authentication token for interacting with
 * the Write.as API.
 */

var wa = require('../src/index.js');

// Get authentication information from args
var username = process.argv[2];
var password = process.argv[3];

// Validate input
if (username == '' || typeof username === 'undefined') {
  console.error('usage: node token/ username password');
  process.exit(1);
}
if (password == '' || typeof password === 'undefined') {
  console.error('usage: node token/ username password');
  process.exit(1);
}

// Authenticate
console.log('Authenticating user '+username+'...');
wa.default.authenticate(username, password).then( (client) => {
  // Success
  console.log(client.accessToken);
});

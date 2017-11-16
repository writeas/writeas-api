General API examples (Node)
===========================

Some examples of API usages, written for Node.js.

## Getting Started

Make sure you have Node installed. Then:

```bash
git clone git@github.com:writeas/writeas-api.git
cd writeas-api/examples/node-general

# install dependencies
npm install

# generate API token
node token/ username password

# EDIT fetchposts/index.js
# INSERT the access token received on the previous step in the CONFIGURATION section (`token`)
# INSERT your blog name in the CONFIGURATION section (`blog`)

# retrieve all posts on your configured blog
node fetchposts/
```

Use `fetchposts/index.js` as a starting point for any code you want to write that imports Write.as blog posts. Do something with the returned data where you see `TODO: ...`

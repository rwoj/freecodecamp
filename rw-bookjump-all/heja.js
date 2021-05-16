  "heroku-postbuild": "cd client && npm install --only=dev && npm install && npm run build"
  "./node_modules/.bin/babel-node src/index.js"

    "start": "nodemon --exec babel-node  src/index.js"


    "start": "nodemon lib/index.js --exec babel-node",
    "build": "babel src/lib -d dist",

    "start": "nodemon src/index.js --exec babel-node",
    "build": "babel src -d dist",

{
  "version": 2,
  "builds": [
    {
      "src": "functions/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/getWhitelist",
      "dest": "/functions/getWhitelist.js"
    },
    {
      "src": "/api/updateWhitelist",
      "dest": "/functions/updateWhitelist.js"
    },
    {
      "src": "/api/removeWhitelist",
      "dest": "/functions/removeWhitelist.js"
    },
    {
      "src": "/api/addWhitelist",
      "dest": "/functions/addWhitelist.js"
    },
    {
      "src": "/api/unwhitelist",
      "dest": "/functions/unwhitelist.js"
    }
  ],
  "functions": {
    "api/updateWhitelist.js": {
      "memory": 128,
      "maxDuration": 10
    },
    "api/addWhitelist.js": {
      "memory": 128,
      "maxDuration": 10
    },
    "api/removeWhitelist.js": {
      "memory": 128,
      "maxDuration": 10
    },
    "api/unwhitelist.js": {
      "memory": 128,
      "maxDuration": 10
    }
  }
}

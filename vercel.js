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
      "src": "/api/whitelist",
      "dest": "/api/whitelist.json"
    },
    {
      "src": "/api/update",
      "dest": "/functions/update.js"
    },
    {
      "src": "/api/add",
      "dest": "/functions/add.js"
    },
    {
      "src": "/api/remove",
      "dest": "/functions/remove.js"
    }
  ]
}

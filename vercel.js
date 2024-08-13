{
  "version": 2,
  "builds": [
    { "src": "api/whitelist/*.json", "use": "@vercel/static" },
    { "src": "functions/*.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/api/whitelist/update", "dest": "/functions/update.js" },
    { "src": "/api/whitelist/add", "dest": "/functions/add.js" },
    { "src": "/api/whitelist/remove", "dest": "/functions/remove.js" }
  ]
}

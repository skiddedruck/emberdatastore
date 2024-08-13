const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { key, discord_user_id, data } = req.body;

    if (key !== process.env.ADD_KEY) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    const filePath = path.join(__dirname, '../api/whitelist/PlayerWhitelist.json');
    const fileContent = fs.readFileSync(filePath);
    const jsonData = JSON.parse(fileContent);

    jsonData["WhitelistedUsers"][discord_user_id] = data;

    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

    res.status(200).json({ success: 'User added to whitelist' });
};

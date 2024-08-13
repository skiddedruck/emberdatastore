// functions/addWhitelist.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { key, discord_user_id, data } = req.body;

    if (key !== process.env.ADD_KEY) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    try {
      // Fetch the current whitelist
      const response = await fetch('https://sk1ddedsdatabase.vercel.app/api/PlayerWhitelist.json');
      if (!response.ok) throw new Error('Failed to fetch the whitelist');

      const currentData = await response.json();

      // Add or update the user
      currentData.WhitelistedUsers[discord_user_id] = data;

      // Update the whitelist
      const updateResponse = await fetch('https://sk1ddedsdatabase.vercel.app/api/PlayerWhitelist.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentData),
      });

      if (!updateResponse.ok) throw new Error('Failed to update the whitelist');

      res.status(200).json({ success: 'User added or updated in whitelist' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// functions/removeWhitelist.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { key, discord_user_id } = req.body;

    if (key !== process.env.REMOVE_KEY) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    try {
      // Fetch the current whitelist
      const response = await fetch('https://sk1ddedsdatabase.vercel.app/api/PlayerWhitelist.json');
      if (!response.ok) throw new Error('Failed to fetch the whitelist');

      const data = await response.json();

      if (!(discord_user_id in data.WhitelistedUsers)) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Remove the user
      delete data.WhitelistedUsers[discord_user_id];

      // Update the whitelist
      const updateResponse = await fetch('https://sk1ddedsdatabase.vercel.app/api/PlayerWhitelist.json', {
        method: 'PUT',  // Adjust method if necessary
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!updateResponse.ok) throw new Error('Failed to update the whitelist');

      res.status(200).json({ success: 'User removed from whitelist' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

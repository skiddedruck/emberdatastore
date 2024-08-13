// functions/addWhitelist.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { key, discord_user_id, data } = req.body;

    // Check if the key is correct
    if (key !== process.env.ADD_KEY) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    try {
      // Fetch the current whitelist
      const response = await fetch('https://sk1ddedsdatabase.vercel.app/api/PlayerWhitelist.json');
      if (!response.ok) throw new Error('Failed to fetch the whitelist');

      const currentData = await response.json();

      // Add or update the user in the whitelist
      currentData.WhitelistedUsers[discord_user_id] = {
        ...data,
        // Ensure that all required fields are included
        hash: data.hash || currentData.WhitelistedUsers[discord_user_id]?.hash || '',
        attackable: data.attackable || currentData.WhitelistedUsers[discord_user_id]?.attackable || false,
        level: data.level || currentData.WhitelistedUsers[discord_user_id]?.level || 1,
        tags: data.tags || currentData.WhitelistedUsers[discord_user_id]?.tags || []
      };

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

// functions/updateWhitelist.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { key, data } = req.body;

    if (key !== process.env.UPDATE_KEY) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    try {
      const response = await fetch('https://sk1ddedsdatabase.vercel.app/api/PlayerWhitelist.json', {
        method: 'PUT',  // Adjust method if necessary
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update the whitelist');

      const result = await response.json();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

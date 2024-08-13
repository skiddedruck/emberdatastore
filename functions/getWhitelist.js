// functions/getWhitelist.js
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await fetch('https://sk1ddedsdatabase.vercel.app/api/PlayerWhitelist.json');
      if (!response.ok) throw new Error('Failed to fetch the whitelist');

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

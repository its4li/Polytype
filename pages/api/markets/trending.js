export default async function handler(req, res){
  try {
    const base = process.env.NEXT_PUBLIC_POLY_API || 'https://api.polymarket.com'
    const r = await fetch(`${base}/markets`)
    if(!r.ok){
      const txt = await r.text()
      return res.status(502).json({ error: 'polymarket fetch failed', details: txt })
    }
    const data = await r.json()
    data.sort((a,b) => (b.volume_24h || 0) - (a.volume_24h || 0))
    res.status(200).json(data.slice(0, 30))
  } catch (e){
    console.error(e)
    res.status(500).json({ error: 'internal' })
  }
}

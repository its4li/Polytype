import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { username, marketId, marketTitle, outcome } = req.body
  if(!username || !marketId || !outcome) return res.status(400).json({ error: 'missing fields' })
  try {
    const { data, error } = await supabase
      .from('predictions')
      .insert([{
        username,
        market_id: marketId,
        market_title: marketTitle || null,
        outcome,
        tx_status: 'simulated',
        settled: false,
        correct: null
      }])
      .select()
    if(error) throw error
    res.status(200).json({ ok: true, inserted: data[0] })
  } catch (e){
    console.error(e)
    res.status(500).json({ error: 'db error', detail: e.message })
  }
}

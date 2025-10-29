import useSWR from 'swr'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import MarketCard from '../components/MarketCard'
import { motion } from 'framer-motion'

const fetcher = (u) => fetch(u).then(r=>r.json())

export default function Home(){
  const { data, error } = useSWR('/api/markets/trending', fetcher, { refreshInterval: 30_000 })
  const [selected, setSelected] = useState(null)
  const [username, setUsername] = useState('')
  const [outcome, setOutcome] = useState('yes')
  const [msg, setMsg] = useState('')

  async function submitPrediction(){
    if(!selected) return alert('بازاری انتخاب نشده');
    if(!username) return alert('اسم بنویس');
    const res = await fetch('/api/predictions/submit', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        username, marketId: selected.id, marketTitle: selected.title, outcome
      })
    })
    const j = await res.json()
    if(j.ok) setMsg('ثبت شد — XP پس از بسته شدن بازار تعلق می‌گیرد'); else setMsg('خطا: ' + (j.error||'نامشخص'))
  }

  return (
    <div>
      <Navbar />
      <main style={{maxWidth:1200, margin:'20px auto', padding:'24px'}}>
        <motion.section layout>
          <h1 style={{fontSize:28, marginBottom:6}}>Trending Markets</h1>
          <div className="kicker">دیتا مستقیم از Polymarket (read-only)</div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:12, marginTop:18}}>
            {!data && <div>Loading…</div>}
            {data && data.map(m => <MarketCard key={m.id} market={m} onSelect={(mm)=> setSelected(mm)} />)}
          </div>
        </motion.section>

        <section style={{marginTop:30}}>
          <h2>Submit simulated prediction</h2>
          <div style={{display:'grid', gap:8, maxWidth:560}}>
            <input placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} style={{padding:10, borderRadius:8}} />
            <div style={{padding:12, borderRadius:8, background:'#071026'}}>{selected ? selected.title : 'No market selected'}</div>
            <select value={outcome} onChange={e=>setOutcome(e.target.value)} style={{padding:10, borderRadius:8}}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <div style={{display:'flex', gap:10}}>
              <button onClick={submitPrediction} className="px-4 py-2 rounded-md" style={{background:'linear-gradient(90deg,#6b21a8,#06b6d4)'}}>Submit</button>
              <div className="kicker" style={{alignSelf:'center'}}>{msg}</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

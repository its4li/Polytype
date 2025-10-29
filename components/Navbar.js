import React from 'react'
import { Star } from 'lucide-react'

export default function Navbar(){
  return (
    <nav className="w-full py-4 px-6 flex items-center justify-between">
      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <div style={{width:44, height:44, borderRadius:10, background:'linear-gradient(90deg,#6b21a8,#06b6d4)', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Star size={20} color="white" />
        </div>
        <div>
          <div style={{fontWeight:700}}>MetaPredict</div>
          <div className="kicker">Polymarket data • Simulated predictions</div>
        </div>
      </div>
      <div style={{display:'flex', gap:10, alignItems:'center'}}>
        <button className="px-3 py-2 rounded-md" style={{background:'#0b1220', border:'1px solid rgba(255,255,255,0.04)'}}>Login</button>
        <button className="px-4 py-2 rounded-md" style={{background:'linear-gradient(90deg,#6b21a8,#06b6d4)', color:'#04202b'}}>Get XP</button>
      </div>
    </nav>
  )
}

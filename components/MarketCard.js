import React from 'react'
import { motion } from 'framer-motion'

export default function MarketCard({market, onSelect}){
  const prob = (market.probability||0).toFixed(2)
  return (
    <motion.div layout initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} whileHover={{scale:1.02}} className="card">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <div style={{fontWeight:700, fontSize:16}}>{market.title}</div>
          <div className="kicker">Prob: {prob}% · Vol24h: {market.volume_24h || 0}</div>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:8, alignItems:'flex-end'}}>
          <button onClick={()=> onSelect(market)} style={{background:'transparent', border:'1px solid rgba(255,255,255,0.06)', padding:'8px 12px', borderRadius:8}}>Select</button>
          <a target="_blank" rel="noreferrer" href={`https://polymarket.com/markets/${market.id}`} className="kicker">Open</a>
        </div>
      </div>
    </motion.div>
  )
}

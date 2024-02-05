import React from 'react'

export default function CreateBtn({handleCreate}) {
  return (
    <div>
    <button onClick={handleCreate} style={{background:'#9a80b4', padding:'3px',margin:'10px',borderRadius:'10px'}}>create Repo</button>
  </div>
  )
}

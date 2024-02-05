import React from 'react'
import FolderShow from './FolderShow'
import FileShow from './FileShow'

export default function NestedFolders({owner,repoName,item}) {
  return (
    <>
      <h6>{item.path}</h6>
      {
        (item.type==='dir')? 
          <FolderShow/>: 
          <FileShow/>
      }
    </>
  )
}

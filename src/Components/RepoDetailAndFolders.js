import React, { useEffect, useState } from 'react'
import InitialPushinComands from './InitialPushinComands';
import FilesAndFolders from './FilesAndFolders';
import { Link } from 'react-router-dom';

export default function RepoDetailAndFolders({repo}) {
   const [show,setShow] = useState(false);
   const [contents,setContents] = useState([])

  //  useEffect(() => {
  //   const fetchRepoContents = async () => {
  //     try {
  //       const response = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/contents`, {
  //         headers: {
  //           Authorization: process.env.ACCESS_TOKEN, // Replace with your GitHub access token
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error('Failed to fetch repository contents');
  //       }

  //       const data = await response.json();
  //       setContents(data);
  //       setShow(false);
  //     } catch (error) {
  //       console.error('Error fetching repository contents:', error.message);
  //       setShow(false);
  //     }
  //   };

  //   fetchRepoContents();
  // }, [repo]);

  return (
    <div>
      {/* <h5>
      <Link to={`/${repo.name}`}>
           {repo.name}
        </Link>
      </h5>
      {
      show &&(
      (contents.length!==0)?
       contents.map((contents)=>{
          return <FilesAndFolders repo ={repo} content = {contents}/>
       })
       :<InitialPushinComands/>
      ) } */}
    </div>
  )
}

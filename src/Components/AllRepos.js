import React, { useEffect,useState } from 'react'
import RepoDetailAndFolders from './RepoDetailAndFolders'
import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';
import FilesAndFolders from './FilesAndFolders';
import InitialPushinComands from './InitialPushinComands';

export default function AllRepos() {
  const [show,setShow] = useState(null);
  const [link,setLink] = useState(null);

  const handleLinkShow=(repo)=>{
        if(repo.name===link)
         setLink(null);
        else 
        setLink(repo.name);
  }
  const repos = useLoaderData();
  const handleClick=(repo)=>{
    if(show===repo.name) setShow(null);

    else setShow(repo.name);
  }
  return (
    <>
    <h1 style={{marginLeft:'182px'}}>Projects</h1>
    <div className="container">
     {
     repos.map((repo)=>(
      <>
      <div className="d-flex" style={{gap:'100px',margin:'10px'}}>
        <div className="container">
       <h6 onClick={()=> handleClick(repo)}>{repo.name}</h6>
       </div>
       <div className="container">
       <button onClick={()=>handleLinkShow(repo)}>Link</button>
       {
        (link===repo.name) && <h6>{`https://github.com/${repo.owner.login}/${repo.name}.git`}</h6>
       }

       </div>
       </div>
        {
        (show === repo.name) && ((repo.files && repo.files.length === 0) ? <InitialPushinComands /> : <FilesAndFolders repo= {repo} repoName={repo.name} owner={repo.owner.login} path={null} />)

        }   </>
     ))
    }
    </div>
    </>
  )
}


// Fetching repositories function
const fetchRepos = async (accessToken) => {
  try {
    const response = await fetch('https://api.github.com/user/repos', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching repositories:', error.message);
    throw error; // Propagate the error to handle it where the function is called
  }
};

export const loadRepos = async () => {
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN;
  try {
    console.log(accessToken)
    
    const repos = await fetchRepos(accessToken);

    return repos;
  } catch (error) {
    console.error('Error loading repositories:', error.message);
    throw error; // Propagate the error to handle it where the function is called
  }
};


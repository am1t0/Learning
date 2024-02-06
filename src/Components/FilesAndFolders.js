import React, { useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import FileShow from './FileShow';
import NestedFolders from './NestedFolders';
import FolderShow from './FolderShow';
import { getMouseEventOptions } from '@testing-library/user-event/dist/utils';
import CommitHistory from './CommitHistory';
import InitialPushinComands from './InitialPushinComands';
import Branches from './Branches';


export default function FilesAndFolders({owner,repoName,path,repo}) {

  const [openFile,setOpenFile] = useState(null);
  const [openFolder,setFolder] = useState(null);
  const [commits,setCommits] = useState(null);
  const [branches,setBranches] = useState([]);

  const [contents, setContents] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('main');

  // fetching reposatories data 
  useEffect(() => {
   
    const fetchRepoContents = async () => {
      const accessToken = process.env.REACT_APP_ACCESS_TOKEN 
      try {
      let url = `https://api.github.com/repos/${owner}/${repoName}/contents`;
      
      //console.log('Length of Repo is',repo)
    
      // https://api.github.com/repos/am1t0/Advance-backend/contents
      
      if(path!==null) url +=`/${path}`

       url += `?ref=${selectedBranch}`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        //console.log('url is ',url);
        if (!response.ok) {
          throw new Error('Failed to fetch repository contents');
        }

        const data = await response.json();
        //console.log(data);
        setContents(data);
      } catch (error) {
        console.error('Error fetching repository contents:', error.message);
      }
    };

    fetchRepoContents();
  }, [owner, repoName,selectedBranch]);

  // fetching branches data 
  useEffect(() => {
    const fetchRepoBranches = async () => {
      const accessToken = process.env.REACT_APP_ACCESS_TOKEN ;

      try {
        const url = `https://api.github.com/repos/${owner}/${repoName}/branches`;
  
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch repository branches');
        }

        const data = await response.json();
        setBranches(data);
        //console.log(data,data.object.sha);
      } catch (error) {
        console.error('Error fetching repository branches:', error.message);
      }
    };

    fetchRepoBranches();
  }, [owner, repoName]);


  const handleCommitShow=(repoName)=>{
    if(commits===repoName) 
       setCommits(null);
     
    else
    setCommits(repoName);
  }

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };
  return (
    <div> 
       <Branches contents={contents} branches={branches} handleBranchChange={handleBranchChange} selectedBranch={selectedBranch} owner={owner} repo={repoName}/>
       <div className="container">
       <h6 className='mx-3' style={{color:'green'}} onClick={()=>handleCommitShow(repoName,owner,selectedBranch)}>commits</h6>
       {
        (commits===repoName)&& <CommitHistory repo={repoName} owner={owner}  branch={selectedBranch}/>
       }
       </div>
      <ul>
        { contents.length!==0?
        contents.map((item) => (
          <li key={item.name}>
            {item.type === 'file' ? (
              <div className='d-flex'>
              <p onClick={()=> {
                //console.log("Dabbbbbbbbbbaa!!")
              if(openFile===item.name)
              setOpenFile(null)
            else
             setOpenFile(item.name)
              }}>
                {item.name}
               </p>

              {<FileShow isOpen={item.name === openFile} content = {item}/>}
              </div>
            ) : (
              <>
               <div className="folder" onClick={()=> setFolder(item.name)}>
                <h6>{item.name}</h6>
                {
                (openFolder===item.name) && <FolderShow owner={owner} repoName={repoName} path={item?.path} branch={selectedBranch}/>
                }
               </div>
               </>
            )}
          </li>
        ))
      : <InitialPushinComands owner={owner} repoName={repoName}/>      // if the repo content is empty it has no files and folders
      }
      </ul>
    </div>
  );
};

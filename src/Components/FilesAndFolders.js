import React, { useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import FileShow from './FileShow';
import NestedFolders from './NestedFolders';
import FolderShow from './FolderShow';
import { getMouseEventOptions } from '@testing-library/user-event/dist/utils';


export default function FilesAndFolders({owner,repoName,path}) {

  const [openFile,setOpenFile] = useState(null);
  const [openFolder,setFolder] = useState(null);
  const [branches,setBranches] = useState([]);

  const [contents, setContents] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('main');

  // fetching reposatories data 
  useEffect(() => {
    const fetchRepoContents = async () => {
      const accessToken = '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'
      try {
      let url = `https://api.github.com/repos/${owner}/${repoName}/contents`;

    
      
      if(path!==null) url +=`/${path}`

      url += `?ref=${selectedBranch}`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch repository contents');
        }

        const data = await response.json();
        console.log(data);
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
      const accessToken = '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';

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
        console.log(data);
      } catch (error) {
        console.error('Error fetching repository branches:', error.message);
      }
    };

    fetchRepoBranches();
  }, [owner, repoName]);

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };
  return (
    <div> 
       <select value={selectedBranch} id="branchSelect" onChange={handleBranchChange}>
       {branches.map((branch) => (
          <option key={branch?.name} value={branch?.name}>
            {branch?.name}
          </option>
        ))}
       </select>  
      <ul>
        {contents.map((item) => (
          <li key={item.name}>
            {item.type === 'file' ? (
              <div className='d-flex'>
              <p onClick={()=> {
                console.log("Dabbbbbbbbbbaa!!")
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
        ))}
      </ul>
    </div>
  );
};

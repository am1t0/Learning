import React,{useState,useEffect} from 'react'
import FileShow from './FileShow';

export default function FolderShow({owner,repoName,path,branch}) {

  const [openFile,setOpenFile] = useState(null);
  const [openFolder,setFolder] = useState(null);

  const [contents, setContents] = useState([]);

  useEffect(() => {
    const fetchRepoContents = async () => {
      const accessToken = process.env.REACT_APP_ACCESS_TOKEN 
      try {
      let url = `https://api.github.com/repos/${owner}/${repoName}/contents`;
      
      if (path !== null) {
        url += `/${path}`;
      }
      url += `?ref=${branch}`;
         console.log(url);
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
  }, [owner, repoName,branch]);

  return (
    <div>
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
               <div className="folder" onClick={()=> setFolder(item.name)
                
                }>
                <h6>{item.name}</h6>
                {
                (openFolder===item.name) && <FolderShow owner={owner} repoName={repoName} path={item?.path}  branch={branch}/>
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


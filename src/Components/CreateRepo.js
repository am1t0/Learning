import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function CreateRepo() {
  
  const navigate = useNavigate();
  const [repoName, setRepoName] = useState('');
    const [repoDescription, setRepoDescription] = useState('');
    const [repoPrivacy, setRepoPrivacy] = useState('public');

      const handleCreateRepository = async (repoName,repoDescription,repoPrivacy) => {
      const accessToken = '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'
   try {
     const response = await fetch('https://api.github.com/user/repos', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${accessToken}`,
       },
       body: JSON.stringify({
         name: repoName,
         description: repoDescription,
         private: repoPrivacy === 'private',
       }),
     });
 
     const data = await response.json();
 
     if (response.ok) {
       alert(`Repository "${repoName}" created successfully!`);
       //console.log('Repository Details:', data);
      
     } else {
       alert(`Error creating repository: ${data.message}`);
       console.error('Error creating repository:', data);
     }
   } catch (error) {
     alert(`An unexpected error occurred: ${error.message}`);
     console.error('Unexpected error:', error);
   }
 };
  return (
   <>
   <div>
      <h2>Create Repository</h2>
      <form>
        <label htmlFor="repoName">Repository Name:</label>
        <input
          type="text"
          id="repoName"
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
          required
        /><br />

        <label htmlFor="repoDescription">Repository Description:</label>
        <textarea
          id="repoDescription"
          value={repoDescription}
          onChange={(e) => setRepoDescription(e.target.value)}
        ></textarea><br />

        <label htmlFor="repoPrivacy">Repository Privacy:</label>
        <select
          id="repoPrivacy"
          value={repoPrivacy}
          onChange={(e) => setRepoPrivacy(e.target.value)}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select><br />

        <button type="button" onClick={()=> handleCreateRepository(repoName,repoDescription,repoPrivacy)}
          style={{background:'yellow', padding:'3px',margin:'10px',borderRadius:'10px'}}
        >
          Create Repository
        </button>

        <button type='button' style={{background:'yellow', padding:'3px',margin:'10px',borderRadius:'10px'}} onClick={()=>{navigate('/')}}>Cancel </button>
      </form>
    </div>
   </>
  )
}

import React, { useRef, useState, useEffect } from 'react';
// import fetch from 'node-fetch';

export default function Branches({ contents, handleBranchChange, selectedBranch, branches, owner, repo }) {
  const createdBranch = useRef();
  const [creatingBranch, setCreatingBranch] = useState(false);

  const handleBranchCreate = async () => {
    const newBranchName = createdBranch.current.value.trim();

    const authToken = process.env.REACT_APP_ACCESS_TOKEN;
    console.log(authToken)
    if (newBranchName) {
      setCreatingBranch(true);

      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/git/refs`;
      const baseBranch = 'main'; // Replace with the branch you want to branch from

      const createBranchBody = {
        ref: `refs/heads/${newBranchName}`,
        sha: (await getBranchSha(owner, repo, baseBranch, authToken)).object.sha,
      };

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(createBranchBody),
        });

        if (response.ok) {
          console.log(`Branch ${newBranchName} created successfully!`);
        } else {
          console.error(`Failed to create branch. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error creating branch:', error);
      } finally {
        setCreatingBranch(false);
      }
    }
  };

  const getBranchSha = async (owner, repo, branch, token) => {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${selectedBranch}`;

    try {
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        return response.json();
      } else {
        console.error(`Failed to get branch SHA. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error getting branch SHA:', error);
    }
  };

  return (
    <div className="container">
      {contents.length !== 0 && (
        <div className="d-flex">
          <select value={selectedBranch} id="branchSelect" onChange={handleBranchChange}>
            {branches.map((branch) => (
              <option key={branch?.name} value={branch?.name}>
                {branch?.name}
              </option>
            ))}
          </select>

          {/* CREATING NEW BRANCH BY USER'S COMMAND */}
          <div className="container">
            <input type="text" placeholder="create new branch" ref={createdBranch} />
            <button onClick={handleBranchCreate} disabled={creatingBranch}>
              Create
            </button>

            {creatingBranch && <span className="mx-3">Creating branch...</span>}
            <h6 className="mx-3" style={{ color: 'green' }}>
              {branches.length} branches
            </h6>
          </div>
        </div>
      )}
    </div>
  );
}

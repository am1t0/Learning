import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CreateRepo from './Components/CreateRepo';
import AllRepos from './Components/AllRepos';
import { Provider } from 'react-redux';
import main from './Store/main.js';
import { loadRepos } from './Components/AllRepos';
import FolderShow from './Components/FolderShow.js';
import FileShow from './Components/FileShow.js';
import FilesAndFolders from './Components/FilesAndFolders.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
 { path:'/',element: <App/> , children:[
   {path:'/create-repo', element: <CreateRepo/>},
   {path:'/reposatories', element:<AllRepos/> ,loader: loadRepos},
   {path:'/:repoName',element:<FilesAndFolders/>},
 ]}
])
root.render(
  <React.StrictMode>
    <Provider store={main}>
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

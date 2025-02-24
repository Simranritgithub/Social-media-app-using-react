
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/Header';
import Footer from './components/footer';
import Sidebar from './components/Sidebar'
import Create from './components/Create';
import PostList from './components/Postlist';
import { useState } from 'react';
import PostListProvider from './store/post-list-store';
import { Outlet } from 'react-router-dom';


function App() {
  const [Tabs,setTabs]=useState("Home");
 return (
<>
  <PostListProvider>
  <div className="App-container">
  <Sidebar Tabs={Tabs} setTabs={setTabs}></Sidebar>
  <div className='content'>
    <Header ></Header>
    <Outlet/>
    
    <Footer></Footer>
    </div>
    </div>
    </PostListProvider>
  </>
 );
}

export default App 

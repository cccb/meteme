
import React from 'react';
import { Route } from 'react-router' // react-router v4

import StatsView from '../stats/view'
import VersionLabel from '../stats/version-label'

import './main.css'


const MainLayout = () => (
  <div className="content">
     <header>
      <div className="title">
       Mete98 - v.<VersionLabel /> @ CCCB
      </div>
      <StatsView />
     </header>
     <div className="main">
       <Route exact path="/" render={()=>(<h1>Foo</h1>)} />
     </div> 
     <footer>
       <div className="title">
          Mete98(R) Millenials Edition(R)
       </div>
       <div className="copyright">
          Copyright (C) 1983- Erisson Software Technology AB
       </div>
     </footer>
  </div>
);

export default MainLayout;

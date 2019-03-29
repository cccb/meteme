
import React from 'react';
import { Route } from 'react-router' // react-router v4

import StatsView from '../stats/view'

import './main.css'


const MainLayout = () => (
  <div className="content">
     <header>
      <div className="title">
       Mete98 - CCCB
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
          Copyright (C) 1983- Erisson Software Development AB
       </div>
     </footer>
  </div>
);

export default MainLayout;

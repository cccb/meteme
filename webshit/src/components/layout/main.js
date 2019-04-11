
import React from 'react';
import { Route, Redirect } from 'react-router' // react-router v4

import ClockWidget from '../clock/widget'
import StatsView from '../stats/view'
import VersionLabel from '../stats/version-label'

import './main.css'

import StoreMain from '../store/main'
import StoreToolbar from '../store/toolbar'
import RequestOverlay from '../requests/overlay'

const MainLayout = () => (
  <div className="content">
     <RequestOverlay />
     <header>
      <div className="block toolbar">
         <Route path="/store"
                      component={StoreToolbar} />
      </div>
      <div className="block title">
         Mete98 - v.<VersionLabel /> @ CCCB<br />
         <ClockWidget />
      </div>
      <StatsView />
     </header>
     <div className="main">

       <Route exact path="/" render={()=>(
         <Redirect to="/store" />
       )} />
       <Route path="/store"
                    component={StoreMain} />
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

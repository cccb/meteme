
import React from 'react';
import { Route } from 'react-router' // react-router v4

import './main.css'

const Stats = () => (
  <table className="stats">
    <tbody>
      <tr>
        <td>TX this month:</td><td className="value">23</td>
        <td>Total:</td><td className="value">19239</td>
      </tr>
      <tr>
        <td>Users:</td><td className="value">23</td>
      </tr>
      <tr>
        <td>Money gauge:</td><td className="value">19329</td>
      </tr>
    </tbody>
  </table>
);

const MainLayout = () => (
  <div className="content">
     <header>
      <div className="title">
       Mete98 - CCCB
      </div>
      <Stats />
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

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Layout } from "./Layout";

class Home extends Component {
  

  render() {
    
    return (
      <div className="App">
        <Layout>
          <h1>Project Home</h1>
          {/* Link to List.js */}
          <Link to={'./list'}>
            <button variant="raised">
                My List
            </button>
          </Link>
          <Link to={'./new-post'}>
            <button variant="raised">
                Find Adventurers!
            </button>
          </Link>
          <Link to={'./posts'}>
            <button variant="raised">
                Find Campaigns!
            </button>
          </Link>  
        </Layout>
      </div>
    );
  }

}
export default Home;
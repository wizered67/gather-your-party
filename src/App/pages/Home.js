import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { STITCH_CLIENT } from "../App";
import { Layout } from "./Layout";

class Home extends Component {
  

  render() {
    
    return (
      <div className="App">
        <Layout>
          {/* Link to List.js */}
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
          <Link to={'./notifications'}>
            <button variant="raised">
                Notifications
            </button>
          </Link>  
        </Layout>
      </div>
    );
  }

}
export default Home;
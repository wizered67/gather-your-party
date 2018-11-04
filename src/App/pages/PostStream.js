import React, { Component } from 'react';
import { Layout } from "./Layout";
import { STITCH_CLIENT, MDB } from "../App";
import { PostContent } from "./PostContent";
class PostStream extends Component {

  constructor(props){
    super(props);
    this.state = {
      postIDs: [],
    }
  }

  componentDidMount() {
    const collection = MDB.db("gather-your-party").collection("dm-posts");
    collection.find({}, "_id").asArray().then((postIDs) => {
      this.setState({
        postIDs: postIDs,
      })
    });
  }

  render() {
    return (
      <div className="App">
      <Layout>
        <h1>List of Items</h1>
        {/* Check to see if any items are found*/}
        {this.state.postIDs.length ? (
          <div>
            {/* Render the list of items */}
            {this.state.postIDs.map((post) => {
              return(
                <div key={post._id}>
                  <PostContent _id={post._id}/>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h2>No Posts Found</h2>
          </div>
        )
      }
      </Layout>
      </div>
    )
  }
}
export default PostStream;
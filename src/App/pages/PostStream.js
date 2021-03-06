import React, { Component } from 'react';
import { Layout } from "./Layout";
import { STITCH_CLIENT, MDB } from "../App";
import { PostContent } from "./PostContent";
import { PostComments } from "./PostComments";
class PostStream extends Component {

  constructor(props){
    super(props);
    this.state = {
      postIDs: [],
      locationSet: false,
      latitude: 0,
      longitude: 0,
      commentsPointers: [],
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.updateDistance);
  }

  updateDistance = (position) => {
    if (this.state.locationSet) {
      return;
    }
    const collection = MDB.db("gather-your-party").collection("dm-posts");
    const geospatialQuery = {
      location: {
        "$near": {
          "$geometry": {
            type: "Point" ,
            coordinates: [ position.coords.longitude , position.coords.latitude ]
          },
       },
      }
    };
    collection.find(geospatialQuery, {_id: 1, limit: 10}).asArray().then((postIDs) => {
      this.setState({
        postIDs: postIDs,
        locationSet: true,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    });
  }

  forceRefresh = () => {
    for (var i = this.state.commentsPointers.length - 1; i >= 0; i--) {
      const cp = this.state.commentsPointers[i];
      if (cp)
        cp.refresh();
    }
  }

  setCommentsPointer = (comments) => {
    this.state.commentsPointers.push(comments);
  }

  render() {
    return (
      <div className="App">
      <Layout>
        {/* Check to see if any items are found*/}
        {this.state.postIDs.length ? (
          <div>
            {/* Render the list of items */}
            {this.state.postIDs.map((post) => {
              return(
                <div key={post._id} id={`post_${post._id}`}>
                  <PostContent _id={post._id} userLatitude={this.state.latitude} userLongitude={this.state.longitude} commentRefresh={this.forceRefresh}/>
                  <br/>
                  <PostComments _id={post._id} postTitle={post.title} postOwnerId={post.owner_id} setCommentsPointer={this.setCommentsPointer}/>
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
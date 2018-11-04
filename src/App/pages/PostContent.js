import React, { Component } from 'react';
import { STITCH_CLIENT, MDB } from "../App";
import { Link } from 'react-router-dom';
import { Layout } from "./Layout";
import { Stitch } from "mongodb-stitch-browser-sdk";
export class PostContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '', 
      content: "",
      distance: 0,
      postFound: false,
    };
  }

  componentDidMount() {
    console.log(this.props._id);
    navigator.geolocation.getCurrentPosition(this.updateDistance);
    const collection = MDB.db("gather-your-party").collection("dm-posts");
    collection.find({_id: this.props._id}).asArray().then((postContent) => {
      //console.log(postContent);
      if (!postContent || postContent.length == 0) {
        this.setState({postFound: false});
        return;
      }
      postContent = postContent[0];
      this.setState({
        title: postContent.title,
        content: postContent.content,
        postFound: true,
      });
    });
    
  }

  updateDistance = (position) => {
    this.setState({
      distance: position.coords.latitude,
    });
  }

  render() {
    let content = (
      <div>
        <h1>Post not found!</h1>
      </div>
    );
    if (this.state.postFound) {
      content = (
        <div>
          <h1>{this.state.title}</h1>
          <b>Distance: {this.state.distance}</b>
          <p>{this.state.content}</p> 
        </div>
      )
    }
    
    return content;
  }

}

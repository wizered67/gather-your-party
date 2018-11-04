import React, { Component } from 'react';
import { STITCH_CLIENT, MDB } from "../App";
import { Link } from 'react-router-dom';
import { Layout } from "./Layout";
import { Stitch } from "mongodb-stitch-browser-sdk";

function kmToMiles(km) {
  return km * 0.621371;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function getDistanceFromLatLonInMiles(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }

export class PostContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '', 
      content: "",
      distance: 0,
      owner_id: "",
      owner_name: "",
      postFound: false,
      showCommentBox: false,
      commentContent: "",
    };
  }

  refresh() {
    console.log(this.props._id);
    const collection = MDB.db("gather-your-party").collection("dm-posts");
    const cursor = collection.find({_id: this.props._id});
    cursor.asArray().then((postContent) => {
      console.log(postContent);
      if (!postContent || postContent.length === 0) {
        this.setState({postFound: false});
        return;
      }
      postContent = postContent[0];
      const distance = getDistanceFromLatLonInMiles(
        this.props.userLatitude, 
        this.props.userLongitude,
        postContent.location.coordinates[1],
        postContent.location.coordinates[0],
      );
      this.setState({
        title: postContent.title,
        content: postContent.content,
        distance: distance,
        postFound: true,
        owner_id: postContent.owner_id,
        owner_name: postContent.owner_name,
      });
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    let content = (
      <div>
        <h1>Post not found!</h1>
      </div>
    );
    if (this.state.postFound) {
      content = (
        <div onClick={()=>this.tryComment()}>
          <h1>{this.state.title}</h1>
          <b>{this.state.owner_name}</b>
          <br/>
          <b>Distance: {this.state.distance.toFixed(2)} miles</b>
          <p>{this.state.content}</p>
          {this.state.showCommentBox ? (
            <form onSubmit={this.leaveComment}>
              <textarea name="commentContent" rows="5" cols="50" value={this.state.commentContent} onChange={this.handleChange}/>
              <br/>
              <input type="submit" value="Apply" />
            </form>
            ) : null}
        </div>
      )
    }
    
    return content;
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  tryComment = () => {
    this.setState({showCommentBox: true});
  }

  leaveComment = (event) => {
    event.preventDefault();
    const user = STITCH_CLIENT.auth.user;

    const comment = {owner_id: user.id, commenter: user.profile.data.email, content: this.state.commentContent, date: new Date()};
    console.log(comment);
    console.log(this.props._id);
    //owner_id: user.id, title, content, date: new Date()
    const collection = MDB.db("gather-your-party").collection("dm-posts");
    console.log(collection.updateOne({_id: this.props._id}, {"$push": {interested: comment}}));
    const notifications = MDB.db("gather-your-party").collection("notifications");
    const content = `${user.profile.data.email} applied for "${this.state.title}"!`
    notifications.insertOne({owner_id: this.state.owner_id, title: "New Application!", content: content, date: new Date()}).then(() => {
      this.setState({showCommentBox: false, commentContent: ""});
    })
  }
  // viewPost = () => {
  //   const title = `Notification: ${this.state.title}`;
  //   const content = "random notification content";
  //   const user = STITCH_CLIENT.auth.user;
  //   const collection = MDB.db("gather-your-party").collection("notifications");
  //   collection.insertOne({owner_id: user.id, title, content, date: new Date()});
  // }

}

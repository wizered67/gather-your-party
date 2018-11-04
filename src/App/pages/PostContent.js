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
      postFound: false,
    };
  }

  componentDidMount() {
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
      });
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
        <div onClick={()=>this.viewPost()}>
          <h1>{this.state.title}</h1>
          <b>Distance: {this.state.distance.toFixed(2)} miles</b>
          <p>{this.state.content}</p> 
        </div>
      )
    }
    
    return content;
  }

  viewPost = () => {
    const title = `Notification: ${this.state.title}`;
    const content = "random notification content";
    const user = STITCH_CLIENT.auth.user;
    const collection = MDB.db("gather-your-party").collection("notifications");
    collection.insertOne({owner_id: user.id, title, content, date: new Date()});
  }

}

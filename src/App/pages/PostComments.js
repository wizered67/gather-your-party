import React, { Component } from 'react';
import { STITCH_CLIENT, MDB } from "../App";
import { Link } from 'react-router-dom';
import { Layout } from "./Layout";
import { Stitch } from "mongodb-stitch-browser-sdk";

export class PostComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    }
    this.props.setCommentsPointer(this);
  }

  refresh = () => {
    console.log("gg refresh called!");
    console.log(this.props);
    console.log(this.props._id);
    const collection = MDB.db("gather-your-party").collection("comments");
    const cursor = collection.find({post_id: this.props._id});
    cursor.asArray().then((comments) => {
      console.log(comments);
      this.setState({comments: comments});
    })
  }

  componentDidMount() {
    this.refresh();
  }

  render = () => {
    return (
      <div>
     {this.state.comments.length ? (
          <div>
            {/* Render the list of items */}
            {this.state.comments.map((comment) => {
              const { _id, post_id, owner_id, commenter, date, content, approved } = comment;
              return(
                <div key={_id}> {/*This assumes commenter is unique btw*/}
                  <PostComment post_id={post_id} owner_id={owner_id} postOwnerId={this.props.postOwnerId} 
                    commenter={commenter} content={content} date={date.toString()} 
                    approved={approved} refresh={this.refresh}/>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h4>No Comments Found</h4>
          </div>
        )
      }
      </div>
    )
  }

}

class PostComment extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const viewer_id = STITCH_CLIENT.auth.user.id;
    console.log(viewer_id);
    const color = this.props.approved && (this.props.postOwnerId === viewer_id || this.props.owner_id === viewer_id) ? "green" : "black";
    console.log(color);
    return (
      <div>
        <b style={{color: color}}>{this.props.commenter}</b>
        <br/>
        <b>{this.props.date}</b>
        <p>{this.props.content}</p>
        {this.props.postOwnerId === viewer_id && this.props.postOwnerId !== this.props.owner_id && !this.props.approved ? 
          (<div><button onClick={this.acceptComment}>Accept</button></div>)
          : null
        } 
      </div>
    )
  }

  acceptComment = () => {
    //this.setState({approved: true});
    const collection = MDB.db("gather-your-party").collection("comments");
    collection.updateMany({owner_id: this.props.owner_id, post_id: this.props.post_id}, {"$set": {approved: true}}).then(() => {this.props.refresh()});
  }
}

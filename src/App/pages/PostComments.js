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
      postOwnerId: 0,
    }
  }

  componentDidMount() {
    console.log(this.props._id);
    const collection = MDB.db("gather-your-party").collection("dm-posts");
    const cursor = collection.find({_id: this.props._id}, {interested: 1, owner_id: 1});
    cursor.asArray().then((post) => {
      console.log(post);
      this.setState({postOwnerId: post[0].owner_id, comments: post[0].interested});
    })
  }

  render = () => {
    return (
      <div>
     {this.state.comments.length ? (
          <div>
            {/* Render the list of items */}
            {this.state.comments.map((comment) => {
              const { commenter, date, content } = comment;
              return(
                <div key={commenter}> {/*This assumes commenter is unique btw*/}
                  <PostComment postOwnerId={this.state.postOwnerId} commenter={commenter} content={content} date={date.toString()}/>
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
  render() {
    const viewer_id = STITCH_CLIENT.auth.user.id;
    return (
      <div>
        <b>{this.props.commenter}</b>
        <br/>
        <b>{this.props.date}</b>
        <p>{this.props.content}</p>
        {this.props.owner_id === viewer_id ? 
          (<div><button>TEST</button></div>)
          : null
        } 
      </div>
    )
  }
}

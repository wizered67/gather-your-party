import React, { Component } from 'react';
import { STITCH_CLIENT, MDB } from "../App";
import { Layout } from "./Layout";
import { Stitch } from "mongodb-stitch-browser-sdk";
import { HashLink } from 'react-router-hash-link';

export class NotificationContent extends Component {

  render() {
    return (
      <div>
        <hr/>
        <h2>{this.props.title}</h2>
        <b>{this.props.date}</b>
        <p>{this.props.content}</p> 
      </div>
    )
  }

}

import React, { Component } from 'react';
import { STITCH_CLIENT, MDB } from "../App";
import { Link } from 'react-router-dom';
import { Layout } from "./Layout";
import { Stitch } from "mongodb-stitch-browser-sdk";

export class NotificationContent extends Component {

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <b>{this.props.date}</b>
        <p>{this.props.content}</p> 
      </div>
    )
  }

}

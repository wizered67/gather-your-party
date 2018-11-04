import React, { Component } from 'react';
import { STITCH_CLIENT, MDB } from "../App";
import { Link } from 'react-router-dom';
import { Layout } from "./Layout";
import { Stitch } from "mongodb-stitch-browser-sdk";
class NewPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '', 
      content: "Describe your campaign here!",
      latitude: 0,
      longitude: 0,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    });
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="App">
      <Layout>
        <form onSubmit={this.handleSubmit}>
          Title: <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
          <br/>
          <textarea name="content" rows="15" cols="50" value={this.state.content} onChange={this.handleChange}/>
          <br/>
          Latitude: <input type="text" name="latitude" value={this.state.latitude} onChange={this.handleChange}/>
          Longitude: <input type="text" name="longitude" value={this.state.longitude} onChange={this.handleChange}/>
          <br/>
          <input type="submit" value="Submit" />
        </form>
      </Layout>
      </div>
    )
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, content } = this.state;
    const user = STITCH_CLIENT.auth.user;
    const collection = MDB.db("gather-your-party").collection("dm-posts");
    const { latitude, longitude } = this.state;
    const location = { type: "Point", coordinates: [ parseFloat(longitude), parseFloat(latitude) ] };
    collection.insertOne({owner_id: user.id, title, content, interested: [], location: location}).then(() => this.props.history.push('/posts'));
  }
}

export default NewPost;
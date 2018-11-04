import React, { Component } from 'react';
import { Layout } from "./Layout";
import { STITCH_CLIENT, MDB } from "../App";
import { NotificationContent } from "./NotificationContent";
class NotificationStream extends Component {

  constructor(props){
    super(props);
    this.state = {
      notifications: [],
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.updateDistance);
  }

  updateDistance = (position) => {
    if (this.state.locationSet) {
      return;
    }
    const user_id = STITCH_CLIENT.auth.user.id;
    const collection = MDB.db("gather-your-party").collection("notifications");
    const cursor = collection.find({owner_id: user_id}, {"sort": {"date": -1}});
    console.log(cursor);
    cursor.asArray().then((notifications) => {
      console.log(notifications);
      this.setState({
        notifications: notifications,
      })
    });
  }

  render() {
    return (
      <div className="App">
      <Layout>
        {/* Check to see if any items are found*/}
        {this.state.notifications.length ? (
          <div>
            {/* Render the list of items */}
            {this.state.notifications.map((notification) => {
              const { title, date, content, originalContent } = notification;
              const link = `/posts#${originalContent}`;
              return(
                <div key={notification._id}>
                    <NotificationContent link={link} title={title} date={date.toString()} content={content}/>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h2>You have no notifications</h2>
          </div>
        )
      }
      </Layout>
      </div>
    )
  }
}
export default NotificationStream;
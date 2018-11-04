(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{25:function(e,t,n){e.exports=n(41)},30:function(e,t,n){},36:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(21),i=n(43);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(30);var l=n(2),c=n(3),s=n(5),u=n(4),d=n(6),m=n(45),h=n(44),p=n(9),g=(n(36),n(42)),f=n(14),E=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement(v,null),this.props.children,o.a.createElement(b,null))}}]),t}(a.Component),v=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).updateLoggedIn=function(){n.setState({loggedIn:P.auth.isLoggedIn})},n.getLoginOrLogout=function(){return n.state.loggedIn?o.a.createElement("button",{onClick:n.logout},"Logout"):o.a.createElement("div",null,o.a.createElement("p",{style:{color:"red"}},n.state.loginErrorMessage),o.a.createElement("form",{onSubmit:n.handleSubmit},o.a.createElement("label",null,"E-mail:",o.a.createElement("input",{type:"text",name:"email",value:n.state.email,onChange:n.handleChange}),"Password:",o.a.createElement("input",{type:"password",name:"password",value:n.state.password,onChange:n.handleChange})),o.a.createElement("input",{type:"submit",value:"Submit"})),o.a.createElement(g.a,{to:"./register"},"Register"))},n.logout=function(){P.auth.logout().then(function(){return n.updateLoggedIn()})},n.handleChange=function(e){var t=e.target,a=t.value,o=t.name;n.setState(Object(f.a)({},o,a))},n.handleSubmit=function(e){e.preventDefault();var t=n.state,a=t.email,o=t.password,r=new p.d(a,o);P.auth.loginWithCredential(r).then(function(e){console.log("successfully logged in with id: ".concat(e))}).then(function(){return n.loginSuccess()}).catch(function(e){return n.loginError(e)})},n.loginSuccess=function(){n.updateLoggedIn(),n.setState({email:"",password:"",loginErrorMessage:""})},n.loginError=function(e){console.error("login error: ".concat(e));var t="login error: ".concat(e);n.setState({email:"",password:"",loginErrorMessage:t})},n.state={email:"",password:"",loggedIn:!1,loginErrorMessage:""},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.updateLoggedIn()}},{key:"render",value:function(){var e=this.getLoginOrLogout();return o.a.createElement("div",null,o.a.createElement("h1",null,"HEADER"),e,o.a.createElement(g.a,{to:"./"},"Home"))}}]),t}(a.Component),b=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("p",null,"Copyright 2018")}}]),t}(a.Component),y=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement(E,null,o.a.createElement("h1",null,"Project Home"),o.a.createElement(g.a,{to:"./new-post"},o.a.createElement("button",{variant:"raised"},"Find Adventurers!")),o.a.createElement(g.a,{to:"./posts"},o.a.createElement("button",{variant:"raised"},"Find Campaigns!")),o.a.createElement(g.a,{to:"./notifications"},o.a.createElement("button",{variant:"raised"},"Notifications"))))}}]),t}(a.Component),O=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).getList=function(){n.setState({list:["hello","world","okay"]})},n.state={list:[]},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.getList()}},{key:"render",value:function(){var e=this.state.list;return o.a.createElement("div",{className:"App"},o.a.createElement(E,null,o.a.createElement("h1",null,"List of Items"),e.length?o.a.createElement("div",null,e.map(function(e){return o.a.createElement("div",null,e)})):o.a.createElement("div",null,o.a.createElement("h2",null,"No List Items Found"))))}}]),t}(a.Component),j=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).handleChange=function(e){var t=e.target,a=t.value,o=t.name;n.setState(Object(f.a)({},o,a))},n.handleSubmit=function(e){e.preventDefault();var t=n.state,a=t.email,o=t.password;o===t.confirmPassword?p.b.defaultAppClient.auth.getProviderClient(p.c.factory).registerWithEmail(a,o).then(function(){console.log("Successfully sent account confirmation email!")}).catch(function(e){console.log("Error registering new user:",e),n.registerError(e)}):n.setState({registerErrorMessage:"Passwords did not match."})},n.loginSuccess=function(){n.updateLoggedIn(),n.setState({email:"",password:"",loginErrorMessage:""})},n.registerError=function(e){if("name already in use"===e.message){p.b.defaultAppClient.auth.getProviderClient(p.c.factory).resendConfirmationEmail(n.state.email)}else{var t="login error: ".concat(e);n.setState({loginErrorMessage:t})}n.setState({email:"",password:"",confirmPassword:""})},n.state={email:"",password:"",confirmPassword:"",loggedIn:!1,registerErrorMessage:""},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement(E,null,o.a.createElement("p",{style:{color:"red"}},this.state.registerErrorMessage),o.a.createElement("form",{onSubmit:this.handleSubmit},o.a.createElement("label",null,"E-mail:",o.a.createElement("input",{type:"text",name:"email",value:this.state.email,onChange:this.handleChange}),"Password:",o.a.createElement("input",{type:"password",name:"password",value:this.state.password,onChange:this.handleChange}),"Confirm Password:",o.a.createElement("input",{type:"password",name:"confirmPassword",value:this.state.confirmPassword,onChange:this.handleChange})),o.a.createElement("input",{type:"submit",value:"Submit"}))))}}]),t}(a.Component),C=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).handleChange=function(e){var t=e.target,a=t.value,o=t.name;n.setState(Object(f.a)({},o,a))},n.handleSubmit=function(e){e.preventDefault();var t=n.state,a=t.title,o=t.content,r=P.auth.user,i=L.db("gather-your-party").collection("dm-posts"),l=n.state,c=l.latitude,s=l.longitude,u={type:"Point",coordinates:[parseFloat(s),parseFloat(c)]};i.insertOne({owner_id:r.id,title:a,content:o,interested:[],location:u}).then(function(){return n.props.history.push("/posts")})},n.state={title:"",content:"Describe your campaign here!",latitude:0,longitude:0},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;navigator.geolocation.getCurrentPosition(function(t){e.setState({latitude:t.coords.latitude,longitude:t.coords.longitude})})}},{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement(E,null,o.a.createElement("form",{onSubmit:this.handleSubmit},"Title: ",o.a.createElement("input",{type:"text",name:"title",value:this.state.title,onChange:this.handleChange}),o.a.createElement("br",null),o.a.createElement("textarea",{name:"content",rows:"15",cols:"50",value:this.state.content,onChange:this.handleChange}),o.a.createElement("br",null),"Latitude: ",o.a.createElement("input",{type:"text",name:"latitude",value:this.state.latitude,onChange:this.handleChange}),"Longitude: ",o.a.createElement("input",{type:"text",name:"longitude",value:this.state.longitude,onChange:this.handleChange}),o.a.createElement("br",null),o.a.createElement("input",{type:"submit",value:"Submit"}))))}}]),t}(a.Component);function w(e){return e*(Math.PI/180)}var S=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).viewPost=function(){var e="Notification: ".concat(n.state.title),t=P.auth.user;L.db("gather-your-party").collection("notifications").insertOne({owner_id:t.id,title:e,content:"random notification content",date:new Date})},n.state={title:"",content:"",distance:0,postFound:!1},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;console.log(this.props._id),L.db("gather-your-party").collection("dm-posts").find({_id:this.props._id}).asArray().then(function(t){if(console.log(t),t&&0!==t.length){t=t[0];var n=function(e,t,n,a){var o=w(n-e),r=w(a-t),i=Math.sin(o/2)*Math.sin(o/2)+Math.cos(w(e))*Math.cos(w(n))*Math.sin(r/2)*Math.sin(r/2);return 2*Math.atan2(Math.sqrt(i),Math.sqrt(1-i))*6371}(e.props.userLatitude,e.props.userLongitude,t.location.coordinates[1],t.location.coordinates[0]);e.setState({title:t.title,content:t.content,distance:n,postFound:!0})}else e.setState({postFound:!1})})}},{key:"render",value:function(){var e=this,t=o.a.createElement("div",null,o.a.createElement("h1",null,"Post not found!"));return this.state.postFound&&(t=o.a.createElement("div",{onClick:function(){return e.viewPost()}},o.a.createElement("h1",null,this.state.title),o.a.createElement("b",null,"Distance: ",this.state.distance.toFixed(2)," miles"),o.a.createElement("p",null,this.state.content))),t}}]),t}(a.Component),k=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).updateDistance=function(e){if(!n.state.locationSet){var t=L.db("gather-your-party").collection("dm-posts"),a={location:{$near:{$geometry:{type:"Point",coordinates:[e.coords.longitude,e.coords.latitude]}}}};t.find(a,{_id:1,limit:10}).asArray().then(function(t){n.setState({postIDs:t,locationSet:!0,latitude:e.coords.latitude,longitude:e.coords.longitude})})}},n.state={postIDs:[],locationSet:!1,latitude:0,longitude:0},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){navigator.geolocation.getCurrentPosition(this.updateDistance)}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"App"},o.a.createElement(E,null,this.state.postIDs.length?o.a.createElement("div",null,this.state.postIDs.map(function(t){return o.a.createElement("div",{key:t._id},o.a.createElement(S,{_id:t._id,userLatitude:e.state.latitude,userLongitude:e.state.longitude}))})):o.a.createElement("div",null,o.a.createElement("h2",null,"No Posts Found"))))}}]),t}(a.Component),M=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("h2",null,this.props.title),o.a.createElement("b",null,this.props.date),o.a.createElement("p",null,this.props.content))}}]),t}(a.Component),D=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).updateDistance=function(e){if(!n.state.locationSet){var t=L.db("gather-your-party").collection("notifications").find({},{sort:{date:-1}});console.log(t),t.asArray().then(function(e){console.log(e),n.setState({notifications:e})})}},n.state={notifications:[]},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){navigator.geolocation.getCurrentPosition(this.updateDistance)}},{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement(E,null,this.state.notifications.length?o.a.createElement("div",null,this.state.notifications.map(function(e){var t=e.title,n=e.date,a=e.content;return o.a.createElement("div",{key:e._id},o.a.createElement(M,{title:t,date:n.toString(),content:a}))})):o.a.createElement("div",null,o.a.createElement("h2",null,"You have no notifications"))))}}]),t}(a.Component),P=p.b.initializeDefaultAppClient("gather-your-party-qnzcm"),L=P.getServiceClient(p.a.factory,"mongodb-atlas"),I=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement(m.a,null,o.a.createElement(function(){return o.a.createElement("div",null,o.a.createElement(m.a,null,o.a.createElement(h.a,{exact:!0,path:"/",component:y}),o.a.createElement(h.a,{path:"/list",component:O}),o.a.createElement(h.a,{path:"/register",component:j}),o.a.createElement(h.a,{path:"/new-post",component:C}),o.a.createElement(h.a,{path:"/posts",component:k}),o.a.createElement(h.a,{path:"/notifications",component:D})))},null))}}]),t}(a.Component);Object(r.render)(o.a.createElement(i.a,{basename:"/gather-your-party"},o.a.createElement(I,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[25,2,1]]]);
//# sourceMappingURL=main.6ad958ad.chunk.js.map
import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Input from './components/Input/Input';
import Rank from './components/Rank/Rank';
import FaceRecogImg from './components/FaceRecogImg/FaceRecogImg';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import './App.css';
import "tachyons";


const particleOptions = {
  particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800
        }
      }
    } 
};

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isLoggedIn:false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: '',
    joined: ''
  }
}

class App extends Component{

constructor(){
  super();
  this.state=initialState;

}
calculateFaceLocation = (data) => {
  const clarifaiFace =  data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
   return { leftCol:clarifaiFace.left_col * 500,
            topRow: clarifaiFace.top_row * 400,
            rightCol: width - (clarifaiFace.right_col * 500),
            bottomRow: height - (clarifaiFace.bottom_row * 400)
   }
 }
 displayFaceBox = (box)=> {
   console.log(box);
 this.setState({box : box});
 }
 onInputChange = (event) => {
   this.setState({input : event.target.value});
 }
onButtonSUbmit = () => {
this.setState({imageUrl: this.state.input});
fetch('https://calm-wave-99009.herokuapp.com/imageurl',{
       method: 'post',
       headers: { 'Content-type': 'application/json'},
       body: JSON.stringify({
         input: this.state.input
       })
      })
        .then(response => response.json())
        .then(response => { if(response) { fetch('https://calm-wave-99009.herokuapp.com/image',{
       method: 'put',
       headers: { 'Content-type': 'application/json'},
       body: JSON.stringify({
         id: this.state.user.id
       })
     }).then(response => response.json())
     .then( count => {
       this.setState( Object.assign(this.state.user,{entries: count}))
     }).catch(console.log)
   }
      // do something with response
      this.displayFaceBox(this.calculateFaceLocation(response))})
    .catch(err => console.log(err));
}
onRouteChange = (route) => {
  if(route ==='signout')
  this.setState(initialState);
  else if(route ==='home')
  this.setState({isLoggedIn:true});
  this.setState({route: route});
}
loadUser = (user) => {
this.setState({user: {
id: user.id,
name: user.name,
email: user.email,
entries: user.entries,
joined: user.joined
}})
}
  render(){
    return(<div className="App">
     <Particles className="particles"
                params={particleOptions} />
                
      <Navigation isLoggedIn={this.state.isLoggedIn} onRouteChange={this.onRouteChange}/>
      
        { (this.state.route==='home') ?
        <div>
        <Logo/>
      <Rank name={this.state.user.name} entries={this.state.user.entries}/>
     <Input onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
     <FaceRecogImg box={this.state.box} imageUrl={this.state.imageUrl}/>
     </div> : ( this.state.route==='signin'?
      <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />)}
        
        
    </div>);
  }
}

export default App;

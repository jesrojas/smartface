import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import './App.css';

const particlesOptions = {
      "particles": {
          "number": {
              "value": 100
          },
          "size": {
              "value": 3
          }
      },
      "interactivity": {
          "events": {
              "onhover": {
                  "enable": false,
                  "mode": "repulse"
              }
          }
      }
  }
const initialState = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      signOutForm: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: new Date()
      }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
//////////////////////////////////////////////////////////////////////////////////////////
/////USE THIS FUNCTION WHEN YOU ARE TRYING TO RUN THE SERVERS AND THE FRONT END LOCALLY//
////Right now, I commented out since it's deploying from Heroku/////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
  // componentDidMount(){
  //   fetch('http://localhost:3001')
  //   .then(response => response.json())
  //   .then(console.log)
  // }

  /////////////////////////////////////////////////////////////////////////////////////
  /////Event Listeners getting passed as a prop to the ImageLinkForm Component//////////
  /////////////////////////////////////////////////////////////////////////////////////
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  calculateFaceLocation = (data) => {
    //clarifaiFace it's the data of where the face it's located, now you just need to find
    //a way to setup the box that it's going to surround the face
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    //Calling setState() in React is asynchronous, for various reasons (mainly performance). 
    //Under the covers React will batch multiple calls to setState() into a single call, 
    //and then re-render the component a single time, rather than re-rendering
    // for every state change. Therefore the imageUrl parameter would have never 
    //worked in our example, because when we called Clarifai with our the predict function, 
    //React wasn't finished updating the state. That's why we use this.state.input, because
    //imageUrl it's still updating under the covers
    fetch('https://protected-temple-85720.herokuapp.com/imageurl', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input
          })
        })
    .then(response => response.json())
    .then(response => {
      if(response){
        fetch('https://protected-temple-85720.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        }).then(response => response.json()).then(count => {
          this.setState(Object.assign(this.state.user, { entries: count }))
        })
        .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }
///////////////////////////////////////////////////////////////////////////////////////

signInClick = (route) => {
  if(route === 'signout'){
    this.setState(initialState);
  } else if(route === 'home'){
    this.setState({signOutForm: true})
  }
  this.setState({route: route})
}
  render() {
    const { signOutForm, route, box, imageUrl } = this.state;
      return (
        <div className="App">
             <Particles className='particles'
                  params={particlesOptions}
                />
          <Navigation signOutForm={signOutForm} signInClick={this.signInClick}/>
          { route === 'home' 
          ? <div>
              <Logo/>
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm signInClick={this.signInClick} onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
          : (
                this.state.route === 'signin' 
              ? <Signin loadUser={this.loadUser} signInClick={this.signInClick}/>
              : <Register loadUser={this.loadUser} signInClick={this.signInClick}/>
            )
        }
        </div>
      );
    }
  }


export default App;

import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'; 
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank.js';
import './App.css';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';


const app = new Clarifai.App({
  apiKey: '3207756996844a7e9ee8a18e78fd71d6'
}); 

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}
class App extends Component {
  
    constructor() {
      super(); 
      this.state = {
        input: '', 
        imageUrl: ''
      }
    }

    onInputChange = (event) => {
      console.log(event.target.value); 
      this.setState({input: event.target.value})
    }

    onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input}); 
      console.log('click'); 
      app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
    function(response) {
      console.log(response); 
      // do something with response
    },
    function(err) {
      // there was an error
    }

  );
    }

    render() {
    return (
      <div className="App">
      <Particles className='particles' params={particlesOptions}/>
       <Navigation />
       <Logo /> 
       <Rank />
       <ImageLinkForm 
       onInputChange={this.onInputChange} 
       onButtonSubmit={this.onButtonSubmit} /> 
       <FaceRecognition imageUrl={this.state.imageUrl} /> 
      </div>
    );
  }
}

export default App;

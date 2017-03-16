import React, { Component } from 'react';
import './App.css';


class ConvoRecorder extends Component {
  constructor(props) {
      super(props);
      this.state = {recording: 'NONE'};
      this.start = this.start.bind(this);
      this.done = this.done.bind(this);
      this.replay = this.replay.bind(this);
      this.switchPerson = this.switchPerson.bind(this);
  }
  switchPerson() {
      this.setState({recording: (this.state.recording === 'YOU') ? 'THEM' : 'YOU'});
  }
  start() {
      this.setState({recording: 'YOU'});
      window.startRecording();
  }
  done() {
      this.setState({recording: 'DONE'});
      window.stopRecording();
  }
  replay() {
      this.setState({recording: 'REPLAYING'});
      var buffer = window.playRecording();
      var that = this;
      console.log(buffer);
      setTimeout(function() {
          that.setState({recording: 'DONE'});
      }, buffer.duration * 1000);
  }
  submit() {
      window.upload();
  }
  render() {
      switch(this.state.recording) {
          case 'NONE':
              return(<div id="convo-box" onClick={this.start} className="vertical-list">
                        <h3> Tap anywhere to start recording conversation </h3>
                        <img id="record" src="img/mic128.png"/>
                     </div>);
          case 'YOU':
              return(<div id="convo-box">
                <div id="talkers" onClick={this.switchPerson}>
                  <img id="you" src="img/woman_talking.svg" />
                  <img id="them" className="dim" src="img/man_talking.svg" />
                </div>
                <a href="#" className="button" onClick={this.done}> DONE </a>
                </div>);
          case 'THEM':
              return(<div id="convo-box">
                      <div id="talkers" onClick={this.switchPerson}>
                        <img id="you" className="dim" src="img/woman_talking.svg" />
                        <img id="them" src="img/man_talking.svg" />
                      </div>
                      <a href="#" className="button" onClick={this.done}> DONE </a>
                     </div>);
          case 'DONE':
              return(<div id="convo-box">
                      <a href="#" className="button" onClick={this.replay}> REPLAY </a>
                      <a href="#" className="button" onClick={this.start}> REDO </a>
                      <a href="#" className="button" onClick={this.submit}> SUBMIT </a>
                     </div>);
          case 'REPLAYING':
              return(<div id="convo-box">
                      ...
                     </div>);
          default: return(<div id="talkers"> WTH? {this.state.recording} </div>)
      }
  }
}

class App extends Component {
  render() {
    return (<ConvoRecorder />);
  }
}

export default App;

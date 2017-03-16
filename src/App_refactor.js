import React, { Component } from 'react';
import './App.css';

class PreRecording extends Component {
    render() {
        return(<div id="list" className="vertical" onClick={this.props.start}>
                <h3 className="upper-case"> Tap to start recording </h3>
                <img id="record" src="img/mic128.png" height="128px;" width="128px;" />
               </div>);
    }
}
class RecordingSomeone extends Component {
    constructor(props) {
        super(props);
        this.state = {who : 'YOU'};
        this.switchTalkers = this.switchTalkers.bind(this);
    }
    switchTalkers() {
        this.setState((this.state.who === "YOU") ? "THEM" : "YOU");
    }
    render() {
        var youActive = (this.state.who === "YOU") ? "active" : "dim";
        var themActive = (this.state.who === "THEM") ? "active" : "dim";
        var youText = (this.state.who === "YOU") ? "YOU" : "";
        var themText = (this.state.who === "THEM") ? "THEM" : "";
        return(<div>
                <div id="talkers" onClick={this.switchTalkers}>
                  <div className={youActive}>
                    <img id="you" src="img/woman_talking.svg" />
                    {youText}
                  </div>
                  <div className={themActive}>
                    <img id="them" src="img/man_talking.svg" />
                    {themText}
                  </div>
                </div>
                DONE
                </div>);
    }
}

class ConvoRecorder extends Component {
  constructor(props) {
      super(props);
      this.state = {recording: 'NONE'};
      this.startRecording = this.startRecording.bind(this);
      this.doneRecording = this.doneRecording.bind(this);
  }
  startRecording() {
      this.setState({recording: 'ON'});
  }
  doneRecording() {
      this.setState({recording: 'DONE'});
  }
  render() {
      console.log(this.state.recording);
      switch(this.state.recording) {
          case 'NONE':
              return(<div id="convo-box">
                      <PreRecording start={this.startRecording} />
                     </div>);
          case 'ON':
              return (<div id="convo-box">
                        <RecordingSomeone />
                        <a href="#" onClick={this.done}> DONE </a>
                      </div>);
          case 'DONE':
              return(<div> Thank you for recording the conversation.  <br/>
                      <a href="#"> REPLAY </a> <br/>
                      <a href="#"> SUBMIT </a> <br/>
                     </div>);
          default: return(<div id="convo-box"> WTH? {this.state.recording} </div>)
      }
  }
}

class App extends Component {
  render() {
    return (<div id="list">
                <ConvoRecorder />
            </div>
           );
  }
}

export default App;

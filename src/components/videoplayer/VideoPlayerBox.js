import React, { Component } from 'react';
import VideoPlayer from 'react-video-js-player';
//import profilePic from '../images/instructor_profile.png';
import Button from '../../general/Button.js';
import './VideoPlayerBox.css';

class VideoPlayerBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: {
          src: "https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_480_1_5MG.mp4",
          poster: "http://www.example.com/path/to/video_poster.jpg"
      }
    }
  }

  player = {}

  onPlayerReady(player){
      console.log("Player is ready: ", player);
      this.player = player;
  }

  onVideoPlay(duration){
      console.log("Video played at: ", duration);
  }

  onVideoPause(duration){
      console.log("Video paused at: ", duration);
  }

  onVideoTimeUpdate(duration){
      console.log("Time updated: ", duration);
  }

  onVideoSeeking(duration){
      console.log("Video seeking: ", duration);
  }

  onVideoSeeked(from, to){
      console.log(`Video seeked from ${from} to ${to}`);
  }

  onVideoEnd(){
      console.log("Video ended");
  }
  render() {
      return (
        <div className="video-player-container">
          <div className="video-player-box">
            <div className="video-player-heading">
              <div className="video-title">
                {this.props.videoName}
              </div>
              <div className="close-video" onClick={this.props.onClose}>
                <span>X</span>
              </div>
            </div>
            <VideoPlayer
                    controls={true}
                    src={this.props.videoUrl}
                    width="720"
                    height="420"
                    onReady={this.onPlayerReady.bind(this)}
                    onPlay={this.onVideoPlay.bind(this)}
                    onPause={this.onVideoPause.bind(this)}
                    onTimeUpdate={this.onVideoTimeUpdate.bind(this)}
                    onSeeking={this.onVideoSeeking.bind(this)}
                    onSeeked={this.onVideoSeeked.bind(this)}
                    onEnd={this.onVideoEnd.bind(this)}
                />
          </div>
        </div>
      );
  }
}

export default VideoPlayerBox;

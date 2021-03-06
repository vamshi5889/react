import React, { Component } from 'react';
import VideoPlayerBox from '../videoplayer/VideoPlayerBox.js';
//import profilePic from '../images/instructor_profile.png';
import Button from '../../general/Button.js';
import './CourseMain.css';

class CourseMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      description: null,
      duration: null,
      instructor: {},
      sections: [],
      error: null,
      showVideoComponent: false,
      videoUrl: "",
      videoDesc: ""
    }
    this._previewVideo = this._previewVideo.bind(this);
    this._closeVideoPlayer = this._closeVideoPlayer.bind(this);
  }

  _previewVideo(videoUrl, videoDesc) {
    this.setState({
      showVideoComponent: true,
      videoUrl: videoUrl,
      videoDesc: videoDesc
    });
  }
  _closeVideoPlayer() {
    this.setState({
      showVideoComponent: false
    });
  }

  componentDidMount() {
    fetch(this.props.url).then(res => res.json())
    .then( (result) => {
      this.setState({
        title: result.title,
        description: result.description,
        instructor: result.instructor,
        duration: result.duration,
        sections: result.sections
      });
    },
    (error) => {
      this.setState({
        isLoaded: true,
        error
      });
    })
  }
  render() {
      const { error, title, description, instructor, duration, sections } = this.state;
      return (
        <div className="course-container">
          <div className="course-top-container">
            <div className="course-container-left">
              <div className="course-left-section">
                <p className="course-heading">{title}</p>
                <p className="course-description">
                  {description}
                </p>
              </div>
            </div>
            <div className="course-container-right">
            {instructor.name ?
              <div className="instructor-container">
                <p className="course-heading">Your Instructor</p>
                <br />

                  <div className="instructor-main">
                    <div className="instructor-left" style={{backgroundImage: "url(https://fedora.teachablecdn.com/assets/user-0ae68ba67e6ead32c4ff1cc668d501f896bddd5ef1667ac3e9ff29ce601ed653.png)"}}>
                      <div className="instructor-title">
                        {instructor.name}
                      </div>
                    </div>
                    <div className="instructor-right">
                      <div className="instructor-desc">
                        {instructor.description}
                      </div>
                    </div>
                  </div>
              </div> : ''
            }
            </div>
          </div>
          <div className="course-main-container">
            <div className="course-curriculam">
              <p className="course-heading">Class Curriculam</p>
              <div className="course-curriculam-body">
                <div className="course-sections-container">
                  <div className="course-sections-inner">

                  {sections.map((section, sectionKey) => {
                    return (
                      <div key={sectionKey}>
                        <div className="course-section-heading">
                          <strong>{section.title}</strong>
                        </div>

                        <div>
                          {section.items.map((item, itemKey) => {
                            return (
                              <div className="course-section-item" key={itemKey}>
                                <div className="item-body">
                                  {item.description} {section.type == 'video' ? "(" + item.duration + ")" : ""}
                                  <div className="course-section-btn">
                                    <Button theme="dark" size="sm" value={item.isPreview ? "Preview" : "Start"}
                                    onclick={() => this._previewVideo(item.url, item.description)} />
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                        <br />
                      </div>
                    )
                  })}
                  {this.state.showVideoComponent ?
                    <VideoPlayerBox videoUrl={this.state.videoUrl} videoName={this.state.videoDesc}
                    onClose={this._closeVideoPlayer} /> : null
                  }
                  </div>
                </div>
                <div className="course-faqs-container">

                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default CourseMain;

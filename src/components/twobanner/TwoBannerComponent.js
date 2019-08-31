import React, { Component } from 'react';
import './TwoBannerComponent.css';

class TwoBanner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="two-banner-container">
        <div className="two-banner-item">
          <div className="inner-item">
            <a href="/courseList">
              <div className="two-banner-box" style={{backgroundImage: "url(https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://www.filepicker.io/api/file/lDhwsPCuSNaYlK0euKPk)"}}>
                <div className="two-banner-tile">
                  <p className="banner-title">Devops & Cloud Bundle</p>
                  <p className="banner-desc">Everything you need to know to master in Devops & Cloud</p>
                  <div className="banner-bottom">
                    <div className="banner-bottom-inner">
                      <span className="banner-bottom-info">40 Course Bundle</span>
                      <span className="banner-bottom-price">&#8377;11,800</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="two-banner-item">
          <div className="inner-item">
            <a href="/courseList">
              <div className="two-banner-box" style={{backgroundImage: "url(https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://assets.teachablecdn.com/icons/default-course-image.png)"}}>
                <div className="two-banner-tile">
                  <p className="banner-title">Inhouse Student Package</p>
                  <p className="banner-desc"></p>
                  <div className="banner-bottom">
                    <div className="banner-bottom-inner">
                      <span className="banner-bottom-info">21 Course Bundle</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default TwoBanner;

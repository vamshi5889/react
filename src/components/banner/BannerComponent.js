import React, { Component } from 'react';
import './BannerComponent.css';

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      type: null,
      error: null,
      items: []
    }
  }

  componentDidMount() {
    fetch("https://api.myjson.com/bins/18eeb5").then(res => res.json())
    .then( (result) => {
      this.setState({
        status: result.status,
        type: result.type,
        items: result.items
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
    const { error, status, type, items } = this.state;
    if(status==='success') {
      return (
        <a href={items[0].webUrl}>
          <div className="hero-banner-container" style={{backgroundImage: "url(" + items[0].imageUrl + ")"}}>

          </div>
        </a>
      );
    } else {
      return (
        <div className="hero-banner-container">

        </div>
      );
    }
  }
}

export default Banner;

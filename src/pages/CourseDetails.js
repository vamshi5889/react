import React, {Component} from 'react';
import Header from '../general/Header.js';
import CourseMain from '../components/coursemain/CourseMain.js';
import Footer from '../general/Footer.js';
import './CourseDetails.css';

class CourseDetails extends Component {
  render () {
    return (
      <div className="App">
        <Header />
        <CourseMain url="https://api.myjson.com/bins/qpssv" />
        <Footer />
      </div>
    );
  }
}

export default CourseDetails;

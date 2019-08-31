import React, {Component} from 'react';
import Header from '../general/Header.js';
import CourseGrid from '../components/coursegrid/CourseGrid.js';
import Footer from '../general/Footer.js';
import './CourseDetails.css';

class CourseList extends Component {
  render () {
    return (
      <div className="App">
        <Header />
        <CourseGrid size="4" />
        <Footer />
      </div>
    );
  }
}

export default CourseList;

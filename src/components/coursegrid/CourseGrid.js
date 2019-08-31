import React, { Component } from 'react';
import './CourseGrid.css';

class CourseGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      totalCount: null,
      imageCDN: 'http://ec2-13-233-183-220.ap-south-1.compute.amazonaws.com',
      items: []
    }
  }

  componentDidMount() {
    fetch('http://ec2-13-233-183-220.ap-south-1.compute.amazonaws.com/api/v1/products').then(res => res.json())
    .then( (result) => {
      this.setState({
        items: result.products,
        totalCount: result.totalCount
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
    const { error, items, imageCDN, totalCount } = this.state;
      return (
        <div className="course-grid-container">
          <div className="course-grid-header">
            <div className="course-grid-title">
              {totalCount} Courses in the Bundle
            </div>
            <div className="bundle-price-info">
              &#8377;11,800
            </div>
          </div>
          <div className="course-grid-body">
            <ul className="course-grid-ul">
              {items.map((product) => {
                return (<li className={"course-grid-li course-grid-" + this.props.size}>
                  <a href="/courseDetails">
                    <div>
                      <div className="course-grid-box" style={{backgroundImage: "url("+ imageCDN + product.image.imageUrl + ")"}}>
                        <div class="product-item-title">
                          <div>{product.description.name}</div>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>)
              })}
            </ul>
          </div>
        </div>
      );
  }
}

export default CourseGrid;

import React, { Component } from 'react';
import './ProductGrid.css';

class ProductGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      type: null,
      error: null,
      title: null,
      viewMoreText: null,
      viewMoreUrl: null,
      items: []
    }
  }

  componentDidMount() {
    fetch(this.props.url).then(res => res.json())
    .then( (result) => {
      this.setState({
        status: result.status,
        type: result.type,
        items: result.items,
        title: result.title,
        viewMoreText: result.viewMoreText,
        viewMoreUrl: result.viewMoreUrl
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
    const { error, status, type, items, title, viewMoreText, viewMoreUrl } = this.state;
    if(status==='success') {
      return (
        <div className="product-grid-container">
          <div className="product-grid-header">
            <div className="product-grid-title">
              {title}
            </div>
          </div>
          <div className="product-grid-body">
            <ul className="product-grid-ul">
              {items.map((product) => {
                return (<li className={"product-grid-li product-grid-" + this.props.size}>
                  <a href={product.webUrl}>
                    <div className="product-grid-box" style={{backgroundImage: "url(" + product.imageUrl + ")"}}>
                      <div class="product-item-title">
                        <div>{product.title}</div>
                      </div>
                    </div>
                  </a>
                </li>)
              })}
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div className="product-grid-container">

        </div>
      );
    }
  }
}

export default ProductGrid;

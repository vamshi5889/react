import React, { Component } from 'react';
import './ProductList.css';

class ProductList extends Component {
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
        <div className="product-list-container">
          <div className="product-list-header">
            <div className="product-list-title">
              {title}
            </div>
            <div className="product-list-viewmore" style={{display: viewMoreUrl == "" ? 'none' : 'block'}}>
              <a href={viewMoreUrl}>{viewMoreText}</a>
            </div>
          </div>
          <div className="product-list-body">
            <ul className="product-list-ul">
              {items.map((product) => {
                return (<li className="product-list-li">
                  <a href={product.webUrl}>
                    <div className={"product-item-box " + this.props.shape} style={{backgroundImage: "url(" + product.imageUrl + ")"}}>
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
        <div className="product-list-container">

        </div>
      );
    }
  }
}

export default ProductList;

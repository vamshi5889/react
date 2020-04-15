import React, {Component} from 'react';
import Header from './general/Header.js';
import Banner from './components/banner/BannerComponent.js';
import TwoBanner from './components/twobanner/TwoBannerComponent.js';
import ProductList from './components/productlist/ProductList.js';
import ProductGrid from './components/productgrid/ProductGrid.js';
import Footer from './general/Footer.js';
import './App.css';

class App extends Component {
  render () {
    return (
      <div className="App">
        <Header />
        <Banner type="single"/>
        <TwoBanner />
        <ProductList shape="square" url="https://api.myjson.com/bins/o4dlv"/>
        <ProductList shape="square" url="https://api.myjson.com/bins/e2kwz"/>
        <ProductList shape="rect" url="https://api.myjson.com/bins/irb2f"/>
        <ProductGrid size="4" url="https://api.myjson.com/bins/o4dlv"/>
        <Footer />
      </div>
    );
  }
}

export default App;

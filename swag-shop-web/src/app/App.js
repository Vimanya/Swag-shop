import React from 'react';
import logo from './logo.svg';
import './App.css';
import HttpService from '../services/http-service';
import Product from '../product/product';
import Wishlist from '../wishlist/wishlist';



import ProductCondensed from '../product-condensed/product-condensed';

const http = new HttpService();


 

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {products:[]};
        
        this.loadData=this.loadData.bind(this);
        this.productList = this.productList.bind(this);
        this.loadData();
    }
    
    loadData = () => {
        var self =this;
        http.getProducts().then(data => {
            self.setState({products:data});
            console.log(data);
        }, err => { 
            
        });
    }
    
    productList = () =>{
        const list = this.state.products.map((product) => 
            <div className = "col-sm-5" key={product._id}>
                <Product product ={product} />
                    
            </div>
            
        );
        
        return(list);
    }

  render(){
  return (
    <div className="container App">
    
      <header className="container App-header">
        <img src={logo} className="App-logo" alt="logo" />
          </header>
          
          <div className="container-fluid App-main">
              <div className="row">
                  <div className="col-sm-8">
                    <div className="row">
                      {this.productList()}
                      </div>
                    
                  </div>
                  <div className="col-sm-4">
                    <Wishlist />
                    
                  </div>
              </div>
          </div>
      
      
    </div>
  );
 }
}
export default App;

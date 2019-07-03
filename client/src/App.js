import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router 
} from 'react-router-dom'
import AppNavbar from './components/AppNavbar';
import Books from './components/Books';
import Banner from './components/Banner'
import style from './App.module.css'
import scrollToComponent from 'react-scroll-to-component'
import api from './utils/api';
class App extends Component {
  state = {
    data: [],
    saved: [],
    lastSearch: ""
  };
  componentDidMount(){

  };
  componentWillUnmount(){};
  clearData = () => {
    this.setState({ data: [] });
  };
  getLastSearch = () => {
    this.state.lastSearch &&
    this.getBook(this.state.lastSearch);
  };
  getBook = query => {
    this.setState({lastSearch: query})
    api.getBooks().then(res => {
      this.setState({saved: res.data})
      api.getBook(query).then(res => {
        console.log(res)
        let unfilteredData = (res.data.items && res.data.items.map(item => {
          return {
            _id: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors,
            description: item.volumeInfo.description,
            image: (item.volumeInfo.imageLinks || "") && item.volumeInfo.imageLinks.thumbnail,
            link: item.volumeInfo.infoLink
          }
        })) || [];
        
        let savedIds = this.state.saved.map(book => book._id)
        let data = unfilteredData.filter(book => 
          savedIds.indexOf(book._id) === -1);
        this.setState({data});
        this.goToBooks();
      });
      
    });
  };
  getBooks = () => {
    api.getBooks().then(res => {
      console.log('saved', res.data);
      this.setState({saved: res.data})
    });
  };
  saveBook = (bookData) => {
    console.log(bookData)
    api.saveBook(bookData).then(res =>{
      console.log(res)
      this.getLastSearch();
    });
  };
  deleteBook = (id) => {
    api.deleteBook(id).then(res => this.getBooks())
  }
  goToBooks = () => {
    scrollToComponent(this.Books,{offset: -70, align: 'top', duration: 1000})
  };
  render(){
    return (
      <Router>
      <div className={style.app}>
        <AppNavbar
        getBook={this.getBook}
        />
        <Banner 
          goTo={ this.goToBooks }  
        />
       
        <Route 
          exact path="/" 
          render={props => 
            <Books 
            getLastSearch={ this.getLastSearch }
            ref={ a => this.Books = a }  
            data={ this.state.data }
            saveBook={ this.saveBook }
            clearData={ this.clearData}
            {...props}
            />
          }
        />
        <Route 
          exact path="/saved" 
          render={props => 
            <Books 
            ref={ a => this.Books = a}  
            data={this.state.saved}
            clearData={ this.clearData}
            getBooks={ this.getBooks }
            deleteBook={ this.deleteBook}
            {...props}
            />
          }
        />
       
      </div>
      </Router>
    );
  };
};

export default App;

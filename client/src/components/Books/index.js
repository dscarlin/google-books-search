import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, Container, Button } from 'reactstrap';
import style from './style.module.css';
export default class Books extends Component {
    state = {
      modalOpen: false,
      modalDataIndex: 0
    };
    toggleModal = () => {
      this.setState(prevState => ({
        modalOpen: !prevState.modalOpen
      }));
    }
    componentDidMount() {
      this.props.clearData();
      this.props.location.pathname === "/" && this.props.getLastSearch();
      this.props.location.pathname === "/saved" && this.props.getBooks();

    }
    render(data = this.props.data) {
        return(
          <Container className="tpBg">
           
            {data.length < 1
              ? 
              <Row >
               
                <Col className={ style.noArticle } xs={{ size: 10, offset: 1}} md={{ size: 8, offset: 2}} lg={{ size: 6, offset: 3}}>
                  {this.props.location.pathname === '/saved' 
                  ?
                  <div>
                    <h4>It appears we do not have any books saved.</h4>
                    <h5>Would you like to:</h5>
                    <Link to="/"><h5>Browse Books</h5></Link>
                  </div>
                  :
                  <div>
                    <h4>It appears there are no books to browse.</h4>
                    <h5>Start by entering a book title in the search bar.</h5>
                    <h5>Or would you like to:</h5>
                    <Link to="/saved"><h5>View Saved Books</h5></Link>
                  </div>
                  }
                </Col>
                
              </Row> 
              : data.map(dat => (
                  <Row className={style.article} key={dat._id}>
                      <Col md="2">
                        {dat.image &&
                        <a href={dat.link}><img className={style.articleImage} src={dat.image} alt="Article" /></a>
                        }
                      </Col>
                      <Col md="8 ">
                        <a href={dat.link} target="_blank" rel="noopener noreferrer"><h5 >{dat.title}</h5></a>
                        <p href={dat.link} target="_blank" rel="noopener noreferrer">{dat.description}</p>

                        {dat.authors && (
                        <div >
                          by: {dat.authors.map((author, index) => {
                            if(index > 0 && index === dat.authors.length -1)
                              return(<span> & {author}</span>)
                            else if(index > 0)
                              return(<span>, {author}</span>)
                            else
                              return(<span> {author}</span>)
                          }
                          )}
                          
                        </div>) } 
                      </Col>
                      <Col md="2">
                        {dat.saved ? 
                          <Button onClick={() => this.props.deleteBook(dat._id)}>
                            Remove
                          </Button>
                          
                          
                        :
                          <Button onClick={() => this.props.saveBook(dat)}>
                            Save
                          </Button>
                        }
                      </Col>
                  </Row> 
              ))
            }
            {/* <Note
            addNote={ this.props.addNote }
            removeNote={ this.props.removeNote }
            data={ data[this.state.modalDataIndex] || {notes: []} }
            toggle = {this.toggleModal}
            isOpen={this.state.modalOpen}
            /> */}
          </Container>
        )  
    }
}
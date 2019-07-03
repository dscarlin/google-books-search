import React, { Component } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavLink,
    NavItem
} from "reactstrap";
import SearchForm from "../SearchForm";
import style from "./style.module.css";

class AppNavbar extends Component {
    
    state = {
            isOpen: false
    };

    componentDidMount(){
        console.log(this.props);
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar className={style.bg}light expand="md">
                    <NavLink to="/" exact={true}  tag={RRNavLink} className={style.brand} >Google Books</NavLink>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink to="/" exact={true} activeClassName={style.active} className={style.linkPad} tag={RRNavLink}>Home</NavLink> 
                            </NavItem>
                            <NavItem>
                                <NavLink to="/saved" exact={true} activeClassName={style.active} className={style.linkPad} tag={RRNavLink}>Saved Books</NavLink> 
                            </NavItem>
                            <NavItem><NavLink></NavLink></NavItem>
                           
                            {this.props.location.pathname !== "/saved" && 
                            <SearchForm
                                getBook={this.props.getBook}
                                className={style.searchBar} 
                            />
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
export default withRouter(AppNavbar);
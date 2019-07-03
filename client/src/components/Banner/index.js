import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import style from "./style.module.css";
class Banner extends Component {
    render() {
        return(
            <div className={style.banner}>
                <div className={style.caption}>
                    { this.props.location.pathname === "/saved" 
                        ? 
                        <div>
                            <h1 className={style.bannerTitle}>Saved Books</h1> 
                            <h2><strong>Your Saved Books</strong></h2>
                        </div>
                        :
                        <div>
                            <h1 className={style.bannerTitle}>Book Finder</h1> 
                            <h2><strong>Google Books Edition</strong></h2>
                        </div>
                    }
                </div>
                <div onClick={ this.props.goTo } className={style.footer}>
                    <div className={style.indicator}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Banner);

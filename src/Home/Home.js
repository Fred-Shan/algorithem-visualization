import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Home.css';

class Home extends Component {
    render() {
        return (
            <div className={classes.home}>
                <div className={classes.title}>
                    <h1>Algorithem Visualization</h1>
                </div>

                <div className={classes.card}>
                    <NavLink
                        to="/lights">熄灯问题</NavLink>
                </div>
            </div>
        )
    }
}

export default Home;
import React from 'react';

import classes from './TopBar.css';

const Topbar = (props) => {
    return (
        <header className={classes.header}>
            <div className={classes.item}>Lights Out Puzzle</div>
        </header>
    );
}

export default Topbar;
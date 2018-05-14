import React from 'react';

import classes from './MainContent.css';

const MainContent = (props) => {
    return (
        <div className={classes.main} style={{width:props.sideWidth}}>
            {props.children}
        </div>
    )
}

export default MainContent;
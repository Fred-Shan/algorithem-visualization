import React from 'react';

import classes from './MainContent.css';

const MainContent = (props) => {
    return (
        <div className={classes.main} style={{width:props.mainWidth, height:props.mainHeight}}>
            {props.children}
        </div>
    )
}

export default MainContent;
import React from 'react';

import classes from './SideBar.css';

const Sidebar = (props) => {
    return (
        <div className={classes.sidebar} style={{width:props.sideWidth}}>
            {props.children}
        </div>
    )
}

export default Sidebar;
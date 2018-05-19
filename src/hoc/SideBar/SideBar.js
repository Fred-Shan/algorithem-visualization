import React from 'react';

import classes from './SideBar.css';

const Sidebar = (props) => {
    return (
        <div className={classes.sidebar} style={{...props}}>
            {props.children}
        </div>
    )
}

export default Sidebar;
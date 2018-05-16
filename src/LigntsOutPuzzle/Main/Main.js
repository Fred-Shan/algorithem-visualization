import React from 'react';

import classes from './Main.css';

const Main = (props) => {
    return (
        <div className={classes.container}>
            {props.lightsState.map((row, i) => {
                return row.map((item, j) => {
                    const id = i.toString() + j.toString();
                    return <div
                        id={id}
                        key={id}
                        className={classes.rect}
                        style={{ top: i * 60, left: j * 60, backgroundColor: item ? '#FFFF00' : '#8B8989' }}
                        onClick={props.clickLight.bind(this, id)}>
                    </div>
                })
            })}
        </div>
    )
};

export default Main;
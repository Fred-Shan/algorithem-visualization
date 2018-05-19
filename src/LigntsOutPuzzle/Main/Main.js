import React from 'react';

import classes from './Main.css';
import Wrapper from '../../hoc/Wrapper/Wrapper';

const Main = (props) => {
    const isAnswer = (row, column) => {
        for (let i = 0; i < props.answer.length; i++) {
            if (props.answer[i].toString() === [row, column].toString()) {
                return true;
            }
        }
        return false;
    }

    let subPanel1 = null;
    if (props.mode === 1) {
        subPanel1 = (
            <div className={classes.history}>
                <button className={classes.Button} onClick={props.clickFirstStep}>第一步</button>
                <button className={classes.Button} onClick={props.clickPrevStep}>上一步</button>
                <button className={classes.Button} onClick={props.clickNextStep}>下一步</button>
                <button className={classes.Button} onClick={props.clickFinalStep}>最后一步</button>
            </div>
        )
    }

    return (
        <Wrapper>
            <div
                className={classes.container}
                style={props.lightsState.length === 0 ? null : {
                    width: props.lightsState[0].length * 60,
                    height: props.lightsState.length * 60
                }}>
                {props.lightsState.map((row, i) => {
                    return row.map((item, j) => {
                        const id = i.toString() + j.toString();
                        let canBeClicked = null;
                        let showAnswer = null;
                        if (props.mode === 0) {
                            canBeClicked = false;
                            showAnswer = false;
                        } else if (props.mode === 1) {
                            canBeClicked = true;
                            showAnswer = false;
                        } else {
                            canBeClicked = isAnswer(i, j);
                            showAnswer = canBeClicked;
                        }
                        return <div
                            id={id}
                            key={id}
                            className={classes.rect}
                            style={{
                                top: i * 60, left: j * 60,
                                backgroundColor: item ? '#FFFF00' : '#8B8989',
                                cursor: canBeClicked ? "pointer" : "default"
                            }}
                            onClick={canBeClicked ? props.clickLight.bind(this, id) : null}>
                            <div className={showAnswer ? classes.answer : ''}></div>
                        </div>
                    })
                })}
            </div>
            {subPanel1}
        </Wrapper>
    )
};

export default Main;
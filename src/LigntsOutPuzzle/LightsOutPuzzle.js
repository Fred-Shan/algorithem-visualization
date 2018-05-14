import React, { Component } from 'react';

import SideBar from '../hoc/SideBar/SideBar';
import Wrapper from '../hoc/Wrapper/Wrapper';
import MainContent from '../hoc/MainContent/MainContent';
import Main from './Main/Main';
import classes from './LightsOutPuzzle.css';
import ControlPanel from './ControlPanel/ControlPanel';

class LightsOutPuzzle extends Component {
    state = {
        lightsState: [
            [0, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 1, 0],
            [1, 0, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 1, 0, 0, 1],
        ]
    }

    clickLight = (id) => {
        const lightsStateCopy = [...this.state.lightsState];
        const row = +id[0];
        const column = +id[1];
        this.changeLightState(row, column, lightsStateCopy);
        this.changeLightState(row - 1, column, lightsStateCopy);
        this.changeLightState(row + 1, column, lightsStateCopy);
        this.changeLightState(row, column - 1, lightsStateCopy);
        this.changeLightState(row, column + 1, lightsStateCopy);
        this.setState({lightsState: lightsStateCopy});
    }

    changeLightState = (row, column, lightsState) => {
        if (row < 0 || column < 0 || row > lightsState.length-1 || column > lightsState[0].length-1) {
            return;
        } else {
            lightsState[row][column] = (lightsState[row][column] + 1) % 2;
        }
    }

    render() {
        const lightsStateCopy = [...this.state.lightsState];
        return (
            <Wrapper>
                <SideBar>
                    <ControlPanel></ControlPanel>
                </SideBar>
                <MainContent>
                    <Main className={classes.center} lightsState={lightsStateCopy} clickLight={this.clickLight}></Main>
                </MainContent>
            </Wrapper>
        )
    }
}

export default LightsOutPuzzle;
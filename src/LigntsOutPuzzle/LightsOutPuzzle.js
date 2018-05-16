import React, { Component } from 'react';

import SideBar from '../hoc/SideBar/SideBar';
import Wrapper from '../hoc/Wrapper/Wrapper';
import MainContent from '../hoc/MainContent/MainContent';
import Main from './Main/Main';
import classes from './LightsOutPuzzle.css';
import ControlPanel from './ControlPanel/ControlPanel';

class LightsOutPuzzle extends Component {
    state = {
        lightsState: []
    }

    lightsStateHistory = [];
    currentStatePointer = null;

    initLightsState = (inputData) => {
        this.lightsStateHistory = [];
        this.currentStatePointer = 0;
        let lightsState = [];
        if (inputData.rowNum > 10 || inputData.columnNum > 10) {
            alert('行数或列数不能大于10');
            return;
        }
        const pureLightsState = inputData.lightsState.replace(/\s+/g, "");
        if (/^[01]+$/.test(pureLightsState) && pureLightsState.length === inputData.rowNum * inputData.columnNum) {
            for (let i = 0; i < inputData.rowNum; i++) {
                let temp = pureLightsState.substr(i * inputData.columnNum, inputData.columnNum).split('');
                for (let j = 0; j < temp.length; j++) {
                    temp[j] = +temp[j]; //将数组中的字符串转换成数字
                }
                lightsState.push(temp);
            }
            this.setState({ lightsState: lightsState });
            this.lightsStateHistory.push(JSON.parse(JSON.stringify(lightsState)));//使用JSON.parse和JSON.stringify实现简单的深拷贝
            console.log(this.lightsStateHistory);
        } else {
            alert('灯的初始状态数据有误');
            return;
        }
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
        this.setState({ lightsState: lightsStateCopy });
        this.lightsStateHistory.push(JSON.parse(JSON.stringify(lightsStateCopy)));
        console.log(this.lightsStateHistory);        
        this.currentStatePointer++;
    }

    changeLightState = (row, column, lightsState) => {
        if (row < 0 || column < 0 || row > lightsState.length - 1 || column > lightsState[0].length - 1) {
            return;
        } else {
            lightsState[row][column] = (lightsState[row][column] + 1) % 2;
        }
    }

    toFirstStep = () => {
        if (this.currentStatePointer && this.currentStatePointer > 0) {
            this.currentStatePointer = 0;
            let lightsStateCopy = this.lightsStateHistory[this.currentStatePointer];
            this.setState({ lightsState: JSON.parse(JSON.stringify(lightsStateCopy)) });
        } else {
            alert('已经到第一步');
        }
    }

    toLastStep = () => {
        console.log(this.currentStatePointer);
        console.log(this.lightsStateHistory);
        if (this.currentStatePointer && this.currentStatePointer > 0) {
            this.currentStatePointer--;
            let lightsStateCopy = this.lightsStateHistory[this.currentStatePointer];
            this.setState({ lightsState: JSON.parse(JSON.stringify(lightsStateCopy)) });
        } else {
            alert('已经到第一步');
        }
    }

    toNextStep = () => {
        if (this.currentStatePointer >= 0 && this.currentStatePointer < this.lightsStateHistory.length - 1) {
            this.currentStatePointer++;
            let lightsStateCopy = this.lightsStateHistory[this.currentStatePointer];
            this.setState({ lightsState: JSON.parse(JSON.stringify(lightsStateCopy)) });
        } else {
            alert('已经到最后一步');
        }
    }

    toFinalStep = () => {
        if (this.currentStatePointer >= 0 && this.currentStatePointer < this.lightsStateHistory.length - 1) {
            this.currentStatePointer = this.lightsStateHistory.length - 1;
            let lightsStateCopy = this.lightsStateHistory[this.currentStatePointer];
            this.setState({ lightsState: JSON.parse(JSON.stringify(lightsStateCopy)) });
        } else {
            alert('已经到最后一步');
        }
    }

    render() {
        const lightsStateCopy = [...this.state.lightsState];
        return (
            <Wrapper>
                <SideBar>
                    <ControlPanel 
                        submit={this.initLightsState} 
                        clickLastStep={this.toLastStep} 
                        clickNextStep={this.toNextStep}
                        clickFirstStep={this.toFirstStep}
                        clickFinalStep={this.toFinalStep}></ControlPanel>
                </SideBar>
                <MainContent>
                    <Main className={classes.center} lightsState={lightsStateCopy} clickLight={this.clickLight}></Main>
                </MainContent>
            </Wrapper>
        )
    }
}

export default LightsOutPuzzle;
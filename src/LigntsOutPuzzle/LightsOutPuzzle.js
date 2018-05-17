import React, { Component } from 'react';

import SideBar from '../hoc/SideBar/SideBar';
import Wrapper from '../hoc/Wrapper/Wrapper';
import MainContent from '../hoc/MainContent/MainContent';
import Main from './Main/Main';
import classes from './LightsOutPuzzle.css';
import ControlPanel from './ControlPanel/ControlPanel';

class LightsOutPuzzle extends Component {
    state = {
        currentStatePointer: null
    }

    lightsStateHistory = [];
    rowNum = null;
    columnNum = null;

    initLightsState = (inputData) => {
        this.lightsStateHistory = [];
        let lightsState = [];
        if (inputData.rowNum > 10 || inputData.columnNum > 10) {
            alert('行数或列数不能大于10');
            return;
        }
        if (inputData.rowNum < 2 || inputData.columnNum < 2) {
            alert('行数或列数不能小于2');
            return;
        }
        this.rowNum = +inputData.rowNum;
        this.columnNum = +inputData.columnNum;
        const pureLightsState = inputData.lightsState.replace(/\s+/g, "");
        if (/^[01]+$/.test(pureLightsState) && pureLightsState.length === inputData.rowNum * inputData.columnNum) {
            for (let i = 0; i < inputData.rowNum; i++) {
                let temp = pureLightsState.substr(i * inputData.columnNum, inputData.columnNum).split('');
                for (let j = 0; j < temp.length; j++) {
                    temp[j] = +temp[j]; //将数组中的字符串转换成数字
                }
                lightsState.push(temp);
            }
            this.lightsStateHistory.push(lightsState);
            this.setState({ currentStatePointer: 0 });
        } else {
            alert('灯的初始状态数据有误');
            return;
        }
    }

    clickLight = (id) => {
        if (this.state.currentStatePointer < this.lightsStateHistory.length - 1) {
            this.lightsStateHistory = this.lightsStateHistory.slice(0, this.state.currentStatePointer + 1);
        }
        const lightsState = JSON.parse(JSON.stringify(this.lightsStateHistory[this.state.currentStatePointer]));//通过JSON实现简单的深拷贝
        const row = +id[0];
        const column = +id[1];
        this.changeLightState(row, column, lightsState);
        this.changeLightState(row - 1, column, lightsState);
        this.changeLightState(row + 1, column, lightsState);
        this.changeLightState(row, column - 1, lightsState);
        this.changeLightState(row, column + 1, lightsState);
        this.lightsStateHistory.push(lightsState);
        this.setState((prevState, props) => {
            return {
                currentStatePointer: prevState.currentStatePointer + 1
            }
        });       
    }

    changeLightState = (row, column, lightsState) => {
        if (row < 0 || column < 0 || row > lightsState.length - 1 || column > lightsState[0].length - 1) {
            return;
        } else {
            lightsState[row][column] = (lightsState[row][column] + 1) % 2;
        }
    }

    toFirstStep = () => {
        if (this.state.currentStatePointer && this.state.currentStatePointer > 0) {
            this.setState({currentStatePointer: 0});
        } else {
            alert('已经到第一步');
        }
    }

    toPrevStep = () => {
        if (this.state.currentStatePointer && this.state.currentStatePointer > 0) {
            this.setState((prevState, props) => {
                return {
                    currentStatePointer: prevState.currentStatePointer - 1
                }
            });
        } else {
            alert('已经到第一步');
        }
    }

    toNextStep = () => {
        if (this.state.currentStatePointer >= 0 && this.state.currentStatePointer < this.lightsStateHistory.length - 1) {
            this.setState((prevState, props) => {
                return {
                    currentStatePointer: prevState.currentStatePointer + 1
                }
            });
        } else {
            alert('已经到最后一步');
        }
    }

    toFinalStep = () => {
        if (this.state.currentStatePointer >= 0 && this.state.currentStatePointer < this.lightsStateHistory.length - 1) {
            this.setState({currentStatePointer: this.lightsStateHistory.length - 1});
        } else {
            alert('已经到最后一步');
        }
    }

    getAnswer = () => {
        let base = Math.pow(2, this.columnNum);
        let solution = [];
        for (let counter = 0; counter < base; counter++) {
            const initLightsState = JSON.parse(JSON.stringify(this.lightsStateHistory[0]));
            const clicksOnFirstRow = ((base + counter).toString(2)).slice(1);
            for (let i = 0; i < clicksOnFirstRow.length; i++) {
                if (clicksOnFirstRow[i] === '1') {
                    this.changeLightState(0, i, initLightsState);
                    this.changeLightState(0, i-1, initLightsState);
                    this.changeLightState(0, i+1, initLightsState);
                    this.changeLightState(1, i, initLightsState);
                    solution.push([0, i]);
                }
            }
            const finalLightsState = this.clickRemainingRows(1, initLightsState, solution);
            const criterion = finalLightsState[this.rowNum-1].reduce((total, item) => total + item, 0);
            if (criterion === 0) {
                console.log(solution);
                return solution;
            } else {
                solution = [];
            }
        }
        console.log(solution);
        return solution;
    }

    clickRemainingRows = (startRowIndex, initLightsState, solution) => {
        for (let i = 0; i < this.columnNum; i++) {
            if (initLightsState[startRowIndex-1][i] === 1) {
                this.changeLightState(startRowIndex, i, initLightsState);
                this.changeLightState(startRowIndex, i-1, initLightsState);
                this.changeLightState(startRowIndex, i+1, initLightsState);
                this.changeLightState(startRowIndex-1, i, initLightsState);
                this.changeLightState(startRowIndex+1, i, initLightsState);
                solution.push([startRowIndex, i]);
            }
        }
        if (startRowIndex + 1 <= initLightsState.length - 1) {
            return this.clickRemainingRows(startRowIndex + 1, initLightsState, solution);
        } else {
            return initLightsState;
        }
    }

    render() {
        const lightsStateCopy = this.state.currentStatePointer === null ? [] : JSON.parse(JSON.stringify(this.lightsStateHistory[this.state.currentStatePointer]));
        return (
            <Wrapper>
                <SideBar>
                    <ControlPanel 
                        submit={this.initLightsState} 
                        clickPrevStep={this.toPrevStep}
                        clickNextStep={this.toNextStep} 
                        clickFirstStep={this.toFirstStep}
                        clickFinalStep={this.toFinalStep}
                        getAnswer={this.getAnswer}></ControlPanel>
                </SideBar>
                <MainContent>
                    <Main className={classes.center} lightsState={lightsStateCopy} clickLight={this.clickLight}></Main>
                </MainContent>
            </Wrapper>
        )
    }
}

export default LightsOutPuzzle;
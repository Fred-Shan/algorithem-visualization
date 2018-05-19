import React, { Component } from 'react';

import SideBar from '../hoc/SideBar/SideBar';
import Wrapper from '../hoc/Wrapper/Wrapper';
import MainContent from '../hoc/MainContent/MainContent';
import Main from './Main/Main';
import classes from './LightsOutPuzzle.css';
import ControlPanel from './ControlPanel/ControlPanel';

class LightsOutPuzzle extends Component {
    state = {
        currentStatePointer: null,
        answer: [],
        mode: null  //0：自己出题；1：动手试一试；2：跪求答案；3：随机来一题
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
            this.setState({ currentStatePointer: 0, mode: 0 });
        } else {
            alert('灯的初始状态数据有误');
            return;
        }
    }

    clickLight = (id, canBeClicked) => {
        if (this.state.mode === 0 || this.state.mode === 3) {
            return;
        } else {
            if (this.state.currentStatePointer < this.lightsStateHistory.length - 1) {
                this.lightsStateHistory = this.lightsStateHistory.slice(0, this.state.currentStatePointer + 1);
            }//如果当前步骤不是最后一步，需要把后面的步骤清除
            const lightsState = JSON.parse(JSON.stringify(this.lightsStateHistory[this.state.currentStatePointer]));//通过JSON实现简单的深拷贝
            const row = +id[0];
            const column = +id[1];
            this.changeLightState(row, column, lightsState);
            this.changeLightState(row - 1, column, lightsState);
            this.changeLightState(row + 1, column, lightsState);
            this.changeLightState(row, column - 1, lightsState);
            this.changeLightState(row, column + 1, lightsState);
            this.lightsStateHistory.push(lightsState);
            if (this.state.mode === 1) {
                this.setState((prevState, props) => {
                    return {
                        currentStatePointer: prevState.currentStatePointer + 1
                    }
                });
            } else {
                this.setState((prevState, props) => {
                    for (let i = 0; i < prevState.answer.length; i++) {
                        if (prevState.answer[i].toString() === [row, column].toString()) {
                            prevState.answer.splice(i, 1);
                        }
                    }
                    return {
                        currentStatePointer: prevState.currentStatePointer + 1,
                        answer: prevState.answer
                    }
                })
            }

        }
    }

    changeLightState = (row, column, lightsState) => {
        if (row < 0 || column < 0 || row > lightsState.length - 1 || column > lightsState[0].length - 1) {
            return;
        } else {
            lightsState[row][column] = (lightsState[row][column] + 1) % 2;
        }
    }

    toFirstStep = () => {
        if (this.state.mode === 1) {
            if (this.state.currentStatePointer && this.state.currentStatePointer > 0) {
                this.setState({ currentStatePointer: 0 });
            } else {
                alert('已经到第一步');
            }
        }
    }

    toPrevStep = () => {
        if (this.state.mode === 1) {
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
    }

    toNextStep = () => {
        if (this.state.mode === 1) {
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
    }

    toFinalStep = () => {
        if (this.state.mode === 1) {
            if (this.state.currentStatePointer >= 0 && this.state.currentStatePointer < this.lightsStateHistory.length - 1) {
                this.setState({ currentStatePointer: this.lightsStateHistory.length - 1 });
            } else {
                alert('已经到最后一步');
            }
        }
    }

    getAnswer = () => {
        if (this.state.currentStatePointer !== null) {
            let base = Math.pow(2, this.columnNum);
            let solution = [];
            for (let counter = 0; counter < base; counter++) {
                const initLightsState = JSON.parse(JSON.stringify(this.lightsStateHistory[0]));
                const clicksOnFirstRow = ((base + counter).toString(2)).slice(1);
                for (let i = 0; i < clicksOnFirstRow.length; i++) {
                    if (clicksOnFirstRow[i] === '1') {
                        this.changeLightState(0, i, initLightsState);
                        this.changeLightState(0, i - 1, initLightsState);
                        this.changeLightState(0, i + 1, initLightsState);
                        this.changeLightState(1, i, initLightsState);
                        solution.push([0, i]);
                    }
                }
                const finalLightsState = this.clickRemainingRows(1, initLightsState, solution);
                const criterion = finalLightsState[this.rowNum - 1].reduce((total, item) => total + item, 0);
                if (criterion === 0) {
                    const lightsState = this.lightsStateHistory[0];
                    this.lightsStateHistory = [];
                    this.lightsStateHistory.push(lightsState);
                    this.setState({ currentStatePointer: 0, answer: solution, mode: 2 });
                    return;
                } else {
                    solution = [];
                }
            }
            alert("该题没有答案")
            const lightsState = this.lightsStateHistory[0];
            this.lightsStateHistory = [];
            this.lightsStateHistory.push(lightsState);
            this.setState({ currentStatePointer: 0, answer: solution, mode: 2 });
            return;
        } else {
            alert("请先出题");
        }
    }

    clickRemainingRows = (startRowIndex, initLightsState, solution) => {
        for (let i = 0; i < this.columnNum; i++) {
            if (initLightsState[startRowIndex - 1][i] === 1) {
                this.changeLightState(startRowIndex, i, initLightsState);
                this.changeLightState(startRowIndex, i - 1, initLightsState);
                this.changeLightState(startRowIndex, i + 1, initLightsState);
                this.changeLightState(startRowIndex - 1, i, initLightsState);
                this.changeLightState(startRowIndex + 1, i, initLightsState);
                solution.push([startRowIndex, i]);
            }
        }
        if (startRowIndex + 1 <= initLightsState.length - 1) {
            return this.clickRemainingRows(startRowIndex + 1, initLightsState, solution);
        } else {
            return initLightsState;
        }
    }

    clickTry = () => {
        if (this.state.currentStatePointer !== null) {
            const lightsState = this.lightsStateHistory[0];
            this.lightsStateHistory = [];
            this.lightsStateHistory.push(lightsState);
            this.setState({ currentStatePointer: 0, answer: [], mode: 1 });
        } else {
            alert("请先出题");
        }

    }

    generatePuzzle = () => {
        this.rowNum = Math.floor(Math.random() * 8 + 2);//随机生成2~9之间的行数
        this.columnNum = Math.floor(Math.random() * 8 + 2);//随机生成2~9之间的列数
        let initLightsState = [];
        for (let i = 0; i < this.rowNum; i++) {
            let rowArr = [];
            for (let j = 0; j < this.columnNum; j++) {
                rowArr.push(0);
            }
            initLightsState.push([...rowArr]);
        }//初始灯的状态为全暗
        for (let k = 0; k < 10; k++) {
            let rowIndex = Math.floor(Math.random() * this.rowNum);
            let columnIndex = Math.floor(Math.random() * this.columnNum);
            this.changeLightState(rowIndex, columnIndex, initLightsState);
            this.changeLightState(rowIndex - 1, columnIndex, initLightsState);
            this.changeLightState(rowIndex + 1, columnIndex, initLightsState);
            this.changeLightState(rowIndex, columnIndex - 1, initLightsState);
            this.changeLightState(rowIndex, columnIndex + 1, initLightsState);
        }//随机点击10个灯
        this.lightsStateHistory = [];
        this.lightsStateHistory.push(initLightsState);
        this.setState({ currentStatePointer: 0, answer: [], mode: 3 });
    }

    puzzleMyself = () => {
        this.lightsStateHistory = [];
        this.setState({ currentStatePointer: null, answer: [], mode: 0 });
    }

    render() {
        const lightsStateCopy = this.state.currentStatePointer === null ? [] : JSON.parse(JSON.stringify(this.lightsStateHistory[this.state.currentStatePointer]));
        console.log(this.state.answer);
        return (
            <Wrapper>
                <SideBar>
                    <ControlPanel
                        submit={this.initLightsState}
                        haveATry={this.clickTry}
                        puzzleMyself={this.puzzleMyself}
                        getAnswer={this.getAnswer}
                        mode={this.state.mode}
                        generatePuzzle={this.generatePuzzle}></ControlPanel>
                </SideBar>
                <MainContent>
                    <Main
                        className={classes.center}
                        lightsState={lightsStateCopy}
                        clickLight={this.clickLight}
                        answer={this.state.answer}
                        mode={this.state.mode}
                        clickPrevStep={this.toPrevStep}
                        clickNextStep={this.toNextStep}
                        clickFirstStep={this.toFirstStep}
                        clickFinalStep={this.toFinalStep}>
                    </Main>
                </MainContent>
            </Wrapper>
        )
    }
}

export default LightsOutPuzzle;
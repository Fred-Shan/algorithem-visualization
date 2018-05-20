import React, { Component } from 'react';

import Wrapper from '../../hoc/Wrapper/Wrapper';
import classes from './ControlPanel.css';

class ControlPanel extends Component {
    rowInput = '';
    columnInput = '';
    lightsStateInput = '';

    getInputData = () => {
        return {
            rowNum: this.rowInput.value,
            columnNum: this.columnInput.value,
            lightsState: this.lightsStateInput.value
        }
    }

    render() {
        // const inputData = {
        //     rowNum: this.rowInput.value,
        //     columnNum: this.columnInput.value,
        //     lightsState: this.lightsStateInput.value
        // };
        let subPanel0 = null,
            subPanel3 = null;
        if (this.props.mode === 0) {
            subPanel0 = (
                <Wrapper>
                    <div className={classes.seperator}></div>
                    <div className={classes.inputElement}>
                        <span className={classes.label}>行（2~9）</span>
                        <input className={classes.input} type="text" ref={(inp) => { this.rowInput = inp }} />
                    </div>
                    <div className={classes.inputElement}>
                        <span className={classes.label}>列（2~9）</span>
                        <input className={classes.input} type="text" ref={(inp) => { this.columnInput = inp }} />
                    </div>
                    <div className={classes.inputElement}>
                        <span className={classes.label}>灯的初始状态</span>
                        <textarea className={classes.input} rows="10" ref={(inp) => { this.lightsStateInput = inp }}></textarea>
                        <p className={classes.hint}>示例：3行4列可输入1001 0100 1001。其中1代表点亮，0代表熄灭。</p>
                    </div>
                    <div className={classes.inputElement}>
                        <input
                            type="button"
                            value="提交"
                            className={classes.submit}
                            onClick={() => { this.props.submit(this.getInputData()) }} />
                    </div>
                </Wrapper>
            )
        }

        if (this.props.mode === 3) {
            subPanel3 = (
                <Wrapper>
                    <div className={classes.seperator}></div>
                    <p className={classes.title}><strong>问题描述：</strong></p>
                    <p className={classes.paragraph}>每个按钮的位置上有一盏灯。当按下一个按钮后，该按钮以及周围位置(上边、下边、左边、右边)的灯都会改变一次。即，如果灯原来是点亮的，就会被熄灭；如果灯原来是熄灭的，则会被点亮。在矩阵角上的按钮改变3盏灯的状态；在矩阵边上的按钮改变4盏灯的状态；其他的按钮改变5盏灯的状态。</p>
                    <p className={classes.title}><strong>目标：</strong></p>
                    <p className={classes.paragraph}>使得所有的灯都熄灭（灰色）</p>
                </Wrapper>

            )
        }
        return (
            <Wrapper>
                <div
                    className={classes.section}
                    onClick={this.props.generatePuzzle}
                    style={{ color: this.props.mode === 3 ? "rgb(51, 103, 214)" : "rgb(90, 90, 90)" }}>随机来一题
                </div>
                <div
                    className={classes.section}
                    onClick={this.props.puzzleMyself}
                    style={{ color: this.props.mode === 0 ? "rgb(51, 103, 214)" : "rgb(90, 90, 90)" }}>自己出题
                    </div>
                <div
                    className={classes.section}
                    onClick={this.props.haveATry}
                    style={{ color: this.props.mode === 1 ? "rgb(51, 103, 214)" : "rgb(90, 90, 90)" }}>动手试一试
                </div>
                <div
                    className={classes.section}
                    onClick={this.props.getAnswer}
                    style={{ color: this.props.mode === 2 ? "rgb(51, 103, 214)" : "rgb(90, 90, 90)" }}>跪求答案
                </div>
                {subPanel0}
                {subPanel3}
            </Wrapper>

        )
    }

};

export default ControlPanel;
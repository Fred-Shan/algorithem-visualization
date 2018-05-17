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
        const inputData = {
            rowNum: this.rowInput.value,
            columnNum: this.columnInput.value,
            lightsState: this.lightsStateInput.value
        };
        let subPanel = null;
        if (this.props.mode === 1) {
            subPanel = (
                <Wrapper>
                    <button onClick={this.props.clickFirstStep}>第一步</button>
                    <button onClick={this.props.clickPrevStep}>上一步</button>
                    <button onClick={this.props.clickNextStep}>下一步</button>
                    <button onClick={this.props.clickFinalStep}>最后一步</button>
                </Wrapper>
            )
        }
        return (
            <Wrapper>
                <div className={classes.section}>
                    <span>随机来一题:</span>
                    <button onClick={this.props.generatePuzzle}>Go!</button>
                </div>
                <div className={classes.section}>
                    <div>自己出题:</div>
                    <div>
                        <span>行：</span>
                        <input type="text" ref={(inp) => { this.rowInput = inp }} />
                    </div>
                    <div>
                        <span>列：</span>
                        <input type="text" ref={(inp) => { this.columnInput = inp }} />
                    </div>
                    <div>
                        <div>灯的初始状态：</div>
                        <textarea rows="10" cols="30" ref={(inp) => { this.lightsStateInput = inp }}></textarea>
                    </div>
                    <button onClick={() => { this.props.submit(this.getInputData()) }}>提交</button>
                </div>
                <div className={classes.section}>
                    <div><button onClick={this.props.clickTry}>动手试一试</button></div>
                    {subPanel}
                </div>
                <div className={classes.section}>
                    <button onClick={this.props.getAnswer}>跪求答案</button>
                </div>
            </Wrapper>

        )
    }

};

export default ControlPanel;
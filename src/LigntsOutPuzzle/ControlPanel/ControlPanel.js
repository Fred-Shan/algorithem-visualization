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
        return (
            <Wrapper>
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
                <button onClick={() => {this.props.submit(this.getInputData())}}>提交</button>
                <button onClick={this.props.clickFirstStep}>第一步</button>
                <button onClick={this.props.clickLastStep}>上一步</button>
                <button onClick={this.props.clickNextStep}>下一步</button>
                <button onClick={this.props.clickFinalStep}>最后一步</button>
                <button>答案</button>
            </Wrapper>

        )
    }

};

export default ControlPanel;
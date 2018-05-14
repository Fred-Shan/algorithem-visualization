import React from 'react';

import Wrapper from '../../hoc/Wrapper/Wrapper';
import classes from './ControlPanel.css';

const ControlPanel = () => {
    return (
        <Wrapper>
            <div>
                <span>行：</span>
                <input type="text" />
            </div>
            <div>
                <span>列：</span>
                <input type="text" />
            </div>
            <div>
                <div>初始灯的状态：</div>
                <textarea rows="10" cols="30"></textarea>
            </div>
            <button>提交</button>
            <button>初始化</button>
            <button>上一步</button>
            <button>下一步</button>
            <button>答案</button>
        </Wrapper>
        
    )
};

export default ControlPanel;
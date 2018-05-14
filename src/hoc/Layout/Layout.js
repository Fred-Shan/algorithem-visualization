import React, { Component } from 'react';

import Wrapper from '../Wrapper/Wrapper';
import Topbar from '../TopBar/TopBar';
import LightsOutPuzzle from '../../LigntsOutPuzzle/LightsOutPuzzle';

class Layout extends Component {
    render() {
        return (
            <Wrapper>
                <Topbar></Topbar>
                <LightsOutPuzzle></LightsOutPuzzle>
            </Wrapper>
        )
    }
}

export default Layout;
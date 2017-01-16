'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import HeaderController from './HeaderController';
import CallingController from './CallingController';

class MainController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <HeaderController/>
          <CallingController/>
      </div>
    );
  }

}

ReactDOM.render(<MainController/>, $('#main-container')[0]);

export default MainController;

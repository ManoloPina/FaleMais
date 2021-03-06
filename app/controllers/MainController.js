'use strict';

// import React from 'react';
// import ReactDOM from 'react-dom';
import HeaderController from './HeaderController';
import CallingController from './CallingController';
import FooterController from './FooterController';

class MainController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <HeaderController/>
          <CallingController/>
        <FooterController/>
      </div>
    );
  }

}

ReactDOM.render(<MainController/>, $('#main-container')[0]);

export default MainController;

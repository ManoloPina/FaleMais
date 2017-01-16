'use strict';

// import React from 'react';

class HeaderController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div clasName="navbar-header">
            <a clasName="navbar-brand" href="#">
              <img src="vendor/css/images/logo.png" className="img center-block"/>
            </a>
        </div>
      </div>
    </nav>
    );
  }

}

export default HeaderController;

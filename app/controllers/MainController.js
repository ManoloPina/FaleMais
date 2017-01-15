'use strict';


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

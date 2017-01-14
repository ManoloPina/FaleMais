'use strict';


class MainController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HeaderController/>
    );
  }

}

ReactDOM.render(<MainController/>, $('#main-container')[0]);

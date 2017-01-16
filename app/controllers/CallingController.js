'use strct';

import ServiceController from './ServiceController';
// import React from 'react';
// import ReactDOM from 'react-dom';

class CallingController extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.origin;
    this.state.destiny;
    this.state.selectedOrigin;
    this.state.normalPrice;
    this.state.mais30;
    this.state.mais60;
    this.state.mais120;
    this.state.minutes = null;
    this.state.listDetails = [];
  }

  componentWillMount() {
    ServiceController.getDetails()
    .then((details) => {
      console.log('data', details);
      this.listDetails = details.data.map((detail) => {
        return (
          <tr data-ddd={detail.ddd} data-city={detail.city}>
            <td>{detail.ddd.substring(1)}</td>
            <td>{detail.city}</td>
          </tr>
        );
      });
    })
    .then(() => {
      this.setState({listDetails: this.listDetails});
      this.$tableOrigin.on('click', this.originClickRow.bind(this));
      this.$tableDestiny.on('click', this.destinyClickRow.bind(this));
    });
  }

  componentDidMount() {
    this.refs.originBtn.disabled = true;
    this.refs.destinyBtn.disabled = true;
    this.$selectOrigin.on('click', this.openModal.bind(this, '#modal-origin'));
    this.$selectDestiny.on('click', this.openModal.bind(this, '#modal-destiny'));
    this.$minutes.on('change', this.calc.bind(this));
  }


  openModal(modalElement) {
    $(modalElement).modal('show');
  }

  closeModal() {
    $('.modal').modal('hide');
  }

  originClickRow(event) {
    let ddd = $(event.target).parent().data('ddd');
    this.setState({origin: ddd});
    this.closeModal();
  }

  destinyClickRow(event) {
    let ddd = $(event.target).parent().data('ddd');
    this.setState({destiny: ddd});
    this.closeModal();
  }

  calc(event) {

    this.setState({minutes: event.target.value});

    ServiceController.getPrices()
    .then((prices) => {
      console.log('prices', prices);
      let value;
      prices.data.forEach(price => {
        if(price.origin == this.state.origin && price.destiny == this.state.destiny) value = price.price;
      });


      if(value > 0) {

        this.setState({
          normalPrice: `R$${value*this.state.minutes}`,
          mais30: `R$${this.state.minutes < 30 ? '0,00' : ((this.state.minutes -30)*value)+(((this.state.minutes - 30)*value)*0.1)}`,
          mais60: `R$${this.state.minutes < 60 ? '0,00' : ((this.state.minutes -60)*value)+(((this.state.minutes - 60)*value)*0.1)}`,
          mais120:`R$${this.state.minutes < 120 ? '0,00' : ((this.state.minutes -120)*value)+(((this.state.minutes - 120)*value)*0.1)}`
        });
      }else {
        this.setState({
          normalPrice: `-`,
          mais30: `-`,
          mais60: '-',
          mais120: '-'
        });
      }



    });
  }

  render() {
    return (
      <div className="container calling-controller">
        <form className="form-inline">
          <h2 className="text-primary text-center">Comparar Planos</h2>

          <div className="row">

            <div className="form-group col-md-4">
              <label className="center-block text-muted">Origin</label>
              <div className="input-group">
                <input type="text" className="form-control origin-btn" ref="originBtn" value={this.state.origin}  placeholder="DDD"/>
                <div className="input-group-addon select-origin">
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </div>
              </div>
            </div>

            <div className="form-group col-md-4">
              <label className="center-block text-muted">Destiny</label>
              <div className="input-group">
                <input type="text" className="form-control destiny-btn" ref="destinyBtn" value={this.state.destiny}  placeholder="DDD"/>
                <div className="input-group-addon select-destiny">
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </div>
              </div>
            </div>

            <div className="form-group col-md-4">
              <input type="text" className="form-control pull-right time" defaultValue={this.state.minutes} placeholder="MM"/>
            </div>

          </div>
        </form>

        <section className="row result">
          <div className="col-sm-3 text-muted text-center">
            <h4>Fale + 30</h4>
            <strong>{this.state.mais30}</strong>
          </div>

          <div className="col-sm-3 text-muted text-center">
            <h4>Fale + 60</h4>
            <strong>{this.state.mais60}</strong>
          </div>

          <div className="col-sm-3 text-muted text-center">
            <h4>Fale + 120</h4>
            <strong>{this.state.mais120}</strong>
          </div>

          <div className="col-sm-3 text-muted text-center">
            <h4>Normal</h4>
            <strong>{this.state.normalPrice}</strong>
          </div>
        </section>

        {this.modalOrigin}

        {this.modalDestiny}

      </div>
    );
  }

  get modalOrigin() {
    return (
      <div className="modal fade" id="modal-origin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="myModalLabel">Select an origin</h4>
            </div>

            <div className="modal-body">
              <table className="table table-striped table-origin">
                <tbody>
                  {this.state.listDetails}
                </tbody>
              </table>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  get modalDestiny() {
    return (
      <div className="modal fade" id="modal-destiny" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Select a destiny</h4>
            </div>

            <div className="modal-body">
              <table className="table table-striped table-destiny">
                <tbody>
                  {this.state.listDetails}
                </tbody>
              </table>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  get $originBtn() {
    return $('.origin-btn');
  }

  get $selectOrigin() {
    return $('.select-origin');
  }

  get $tableOrigin() {
    return $('.table-origin');
  }

  get $selectDestiny() {
    return $('.select-destiny');
  }

  get $tableDestiny() {
    return $('.table-destiny');
  }

  get $minutes() {
    return $('.time');
  }

}

export default CallingController;

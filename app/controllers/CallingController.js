'use strct';

import LinkedStateMixin from 'react-addons-linked-state-mixin';
import ServiceController from './ServiceController';
import React from 'react';
import ReactDOM from 'react-dom';

class CallingController extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.origin;
    this.state.selectedOrigin;
    this.state.listDetails = [];
  }

  componentWillMount() {
    ServiceController.getDetails()
    .then((details) => {
      console.log('data', details);
      this.listDetails = details.data.map((detail) => {
        return (<li>{detail.ddd} - {detail.city}</li>);
      });
    })
    .then(() => {
      this.setState({listDetails: this.listDetails});
    });
  }

  componentDidMount() {
    this.refs.originBtn.disabled = true;
    this.refs.destinyBtn.disabled = true;
    this.$selectOrigin.on('click', this.openModal.bind(this, '#modal-origin'));
  }

  openModal(modalElement) {
    $(modalElement).modal('show');
  }

  closeModal(modalElement) {
    $(modalElement).modal('close');
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
                <input type="text" className="form-control destiny-btn" ref="destinyBtn" id="exampleInputAmount" placeholder="DDD"/>
                <div className="input-group-addon">
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </div>
              </div>
            </div>

            <div className="form-group col-md-4">
              <input type="text" className="form-control pull-right time" placeholder="MM"/>
            </div>

          </div>
        </form>

        <section className="row result">
          <div className="col-sm-3">
            <h4 className="text-muted text-center">Fale + 30</h4>
          </div>

          <div className="col-sm-3">
            <h4 className="text-muted text-center">Fale + 30</h4>
          </div>

          <div className="col-sm-3">
            <h4 className="text-muted text-center">Fale + 30</h4>
          </div>

          <div className="col-sm-3">
            <h4 className="text-muted text-center">Fale + 30</h4>
          </div>
        </section>

        {this.modalOrigin}

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
              <ul className="list-unstyled" ref='listDetails'>
                {this.state.listDetails}
              </ul>
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


}

export default CallingController;

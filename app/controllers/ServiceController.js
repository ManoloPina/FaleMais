'use strict';

class ServiceController {

  static getPrices() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'http://private-fe2a-scuptel.apiary-mock.com/ddd/pricing',
      }).done((data) => {
        resolve(data);
      });
    });
  }

  static getDetails() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'http://private-fe2a-scuptel.apiary-mock.com/ddd/details',
      }).done((data) => {
        resolve(data);
      });
    });
  }
}

export default ServiceController;

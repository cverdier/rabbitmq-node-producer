'use strict';

const config = require('config');
const _ = require('lodash');
const logger = require('../util/logger');
const rabbitMq = require('./rabbitmq');
const messages = require('../message');

class BookingProducer {
  constructor() {
    this.exchange = config.get("producer").exchange;
    logger.info("Created Producer for : ", this.exchange);
  }

  sendMessage(type, key, message, version) {
    logger.debug("Sending message fo type", type);
    return rabbitMq.sendMessage(this.exchange, `${key}`, messages.createEnvelope(type, message, version));
  }
}

const bookingProducer = new BookingProducer();

module.exports = bookingProducer;


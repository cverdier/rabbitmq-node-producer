'use strict';

const amqplib = require('amqplib');
const Promise = require('bluebird');
const config = require('config');
const _ = require('lodash');
const logger = require('../util/logger');

class RabbitMQ {

  constructor() {
    this.rabbitConfig = config.get('rabbitmq');
    const rabbitMqUrl = `amqp://${this.rabbitConfig.user}:${this.rabbitConfig.password}@${this.rabbitConfig.host}`;
    logger.info('Starting RabbitMQ connection :', rabbitMqUrl);
    this.handler = amqplib.connect(rabbitMqUrl, { keepAlive: true });
  }

  sendMessage(exchange, key, message) {
    return this.handler
      .then(connection => connection.createChannel())
      .then(channel => channel.assertExchange(exchange, 'topic', { durable: true })
        .then(() => channel.publish(exchange, key, new Buffer(JSON.stringify(message))))
        .then(() => logger.debug('Sent message :', message))
        .then(() => channel.close())
      )
      .catch(logger.error);
  }
}

const rabbitMq = new RabbitMQ();

module.exports = rabbitMq;

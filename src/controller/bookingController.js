'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router({ mergeParams: true }); // eslint-disable-line new-cap
const producer = require('../service/bookingProducer');
const logger = require('../util/logger');
const messages = require('../message');

router.post('/', bodyParser.json(), (req, res) => {
  // logger.info("Handling POST on /booking :", req);
  producer.sendMessage(messages.BOOKING_CREATE_EVENT, req.body.id, req.body)
    .then(() => res.status(201).end())
    .catch(err => res.status(500).send(err))
});

router.delete('/:id', (req, res) =>
  producer.sendMessage(messages.BOOKING_CANCEL_EVENT, req.params.id, { id: req.params.id })
    .then(() => res.status(202).end())
    .catch(err => res.status(500).send(err))
);

module.exports = router;

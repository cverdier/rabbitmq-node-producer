'use strict';

const express = require('express');
const logger = require('./util/logger');
const config = require('config');
const bookingController = require('./controller/bookingController');
const app = express();

const port = config.get('port');

app.use('/booking', bookingController);

app.listen(port, err => {
  if (err) {
    return logger.error(err.message);
  }

  logger.info("Application started on port", port);
});

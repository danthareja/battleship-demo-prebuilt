import React from 'react';
import PropTypes from 'prop-types';
import './Notification.css';

const Notification = function({ tile }) {
  return (
    <div className="Notification">Notification</div>
  )
};

Notification.propTypes = {
  tile: PropTypes.any.isRequired,
};

export default Notification;

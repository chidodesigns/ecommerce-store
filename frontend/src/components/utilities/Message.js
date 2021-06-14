import React, {useState} from 'react';
import {Alert} from 'react-bootstrap';

const Message = ({variant, children, }) => {

    return (
      <Alert variant={variant}>
        <p>{children}</p>
      </Alert>
    );
  
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
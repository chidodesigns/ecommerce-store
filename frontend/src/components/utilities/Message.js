import React, {useState} from 'react';
import {Alert} from 'react-bootstrap';

const Message = ({variant, children, }) => {

    return (
      <Alert variant={variant}>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>{children}</p>
      </Alert>
    );
  
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;

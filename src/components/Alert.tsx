import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';

type AlertProps = {
  show: boolean;
  msg: string;
  type: 'success' | 'warning' | 'info' | undefined | 'error' | 'loading';
  removeAlert: () => void;
  list: { id: string; title: string }[];
};

const AlertComponent = (props: AlertProps) => {
  const { msg, type, removeAlert, list } = props;

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);

  return (
    <Alert status={type}>
      <AlertIcon />
      <AlertTitle>{msg}</AlertTitle>
      {/* <AlertDescription>
        Your Chakra experience may be degraded.
      </AlertDescription> */}
    </Alert>
  );
};

export default AlertComponent;

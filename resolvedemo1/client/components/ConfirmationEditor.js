import React from 'react';
import { Button } from 'react-bootstrap';
import { useReduxCommand } from 'resolve-redux';
import { CUSTOMER_CONFIRMED } from '../actions/optimistic-customers';

const ConfirmationEditor = ({ confirmed, id: aggregateId }) => {
  const { execute: confirm } = useReduxCommand(
    {
      type: 'confirmCustomer',
      aggregateId,
      aggregateName: 'customer',
    },
    {
      actions: {
        success: (cmd) => ({
          type: CUSTOMER_CONFIRMED,
          payload: { id: cmd.aggregateId },
        }),
      },
    },
    [aggregateId]
  );

  if (confirmed) return <>Yes</>;
  else
    return (
      <Button variant="success" onClick={confirm}>
        Confirm
      </Button>
    );
};

export default React.memo(ConfirmationEditor);

import React from 'react';
import { Button } from 'react-bootstrap';
import { useReduxCommand } from 'resolve-redux';

const ConfirmationEditor = ({ confirmed, id: aggregateId }) => {
  const { execute: confirm } = useReduxCommand(
    {
      type: 'confirmCustomer',
      aggregateId,
      aggregateName: 'customer',
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

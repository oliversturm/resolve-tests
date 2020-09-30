import React from 'react';
import { Button } from 'react-bootstrap';
import { useCommand } from 'resolve-react-hooks';

const ConfirmationEditor = ({ confirmed, id: aggregateId }) => {
  const confirm = useCommand(
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

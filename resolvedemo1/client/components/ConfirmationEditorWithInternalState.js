import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useCommand } from 'resolve-react-hooks';

const ConfirmationEditorWithInternalState = ({
  confirmed,
  id: aggregateId,
}) => {
  const [internalConfirmed, setInternalConfirmed] = useState(confirmed);
  const confirm = useCommand(
    {
      type: 'confirmCustomer',
      aggregateId,
      aggregateName: 'customer',
    },
    () => {
      setInternalConfirmed(true);
    },
    [aggregateId, setInternalConfirmed]
  );

  if (internalConfirmed) return <>Yes</>;
  else
    return (
      <Button variant="success" onClick={confirm}>
        Confirm
      </Button>
    );
};

export default React.memo(ConfirmationEditorWithInternalState);

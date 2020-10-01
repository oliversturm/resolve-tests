import React from 'react';
import { Table } from 'react-bootstrap';
import ConfirmationEditor from './ConfirmationEditor';

const CustomerOverviewTable = ({ customers }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Created</th>
          <th>Last Changed</th>
          <th>Name</th>
          <th>Confirmed</th>
        </tr>
      </thead>
      <tbody>
        {customers.map(
          (
            { createdTimestamp, lastChangedTimestamp, name, confirmed, id },
            i
          ) => (
            <tr key={i}>
              <td>{createdTimestamp}</td>
              <td>{lastChangedTimestamp}</td>
              <td>{name}</td>
              <td>
                <ConfirmationEditor confirmed={confirmed} id={id} />
              </td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  );
};

export default React.memo(CustomerOverviewTable);

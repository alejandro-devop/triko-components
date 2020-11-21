import React from 'react';

import useExecutionRequest from 'shared/hooks/use-execution-requests';
import Wrapper from './wrapper';
import ServiceItem from './service-item';

const ResumeExecution = ({isTriko}) => {
  const {requests = []} = useExecutionRequest({isTriko});
  if (requests.length === 0) {
    return null;
  }
  const [request = {}] = requests;

  return (
    <Wrapper>
      <ServiceItem request={request} isTriko={isTriko} />
    </Wrapper>
  );
};

export default ResumeExecution;

import React from 'react';

import useExecutionRequest from 'shared/hooks/use-execution-requests';
import Wrapper from './wrapper';
import ServiceItem from './service-item';
import {isEmpty} from 'shared/utils/functions';
import {STATUS_SHOPPING} from 'config/request-statuses';

const SHOPPER_RUNNING = [STATUS_SHOPPING];

const ResumeExecution = ({isTriko}) => {
  const {requests = []} = useExecutionRequest({isTriko, isShopper: true});
  if (requests.length === 0) {
    return null;
  }
  const [request = {}] = requests;
  if (isEmpty(request)) {
    return null;
  }
  let shouldRender = false;
  const {attributes, transition = {}} = request;
  const {workflow} = transition;
  const requestAttrs = !isEmpty(attributes) ? JSON.parse(attributes) : {};
  const {requestType} = requestAttrs;
  const isFavor = requestType === 'shopper';
  if (isFavor && SHOPPER_RUNNING.includes(workflow)) {
    shouldRender = true;
  }

  if (!shouldRender) {
    return null;
  }
  console.log('workflow: ', workflow);
  return null;

  return (
    <Wrapper>
      <ServiceItem request={request} isTriko={isTriko} />
    </Wrapper>
  );
};

export default ResumeExecution;

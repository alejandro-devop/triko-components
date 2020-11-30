import React from 'react';

import useExecutionRequest from 'shared/hooks/use-execution-requests';
import Wrapper from './wrapper';
import ServiceItem from './service-item';
import {isEmpty} from 'shared/utils/functions';
import {
  STATUS_QUALIFY_CLIENT,
  STATUS_QUALIFY_TRIKO,
  STATUS_SHOPPING,
  STATUS_STARTED,
} from 'config/request-statuses';

const SHOPPER_RUNNING = [STATUS_SHOPPING];
const RUNNING_STATUSES = [STATUS_STARTED];

const ResumeExecution = ({isTriko}) => {
  const {requests = []} = useExecutionRequest({isTriko, isShopper: false});
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
  const isShopper = requestType === 'shopper';
  const isFavor = isShopper;
  if (isFavor && SHOPPER_RUNNING.includes(workflow)) {
    shouldRender = true;
  } else if (!isFavor && RUNNING_STATUSES.includes(workflow)) {
    shouldRender = true;
  }
  if (!shouldRender) {
    return null;
  }
  // return null;

  return (
    <Wrapper>
      <ServiceItem request={request} isTriko={isTriko} isShopper={isShopper} />
    </Wrapper>
  );
};

export default ResumeExecution;

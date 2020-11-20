import {
  STATUS_CONFIRM_PAYMENT,
  STATUS_FINISHED,
  STATUS_GOING_TO_SHOP,
  STATUS_IN_THE_DESTINATION,
  STATUS_IN_THE_SHOP,
  STATUS_ON_MY_WAY_DESTINATION,
  STATUS_PAYING_CART,
  STATUS_PAYING_ORDER,
  STATUS_QUALIFY_CLIENT,
  STATUS_QUALIFY_TRIKO,
  STATUS_SHOPPING,
  STATUS_WAITING_FOR_CLIENT,
  STATUS_WAITING_FOR_TRIKO,
} from 'config/request-statuses';

export const workflowMock = [
  'Pending',
  'WaitingForTriko',
  'Accepted',
  'Payment',
  'GoingToShop',
  'InTheShop',
  'Shopping',
  'WaitingForClient',
  'PayingCart',
  'OnMyWayDestination',
  'InTheDestination',
  'PayingOrder',
  'ConfirmPayment',
  'QualifyServiceClient',
  'QualifyServiceTriko',
  'Finish',
];

export const useExecutionStep = (step = 0) => {
  const workflow = workflowMock[step];
  console.log('workflow: ', workflow);
  const contains = (items = []) => items.includes(workflow);
  if (contains([STATUS_IN_THE_SHOP, STATUS_GOING_TO_SHOP])) {
    return [0, workflow];
  } else if (contains([STATUS_SHOPPING])) {
    return [1, workflow];
  } else if (contains([STATUS_WAITING_FOR_CLIENT, STATUS_PAYING_CART])) {
    return [2, workflow];
  } else if (
    contains([STATUS_ON_MY_WAY_DESTINATION, STATUS_IN_THE_DESTINATION])
  ) {
    return [3, workflow];
  } else if (contains([STATUS_CONFIRM_PAYMENT, STATUS_PAYING_ORDER])) {
    return [4, workflow];
  } else if (
    contains([STATUS_QUALIFY_CLIENT, STATUS_QUALIFY_TRIKO, STATUS_FINISHED])
  ) {
    return [5, workflow];
  } else {
    return [0, workflowMock[0]];
  }
};

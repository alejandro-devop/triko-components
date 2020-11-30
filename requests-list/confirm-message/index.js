import React from 'react';
import ConfirmDialog from 'shared/components/dialogs/confirm-dialog';
import useTranslation from 'hooks/useTranslation';
import {useCalcRate} from 'shared/hooks/use-rate-calc';
import useCurrency from 'hooks/useCurrency';
import {isEmpty} from 'shared/utils/functions';

const ConfirmMessage = ({
  accepting,
  rejecting,
  onAcceptRequest,
  onRejectRequest,
  onClose,
  request,
}) => {
  const {_t} = useTranslation();
  const {format} = useCurrency();

  const handleCancel = async () => {
    onClose();
  };

  const handleAccept = async () => {
    if (accepting) {
      onAcceptRequest(request);
    } else if (rejecting) {
      onRejectRequest(request);
    } else {
      onClose();
    }
  };
  const {attrs = {}, attributes} = request;
  const {transport} = attrs;
  const {calculatedTip = 0} = !isEmpty(attributes)
    ? JSON.parse(attributes)
    : {};
  const {loading, total: subTotal} = useCalcRate({request});
  const total = subTotal + parseFloat(transport) + calculatedTip;
  let message = 'no_message';
  let title = 'no_title';
  if (accepting) {
    title = 'accept_request_title';
    message = 'accept_request_message';
  } else if (rejecting) {
    title = 'cancel_request_title';
    message = 'cancel_request_message';
  }

  return (
    <ConfirmDialog
      title={title}
      message={_t(message, {price: loading ? '--' : format(total)})}
      onCancel={handleCancel}
      onAccept={handleAccept}
      onClose={onClose}
      open
    />
  );
};

export default ConfirmMessage;

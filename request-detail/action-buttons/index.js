import React, {useState} from 'react';
import BorderedButton from 'shared/components/base/buttons/bordered-button';
import ActionsWrapper from '../actions-wrapper';
import useTranslation from 'hooks/useTranslation';
import {useStyles} from 'hooks/index';
import {
  STATUS_ACCEPTED,
  STATUS_PAYMENT,
  STATUS_PENDING,
} from 'config/request-statuses';
import DialogConfirm from 'shared/components/dialogs/confirm-dialog';

const paymentStatuses = [STATUS_ACCEPTED, STATUS_PAYMENT];

const ActionButtons = ({
  onEdit,
  onCancel,
  onBack,
  onPayment,
  paidOut,
  workflow,
  expired,
}) => {
  const [classes] = useStyles(styles);
  const [openCancel, setOpenCancel] = useState(false);
  const toggleCancel = () => setOpenCancel(!openCancel);
  const handleCancel = () => {
    toggleCancel();
    onCancel();
  };
  const {_t} = useTranslation();
  console.log('Expired: ', expired);
  return (
    <ActionsWrapper expanded={openCancel}>
      {openCancel && (
        <DialogConfirm
          message="confirm_cancel_request"
          title={'cancel_request'}
          onAccept={handleCancel}
          onCancel={toggleCancel}
          onClose={toggleCancel}
        />
      )}
      <>
        {onBack && (
          <BorderedButton
            icon={'arrow-left'}
            label={_t('back_text')}
            classes={{root: classes.button}}
            onPress={onBack}
          />
        )}
        <BorderedButton
          icon={'times'}
          disabled={paidOut}
          secondary
          onPress={toggleCancel}
          label={_t('request_detail_cancel')}
          classes={{root: classes.button}}
        />
        {workflow === STATUS_PENDING && (
          <>
            {onEdit && (
              <BorderedButton
                icon={'pen'}
                label={_t('request_detail_edit')}
                classes={{root: classes.button}}
              />
            )}
          </>
        )}
        {!paidOut && !expired && paymentStatuses.includes(workflow) && (
          <BorderedButton
            disabled={expired}
            icon={'credit-card'}
            label={_t('request_detail_payment')}
            onPress={onPayment}
            classes={{root: classes.button}}
          />
        )}
      </>
    </ActionsWrapper>
  );
};

const styles = () => ({
  button: {
    marginHorizontal: 15,
  },
});

export default ActionButtons;

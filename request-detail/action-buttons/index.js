import React from 'react';
import BorderedButton from 'shared/components/base/buttons/bordered-button';
import ActionsWrapper from '../actions-wrapper';
import useTranslation from 'hooks/useTranslation';
import {useStyles} from 'hooks/index';
import {
  STATUS_ACCEPTED,
  STATUS_PAYMENT,
  STATUS_PENDING,
} from 'config/request-statuses';

const paymentStatuses = [STATUS_ACCEPTED, STATUS_PAYMENT];

const ActionButtons = ({
  onEdit,
  onCancel,
  onBack,
  onPayment,
  paidOut,
  workflow,
}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  return (
    <ActionsWrapper>
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
        secondary
        onPress={onCancel}
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
      {!paidOut && paymentStatuses.includes(workflow) && (
        <BorderedButton
          icon={'credit-card'}
          label={_t('request_detail_payment')}
          onPress={onPayment}
          classes={{root: classes.button}}
        />
      )}
    </ActionsWrapper>
  );
};

const styles = () => ({
  button: {
    marginHorizontal: 15,
  },
});

export default ActionButtons;

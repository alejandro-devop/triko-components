import React from 'react';
import {View} from 'react-native';
import InsidesLayout from 'main/layouts/insides-layout';
import ShopperLayout from 'main/layouts/shopper-layout';
import Header from './request-header';
import useSession from 'shared/hooks/use-session-triko';
import Other from './other';
import Shopper from './shopper';
import useStyles from 'shared/hooks/use-styles';
import useTranslation from 'hooks/useTranslation';
import usePayment from 'hooks/usePayment';
import {LoadingCurtain} from 'components/base/dialogs';
import {useCalcRateClient} from 'shared/hooks/use-rate-calc';
import styles from './styles';
import useNavigate from 'shared/hooks/use-navigate';
import {STATUS_ACCEPTED} from 'config/request-statuses';
import {PAYMENT_COMPLETED_STATUS} from 'components/pay-service/payment-statuses';
import useRequestUpdate from 'shared/hooks/use-request-update';

const RequestDetail = () => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const {navigation} = useNavigate();
  const {loading: loadingPayment, initPayment} = usePayment();
  const {cancelRequest, loading} = useRequestUpdate();
  const {
    stack: {requestDetailSelected = {}},
    setKey,
  } = useSession();
  const {isShopper, isCourier, isTask} = requestDetailSelected;
  const {request = {}} = requestDetailSelected;
  const {order = {}, triko: trikos = []} = request;
  const [triko = {}] = trikos;
  const {workflow} = request.transition || {};
  const {total} = useCalcRateClient({
    request: {
      ...request,
      triko: triko,
    },
  });
  let Layout = InsidesLayout;
  let Component = Other;
  if (isShopper) {
    Layout = ShopperLayout;
    Component = Shopper;
  } else if (isCourier) {
    Layout = InsidesLayout;
  } else if (isTask) {
    Layout = InsidesLayout;
  }

  const handlePayment = async () => {
    if (workflow === STATUS_ACCEPTED) {
      await initPayment(request);
    } else {
      setKey('selectedToPay', request);
    }
    navigation.navigate('payment');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCancel = async () => {
    await cancelRequest(request);
    navigation.goBack();
  };

  const {workflow: orderWorkflow} =
    order && order.transition ? order.transition : {};
  const paidOut = orderWorkflow === PAYMENT_COMPLETED_STATUS;

  return (
    <>
      <Layout
        disableContent
        header={<Header paidOut={paidOut} request={request} />}>
        <View style={classes.root}>
          <Component
            onPay={handlePayment}
            onCancel={handleCancel}
            onBack={handleBack}
            paidOut={paidOut}
            request={request}
            title={_t('about_the_request')}
            workflow={workflow}
            total={total}
          />
        </View>
      </Layout>
      {loading && <LoadingCurtain />}
      {loadingPayment && <LoadingCurtain />}
    </>
  );
};

export default RequestDetail;

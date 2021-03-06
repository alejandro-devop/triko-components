import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import InsidesLayout from 'main/layouts/insides-layout';
import ShopperLayout from 'main/layouts/shopper-layout';
import Header from './request-header';
import useSession from 'shared/hooks/use-session-triko';
import Other from './other';
import Shopper from './shopper';
import Courier from './courier';
import Task from './task';
import {useStyles} from '@triko-app/hooks';
import useTranslation from 'shared/hooks/use-translate';
import usePayment from 'shared/hooks/use-payment';
import {LoadingCurtain} from 'components/base/dialogs';
import {useCalcRateClient} from 'shared/hooks/use-rate-calc';
import styles from './styles';
import useNavigate from 'shared/hooks/use-navigate';
import {
  STATUS_ACCEPTED,
  STATUS_PENDING,
  STATUS_WAITING_FOR_TRIKO,
} from 'config/request-statuses';
import {PAYMENT_COMPLETED_STATUS} from 'components/pay-service/payment-statuses';
import useRequestUpdate from 'shared/hooks/use-request-update';
import {isEmpty} from 'shared/utils/functions';
import {useRequestFetcher} from 'shared/hooks/use-request-fetcher';
import moment from 'moment';

const RateCalculator = ({triko, request, onCompleted}) => {
  useCalcRateClient({
    request: {
      ...request,
      triko,
    },
    onCompleted,
  });
  return null;
};

const RequestDetail = ({isTriko}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const [total, setTotal] = useState(0);
  const {navigation} = useNavigate();
  const {loading: loadingPayment, initPayment} = usePayment();
  const {cancelRequest, loading} = useRequestUpdate();
  const {
    stack: {requestDetailSelected = {}},
    setAll,
  } = useSession();
  const {isShopper, isCourier, isTask} = !isEmpty(requestDetailSelected)
    ? requestDetailSelected
    : {};
  const defaultRequest = requestDetailSelected.request;
  const {request: updatedRequest, refresh} = useRequestFetcher({
    requestId: requestDetailSelected.request.id,
  });
  const request =
    !isEmpty(updatedRequest) && !isEmpty(updatedRequest.id)
      ? updatedRequest
      : defaultRequest;
  const {order = {}, triko: trikos = []} =
    !isEmpty(request) && !isEmpty(request.id)
      ? request
      : requestDetailSelected.request;
  const [triko = {}] = trikos;
  const {workflow} = request.transition || {};
  const currentDate = moment();
  const isFavor = isShopper || isCourier || isTask;

  /**
   * This function allows to validate if a request has been expired.
   * @param date
   * @returns {boolean}
   */
  const isExpired = ({application_date: date}) => {
    const requestDate = moment(date, 'YYYY-MM-DD HH:mm:ss');
    const timeDiff = requestDate.diff(currentDate, 'minutes');
    return timeDiff < 0;
  };

  let Layout = InsidesLayout;
  let Component = Other;
  if (isShopper) {
    Layout = ShopperLayout;
    Component = Shopper;
  } else if (isCourier) {
    Layout = InsidesLayout;
    Component = Courier;
  } else if (isTask) {
    Layout = InsidesLayout;
    Component = Task;
  }

  useFocusEffect(
    useCallback(() => {
      refresh();
      return () => {};
    }, []),
  );

  const getFavorTotal = () => {
    const {favorRate = 0} = JSON.parse(request.attributes);
    return favorRate;
  };

  const handlePayment = async () => {
    const rateTotal = isFavor ? getFavorTotal() : total;
    if (workflow === STATUS_ACCEPTED) {
      await initPayment(request, {
        isShopper,
        isCourier,
        isTask,
        total: rateTotal,
        isFavor,
      });
    } else {
      setAll({
        selectedToPay: {
          ...request,
          isShopper,
          isCourier,
          isTask,
          total: rateTotal,
          isFavor,
        },
        orderInProgress: request.order,
      });
    }
    setTimeout(() => {
      navigation.navigate('payment');
    }, 1000);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCancel = async () => {
    await cancelRequest(request);
    navigation.goBack();
  };

  if (isEmpty(requestDetailSelected)) {
    return null;
  }

  const handleRateCalc = (value) => {
    setTotal(value);
  };

  const {workflow: orderWorkflow} =
    order && order.transition ? order.transition : {};
  const paidOut = orderWorkflow === PAYMENT_COMPLETED_STATUS;
  const requestExpired = isExpired(request);

  return (
    <>
      {!isTriko && !isFavor && (
        <RateCalculator
          request={request}
          triko={triko}
          onCompleted={handleRateCalc}
        />
      )}
      <Layout
        disableContent
        header={
          <Header
            isExpired={requestExpired}
            paidOut={paidOut}
            hideTrikoInfo={[STATUS_WAITING_FOR_TRIKO, STATUS_PENDING].includes(
              workflow,
            )}
            request={request}
          />
        }>
        <View style={classes.root}>
          {!isEmpty(Component) && (
            <Component
              expired={requestExpired}
              onPay={handlePayment}
              onCancel={handleCancel}
              onBack={handleBack}
              paidOut={paidOut}
              request={request}
              title={_t('about_the_request')}
              workflow={workflow}
              total={total}
            />
          )}
        </View>
      </Layout>
      {loading && <LoadingCurtain disableModal />}
      {loadingPayment && <LoadingCurtain disableModal />}
    </>
  );
};

export default RequestDetail;

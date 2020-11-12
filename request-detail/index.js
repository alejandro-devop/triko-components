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

const RequestDetail = ({}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const {navigation} = useNavigate();
  const {loading: loadingPayment, initPayment} = usePayment();
  const {
    stack: {requestDetailSelected = {}},
  } = useSession();
  const {isShopper, isCourier, isTask} = requestDetailSelected;
  const {request = {}} = requestDetailSelected;
  const {workflow} = request.transition || {};
  const {total} = useCalcRateClient({
    request: {
      ...request,
      triko: request.triko[0],
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
    await initPayment(request);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <Layout disableContent header={<Header request={request} />}>
        <View style={classes.root}>
          <Component
            onPay={handlePayment}
            onBack={handleBack}
            request={request}
            title={_t('about_the_request')}
            workflow={workflow}
            total={total}
          />
        </View>
      </Layout>
      {loadingPayment && <LoadingCurtain />}
    </>
  );
};

export default RequestDetail;

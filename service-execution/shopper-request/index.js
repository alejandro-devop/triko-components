import React, {useState} from 'react';
import {View} from 'react-native';
import {useStyles} from 'hooks/index';
import styles from './styles';
import Stepper from 'shared/components/service-execution/stepper';
import Icon from 'shared/components/base/icon';
import ViewOnMap from '../view-on-map';
// import useExecutionStep from 'shared/hooks/use-execution-step';
import UploadBill from './upload-bill';
import {isEmpty} from 'shared/utils/functions';
import Button from 'shared/components/base/buttons/button';
import useRequestUpdate from 'shared/hooks/use-request-update';
import {LoadingCurtain} from 'components/base/dialogs';
import BorderedButton from 'shared/components/base/buttons/bordered-button';
import Text from 'shared/components/base/text';
import UploadTransferReceipt from './upload-transfer-receipt';
import ShoppingCart from './shopping-cart';
import {useExecutionStep} from './workflowMock';
import {useStepDescriptor} from './hooks';
import {
  STATUS_PAYING_ORDER,
  STATUS_WAITING_FOR_CLIENT,
} from 'config/request-statuses';

const ShopperRequest = ({isTriko, request = {}, refreshRequest}) => {
  const [classes] = useStyles(styles);
  const [openCart, setOpenCart] = useState(false);
  const [mapLocation, setMapLocation] = useState({
    latitude: null,
    longitude: null,
    title: null,
    description: null,
  });
  const currentWorkflow = 11; // Todo: remove
  const [activeStep, workflow] = useExecutionStep(currentWorkflow); // going to shop = 4;
  const stepDescription = useStepDescriptor(isTriko, workflow, request);
  const [serviceDetail = {}] = !isEmpty(request.details) ? request.details : [];
  const {products = []} = serviceDetail;
  const {loading, updateRequest} = useRequestUpdate();
  const toggleCart = () => setOpenCart(!openCart);
  const requestAttrs = !isEmpty(request.attributes)
    ? JSON.parse(request.attributes)
    : {};
  const {market = {}} = requestAttrs;

  const steps = [
    {
      // Here the triko goes to the shopping place, indicates he's acquiring the products
      label: 'going_to_shopping_place',
      title: market.name,
      description: stepDescription.description,
      action: {
        label: 'arrive_to_market',
        callback: () => {
          updateRequest(request);
        },
      },
      noAction: !isTriko,
    },
    {
      // The triko start buying items, and then the triko ask for confirmation to pay the cart
      label: 'making_purchase',
      title: 'get_products_in_list',
      action: {
        label: 'view_cart',
        dontConfirm: true,
        callback: () => {
          toggleCart();
        },
      },
    },
    {
      // the triko starts paying the products, upload the bill and wait for client confirmation.
      label: 'paying_cart',
      title: stepDescription.title,
      description: stepDescription.description,
      action:
        !isTriko && workflow === STATUS_WAITING_FOR_CLIENT
          ? {
              label: 'view_cart',
              dontConfirm: true,
              callback: () => toggleCart(),
            }
          : {},
    },
    {
      // The triko starts traveling to the deliver address
      label: 'on_my_way_to_deliver_point',
      title: stepDescription.title,
      description: stepDescription.description,
    },
    {
      label: 'paying_service',
      title: stepDescription.title,
    },
    {
      label: 'finish_service_label',
      description: 'hi',
    },
  ];
  const cashRegister = false;

  const viewOnMap = () => {
    if (activeStep === 0) {
      // if going to shopping place.
      setMapLocation({
        title: market.name,
        description: market.description,
        latitude: parseFloat(market.latitude),
        longitude: parseFloat(market.longitude),
      });
    }
  };

  const closeMap = () => {
    setMapLocation({
      ...mapLocation,
      latitude: null,
      longitude: null,
    });
  };
  const waitingForPayment = !isTriko && workflow === STATUS_PAYING_ORDER;
  const isCollapsed = cashRegister || openCart || waitingForPayment;
  const hideCart = cashRegister;
  const hideMap = cashRegister || !isTriko;
  const {latitude, longitude} = mapLocation;
  return (
    <>
      {loading && <LoadingCurtain />}
      <View style={classes.root}>
        <View style={classes.content}>
          <Stepper
            collapsed={isCollapsed}
            activeStep={activeStep}
            isTriko={isTriko}
            request={request}
            steps={steps}
          />
          {openCart && (
            <ShoppingCart
              isTriko={isTriko}
              request={request}
              onClose={toggleCart}
              refreshRequest={refreshRequest}
            />
          )}
          {waitingForPayment && <UploadTransferReceipt request={request} />}
          {cashRegister && isTriko && <UploadBill request={request} />}
          {!openCart && (
            <>
              <View style={classes.actionsWrapper}>
                {!hideCart && !waitingForPayment && (
                  <View style={classes.cartButtonWrapper}>
                    <View style={classes.countWrapper}>
                      <Text style={classes.countText}>{products.length}</Text>
                    </View>
                    <BorderedButton
                      icon="shopping-cart"
                      filled
                      label="view_cart"
                      onPress={toggleCart}
                    />
                  </View>
                )}
                {!hideMap && (
                  <Button primary size="xxs" onPress={viewOnMap}>
                    view_on_map
                  </Button>
                )}
              </View>
              {!waitingForPayment && (
                <View style={classes.guideIconWrapper}>
                  <Icon name="chevron-down" style={classes.guideIcon} />
                </View>
              )}
            </>
          )}
        </View>
      </View>
      {!isEmpty(latitude) && !isEmpty(longitude) && (
        <ViewOnMap
          onClose={closeMap}
          destination={mapLocation}
          request={request}
          isTriko={isTriko}
          open
        />
      )}
    </>
  );
};

export default ShopperRequest;

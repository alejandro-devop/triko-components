import React, {useState} from 'react';
import {View} from 'react-native';
import {useStyles} from 'hooks/index';
import styles from './styles';
import Stepper from 'shared/components/service-execution/stepper';
import useExecutionStep from 'shared/hooks/use-execution-step';
import {isEmpty} from 'shared/utils/functions';
import Button from 'shared/components/base/buttons/button';
import useRequestUpdate from 'shared/hooks/use-request-update';
import {LoadingCurtain} from 'components/base/dialogs';
import BorderedButton from 'shared/components/base/buttons/bordered-button';
import Text from 'shared/components/base/text';
import ShoppingCart from './shopping-cart';

const ShopperRequest = ({isTriko, request = {}, refreshRequest}) => {
  const [classes] = useStyles(styles);
  const [openCart, setOpenCart] = useState(true);
  const activeStep = useExecutionStep(request);
  const [serviceDetail = {}] = !isEmpty(request.details) ? request.details : [];
  const {products = []} = serviceDetail;
  const {loading, updateRequest} = useRequestUpdate();
  const toggleCart = () => setOpenCart(!openCart);
  const [addStep, setAddStep] = useState(0);
  const additionalSteps = [{label: ''}];
  const requestAttrs = !isEmpty(request.attributes)
    ? JSON.parse(request.attributes)
    : {};
  const {market = {}} = requestAttrs;

  const steps = [
    {
      label: 'going_to_shopping_place',
      title: market.name,
      description: 'indicate_arrival',
      action: {
        label: 'arrive_to_market',
        callback: () => {
          updateRequest(request);
        },
      },
    },
    {
      title: 'shopping_items',
      label: 'acquiring_products',
      description: 'buying_items',
      action: {
        label: 'make_payment',
        callback: () => {},
      },
      noAction: openCart,
    },
    {
      label: 'service_start_service',
      title: 'Other',
    },
    {
      label: 'finish_service_label',
      description: 'hi',
    },
  ];

  const viewOnMap = () => {};

  return (
    <>
      {loading && <LoadingCurtain />}
      <View style={classes.root}>
        <View style={classes.content}>
          <Stepper
            collapsed={openCart}
            activeStep={activeStep}
            isTriko={isTriko}
            request={request}
            steps={steps}
          />
          {openCart && (
            <ShoppingCart
              isTriko={isTriko}
              request={request}
              refreshRequest={refreshRequest}
            />
          )}
          {!openCart && (
            <>
              <View style={classes.actionsWrapper}>
                <View style={classes.cartButtonWrapper}>
                  <View style={classes.countWrapper}>
                    <Text style={classes.countText}>{products.length}</Text>
                  </View>
                  <BorderedButton
                    icon="shopping-cart"
                    filled
                    label="view_cart"
                  />
                </View>
                <Button primary size="xxs" onPress={viewOnMap}>
                  view_on_map
                </Button>
              </View>
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default ShopperRequest;

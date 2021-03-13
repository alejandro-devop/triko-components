import React from 'react';
import {ScrollView, View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import useTranslation from 'shared/hooks/use-translate';
import Button from 'shared/components/base/buttons/button';
import FixFromMap from './FixFromMap';
import FixFromAddress from './FixFromAddress';

const FixTheAddress = ({
  mode,
  address: addressObj = {},
  city,
  onChangeForm,
  onBack,
  onSubmitAddress,
}) => {
  const {_t} = useTranslation();
  const [classes] = useStyles(styles);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={classes.text}>
        {mode === 'type' && (
          <FixFromMap
            city={city}
            onChangeForm={onChangeForm}
            addressObj={addressObj}
          />
        )}
        {mode === 'my-location' && (
          <FixFromAddress
            position={addressObj.position}
            confirmAddress={onChangeForm}
            onSubmit={onSubmitAddress}
          />
        )}
        <View style={classes.bottomRow}>
          {mode === 'type' && (
            <Button onPress={onSubmitAddress} secondary>
              {_t('done_text')}
            </Button>
          )}
          <Button secondary onPress={onBack}>
            {_t('back_text')}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = ({palette}) => ({
  bottomRow: {
    alignItems: 'center',
    marginTop: 10,
  },
});

export default FixTheAddress;

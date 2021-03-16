import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import useTrikoCredits from 'shared/hooks/use-triko-credits';
import Text from 'shared/components/base/text';
import styles from './styles';
import CircularLoader from 'shared/components/loaders/circular-loader';
import useStyles from 'shared/hooks/use-styles';
import useCurrency from 'shared/hooks/use-currency';
import IconButton from 'shared/components/base/buttons/icon-button';
import useNavigate from 'shared/hooks/use-navigate';

const TrikoCreditsDisplay = () => {
  const {amount = 0, loading} = useTrikoCredits();
  const [classes] = useStyles(styles);
  const {navigation} = useNavigate();
  const {format} = useCurrency();

  const handleRecharge = () => {
    navigation.navigate('recharge-account');
  };

  return (
    <View style={classes.root}>
      <TouchableOpacity style={classes.contentWrapper} onPress={handleRecharge}>
        <Text style={[classes.text, classes.balanceText]}>
          available_balance
        </Text>
        {loading && <CircularLoader size={10} />}
        {!loading && (
          <Text style={[classes.text, classes.textAmount]}>
            {format(amount)}
          </Text>
        )}
        <IconButton
          name="coins"
          iconStyles={classes.iconButton}
          onPress={handleRecharge}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TrikoCreditsDisplay;

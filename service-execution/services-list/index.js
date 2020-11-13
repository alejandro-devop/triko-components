import React, {useState} from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import styles from './styles';
import {useStyles, useSession} from 'hooks';
import ServiceItem from './ServiceItem';
import LinkButton from 'components/base/buttons/link-button';
import ItemsSlider from 'components/base/items-slider';

const ServicesList = ({services = []}) => {
  const [classes] = useStyles(styles);
  const [visible, setVisible] = useState(false);
  const {stack} = useSession();
  const {region} = stack;
  const toggleVisible = () => setVisible(!visible);
  return (
    <View style={classes.root}>
      {services.length === 0 && (
        <Text style={classes.emptyText} variant="caption">
          No services
        </Text>
      )}
      {visible && (
        <View style={classes.sliderWrapper}>
          <ItemsSlider
            disableSnap
            disableGuide
            items={services}
            itemProps={{locale: region}}
            SliderComponent={ServiceItem}
          />
        </View>
      )}
      <View style={classes.actionButton}>
        <LinkButton onPress={toggleVisible} primary>
          {visible ? 'Hide' : `Services(${services.length})`}
        </LinkButton>
      </View>
    </View>
  );
};

export default ServicesList;

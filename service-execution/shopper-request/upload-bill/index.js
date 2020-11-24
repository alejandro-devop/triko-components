import React, {useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {useStyles} from 'hooks/index';
import Text from 'shared/components/base/text';
import useCurrency from 'hooks/useCurrency';
import InfoMessage from 'shared/components/messages/InfoMessage';
import ImagePicker from 'shared/components/base/controls/image-picker';
import Button from 'shared/components/base/buttons/button';
import {isEmpty} from 'shared/utils/functions';

const UploadBill = ({request = {}, onUploadReceipt}) => {
  const [serviceDetail = {}] = request.details;
  const [file, setFile] = useState(null);
  const [classes] = useStyles(styles);
  const {price} = serviceDetail;
  const {format} = useCurrency();
  const handleImageChange = (data) => {
    setFile(data);
  };

  const handleSubmit = () => {
    if (onUploadReceipt) {
      onUploadReceipt();
    }
  };
  return (
    <View style={classes.root}>
      <View style={classes.priceWrapper}>
        <Text style={[classes.text, classes.textTotal]}>total_text</Text>
        <Text style={[classes.text, classes.textPrice]}>{format(price)}</Text>
      </View>
      <InfoMessage text="shopper_triko_must_pay" />
      <ImagePicker onChange={handleImageChange} />
      <View style={classes.actionWrapper}>
        <Button primary disabled={isEmpty(file)} onPress={handleSubmit}>
          send_text
        </Button>
      </View>
    </View>
  );
};

export default UploadBill;

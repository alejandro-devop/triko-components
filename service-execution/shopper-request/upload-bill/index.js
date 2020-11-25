import React, {useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {useSession, useStyles} from 'hooks/index';
import Text from 'shared/components/base/text';
import useCurrency from 'hooks/useCurrency';
import InfoMessage from 'shared/components/messages/InfoMessage';
import ImagePicker from 'shared/components/base/controls/image-picker';
import Button from 'shared/components/base/buttons/button';
import {isEmpty} from 'shared/utils/functions';
import useRequestUpdateAttrs from 'shared/hooks/use-request-update-attrs';
import PreImage from 'shared/components/base/pre-image';

const UploadBill = ({
  request = {},
  isTriko,
  onUploadReceipt,
  onAcceptPrice,
}) => {
  const [serviceDetail = {}] = request.details;
  const {images = []} = request;
  const [trikoImage] = images;
  const [file, setFile] = useState(null);
  const {
    stack: {triko = {}},
  } = useSession();
  const [classes] = useStyles(styles);
  const {loading, sendRequest} = useRequestUpdateAttrs(request);
  const {price} = serviceDetail;
  const {format} = useCurrency();
  const handleImageChange = (data) => {
    setFile(data);
  };

  const handleSubmit = async () => {
    const {data} = file;
    const imageBase64 = `data:image/png;base64,${data}`;
    await sendRequest({
      image: {photo: imageBase64, triko_id: triko.id},
    });
    if (onUploadReceipt) {
      onUploadReceipt();
    }
  };
  return (
    <>
      <View style={classes.root}>
        <View style={classes.priceWrapper}>
          <Text style={[classes.text, classes.textTotal]}>total_text</Text>
          <Text style={[classes.text, classes.textPrice]}>{format(price)}</Text>
        </View>
        {isEmpty(trikoImage) && (
          <>
            {isTriko && (
              <>
                <InfoMessage text="shopper_triko_must_pay" />
                <ImagePicker onChange={handleImageChange} />
                <View style={classes.actionWrapper}>
                  <Button
                    primary
                    disabled={isEmpty(file) || loading}
                    onPress={handleSubmit}>
                    send_text
                  </Button>
                </View>
              </>
            )}
          </>
        )}
        {!isEmpty(trikoImage) && (
          <>
            {isTriko && (
              <InfoMessage text="wait_for_the_client_to_confirm_cart_price" />
            )}
            <View style={classes.uploadedWrapper}>
              <PreImage
                source={{uri: trikoImage.url}}
                style={classes.uploadedBill}
              />
            </View>
            {!isTriko && (
              <View style={classes.actionWrapper}>
                <Button primary disabled={loading} onPress={onAcceptPrice}>
                  accept_cart_value
                </Button>
              </View>
            )}
          </>
        )}
      </View>
    </>
  );
};

export default UploadBill;

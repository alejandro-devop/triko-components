import React, {useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {useStyles} from 'hooks/index';
import Text from 'shared/components/base/text';
import useCurrency from 'hooks/useCurrency';
import ImagePicker from 'shared/components/base/controls/image-picker';
import Button from 'shared/components/base/buttons/button';
import {isEmpty} from 'shared/utils/functions';
import PreImage from 'shared/components/base/pre-image';
import PermissionsManager, {
  PERMISSIONS,
} from 'shared/components/permissions-manager';
import useFileDownload from 'shared/hooks/use-file-download';

const UploadTransferReceipt = ({request = {}, toggleCart}) => {
  const [serviceDetail = {}] = request.details;
  const mockedQRImage =
    'https://qrscanneronline.com/images/qrscanneronline.png';
  const {downloadFile} = useFileDownload();
  const [file, setFile] = useState(null);
  const [classes] = useStyles(styles);
  const {price} = serviceDetail;
  const {format} = useCurrency();
  const handleImageChange = (data) => {
    setFile(data);
  };

  const handleDownload = async () => {
    await downloadFile(mockedQRImage);
  };

  return (
    <View style={classes.root}>
      <PermissionsManager permissions={[PERMISSIONS.ACCESS_DOWNLOAD]}>
        <View style={classes.priceWrapper}>
          <Text style={[classes.text, classes.textTotal]}>total_text</Text>
          <Text style={[classes.text, classes.textPrice]}>{format(price)}</Text>
        </View>
        <View style={classes.actionWrapper}>
          <Button secondary size="xxs" onPress={toggleCart}>
            view_cart
          </Button>
        </View>
        <View style={classes.imageWrapper}>
          <View style={classes.qrWrapper}>
            <PreImage style={classes.qrImage} source={{uri: mockedQRImage}} />
          </View>
          <Button secondary size="xs" onPress={handleDownload}>
            download_qr
          </Button>
        </View>
        <ImagePicker onChange={handleImageChange} />
        <View style={classes.actionWrapper}>
          <Button primary disabled={isEmpty(file)}>
            send_text
          </Button>
        </View>
      </PermissionsManager>
    </View>
  );
};

export default UploadTransferReceipt;

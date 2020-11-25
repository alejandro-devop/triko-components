import React, {useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {useSession, useStyles} from 'hooks/index';
import Text from 'shared/components/base/text';
import useCurrency from 'hooks/useCurrency';
import ImagePicker from 'shared/components/base/controls/image-picker';
import Button from 'shared/components/base/buttons/button';
import {isEmpty} from 'shared/utils/functions';
import Label from 'shared/components/base/label';
import PreImage from 'shared/components/base/pre-image';
import PermissionsManager, {
  PERMISSIONS,
} from 'shared/components/permissions-manager';
import useFileDownload from 'shared/hooks/use-file-download';
import InfoMessage from 'shared/components/messages/InfoMessage';
import {STATUS_PAYING_ORDER} from 'config/request-statuses';
import useRequestUpdateAttrs from 'shared/hooks/use-request-update-attrs';

const UploadTransferReceipt = ({
  request = {},
  onMarkTransferAsDone,
  toggleCart,
  onUploadReceipt,
  workflow,
}) => {
  const [serviceDetail = {}] = request.details;
  const mockedQRImage =
    'https://qrscanneronline.com/images/qrscanneronline.png';
  const {downloadFile} = useFileDownload();
  const [file, setFile] = useState(null);
  const [classes] = useStyles(styles);
  const {price} = serviceDetail;
  const {format} = useCurrency();
  const {loading, sendRequest} = useRequestUpdateAttrs(request);
  const {
    stack: {client = {}},
  } = useSession();
  const handleImageChange = (data) => {
    setFile(data);
  };

  const handleDownload = async () => {
    await downloadFile(mockedQRImage);
  };

  const handleSubmit = async () => {
    const {data} = file;
    const imageBase64 = `data:image/png;base64,${data}`;
    await sendRequest({
      image: {photo: imageBase64, client_id: client.id},
    });
    if (onUploadReceipt) {
      onUploadReceipt();
    }
  };

  const paying = workflow === STATUS_PAYING_ORDER;

  return (
    <View style={classes.root}>
      <PermissionsManager permissions={[PERMISSIONS.ACCESS_DOWNLOAD]}>
        <View style={classes.priceWrapper}>
          <Text style={[classes.text, classes.textTotal]}>total_text</Text>
          <Text style={[classes.text, classes.textPrice]}>{format(price)}</Text>
        </View>
        {/*<View style={classes.actionWrapper}>*/}
        {/*  <Button secondary size="xxs" onPress={toggleCart}>*/}
        {/*    view_cart*/}
        {/*  </Button>*/}
        {/*</View>*/}
        <View style={classes.imageWrapper}>
          {/*<View style={classes.qrWrapper}>*/}
          {/*  <PreImage style={classes.qrImage} source={{uri: mockedQRImage}} />*/}
          {/*</View>*/}
          {/*<Button secondary size="xs" onPress={handleDownload}>*/}
          {/*  download_qr*/}
          {/*</Button>*/}
        </View>
        <InfoMessage text="transfer_receipt_message" />
        {!paying && (
          <View style={classes.actionWrapper}>
            <Button primary onPress={onMarkTransferAsDone}>
              i_already_done_the_transfer
            </Button>
          </View>
        )}
        {paying && (
          <>
            <Label>upload_transfer_receipt</Label>
            <ImagePicker onChange={handleImageChange} />
            <View style={classes.actionWrapper}>
              <Button primary disabled={isEmpty(file)} onPress={handleSubmit}>
                send_text
              </Button>
            </View>
          </>
        )}
      </PermissionsManager>
    </View>
  );
};

export default UploadTransferReceipt;

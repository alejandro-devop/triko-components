import React, {useState} from 'react';
import {Platform, View} from 'react-native';
import styles from './styles';
import {useSession} from 'hooks/index';
import {useStyles} from '@triko-app/hooks';
import Text from 'shared/components/base/text';
import useCurrency from 'shared/hooks/use-currency';
import ImagePicker from 'shared/components/base/controls/image-picker';
import Button from 'shared/components/base/buttons/button';
import {isEmpty} from 'shared/utils/functions';
import Label from 'shared/components/base/label';
import PreImage from 'shared/components/base/pre-image';
import IconButton from 'shared/components/base/buttons/icon-button';
import PermissionsManager, {
  PERMISSIONS,
} from 'shared/components/permissions-manager';
import useFileDownload from 'shared/hooks/use-file-download';
import InfoMessage from 'shared/components/messages/InfoMessage';
import {STATUS_PAYING_ORDER} from 'config/request-statuses';
import useRequestUpdateAttrs from 'shared/hooks/use-request-update-attrs';
import LoadingCurtain from 'components/base/dialogs/loading-curtain';
import {useTrikoInformation} from 'shared/components/service-execution/shopper-request/hooks';
import Clipboard from '@react-native-community/clipboard';
import useNotify from 'shared/hooks/use-notification';
import useTranslation from 'shared/hooks/use-translate';

const UploadTransferReceipt = ({
  request = {},
  onMarkTransferAsDone,
  onUploadReceipt,
  workflow,
  setTempImage,
  tempImage,
}) => {
  const [serviceDetail = {}] = request.details;
  const {downloadFile} = useFileDownload();
  const {success} = useNotify();
  const {_t} = useTranslation();
  const [file, setFile] = useState(
    Platform.OS === 'android' ? tempImage : null,
  );
  const [classes] = useStyles(styles);
  const {price} = serviceDetail;
  const {format} = useCurrency();
  const [triko = {}] = request.triko;
  const {loading, sendRequest} = useRequestUpdateAttrs(request);
  const {loading: fetchingInfo, trikoInfo = {}} = useTrikoInformation(
    !isEmpty(triko.id) ? triko.id : 0,
  );
  const {
    stack: {client = {}},
  } = useSession();
  const handleImageChange = (data) => {
    if (Platform.OS === 'android') {
      setTempImage(data);
    }
    setFile(data);
  };

  const handleDownload = async () => {
    await downloadFile(trikoInfo.bank.qr);
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

  const handleCopyCode = (accountNumber) => {
    Clipboard.setString(accountNumber);
    success(_t('account_number_copied'));
  };

  const paying = workflow === STATUS_PAYING_ORDER;
  return (
    <>
      <View style={classes.root}>
        <PermissionsManager permissions={[PERMISSIONS.ACCESS_DOWNLOAD]}>
          <View style={classes.priceWrapper}>
            <Text style={[classes.text, classes.textTotal]}>total_text</Text>
            <Text style={[classes.text, classes.textPrice]}>
              {format(price)}
            </Text>
          </View>
          <View style={classes.imageWrapper}>
            {!fetchingInfo && !isEmpty(trikoInfo.bank) && (
              <>
                {!isEmpty(trikoInfo.bank.qr) ? (
                  <>
                    <Text style={[classes.text, classes.textQr]}>
                      triko_transfer_qr
                    </Text>
                    <View style={classes.qrWrapper}>
                      <PreImage
                        style={classes.qrImage}
                        source={{uri: trikoInfo.bank.qr}}
                      />
                    </View>
                    <Button secondary size="xs" onPress={handleDownload}>
                      download_qr
                    </Button>
                  </>
                ) : (
                  <>
                    {!isEmpty(trikoInfo.bank.nequi) && (
                      <View style={[classes.fullWrap]}>
                        <Text style={[classes.transferOptionTitle]}>
                          triko_transfer_nequi_option
                        </Text>
                        <View
                          style={[
                            classes.infoWrap,
                            classes.infoWrapContentCopy,
                          ]}>
                          <Text
                            style={[classes.bankInfoText, classes.textTitle]}>
                            triko_transfer_nequi
                          </Text>
                          <Text
                            style={[classes.bankInfoText, classes.textInfo]}>
                            {trikoInfo.bank.nequi}
                          </Text>
                          <IconButton
                            name="clipboard"
                            onPress={() => handleCopyCode(trikoInfo.bank.nequi)}
                            size={18}
                            style={classes.buttonRoot}
                            iconStyles={classes.iconStyles}
                          />
                        </View>
                      </View>
                    )}
                    {!isEmpty(trikoInfo.bank.accountNumber) && (
                      <View style={[classes.fullWrap]}>
                        <Text style={[classes.transferOptionTitle]}>
                          {!isEmpty(trikoInfo.bank.nequi)
                            ? 'triko_transfer_account_option_or'
                            : 'triko_transfer_account_option'}
                        </Text>
                        <View
                          style={[classes.infoWrap, classes.infoWrapContent]}>
                          <Text
                            style={[classes.bankInfoText, classes.textTitle]}>
                            triko_transfer_bank
                          </Text>
                          <Text
                            style={[classes.bankInfoText, classes.textInfo]}>
                            {trikoInfo.bank.bank}
                          </Text>
                        </View>
                        <View
                          style={[classes.infoWrap, classes.infoWrapContent]}>
                          <Text
                            style={[classes.bankInfoText, classes.textTitle]}>
                            triko_transfer_account_type
                          </Text>
                          <Text
                            style={[classes.bankInfoText, classes.textInfo]}>
                            {`account_type_${trikoInfo.bank.type}`}
                          </Text>
                        </View>
                        <View
                          style={[
                            classes.infoWrap,
                            classes.infoWrapContentCopy,
                          ]}>
                          <Text
                            style={[classes.bankInfoText, classes.textTitle]}>
                            triko_transfer_account
                          </Text>
                          <Text
                            style={[classes.bankInfoText, classes.textInfo]}>
                            {trikoInfo.bank.accountNumber}
                          </Text>
                          <IconButton
                            name="clipboard"
                            onPress={() =>
                              handleCopyCode(trikoInfo.bank.accountNumber)
                            }
                            size={18}
                            style={classes.buttonRoot}
                            iconStyles={classes.iconStyles}
                          />
                        </View>
                      </View>
                    )}
                  </>
                )}
              </>
            )}
          </View>
          <InfoMessage text="transfer_receipt_message" />
          {!paying && (
            <View style={classes.actionWrapper}>
              <Button delayAction primary onPress={onMarkTransferAsDone}>
                i_already_done_the_transfer
              </Button>
            </View>
          )}
          {paying && (
            <>
              <Label>upload_transfer_receipt</Label>
              <ImagePicker onChange={handleImageChange} />
              <View style={classes.actionWrapper}>
                <Button
                  primary
                  disabled={isEmpty(file)}
                  delayAction
                  onPress={handleSubmit}>
                  send_text
                </Button>
              </View>
            </>
          )}
        </PermissionsManager>
      </View>
      {loading && <LoadingCurtain disableModal />}
    </>
  );
};

export default UploadTransferReceipt;

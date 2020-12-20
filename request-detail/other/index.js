import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'shared/components/commons';
import Text from 'components/base/text';
import ActionButtons from '../action-buttons';
import InfoRow from '../info-row';
import useStyles from 'shared/hooks/use-styles';
import useTranslation from 'hooks/useTranslation';
import moment from 'moment';
import useCurrency from 'hooks/useCurrency';
import styles from './styles';

const Other = ({
  onCancel,
  onPay,
  onBack,
  onEdit,
  paidOut,
  workflow,
  request = {},
  title,
  total = 0,
}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const {format} = useCurrency();
  const {address, duration, application_date: applicationDate} = request;
  const date = moment(applicationDate, 'YYYY-MM-DD HH:mm:ss').format(
    'YYYY/MM/DD',
  );
  const time = moment(applicationDate, 'YYYY-MM-DD HH:mm:ss').format('h:mm a');
  return (
    <>
      <ScrollView style={classes.scroll} contentContainerStyle={classes.scroll}>
        <View style={classes.root}>
          {title && <Text style={classes.title}>{title}</Text>}
          <InfoRow
            label={_t('detail_destination_label')}
            value={address}
            icon="map-marker"
          />
          <InfoRow
            label={_t('detail_duration_label')}
            value={`${duration} hr`}
            icon="clock"
          />
          <InfoRow
            label={_t('detail_date_label')}
            value={`${date}`}
            icon="calendar"
          />
          <InfoRow
            label={_t('detail_time_label')}
            value={`${time}`}
            icon="bell"
          />
          <InfoRow
            label={_t('detail_time_total')}
            value={`${format(total)}`}
            icon="money-bill-wave"
          />
        </View>
      </ScrollView>
      <ActionButtons
        onPayment={onPay}
        workflow={workflow}
        onEdit={onEdit}
        onCancel={onCancel}
        onBack={onBack}
        paidOut={paidOut}
      />
    </>
  );
};

export default Other;

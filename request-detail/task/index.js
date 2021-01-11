import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'shared/components/commons';
import Text from 'components/base/text';
import useStyles from 'shared/hooks/use-styles';
import InfoRow from '../info-row';
import useTranslation from 'hooks/useTranslation';
import ActionButtons from '../action-buttons';
import {isEmpty} from 'shared/utils/functions';
import Candidates from 'shared/components/requests-list/shopper-card/candidates';
import Button from 'shared/components/base/buttons/button';
import useNavigate from 'shared/hooks/use-navigate';
import {useSession} from 'hooks/index';
import {STATUS_WAITING_FOR_TRIKO} from 'config/request-statuses';
import moment from 'moment';

const TaskDetail = ({
  onCancel,
  onBack,
  onPay,
  request = {},
  title,
  workflow,
  paidOut,
  expired,
}) => {
  const [classes] = useStyles(styles);
  const {navigation} = useNavigate();
  const {setKey} = useSession();
  const {_t} = useTranslation();
  const {
    address,
    application_date: applicationDate,
    attributes,
    triko: trikos = [],
  } = request;
  const requestAttrs = !isEmpty(attributes) ? JSON.parse(attributes) : {};
  const {tools = [], instructions} = requestAttrs;

  const handleViewCandidates = () => {
    setKey('requestCandidatesView', request);
    navigation.navigate('view-candidates');
  };
  const date = moment(applicationDate, 'YYYY-MM-DD HH:mm:ss').format(
    'YYYY/MM/DD',
  );
  const time = moment(applicationDate, 'YYYY-MM-DD HH:mm:ss').format('h:mm a');

  return (
    <>
      <ScrollView
        style={classes.fullHeight}
        contentContainerStyle={classes.scroll}>
        <View style={classes.root}>
          {title && <Text style={classes.title}>{title}</Text>}
          {trikos.length > 0 && workflow === STATUS_WAITING_FOR_TRIKO && (
            <View style={classes.postulatesWrapper}>
              <Text style={classes.postulatesTitle}>candidates_text</Text>
              <Candidates request={request} />
              <Button secondary size="xxs" onPress={handleViewCandidates}>
                view_candidates
              </Button>
            </View>
          )}
          <InfoRow
            label={_t('detail_date_label')}
            value={`${date}`}
            icon="calendar"
          />
          <InfoRow
            label={_t('detail_time_label')}
            value={`${time}`}
            icon="clock"
          />
          <InfoRow
            label={_t('detail_destination_label')}
            value={address}
            icon="map-marker"
          />
          <InfoRow
            label={_t('detail_destination_task_description')}
            value=""
            description={instructions}
            icon="clipboard-list"
          />
          {tools.length > 0 && (
            <>
              <Text style={classes.title}>required_tools_title</Text>
              {tools.map((tool, key) => (
                <InfoRow label={tool} key={`tool-key${key}`} icon="tools" />
              ))}
            </>
          )}
        </View>
      </ScrollView>
      <ActionButtons
        expired={expired}
        onPayment={onPay}
        paidOut={paidOut}
        onBack={onBack}
        onCancel={onCancel}
        workflow={workflow}
      />
    </>
  );
};

const styles = ({palette}) => ({
  contentWrapper: {
    flex: 1,
  },
  cartWrapper: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  cartTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  fullHeight: {
    flex: 1,
  },
  icon: {
    color: palette.blue,
    marginLeft: 5,
  },
  root: {
    flexGrow: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  title: {
    color: palette.blue,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  postulatesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: palette.orange,
    marginBottom: 10,
  },
  postulatesWrapper: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
});

export default TaskDetail;

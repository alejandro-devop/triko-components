import React from 'react';
import {View} from 'react-native';
import Label from 'components/base/label';
import useStyles from 'hooks/useStyles';
import Button from 'components/base/buttons/button';
import Slide from 'shared/components/anims/Slide';
import InfoRow from 'components/base/info-row';
import moment from 'moment';
import {getElapsedTime} from 'utils/functions';
import useTranslation from 'shared/hooks/use-translate';
import {
  STATUS_QUALIFY_CLIENT,
  STATUS_QUALIFY_TRIKO,
  STATUS_STARTED,
} from 'config/request-statuses';
import InfoMessage from 'components/base/messages/InfoMessage';

const Finished = ({request = {}, onNext}) => {
  const [classes] = useStyles(styles);
  const {history = [], transition = {}, client = {}} = request;
  const {first_name: firstName} = client.pi || {};
  const qualifyTransition = history.find(
    item => item.transition.workflow === STATUS_QUALIFY_CLIENT,
  );
  const startedTransition = history.find(
    item => item.transition.workflow === STATUS_STARTED,
  );
  const {_t} = useTranslation();
  const {created_at: startedDate} = startedTransition;
  const {created_at: finishedDate} = qualifyTransition;
  const startObject = moment(startedDate, 'YYYY-MM-DD HH:mm:ss');
  const endObject = moment(finishedDate, 'YYYY-MM-DD HH:mm:ss');
  const elapsed = getElapsedTime(finishedDate, startedDate);

  return (
    <Slide direction="right">
      <View style={classes.root}>
        <Label>{_t('service_execution_resume')}</Label>
        <InfoRow
          icon="stopwatch"
          label={_t('service_execution_resume_duration')}
          value={`${elapsed}`}
        />
        <InfoRow
          icon="play-circle"
          label={_t('service_execution_resume_started')}
          value={`${startObject.format('D MMMM YYYY h:mm:ss a ')}`}
        />
        <InfoRow
          icon="stop-circle"
          label={_t('service_execution_resume_end')}
          value={`${endObject.format('D MMMM YYYY h:mm:ss a ')}`}
        />
        {transition.workflow === STATUS_QUALIFY_CLIENT && (
          <InfoMessage
            text={_t('service_execution_resume_waiting_rate', {
              name: firstName,
            })}
          />
        )}
        {transition.workflow === STATUS_QUALIFY_TRIKO && (
          <View style={classes.actionButton}>
            <Button onPress={onNext} primary>
              {_t('continue_text')}
            </Button>
          </View>
        )}
      </View>
    </Slide>
  );
};

const styles = () => ({
  root: {
    backgroundColor: '#FFF',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});

export default Finished;

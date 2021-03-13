import React, {useState} from 'react';
import {View} from 'react-native';
import Label from 'components/base/label';
import useStyles from 'hooks/useStyles';
import RatingStars from 'components/base/rating-stars';
import TextArea from 'components/base/controls/text-area';
import Button from 'components/base/buttons/button';
import LoadingCurtain from 'components/base/dialogs/loading-curtain';
import {useMutation} from '@apollo/react-hooks';
import {SAVE_RATING} from 'components/service-execution/queries';
import useNotify from 'hooks/useNotification';
import useNavigate from 'hooks/useNavigate';
import useRequestUpdater from 'hooks/useRequestUpdater';
import useTranslation from 'hooks/useTranslation';
import useSession from 'hooks/useSession';

const RateService = ({request = {}}) => {
  const [classes] = useStyles(styles);
  const {redirectTo} = useNavigate();
  const {
    stack: {readMessages},
    setKey,
  } = useSession();
  const [stars, setStars] = useState(5);
  const [sending, setSending] = useState(false);
  const {_t} = useTranslation();
  const [comment, setComment] = useState('');
  const [saveRate, {loading}] = useMutation(SAVE_RATING);
  const {updateRequest, updating} = useRequestUpdater();
  const {error, success} = useNotify();
  const {client = {}} = request;
  const {pi = {}} = client;

  const onSubmitForm = async () => {
    setSending(true);
    try {
      await saveRate({
        variables: {
          request: request.id,
          isClient: true,
          rating: stars,
          comment,
        },
      });
      await updateRequest(request.id);
      success(_t('qualification_send'));
      const {chat = {}} = request;
      if (chat && chat.id) {
        delete readMessages[chat.id];
        setKey('readMessages', readMessages);
      }
      setSending(false);
      redirectTo('dashboard');
    } catch (e) {
      console.log('Error', e);
      error('Error while saving the rating');
      setSending(false);
    }
  };
  return (
    <>
      {(loading || updating) && <LoadingCurtain />}
      <View style={classes.root}>
        <Label>
          {_t('qualification_client_opinion_client', {
            name: pi.first_name,
          })}
        </Label>
        <View style={classes.ratingWrapper}>
          <RatingStars
            value={stars}
            onChange={({target: {value}}) => setStars(value)}
          />
        </View>
        <TextArea
          label={_t('qualification_client_opinion_label')}
          onChange={({target: {value}}) => setComment(value)}
          placeholder={_t('qualification_client_opinion', {
            name: pi.first_name,
          })}
          value={comment}
        />
        <View style={classes.buttonRow}>
          <Button primary onPress={onSubmitForm} disabled={sending}>
            {_t('finish_text')}
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = {
  ratingWrapper: {
    alignItems: 'center',
  },
  root: {
    backgroundColor: '#FFF',
    paddingVertical: 30,
  },
  buttonRow: {
    marginTop: 20,
  },
};

export default RateService;

import React, {useState} from 'react';
import {View} from 'react-native';
import LoadingCurtain from 'components/base/dialogs/loading-curtain';
import Label from 'components/base/label';
import RatingStars from 'components/base/rating-stars';
import TextArea from 'components/base/controls/text-area';
import Button from 'shared/components/base/buttons/button';
import useStyles from 'shared/hooks/use-styles';
import useTranslation from 'shared/hooks/use-translate';
import useRateClient from 'shared/hooks/use-rate-client';
import styles from './styles';

const RateClient = ({request = {}, onRateSend}) => {
  const {loading, sendRate} = useRateClient(request);
  const [classes] = useStyles(styles);
  const [stars, setStars] = useState(5);
  const {_t} = useTranslation();
  const [comment, setComment] = useState('');
  const {client = {}} = request;
  const {pi = {}} = client;

  const handleSendForm = async () => {
    await sendRate({
      comment,
      stars,
    });
    if (onRateSend) {
      onRateSend();
    }
  };

  return (
    <>
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
          <Button primary onPress={handleSendForm} disabled={loading}>
            {_t('finish_text')}
          </Button>
        </View>
      </View>
      {loading && <LoadingCurtain disableModal />}
    </>
  );
};

export default RateClient;

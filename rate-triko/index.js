import React, {useState} from 'react';
import {View} from 'react-native';
import useStyles from 'hooks/useStyles';
import styles from './styles';
import RatingStars from 'components/base/rating-stars';
import BadgesPicker from 'shared/components/badges-picker';
import AspectsToImprove from 'shared/components/aspects-to-improve';
import Button from 'components/base/buttons/button';
import LoadingCurtain from 'components/base/dialogs/loading-curtain';
import {useMutation} from '@apollo/react-hooks';
import {
  SAVE_ASPECTS_TO_IMPROVE,
  SAVE_QUALIFICATION,
  SAVE_RATING,
} from './queries';
import useNotify from 'hooks/useNotification';
import useSession from 'hooks/useSession';
import useTranslation from 'hooks/useTranslation';

/**
 * This component allows to save a rate for a triko after finish a service execution
 * @author Jako <jakop.box@gmail.com>
 * @app Client
 * @version 1.0.0
 * @param request
 * @param onRateSend
 * @returns {*}
 * @constructor
 */
const RateTriko = ({onRateSend, request = {}}) => {
  const {
    stack: {locale},
  } = useSession();
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [badges, setBadges] = useState([]);
  const [aspectsToImprove, setAspectsToImprove] = useState({});
  const [saveRating] = useMutation(SAVE_RATING);
  const [saveBadges] = useMutation(SAVE_QUALIFICATION);
  const [saveAspects] = useMutation(SAVE_ASPECTS_TO_IMPROVE);
  const {error, success} = useNotify();

  const sendQualification = async () => {
    try {
      setLoading(true);
      await saveRating({
        variables: {
          request: request.id,
          rating,
          comment: aspectsToImprove.comment,
          locale,
        },
      });
      if (badges && badges.length > 0) {
        await saveBadges({
          variables: {
            request: request.id,
            medals: JSON.stringify(badges),
            locale,
          },
        });
      }
      if (aspectsToImprove.aspects && aspectsToImprove.aspects.length > 0) {
        await saveAspects({
          variables: {
            request: request.id,
            aspects: JSON.stringify(aspectsToImprove.aspects),
          },
        });
      }
      if (onRateSend) {
        onRateSend();
      }
      success(_t('triko_rated_label'));
      setLoading(false);
    } catch (e) {
      console.log('error', e);
      error('Error while saving the qualification');
      setLoading(false);
    }
  };
  const canSend =
    rating >= 5 ||
    (rating < 5 &&
      aspectsToImprove.aspects &&
      aspectsToImprove.aspects.length > 0);
  return (
    <>
      <View style={classes.root}>
        <View style={classes.starsWrapper}>
          <RatingStars
            label={_t('service_execution_rate_label_attention')}
            onChange={({target: {value}}) => setRating(value)}
            value={rating}
          />
        </View>
        {rating === 5 && (
          <BadgesPicker
            label={_t('service_execution_rate_label_medal')}
            onChange={({target: {value}}) => setBadges(value)}
          />
        )}
        {rating < 5 && (
          <AspectsToImprove
            label={_t('service_execution_rate_label_improve')}
            onChange={({target: {comment, aspects}}) =>
              setAspectsToImprove({comment, aspects})
            }
          />
        )}
        <View style={classes.actionWrapper}>
          <Button onPress={sendQualification} primary disabled={!canSend}>
            {_t('send_text')}
          </Button>
        </View>
      </View>
      {loading && <LoadingCurtain disableModal />}
    </>
  );
};

export default RateTriko;

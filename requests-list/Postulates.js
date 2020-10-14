import React from 'react';
import {View} from 'react-native';
import {useStyles} from 'hooks/index';
import PreImage from 'shared/components/base/pre-image';
import Text from 'components/base/text';
import LinkButton from 'components/base/buttons/link-button';
import profilePhoto from 'assets/avatars/profile-photo.jpg';
import useTranslation from 'hooks/useTranslation';

const Postulates = ({postulates = [], max = 4}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const postulatesToDisplay = postulates.slice(0, max);
  const trikos = postulatesToDisplay.map(({user = {}}) => ({
    photo: user.photo_url,
  }));
  const others = postulates.slice(max).length;
  return (
    <View style={classes.root}>
      <View style={classes.candidatesWrapper}>
        {trikos.map((item, key) => (
          <View key={`item-${key}`} style={classes.avatarWrapper}>
            <PreImage
              source={item.photo ? {uri: item.photo} : profilePhoto}
              style={classes.avatar}
            />
          </View>
        ))}
        {others > 0 && <Text style={classes.others}>+{others}</Text>}
      </View>
      <Text variant="caption">
        {_t(
          postulates.length > 1
            ? 'candidates_count_plural'
            : 'candidates_count_singular',
          {count: postulates.length},
        )}
      </Text>
      <LinkButton primary style={classes.linkButton}>
        {_t('select_your_triko')}
      </LinkButton>
    </View>
  );
};

const styles = ({palette}) => ({
  candidatesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarWrapper: {
    width: 25,
    height: 25,
    borderRadius: 100,
    overflow: 'hidden',
    marginRight: 4,
  },
  linkButton: {
    fontWeight: '600',
    textDecorationLine: 'none',
  },
  others: {
    color: palette.orange,
    fontSize: 14,
    marginLeft: 10,
    fontWeight: '800',
  },
  root: {
    alignItems: 'flex-end',
  },
});

export default Postulates;

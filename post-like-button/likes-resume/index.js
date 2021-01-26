import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import styles from './styles';
import PreImage from 'shared/components/base/pre-image';
import defaultImage from 'assets/avatars/profile-photo.jpg';
import {isEmpty} from 'shared/utils/functions';
import Text from 'shared/components/base/text';

const LikesResume = ({likes = [], readOnly, max = 5}) => {
  const [classes] = useStyles(styles);
  const likestoRender = likes.slice(0, max);
  const Wrapper = readOnly ? View : TouchableOpacity;
  const rest = likes.slice(max).length;
  return (
    <Wrapper style={classes.root}>
      {likestoRender.map((item, key) => {
        const {user = {}} = item;
        const {photo} = user;
        return (
          <View style={classes.wrapper} key={`like-${item.id}-${key}`}>
            <View style={classes.avatarWrapper}>
              <PreImage
                style={classes.avatar}
                source={!isEmpty(photo) ? {uri: photo} : defaultImage}
              />
            </View>
          </View>
        );
      })}
      {rest > 0 && <Text style={classes.restText}>{`${max}+`}</Text>}
    </Wrapper>
  );
};

export default LikesResume;

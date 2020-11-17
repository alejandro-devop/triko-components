import React from 'react';
import {View} from 'react-native';
import {useStyles} from 'hooks/index';
import styles from './styles';
import Text from 'shared/components/base/text';
import PreImage from 'shared/components/base/pre-image';
import trikoAvatar from 'shared/assets/avatars/triko-avatar.png';
import defaultAvatar from 'assets/avatars/profile-photo.jpg';

const Candidates = ({request = {}, max = 9}) => {
  const [classes] = useStyles(styles);
  const {triko: trikos = []} = request;
  const trikosToRender = [...trikos].slice(0, max);
  return (
    <View style={classes.root}>
      <View style={classes.trikosRow}>
        {trikosToRender.map((item, key) => {
          const {user = {}} = item;
          const {photo_url: photo} = user;
          return (
            <View
              key={`triko-item-${request.id}-${key}`}
              style={classes.avatarWrapper}>
              <View style={classes.avatarBorder}>
                <PreImage
                  style={classes.avatar}
                  source={photo ? {uri: photo} : defaultAvatar}
                />
              </View>
            </View>
          );
        })}
        {trikos.length >= max && (
          <View style={classes.maxWrapper}>
            <Text style={classes.maxText}>{`+${max}`}</Text>
          </View>
        )}
      </View>
      {trikos.length === 0 && (
        <View style={classes.emptyWrapper}>
          <View style={classes.trikoAvatarWrapper}>
            <PreImage style={classes.trikoAvatar} source={trikoAvatar} />
          </View>
          <Text style={classes.emptyText}>empty_candidates_text</Text>
        </View>
      )}
    </View>
  );
};

export default Candidates;

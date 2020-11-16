import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import styles from './styles';
import useStyles from 'hooks/useStyles';
import Loader from './Loader';
import Label from 'components/base/label';
import BadgeItem from './BadgeItem';
import {GET_MEDALS} from 'components/badges-picker/queries';
import {useQuery} from '@apollo/react-hooks';
import useSession from 'hooks/useSession';

export const MEDAL_APP = 1;
export const MEDAL_PROFILE = 2;

/**
 * This component allows to select badges.
 * @author Jako <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client, Triko
 * @param label
 * @param name
 * @param onChange
 * @param type
 * @param value
 * @returns {*}
 * @constructor
 */
const BadgesPicker = ({
  label,
  name,
  onChange,
  type = MEDAL_APP,
  value = [],
}) => {
  const [classes] = useStyles(styles);
  const {
    stack: {locale},
  } = useSession();
  const [selectedBadges, setSelectedBadges] = useState(value);
  const {data = {}, loading} = useQuery(GET_MEDALS, {
    variables: {
      locale,
      type,
    },
  });

  const medals =
    data.response && Array.isArray(data.response) ? data.response : [];

  const handleSelect = selectedBadge => {
    const selected = selectedBadges.find(item => item === selectedBadge.id);
    let newBadges = [...selectedBadges];
    if (selected) {
      newBadges = newBadges.filter(item => item !== selectedBadge.id);
    } else {
      newBadges = [...selectedBadges, selectedBadge.id];
    }
    setSelectedBadges(newBadges);
    if (onChange) {
      onChange({
        target: {
          name,
          value: newBadges,
          entities: medals.filter(item => newBadges.includes(item.id)),
        },
      });
    }
  };

  const content = () => (
    <View style={classes.content}>
      {label && <Label>{label}</Label>}
      <View style={classes.badgesWrapper}>
        {medals.map((badge, key) => (
          <BadgeItem
            key={`badge-item-${badge.id}-${key}`}
            label={badge.name}
            icon={badge.icon}
            onSelect={() => handleSelect(badge)}
            selected={selectedBadges.includes(badge.id)}
          />
        ))}
      </View>
    </View>
  );

  return (
    <View style={classes.root}>
      {loading && <Loader />}
      {!loading && content()}
    </View>
  );
};

export default BadgesPicker;

import React, {useState} from 'react';
import {View} from 'react-native';
import {useStyles} from 'hooks/index';
import Icon from 'shared/components/base/icon';
import Text from 'shared/components/base/text';
import styles from './styles';
import classNames from 'shared/utils/classnames';
import flagStart from 'shared/assets/icons/flag-start.png';
import flagEnd from 'shared/assets/icons/flag-end.png';
import PreImage from 'shared/components/base/pre-image';
import avatar from 'assets/avatars/profile-photo.jpg';
import Button from 'shared/components/base/buttons/button';
import ConfirmSlide from 'components/base/confirm-slide';

const StepItem = ({
  active,
  collapsed,
  isTriko,
  isFirst,
  isLast,
  request = {},
  step = {},
  isCurrent,
}) => {
  const [classes] = useStyles(styles);
  const [confirm, setConfirm] = useState(false);
  const toggleConfirm = () => setConfirm(!confirm);
  const {label, title, description, action = {}, noAction} = step;
  const {label: actionLabel, callback} = action;
  const {client = {}, triko = {}} = request;
  const {user = {}} = isTriko ? triko : client;
  const {photo_url: photo} = user;
  return (
    <View style={classNames({root: true, rootCollapsed: collapsed}, classes)}>
      <View style={classes.leftPanel}>
        <Icon
          name="check-circle"
          style={classNames({icon: true, iconActive: active}, classes)}
        />
        <Text style={classes.text}>{label}</Text>
        <View style={[classes.tip]} />
        {isCurrent && (
          <View style={classes.avatarWrapper}>
            <PreImage
              style={classes.avatar}
              source={photo ? {uri: photo} : avatar}
            />
          </View>
        )}
        {!isLast && (
          <View
            style={classNames(
              {timeLine: true, timelineCollapsed: collapsed},
              classes,
            )}
          />
        )}
        {isFirst && (
          <PreImage
            style={[classes.flag, classes.flagFirst]}
            source={flagStart}
          />
        )}
        {isLast && (
          <PreImage style={[classes.flag, classes.flagEnd]} source={flagEnd} />
        )}
      </View>
      <View style={classes.rightPanel}>
        {Boolean(isCurrent) && (
          <View style={classes.stepDescription}>
            {title && (
              <Text style={[classes.title, classes.descriptionText]}>
                {title}
              </Text>
            )}
            {description && (
              <Text style={[classes.description, classes.descriptionText]}>
                {description}
              </Text>
            )}
            {actionLabel && (
              <>
                {!confirm && !noAction && (
                  <Button size="xxs" secondary onPress={toggleConfirm}>
                    {actionLabel}
                  </Button>
                )}
                {confirm && (
                  <ConfirmSlide
                    labelStyles={classes.confirmLabel}
                    message="confirm_execute_action"
                    buttonSize="xs"
                    onCancel={toggleConfirm}
                    onAccept={callback}
                  />
                )}
              </>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default StepItem;
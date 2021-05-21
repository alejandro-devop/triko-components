import React, {useState} from 'react';
import {View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
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
import {isEmpty} from 'shared/utils/functions';

const StepItem = ({
  active,
  collapsed,
  isFirst,
  isLast,
  lockActions,
  request = {},
  step = {},
  isCurrent,
}) => {
  const [classes] = useStyles(styles);
  const [confirm, setConfirm] = useState(false);
  const toggleConfirm = () => setConfirm(!confirm);
  const {label, title, description, action = {}, noAction} = step;
  const {label: actionLabel, callback, dontConfirm} = action;
  const {triko: trikos = []} = request;
  const [triko = {}] = trikos;
  const {user = {}} = triko;
  const {photo_url: photo} = user;

  return (
    <View style={classNames({root: true, rootCollapsed: collapsed}, classes)}>
      <View style={classes.leftPanel}>
        <Icon
          name="check-circle"
          style={classNames({icon: true, iconActive: active}, classes)}
        />
        <Text style={[classes.text, classes.label]}>{label}</Text>
        <View style={[classes.tip]} />
        {Boolean(isCurrent) && (
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
        {Boolean(isLast) && (
          <PreImage style={[classes.flag, classes.flagEnd]} source={flagEnd} />
        )}
      </View>
      <View style={classes.rightPanel}>
        {Boolean(isCurrent) && (
          <View style={classes.stepDescription}>
            {Boolean(title) && (
              <Text style={[classes.title, classes.descriptionText]}>
                {title}
              </Text>
            )}
            {Boolean(description) && !confirm && (
              <Text style={[classes.description, classes.descriptionText]}>
                {description}
              </Text>
            )}
            {Boolean(actionLabel) && !collapsed && (
              <>
                {!isEmpty(actionLabel) && !confirm && !noAction && (
                  <Button
                    disabled={lockActions}
                    size="xxs"
                    secondary
                    onPress={() =>
                      dontConfirm && callback ? callback() : toggleConfirm()
                    }
                    textStyle={classes.actionButtonText}>
                    {actionLabel}
                  </Button>
                )}
                {confirm && !lockActions && (
                  <ConfirmSlide
                    labelStyles={classes.confirmLabel}
                    message="confirm_execute_action"
                    buttonSize="xs"
                    onCancel={toggleConfirm}
                    onAccept={() => {
                      if (callback) {
                        callback();
                      }
                      toggleConfirm();
                    }}
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

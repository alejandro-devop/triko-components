import React, {useState} from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {useStyles} from 'hooks/index';
import Slide from 'shared/components/anims/Slide';
import trikoAvatar from 'shared/assets/avatars/triko-avatar.png';
import PreImage from 'shared/components/base/pre-image';
import Text from 'shared/components/base/text';
import Button from 'shared/components/base/buttons/button';
import MapIcon from '../map-icon';
import classNames from 'shared/utils/classnames';

const BoxControl = ({onRequestPermissions}) => {
  const [classes] = useStyles(styles);
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = () => setCollapsed(!collapsed);

  const Wrapper = collapsed ? TouchableOpacity : Slide;

  return (
    <SafeAreaView style={classes.root}>
      <Wrapper
        direction={!collapsed ? 'right' : null}
        onPress={() => (collapsed ? toggleCollapse() : null)}
        style={classNames(
          {boxWrapper: true, boxWrapperCollapsed: collapsed},
          classes,
        )}>
        {!collapsed && (
          <View style={classes.avatarWrapper}>
            <PreImage source={trikoAvatar} style={classes.avatar} />
          </View>
        )}
        {!collapsed && (
          <View style={classes.textWrapper}>
            <Text style={classes.text}>enable_location_text</Text>
            <View style={classes.actionsWrapper}>
              <Button primary size="xxs" onPress={onRequestPermissions}>
                enable_text
              </Button>
              <Button size="xxs" alternative onPress={toggleCollapse}>
                close_text
              </Button>
            </View>
          </View>
        )}
        <MapIcon collapsed={collapsed} />
      </Wrapper>
    </SafeAreaView>
  );
};

export default BoxControl;

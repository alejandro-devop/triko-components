import React, {useState} from 'react';
import {View} from 'react-native';
import Text from 'shared/components/base/text';
import {useStyles} from '@triko-app/hooks';
import PrettyIcon from 'shared/components/pretty-icon';
import useTranslation from 'shared/hooks/use-translate';
import Button from 'shared/components/base/buttons/button';
import BugReporter from 'shared/components/bug-reporter';

/**
 * This component allows to display a view in case something goes wrong while registering the user.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @returns {*}
 * @constructor
 */
const WithError = () => {
  const [classes] = useStyles(styles);
  const [visible, setVisible] = useState(false);
  const {_t} = useTranslation();
  const toggleVisible = () => setVisible(!visible);
  return (
    <>
      <View style={classes.root}>
        <Text variant="subtitle" style={classes.title}>
          {_t('error_title')}
        </Text>
        <PrettyIcon
          name={'bug'}
          classes={{
            root: classes.iconWrapper,
            icon: classes.icon,
          }}
        />
        <View style={classes.actions}>
          <Button onPress={toggleVisible} primary>
            {_t('report_bug')}
          </Button>
        </View>
      </View>
      {visible && <BugReporter open={visible} onClose={toggleVisible} />}
    </>
  );
};

const styles = ({palette}) => ({
  actions: {
    marginTop: 20,
  },
  icon: {
    color: palette.red,
  },
  iconWrapper: {
    borderColor: palette.red,
    backgroundColor: palette.redLight,
  },
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingHorizontal: 40,
  },
  title: {
    color: palette.orange,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default WithError;

import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Text from 'components/base/text';
import useStyles from 'hooks/useStyles';
import styles from './styles/step-info.style';
import useTranslation from 'hooks/useTranslation';

/**
 * This component displays the title and description for each step.
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param description
 * @param title
 * @returns {*}
 * @constructor
 */
const StepInfo = ({description, title}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  return (
    <View style={classes.textWrapper}>
      <Text style={[classes.text, classes.title]}>{_t(title)}</Text>
      <Text variant="caption" style={[classes.text, classes.title]}>
        {_t(description)}
      </Text>
    </View>
  );
};

StepInfo.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

export default StepInfo;

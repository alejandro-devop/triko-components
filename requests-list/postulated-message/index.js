import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Text from 'shared/components/base/text';
import {useSession, useStyles} from 'hooks/index';
import styles from './styles';
import {startedStatuses} from 'shared/hooks/use-request-status';

/**
 * This component renders a label indicating that if the current logged
 * triko is postulated to a specific service.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param request
 * @param isTriko
 * @returns {null|*}
 * @constructor
 */
const PostulatedMessage = ({request = {}, isTriko}) => {
  const [classes] = useStyles(styles);
  const {
    stack: {triko = {}},
  } = useSession();
  const {triko: trikos = [], transition = {}} = request;
  const {workflow} = transition;
  const isPostulated = isTriko
    ? trikos.map((item) => item.id).includes(triko.id)
    : false;
  if (!isPostulated || startedStatuses.includes(workflow)) {
    return null;
  }
  return (
    <View style={classes.postulatedWrapper}>
      <Text style={classes.postulatedText}>postulated_text</Text>
    </View>
  );
};

PostulatedMessage.propTypes = {
  request: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    triko: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    ),
    transition: PropTypes.shape({
      workflow: PropTypes.string,
    }),
  }),
};

export default PostulatedMessage;

import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, RefreshControl, View} from 'react-native';
import {useStyles} from 'hooks/index';
import styles from './styles';

/**
 * This component contains the pending services list wrapper.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param children
 * @param onRefresh
 * @param refreshing
 * @returns {*}
 * @constructor
 */
const Wrapper = ({children, onRefresh, refreshing}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={classes.scroll}
        contentContainerStyle={classes.scroll}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }>
        <View style={classes.contentWrapper}>{children}</View>
      </ScrollView>
    </View>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
};

export default Wrapper;

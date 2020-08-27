import React from 'react';
import {StyleSheet, View} from 'react-native';

/**
 * This component renders a common row
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param children
 * @returns {*}
 * @constructor
 */
const Row = ({children}) => {
  return <View style={styles.root}>{children}</View>;
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 15,
    marginTop: 5,
    marginBottom: 10,
  },
});

export default Row;

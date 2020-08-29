import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import LoaderScreen from 'shared/components/loaders/loader-screen';
import useStyles from 'shared/hooks/use-styles';

/**
 * This component resolves the country id using the country code.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param children
 * @param countryCode
 * @param onCountryFound
 * @returns {*}
 * @constructor
 */
const CountryResolver = ({children, countryCode, onCountryFound}) => {
  const [loading, setLoading] = useState(true);
  const [classes] = useStyles(styles);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      onCountryFound(48);
    }, 1000);
  }, []);

  return (
    <>
      {loading && (
        <View style={classes.root}>
          <LoaderScreen />
        </View>
      )}
      {!loading && children}
    </>
  );
};

const styles = () => ({
  root: {
    height: 300,
  },
});

CountryResolver.propTypes = {
  children: PropTypes.node,
  countryCode: PropTypes.string,
  onCountryFound: PropTypes.func,
};

export default CountryResolver;

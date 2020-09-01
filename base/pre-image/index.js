import React, {useState} from 'react';
import {Image, View} from 'react-native';
import useStyles from 'hooks/useStyles';
import SkeletonLoader from 'shared/components/loaders/skeleton';

const PreImage = ({source, style}) => {
  const [loading, setLoading] = useState(true);
  const [classes] = useStyles(styles);
  return (
    <View style={[classes.root, style]}>
      {loading && <SkeletonLoader style={[classes.loader, style]} />}
      <Image
        style={[style]}
        onLoadEnd={() => setLoading(false)}
        source={source}
      />
    </View>
  );
};

const styles = {
  root: {
    width: '100%',
    height: '100%',
  },
  loader: {
    marginVertical: 0,
    paddingHorizontal: 0,
    width: '100%',
    height: '100%',
  },
};

export default PreImage;

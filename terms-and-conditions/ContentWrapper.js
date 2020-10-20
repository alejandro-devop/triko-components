import React, {useState} from 'react';
import { View} from 'react-native';
import {WebView} from 'react-native-webview';
import Button from 'components/base/buttons/button';
import useStyles from 'hooks/useStyles';
import AnimatedArrowDown from 'components/anims/AnimatedArrowDown';
import LoadingCurtain from 'components/base/dialogs/loading-curtain';

const ContentWrapper = ({source, onAccept, onCancel, _t}) => {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [classes] = useStyles(styles);
  const onScroll = ({nativeEvent}) => {
    const {contentSize = {}, contentOffset} = nativeEvent;
    if (contentOffset.y >= contentSize.height - 1000) {
      setEnabled(true);
    }
  };
  return (
    <View style={classes.root}>
      <View style={classes.webViewWrapper}>
        <WebView
          scalesPageToFit={false}
          decelerationRate="normal"
          bounces={false}
          style={[classes.webView]}
          originWhitelist={['*']}
          onScroll={onScroll}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          source={{
            uri: source,
          }}
        />
        {!enabled && (
          <View style={classes.arrowWrapper}>
            <AnimatedArrowDown />
          </View>
        )}
      </View>
      {loading && <LoadingCurtain disableModal />}
      <View style={classes.controlsWrapper}>
        <Button onPress={onAccept} primary>
          {/* txt: Accept terms */}
          {_t('terms_and_conditions_modal_accept')}
        </Button>
        <Button onPress={onCancel} secondary>
          {/* txt: Cancel */}
          {_t('terms_and_conditions_modal_cancel')}
        </Button>
      </View>
    </View>
  );
};

const styles = {
  root: {height: '100%', flex: 1, width: '100%'},
  arrowWrapper: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  webView: {},
  webViewWrapper: {
    flex: 10,
  },
  controlsWrapper: {
    flex: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
};

export default ContentWrapper;

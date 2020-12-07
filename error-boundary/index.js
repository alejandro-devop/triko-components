import React from 'react';
import {SafeAreaView} from 'react-native';
import Text from 'shared/components/base/text';
import {useRoute} from '@react-navigation/native';
import {View} from 'react-native';
import Icon from 'shared/components/base/icon';
import {useStyles} from 'hooks/index';
import styles from './styles';
import BugReporter from 'shared/components/bug-reporter';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import {ScrollView} from 'shared/components/commons';
import {isEmpty} from 'shared/utils/functions';

class ErrorBoundaryHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    const {reportError} = this.props;
    reportError(error, {code: 'TK-000003'});
    this.setState({hasError: true});
  }

  render() {
    const {hasError} = this.state;
    const {classes} = this.props;
    if (hasError) {
      // Puedes renderizar cualquier interfaz de repuesto
      return (
        <ScrollView useKeyboard>
          <SafeAreaView style={classes.safe}>
            <View style={classes.root}>
              <View style={classes.iconWrapper}>
                <Icon name="bug" style={classes.icon} />
              </View>
              <View style={classes.textWrapper}>
                <Text style={classes.text}>sorry_something_went_wrong</Text>
              </View>
              <BugReporter disableDialog />
            </View>
          </SafeAreaView>
        </ScrollView>
      );
    }

    return this.props.children;
  }
}

const ErrorBoundary = ({children}) => {
  const [classes] = useStyles(styles);
  const route = useRoute();
  const routeName = !isEmpty(route) ? route.name : 'none';
  const reportError = useErrorReporter({
    path: `Navigation route: ${routeName}`,
  });
  console.log('Navigation: ', route);
  return (
    <ErrorBoundaryHandler classes={classes} reportError={reportError}>
      {children}
    </ErrorBoundaryHandler>
  );
};

export default ErrorBoundary;

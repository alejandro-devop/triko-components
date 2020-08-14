import React from 'react';
import {StyleSheet} from 'react-native';

export const ThemeContext = React.createContext({});

/**
 * This is the application theme provider
 * @author Alejandro <alejandro.devop@gmail.com>
 */
class ThemeProvider extends React.PureComponent {
  theme = {};

  constructor(props) {
    super(props);
    this.initializeTheme();
  }

  initializeTheme() {
    const {theme = {}} = this.props;
    const {styles = {}, variables = {}, palette = {}, shadows = {}} = theme;
    this.theme = {
      styles: StyleSheet.create(styles),
      variables,
      palette,
      shadows,
    };
  }

  render() {
    const {children} = this.props;
    return (
      <ThemeContext.Provider value={this.theme}>
        {children}
      </ThemeContext.Provider>
    );
  }
}

export default ThemeProvider;

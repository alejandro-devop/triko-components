import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import EmptyList from './EmptyList';
import useMock from 'shared/hooks/use-mock';
import Loader from './Loader';
import PostItem from './post-item';
import mockedNews from './mocked-news';

/**
 * This component allows to render the user histories, its used for client news
 * and client
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param isTriko If the component should display triko news or client news.
 * @returns {*}
 * @constructor
 */
const NewsComponent = ({isTriko}) => {
  const [classes] = useStyles(styles);
  const {loading, data} = useMock(
    isTriko ? mockedNews.triko : mockedNews.client,
  );
  const newsToRender = data.response ? data.response : [];
  return (
    <View style={classes.root}>
      {!loading && newsToRender.length === 0 && <EmptyList />}
      {loading && <Loader />}
      {newsToRender.map((post, key) => (
        <PostItem key={`post-item-${key}`} delay={key * 100} post={post} />
      ))}
    </View>
  );
};

const styles = () => ({
  root: {
    flexGrow: 1,
  },
});

NewsComponent.propTypes = {
  isTriko: PropTypes.bool,
};

export default NewsComponent;

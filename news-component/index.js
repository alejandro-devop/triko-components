import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {RefreshControl, View} from 'react-native';
import {ScrollView} from 'shared/components/commons';
import {useFocusEffect} from '@react-navigation/native';
import styles from './styles';
import useStyles from 'shared/hooks/use-styles';
import EmptyList from './empty-list';
import Loader from './Loader';
import PostItem from './post-item';
import useUserPosts from 'shared/components/news-component/hooks';

/**
 * This component allows to render the user histories, its used for client news
 * and client
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param isTriko If the component should display triko news or client news.
 * @param clientId
 * @returns {*}
 * @constructor
 */
const NewsComponent = ({isTriko, onlyPublic, onlyOwned, clientId, trikoId}) => {
  const [classes] = useStyles(styles);
  const {posts = [], loading, loaded, refresh, refreshing} = useUserPosts({
    clientId,
    trikoId,
    isTriko,
    onlyOwned,
    onlyPublic,
  });
  useFocusEffect(
    useCallback(() => {
      refresh();
      return () => {};
    }, []),
  );
  return (
    <ScrollView
      useKeyboard
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }>
      <View style={classes.root}>
        {!loading && posts.length === 0 && <EmptyList />}
        {loading && !loaded && <Loader />}
        {posts.map((post, key) => (
          <PostItem
            isTriko={isTriko}
            refreshPosts={refresh}
            key={`post-item-${key}`}
            delay={key * 100}
            post={post}
          />
        ))}
      </View>
    </ScrollView>
  );
};

NewsComponent.propTypes = {
  isTriko: PropTypes.bool,
  clientId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default NewsComponent;

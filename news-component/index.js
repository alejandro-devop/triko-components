import React from 'react';
import PropTypes from 'prop-types';
import {RefreshControl, ScrollView, View} from 'react-native';
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
 * @returns {*}
 * @constructor
 */
const NewsComponent = ({isTriko}) => {
  const [classes] = useStyles(styles);
  const {posts = [], loading, refresh} = useUserPosts();
  console.log('posts: ', posts);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl onRefresh={refresh} refreshing={loading} />
      }>
      <View style={classes.root}>
        {!loading && posts.length === 0 && <EmptyList />}
        {loading && <Loader />}
        {posts.map((post, key) => (
          <PostItem
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
};

export default NewsComponent;

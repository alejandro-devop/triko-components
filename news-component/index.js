import React from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import EmptyList from './EmptyList';
import useMock from 'shared/hooks/use-mock';
import Loader from './Loader';
import PostItem from './post-item';
import mockedNews from './mocked-news';

const NewsComponent = () => {
  const [classes] = useStyles(styles);
  const {loading, data} = useMock(mockedNews);
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

export default NewsComponent;

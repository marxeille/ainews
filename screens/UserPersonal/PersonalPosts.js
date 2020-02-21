/* eslint-disable react/prop-types */
import React from 'react';
import { wrap } from '@agiletechvn/react-theme';
import NewsFeed from '../Home/NewsFeed';

class PersonalPosts extends React.PureComponent {
  render() {
    const { authorId } = this.props;

    return <NewsFeed type="author" authorId={authorId} isAuthorDetail />;
  }
}

export default wrap(PersonalPosts);

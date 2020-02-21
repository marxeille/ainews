/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';

import { wrap } from '@agiletechvn/react-theme';
import DebounceTouch from 'AINews/src/components/common/DebounceTouch';
import { fixAndroidBoldCls } from 'AINews/src/utils/trivia';

import NewsAuthorSection from './NewsAuthorSection';
import Bootstrap from '../../App/Bootstrap';
import NewsInteractiveSection from './NewsInteractiveSection';

const CommonNew = ({ item, onPress, saved, onHidePost }) => (
  <DebounceTouch cls="bg-white mt2" onPress={onPress}>
    <View cls="">
      <NewsAuthorSection
        saved={saved}
        postId={item.id}
        createdAt={item.createdAt}
        author={item.author}
        type="category"
        hidePost={onHidePost}
      />
    </View>
    <View cls="ph3 pt2">
      <EmphasisTextComp text={item.highlight} type="content" />
    </View>
    <View cls="ph3">
      <View cls="flx-i mt3 br2 oh">
        <View cls="flx-row">
          <View cls="bg-white">
            <Image
              cls="wd-100 hg-100"
              source={{
                uri: item && item.featureImages && item.featureImages[0]
              }}
              resizeMode="stretch"
            />
          </View>
          <View cls="flx-i ph3 jcc">
            {item.categories
            && item.categories.length > 0
            && item.categories[0].name ? (
              <Text cls="ff-sfSb fs-16 commonGrey mb2">
                {item.categories[0].name}
              </Text>
              ) : null}

            <EmphasisTextComp
              text={item.highlight}
              type="title"
              postTitle={item.title}
            />
          </View>
          <View />
        </View>
      </View>
    </View>
    <View cls="mt2">
      <NewsInteractiveSection
        id={item.id}
        onNewsDetailsShouldDisplay={onPress}
      />
    </View>
  </DebounceTouch>
);

const CommonNewWrap = wrap(CommonNew);

const buildEmphasisText = text => {
  let buildComp = null;

  if (!text) {
    return buildComp;
  }

  const emphasisKey = 'GanSongToLichEmphasisKey';
  const emphasisPhases = text && typeof text === 'string' && text.match(/<em>(.*?)<\/em>/g);

  let splitText = text;

  for (const ep of emphasisPhases) {
    splitText = splitText.replace(ep, emphasisKey);
  }

  const stringSplits = splitText.split(emphasisKey);

  buildComp = (
    <Text cls="ff-sfR fs-14" numberOfLines={4}>
      {stringSplits.map((sS, index) => {
        let splitTextFromTag = null;
        if (index < stringSplits.length - 1) {
          splitTextFromTag = /<em>(.*?)<\/em>/g.exec(emphasisPhases[index])[1];
        }
        return (
          <Text key={Math.random(10000)}>
            {sS}
            {splitTextFromTag && (
              <Text cls={fixAndroidBoldCls('fs-15 commonBlack ff-sfSb')}>
                {splitTextFromTag}
              </Text>
            )}
          </Text>
        );
      })}
      ...
    </Text>
  );
  return buildComp;
};

const buildEmphasisTextComp = ({ text, type = 'content', postTitle }) => {
  let buildComp = null;

  const content = text && text.content && buildEmphasisText(text.content);
  const title = text && text.title && buildEmphasisText(text.title);

  if (type === 'content') {
    buildComp = <View>{content}</View>;
  } else if (type === 'title') {
    if (title) {
      buildComp = <View>{title}</View>;
    } else {
      buildComp = (
        <View>
          <Text cls="ff-sfR fs-14" numberOfLines={4}>
            {postTitle}
          </Text>
        </View>
      );
    }
  }

  return buildComp;
};

const EmphasisTextComp = wrap(buildEmphasisTextComp);

const SearchPost = ({ item, onHidePost }) => {
  const { displayType } = item;

  const { saved } = useSelector(state => state.posts[item.id] || { saved: 0 });

  const onPostPress = () => {
    Bootstrap.push({
      component: {
        name: 'LinkedNewsDetails',
        passProps: {
          // shouldRenderAuthor: true,
          shouldLoadFullContent: displayType !== 0,
          id: item.id,
          autoShowKeyboard: true
        }
      }
    });
  };

  return (
    <CommonNew
      item={item}
      onPress={onPostPress}
      saved={saved}
      onHidePost={onHidePost}
    />
  );
};

const HomeSearchPost = wrap(SearchPost);

export default HomeSearchPost;

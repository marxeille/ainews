/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { TextInput, View, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { saveKeyword } from 'AINews/src/store/actions/search';
import { useDispatch } from 'react-redux';
import { wrap } from '@agiletechvn/react-theme';
import DebounceTouch from 'AINews/src/components/common/DebounceTouch';
import images from '../../../assets/images';
import Bootstrap from '../../App/Bootstrap';

const SearchHeader = props => {
  const [key, setKey] = useState(props.searchKey);
  const dispatch = useDispatch();
  const inputRef = useRef();

  const onChangeText = value => {
    setKey(value);
    props.onChange && props.onChange(value);
  };

  const clearText = () => {
    setKey(null);
    inputRef && inputRef.current && inputRef.current.focus();
  };

  const goBack = () => {
    Bootstrap.pop();
  };

  useEffect(() => {
    dispatch(saveKeyword({ keyword: key }));
    props.onChange && props.onChange(key);
  }, []);

  return (
    <View cls="msbh flx-row hg-48 ph3 aic">
      <DebounceTouch cls="pr3" onPress={goBack}>
        <Image cls="flx-i" source={images.back} resizeMode="contain" />
      </DebounceTouch>
      <View cls="flx-row flx-i mv1 bg-paleGray brs-18 hg-36">
        <View cls="jcc aic ml2 pl1">
          <Ionicons name="ios-search" cls="grey" size={24} />
        </View>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          cls="flx-i pl2"
          placeholder="Tìm kiếm..."
          defaultValue={key}
          value={key}
          onChangeText={onChangeText}
          underlineColorAndroid="transparent"
          ref={inputRef}
        />
        {!!key && (
          <DebounceTouch cls="jcc aic ph3" onPress={clearText}>
            <Ionicons name="ios-close-circle" cls="grey" size={24} />
          </DebounceTouch>
        )}
      </View>
    </View>
  );
};

const HomeSearchHeader = wrap(SearchHeader);

export default HomeSearchHeader;

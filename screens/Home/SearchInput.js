/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { TextInput, View, Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import { wrap } from '@agiletechvn/react-theme';
import { searchSuggest } from 'AINews/src/store/APIs/search';
import {
  replaceSearchReducer,
  saveKeyword
} from 'AINews/src/store/actions/search';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DebounceTouch from 'AINews/src/components/common/DebounceTouch';
import Bootstrap from '../../App/Bootstrap';

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

const Input = props => {
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();

  const clearInput = () => {
    setValue(null);
    props.inputRef && props.inputRef.current && props.inputRef.current.focus();
  };

  const onChangeText = input => {
    setValue(input);
  };

  const onSubmitEditing = ({ nativeEvent: { text } }) => {
    setValue(text);
    dispatch(saveKeyword({ keyword: text }));
    Bootstrap.push({
      component: {
        name: 'HomeSearch',
        passProps: {
          searchKey: text
        }
      }
    });
  };

  const hitSlop = {
    top: 8,
    left: 8,
    right: 8,
    bottom: 8
  };

  useEffect(() => {
    const getSuggestion = async () => {
      try {
        dispatch(
          replaceSearchReducer({ isSuggesting: true, error: null, key: value })
        );
        const result = await searchSuggest(value);
        if (result.data) {
          dispatch(
            replaceSearchReducer({ isSuggesting: false, ...result.data })
          );
        }
      } catch (error) {
        dispatch(replaceSearchReducer({ isSuggesting: false, error }));
      }
    };

    const timer = setTimeout(getSuggestion, 500);

    return () => clearTimeout(timer);
  }, [dispatch, value]);

  if (props.componentRef) {
    props.componentRef.current = {
      clearInput
    };
  }

  return (
    <View cls="flx-i flx-row jcc aic">
      <Animated.View cls="jcc aic" style={{ width: props.searchIconValue }}>
        <AnimatedIcon
          name="ios-search"
          cls="grey"
          style={{
            fontSize: props.searchIconValue,
            opacity: props.searchIconOpacityValue
          }}
        />
      </Animated.View>
      <TextInput
        {...props}
        onChangeText={onChangeText}
        value={value}
        onSubmitEditing={onSubmitEditing}
        ref={props.inputRef}
      />
      {value ? (
        <DebounceTouch cls="jcc aic ph2" hitSlop={hitSlop} onPress={clearInput}>
          <Ionicons name="ios-close-circle" size={24} cls="grey jcc aic" />
        </DebounceTouch>
      ) : null}
    </View>
  );
};

const SearchInput = wrap(Input);

export default wrap(SearchInput);

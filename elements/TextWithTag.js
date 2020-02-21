import React from 'react';
import { Text } from 'react-native';
import { wrap } from '@agiletechvn/react-theme';

type Props = {
  text: String,
  onTagPress?: String => void
};

const TextWithTag = (props: Props) => {
  const { text, onTagPress, ...rest } = props;

  function parse(rawText) {
    // const rawArray = rawText.split(/@\("(.+)","([a-z,0-9,-]+)"\)/g);
    const rawArray = rawText.split(/@\("(.+)","(.+)"\)/g);
    const result = [];
    for (let i = 0; i < rawArray.length; i += 3) {
      if (rawArray[i]) {
        result.push({ text: rawArray[i], type: 'plain' });
      }
      if (i + 2 <= rawArray.length) {
        result.push({
          text: rawArray[i + 1],
          type: 'tag',
          id: rawArray[i + 2]
        });
      }
    }
    return result;
  }

  function renderText() {
    const parsedText = parse(text);
    return parsedText.map((pt, id) => {
      if (pt.type === 'plain') {
        return <Text key={id}>{pt.text}</Text>;
      }
      if (pt.type === 'tag') {
        return (
          <Text key={id} cls="blue" onPress={() => onTagPress(pt.id)}>
            {pt.text}
          </Text>
        );
      }
      return null;
    });
  }

  return <Text {...rest}>{renderText()}</Text>;
};
TextWithTag.defaultProps = {
  onTagPress: () => {}
};

export default wrap(TextWithTag);

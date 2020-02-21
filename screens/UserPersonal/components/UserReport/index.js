import React, { memo, useRef, useMemo, useState, useEffect } from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Alert,
  ActivityIndicator
} from 'react-native';
import { wrap } from '@agiletechvn/react-theme';
import ActionSheet from 'react-native-actionsheet';
import images from 'AINews/assets/images';
import { t } from 'AINews/src/utils/LocalizationUtils';

const UsersFilters = ['Báo cáo người này', 'Chặn người này'];

function UserReport() {
  const actionSheetRef = useRef();
  const [loading, setLoading] = useState(false);
  const timer = useRef(null);

  useEffect(
    () => () => {
      clearInterval(timer.current);
    },
    []
  );

  const options = useMemo(() => {
    const filters = UsersFilters.map(option => option);
    filters.push(t('common.close'));
    return filters;
  }, []);

  function onReport() {
    if (actionSheetRef.current) {
      actionSheetRef.current.show();
    }
  }

  function setTimeOutLoading() {
    setLoading(true);
    timer.current = setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Thông báo',
        'Gửi thông tin thành công đến hệ thống Bảng Tin',
        [
          {
            text: t('common.OK')
          }
        ]
      );
    }, 120);
  }

  function onUsersFilterItemSelect(index) {
    switch (index) {
      case 0:
        Alert.alert(
          'Bạn có chắc chắn muốn báo cáo người này?',
          'Báo cáo của bạn sẽ được gửi đến ban quản trị hệ thống Bảng Tin',
          [
            {
              text: t('common.OK'),
              onPress: () => {
                setTimeOutLoading();
              }
            }
          ]
        );
        break;
      case 1:
        Alert.alert(
          'Bạn có chắc chắn muốn chặn người này?',
          'Người này sau này sẽ không thể:\n* Xem các bài đăng của bạn\n* Không thể gắn thẻ bạn và các tương tác khác với bạn',
          [
            {
              text: t('common.OK'),
              onPress: () => {
                setTimeOutLoading();
              }
            }
          ]
        );
        break;
      default:
        break;
    }
  }

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onReport}
        cls="ml1 ph3 flx-row aic"
      >
        <Image cls="wd-24 hg-24" source={images.report} resizeMode="contain" />
        {loading ? (
          <View cls="ml2">
            <ActivityIndicator size="small" />
          </View>
        ) : null}
      </TouchableOpacity>
      <ActionSheet
        ref={actionSheetRef}
        title="Chọn hành động"
        options={options}
        cancelButtonIndex={2}
        onPress={onUsersFilterItemSelect}
      />
    </View>
  );
}

export default memo(wrap(UserReport));

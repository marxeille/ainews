import React from "react";
import { View, WebView, ActivityIndicator } from "react-native";
import { wrap } from "@agiletechvn/react-theme";
import colors from "AINews/src/themes/colors";
import images from "AINews/assets/images";

class TermOfUse extends React.Component {
  static options = () => ({
    topBar: {
      title: {
        text: "Điều khoản sử dụng"
      },
      backButton: {
        icon: images.back,
        color: colors.commonGrey
      }
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  onLoadStart = () => {
    this.setState({ loading: true });
  };

  onLoadEnd = () => {
    this.setState({ loading: false });
  };

  render() {
    const { loading } = this.state;
    return (
      <View cls="flx-i">
        {loading ? (
          <View cls="absolute top-0 left-0 right-0 bottom-0 aic jcc zIndexFn-1">
            <ActivityIndicator size="large" />
          </View>
        ) : null}
        <WebView
          source={{ uri: "https://beta.bangtin.vn/terms" }}
          cls="flx-i"
          useWebKit
          onLoadStart={this.onLoadStart}
          onLoadEnd={this.onLoadEnd}
        />
      </View>
    );
  }
}

export default wrap(TermOfUse);

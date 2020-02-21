/**
 * @flow
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';
import Interactable, {
  ISnapEvent,
  IStopEvent,
  IDragEvent
} from 'react-native-interactable';
import StaticContainer from './StaticContainer';

type Props = {
  children: Array<React.Component> | Array<React.PureComponent>,
  initialPage?: number,
  tabWidth?: number,
  renderTabBar?:
    | ((props: TabBarProps) => React.Component)
    | ((props: TabBarProps) => React.PureComponent)
    | null,
  scrollWithoutAnimation?: boolean,
  prerenderingSiblingsNumber?: number,
  animatedNativeDriver?: boolean,
  onSnap?: (event: ISnapEvent) => void | null,
  onSnapStart?: (event: ISnapEvent) => void | null,
  onStop?: (event: IStopEvent) => void | null,
  onDrag?: (event: IDragEvent) => void | null
};

type TabBarProps = {
  goToPage?: (pageNumber: number) => void,
  activeTab?: number,
  scrollValue?: Animated.Value,
  containerWidth?: number
};

/**
 * https://github.com/CharlesStover/use-force-update
 */
function useForceUpdate() {
  const [value, set] = useState(true); //boolean state
  return () => set(!value); // toggle the state to force render
}

function InteractableTabView(props: Props) {
  const {
    children,
    initialPage,
    tabWidth,
    renderTabBar,
    scrollWithoutAnimation,
    prerenderingSiblingsNumber,
    animatedNativeDriver,
    onSnap,
    onSnapStart,
    onStop,
    onDrag
  } = props;

  const savedChildren = useRef(children);
  const snapPoints = useRef(
    children.map((child, index) => ({
      x: index * tabWidth * -1
    }))
  );
  const scrollValue = useRef(new Animated.Value(0));
  const interactableViewRef = useRef();
  const [activeTab, setActiveTab] = useState(0);
  const visitedTabs = useRef({ [initialPage]: true });
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    if (savedChildren.current !== children) {
      const shouldResetScrollPosition = savedChildren.current.length === children.length;
      snapPoints.current = children.map((child, index) => ({
        x: index * tabWidth * -1
      }));
      savedChildren.current = children;
      forceUpdate();
      if (shouldResetScrollPosition) {
        goToPage(0);
      }
    }
  }, [children, tabWidth, forceUpdate, goToPage]);

  function _shouldRenderTab(index) {
    return (
      index < activeTab + prerenderingSiblingsNumber + 1
      && index > activeTab - prerenderingSiblingsNumber - 1
    );
  }

  function _tabVisited(index) {
    // eslint-disable-next-line no-prototype-builtins
    return visitedTabs.current.hasOwnProperty(index);
  }

  function _renderScrollableContent() {
    return children.map((child, index) => (
      <StaticContainer key={index} shouldUpdated={_shouldRenderTab(index)}>
        <View style={{ width: tabWidth }}>
          {_tabVisited(index) ? child : <View />}
        </View>
      </StaticContainer>
    ));
  }

  function _onSnapStart(event) {
    const { index } = event.nativeEvent;
    setActiveTab(index);
    visitedTabs.current[index] = true;

    if (onSnapStart) {
      onSnapStart(event);
    }
  }

  const goToPage = useCallback(
    (pageNumber: number) => {
      if (!interactableViewRef.current) {
        return;
      }

      if (scrollWithoutAnimation) {
        interactableViewRef.current.changePosition({
          x: -pageNumber * tabWidth
        });
        return;
      }

      interactableViewRef.current.snapTo({
        index: pageNumber
      });

      setActiveTab(pageNumber);
      visitedTabs.current[pageNumber] = true;
    },
    [tabWidth, scrollWithoutAnimation]
  );

  return (
    <View style={styles.container}>
      {renderTabBar
        ? renderTabBar({
          goToPage,
          activeTab,
          scrollValue: scrollValue.current,
          containerWidth: tabWidth
        })
        : null}
      <Interactable.View
        frictionAreas={[{ damping: 0.8 }]}
        ref={interactableViewRef}
        animatedNativeDriver={animatedNativeDriver}
        horizontalOnly
        animatedValueX={scrollValue.current}
        boundaries={{
          left: snapPoints.current[savedChildren.current.length - 1].x,
          right: snapPoints.current[0].x
        }}
        onSnap={onSnap}
        onSnapStart={_onSnapStart}
        onStop={onStop}
        onDrag={onDrag}
        initialPosition={{ x: snapPoints.current[0].x }}
        snapPoints={snapPoints.current}
        style={[
          styles.interactableArea,
          { width: savedChildren.current.length * tabWidth }
        ]}
      >
        {_renderScrollableContent()}
      </Interactable.View>
    </View>
  );
}

InteractableTabView.defaultProps = {
  initialPage: 0,
  tabWidth: Dimensions.get('window').width,
  renderTabBar: null,
  scrollWithoutAnimation: false,
  prerenderingSiblingsNumber: 0,
  animatedNativeDriver: true,
  onSnap: null,
  onSnapStart: null,
  onStop: null,
  onDrag: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  interactableArea: {
    flex: 1,
    flexDirection: 'row'
  }
});

export default InteractableTabView;

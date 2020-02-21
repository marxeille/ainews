import * as React from 'react';

export { ISnapEvent, IStopEvent, IDragEvent } from 'react-native-interactable';

export type TabBarProps<T = {}> = T & {
  goToPage?: (pageNumber: number) => void;
  activeTab?: number;
  scrollValue?: Animated.Value;
  containerWidth?: number;
};

export interface InteractableTabViewProps
  extends React.Props<InteractableTabView> {
  tabWidth: number;
  renderTabBar?: ((props: TabBarProps) => JSX.Element) | false;
  scrollWithoutAnimation?: boolean;
  animatedNativeDriver?: boolean;
  onSnap?: (event: ISnapEvent) => void;
  onSnapStart?: (event: ISnapEvent) => void;
  onStop?: (event: IStopEvent) => void;
  onDrag?: (event: IDragEvent) => void;
}

export default function InteractableTabView(props: InteractableTabViewProps);

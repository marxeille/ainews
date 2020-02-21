import { useContext } from 'react';
import { Navigation, Layout } from 'react-native-navigation';
import NavigationContext from 'AINews/src/components/common/NavigationContext';

const useNavigation = () => {
  const { componentId } = useContext(NavigationContext);

  function push(layout: Layout) {
    return Navigation.push(componentId, layout);
  }

  function pop() {
    return Navigation.pop(componentId);
  }

  function popTo(poppedToComponentId: String) {
    return Navigation.popTo(poppedToComponentId);
  }

  function popToRoot() {
    return Navigation.popToRoot(componentId);
  }

  return {
    componentId,
    push,
    pop,
    popTo,
    popToRoot
  };
};

export default useNavigation;

import { Navigation, Layout } from 'react-native-navigation';

import images from '../../assets/images';
import colors from '../themes/colors';
import { light, night } from '../themes/modes';
import { store } from './index';
import { buildTheme } from '../themes/config-theme';
import { sleep } from '../utils/trivia';

const ROOT_STACK_ID = 'root_stack';

// function startAppWithDevScreen() {
//   Navigation.setRoot({
//     root: {
//       stack: {
//         children: [
//           {
//             component: {
//               name: 'Login',
//               options: {
//                 topBar: {
//                   visible: false,
//                   height: 0
//                 }
//               }
//             }
//           }
//         ]
//       }
//     }
//   });
// }

function startAppWithSelectCategoryScreen() {
  Navigation.setDefaultOptions({
    layout: {
      orientation: ['portrait'],
      backgroundColor: 'white'
    },
    topBar: {
      visible: false,
      height: 0
    }
  });
  Navigation.setRoot({
    root: {
      component: {
        name: 'CategoriesSelect'
      }
    }
  });
}

function startAppWithHomeScreen() {
  Navigation.setDefaultOptions({
    layout: {
      orientation: ['portrait'],
      backgroundColor: 'white'
    },
    statusBar: {
      visible: true,
      style: 'dark',
      backgroundColor: 'white'
    },
    bottomTab: {
      textColor: colors.tabBarGrey,
      fontFamily: 'SFProText-Bold',
      selectedTextColor: colors.reddish
    }
  });
  Navigation.setRoot({
    root: {
      stack: {
        id: ROOT_STACK_ID,
        children: [
          {
            bottomTabs: {
              children: [
                // {
                //   ...devStack
                // },
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: 'Home',
                          options: {
                            bottomTab: {
                              icon: images.home,
                              selectedIcon: images.homeSelected,
                              text: 'Tin tức'
                            },
                            statusBar: {
                              visible: true,
                              style: 'dark',
                              backgroundColor: 'white'
                            }
                          }
                        }
                      }
                    ]
                  }
                },

                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: 'Follows',
                          options: {
                            topBar: {
                              visible: false,
                              height: 0
                            },
                            bottomTab: {
                              icon: images.followingOff,
                              selectedIcon: images.followingOn,
                              text: 'Theo dõi'
                            },
                            statusBar: {
                              visible: true,
                              style: 'dark',
                              backgroundColor: 'white'
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: 'Notification',
                          options: {
                            topBar: {
                              visible: false,
                              height: 0
                            },
                            bottomTab: {
                              icon: images.notiOff,
                              selectedIcon: images.notiOn,
                              text: 'Thông báo'
                            },
                            statusBar: {
                              visible: true,
                              style: 'dark',
                              backgroundColor: 'white'
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: 'UserPersonal',
                          options: {
                            topBar: {
                              visible: false,
                              height: 0
                            },
                            bottomTab: {
                              icon: images.personal,
                              selectedIcon: images.personalSelected,
                              text: 'Cá nhân'
                            },
                            statusBar: {
                              visible: true,
                              style: 'dark',
                              backgroundColor: 'white'
                            }
                          }
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  });
}

function setDefaultHeader(backgroundColor, titleColor) {
  return Navigation.setDefaultOptions({
    topBar: {
      background: {
        color: backgroundColor
      },
      title: {
        color: titleColor
      }
    },
    statusBar: {
      visible: true,
      style: 'dark',
      backgroundColor: 'white'
    }
  });
}

class Bootstrap {
  static isInStartupScreen = false;

  static async startApp(isForceRebuildTheme = false) {
    // return startAppWithDevScreen();

    try {
      if (store?.getState()?.themes) {
        if (isForceRebuildTheme) {
          buildTheme(store.getState().themes.nightMode);
        }

        if (store.getState().themes.nightMode) {
          setDefaultHeader(night.primary, night.secondary);
        } else {
          setDefaultHeader(light.primary, light.secondary);
        }
      } else {
        if (isForceRebuildTheme) {
          buildTheme(false);
        }

        setDefaultHeader(light.primary, light.secondary);
      }

      if (store?.getState()?.categories?.categories?.length > 0) {
        Bootstrap.isInStartupScreen = false;
        return startAppWithHomeScreen();
      }
      Bootstrap.isInStartupScreen = true;
      return startAppWithSelectCategoryScreen();
    } catch (err) {
      Bootstrap.isInStartupScreen = true;
      return startAppWithSelectCategoryScreen();
    }
  }

  static async push(layout: Layout) {
    return Navigation.push(ROOT_STACK_ID, layout);
  }

  static async pop() {
    return Navigation.pop(ROOT_STACK_ID);
  }

  static async popTo(componentId: String) {
    return Navigation.popTo(componentId);
  }

  static async popToRoot() {
    return Navigation.popToRoot(ROOT_STACK_ID);
  }

  static async showToast(layout: Layout, duration = 500) {
    const componentId = await Navigation.showOverlay(layout);
    await sleep(duration);
    return Navigation.dismissOverlay(componentId);
  }

  static async showLoadingOverlay(text: String) {
    return Navigation.showOverlay({
      component: {
        name: 'Loading',
        passProps: {
          text
        }
      }
    });
  }

  static async dismissLoadingOverlay(overlayId) {
    return Navigation.dismissOverlay(overlayId);
  }
}

export default Bootstrap;

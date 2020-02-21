import { StyleSheet, Platform } from 'react-native';
import {
  getStatusBarHeight,
  getBottomSpace
} from 'react-native-iphone-x-helper';

export default {
  fn: {
    bw: val => ({
      borderWidth: Number(val)
    }),
    oh: () => ({
      overflow: 'hidden'
    }),
    wd: val => ({
      width: Number(val)
    }),
    hg: val => ({
      height: Number(val)
    }),
    maxhg: val => ({
      maxHeight: Number(val)
    }),
    maxwd: val => ({
      maxWidth: Number(val)
    }),
    sz: val => ({
      width: Number(val),
      height: Number(val)
    }),
    tc: val => ({
      color: val
    }),
    z: val => ({
      zIndex: Number(val)
    }),
    btw: val => ({
      borderTopWidth: Number(val)
    }),
    bbw: val => ({
      borderBottomWidth: Number(val)
    }),
    blw: val => ({
      borderLeftWidth: Number(val)
    }),
    brw: val => ({
      borderRightWidth: Number(val)
    }),
    btc: val => ({
      borderTopColor: val
    }),
    bbc: val => ({
      borderBottomColor: val
    }),
    blc: val => ({
      borderLeftColor: val
    }),
    brc: val => ({
      borderRightColor: val
    }),
    brs: val => ({
      borderRadius: Number(val)
    }),
    bs: val => ({
      borderStyle: val
    }),
    pan: val => ({
      padding: Number(val)
    }),
    phn: val => ({
      paddingHorizontal: Number(val)
    }),
    pvn: val => ({
      paddingVertical: Number(val)
    }),
    ptn: val => ({
      paddingTop: Number(val)
    }),
    pbn: val => ({
      paddingBottom: Number(val)
    }),
    pln: val => ({
      paddingLeft: Number(val)
    }),
    prn: val => ({
      paddingRight: Number(val)
    }),
    man: val => ({
      margin: Number(val)
    }),
    mhn: val => ({
      marginHorizontal: Number(val)
    }),
    mhnNeg: val => ({
      marginHorizontal: -Number(val)
    }),
    mvn: val => ({
      marginVertical: Number(val)
    }),
    mtn: val => ({
      marginTop: Number(val)
    }),
    mbn: val => ({
      marginBottom: Number(val)
    }),
    mln: val => ({
      marginLeft: Number(val)
    }),
    mrn: val => ({
      marginRight: Number(val)
    }),
    fs: val => ({
      fontSize: Number(val)
    }),
    bgc: val => ({
      backgroundColor: val
    }),
    o: val => ({
      opacity: Number(val)
    }),
    pHg: val => ({
      height: `${Number(val)}%`
    }),
    pWd: val => ({
      width: `${Number(val)}%`
    }),
    circleFn: val => ({
      width: Number(val),
      height: Number(val),
      borderRadius: Number(val) / 2
    }),
    squareFn: val => ({
      width: Number(val),
      height: Number(val),
      borderRadius: Number(val) / 2
    }),
    fullView: () => ({
      width: '100%',
      height: '100%'
    }),
    fullWidth: () => ({
      width: '100%'
    }),
    fullHeight: () => ({
      height: '100%'
    }),
    bwh: () => ({
      borderWidth: StyleSheet.hairlineWidth
    }),
    psbh: () => ({
      paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0
    }),
    msbh: () => ({
      marginTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0
    }),
    mbx: () => ({
      marginBottom: Platform.OS === 'ios' ? getBottomSpace() : 16
    }),
    tal: input => ({
      textAlign: String(input)
    }),
    lh: value => ({
      lineHeight: Number(value)
    }),
    zIndexFn: value => ({
      zIndex: Number(value)
    })
  }
};

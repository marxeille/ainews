import { FlatListProps } from 'react-native';

// export type SingleOERFlatListProps<T = {}> = T & {
//   componentRef?: React.Ref;
// } & FlatListProps;

export interface SingleOERFlatListProps
  extends FlatListProps<SingleOERFlatList> {
  componentRef?: React.Ref;
}

export default function SingleOERFlatList(props: SingleOERFlatListProps);

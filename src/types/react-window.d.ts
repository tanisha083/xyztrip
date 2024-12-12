declare module 'react-window' {
    import { ComponentType, ReactNode } from 'react';
  
    interface ListProps {
      height: number;
      itemCount: number;
      itemSize: number;
      width: string | number;
      children: (props: { index: number; style: React.CSSProperties }) => ReactNode; // Add children prop
    }
  
    export const FixedSizeList: ComponentType<ListProps>;
    export const VariableSizeList: ComponentType<ListProps>;
    export const List: ComponentType<ListProps>;
    export const FixedSizeGrid: ComponentType<ListProps>;
    export const VariableSizeGrid: ComponentType<ListProps>;
    export const Grid: ComponentType<ListProps>;
  }
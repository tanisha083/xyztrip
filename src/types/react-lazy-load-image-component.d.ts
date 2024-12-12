declare module 'react-lazy-load-image-component' {
  import { ComponentType, ImgHTMLAttributes, PropsWithChildren } from 'react';

  export const LazyLoadImage: ComponentType<ImgHTMLAttributes<HTMLImageElement> & { effect?: string }>;
  export const LazyLoadComponent: ComponentType<PropsWithChildren<unknown>>;
}

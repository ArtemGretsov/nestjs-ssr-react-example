import React, { useEffect } from 'react';

export const useEffectExceptOnMount = (effect: () => any, dependencies: any[]): void => {
  const mounted = React.useRef(false);

  useEffect(() => {
    if (mounted.current) {
      const unmount = effect();

      return () => unmount && unmount();
    }

    mounted.current = true;

    return undefined;
  }, dependencies);

  React.useEffect(() => () => { mounted.current = false; }, []);
};

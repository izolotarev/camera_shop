import { useEffect } from 'react';

const useChangeBodyClass = (isPopupActive: boolean ) => {

  useEffect(() => {
    if (isPopupActive) {
      document.body.classList.add('scroll-lock');
    } else {
      document.body.classList.remove('scroll-lock');
    }
  }, [isPopupActive]);
};

export default useChangeBodyClass;

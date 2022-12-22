import { useEffect } from 'react';
import { SCROLL_LOCK_BODY_CLASS } from '../const/const';

const useChangeBodyClass = (isPopupActive: boolean ) => {

  useEffect(() => {
    if (isPopupActive) {
      document.body.classList.add(SCROLL_LOCK_BODY_CLASS);
    } else {
      document.body.classList.remove(SCROLL_LOCK_BODY_CLASS);
    }
  }, [isPopupActive]);
};

export default useChangeBodyClass;

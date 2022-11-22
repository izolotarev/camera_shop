import { useCallback, useEffect } from 'react';

const useTrapFocus = (isPopupActive: boolean ) => {

  const isElementInList = (arr:NodeListOf<Element>, element: HTMLElement | null): boolean => {
    let isElemInList = false;
    arr.forEach((e) => {
      if (element === e) {
        isElemInList = true;
      }
    });
    return isElemInList;
  };

  const handleFocus = useCallback((evt: KeyboardEvent) => {
    const isTabPressed = (evt.key === 'Tab');

    if (!isTabPressed) {
      return;
    }

    const modal = document.querySelector('.modal.is-active');
    const focusableEls = modal?.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
    if (!focusableEls) { return; }

    const firstFocusableEl = focusableEls[0] as HTMLElement | null;
    const lastFocusableEl = focusableEls[focusableEls.length - 1] as HTMLElement | null;

    const activeElem = document.activeElement as HTMLElement | null;

    if (isElementInList(focusableEls, activeElem)) {
      if ( evt.shiftKey ) /* shift + tab */ {
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl?.focus();
          evt.preventDefault();
        }
      } else /* tab */ {
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl?.focus();
          evt.preventDefault();
        }
      }
    } else {
      firstFocusableEl?.focus();
      evt.preventDefault();
    }
  }, []);

  useEffect(() => {
    if (isPopupActive) {
      const activeElem = document.activeElement as HTMLElement | null;
      activeElem?.blur();

      document.addEventListener('keydown', handleFocus, false);
    } else {
      document.removeEventListener('keydown', handleFocus, false);
    }
  }, [handleFocus, isPopupActive]);
};

export default useTrapFocus;

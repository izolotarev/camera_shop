import { useCallback, useEffect } from 'react';

const useEscapeKey = (escHandler: () => void ) => {
  const handleEscapeKey = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      escHandler();
    }
  }, [escHandler]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey, false);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey, false);
    };
  }, [handleEscapeKey]);
};

export default useEscapeKey;

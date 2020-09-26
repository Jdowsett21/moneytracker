import { useRef, useState, useEffect } from 'react';

export const useHover = () => {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);

      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    }

    // If we didn't set up any listeners, we won't need to unsubscribe from anything.
    return () => {};
  }, [ref]); // Ensure we remove and re-add the listeners if and only if the ref changes.

  return [ref, value];
};

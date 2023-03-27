import { useEffect, useState } from 'react';

/**
 * This hook is used to fetch additional links to be displayed (it is a mock)
 * @returns {Array} Array of objects with label and url properties
 */
export const useAdditionalLinks = () => {
  const [links, setLinks] = useState<
    {
      label: string;
      url: string;
    }[]
  >([]);

  useEffect(() => {
    Promise.resolve([{ label: 'Luca', url: '/morriconeluca' }]).then(setLinks);
  }, []);

  return links;
};

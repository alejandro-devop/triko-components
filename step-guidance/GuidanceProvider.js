import React, {useState} from 'react';

export const GuideContext = React.createContext({
  guides: [],
});

const ContextProvider = GuideContext.Provider;

/**
 * This  provider  allows to handle small   guides or user explanation.
 * @version 1.0.0
 * @param children
 * @returns {*}
 * @constructor
 */
const GuidanceProvider = ({children}) => {
  const [guides, setGuides] = useState({});
  const [currentKey, setCurrentKey] = useState('');

  /**
   * This function add new guides to the guides stack.
   * @param key
   * @param steps {title, description}
   */
  const addGuides = (key, steps) => {
    const newGuides = {
      ...guides,
      [key]: steps,
    };
    setGuides(newGuides);
    const [firstKey] = Object.keys(newGuides);
    if (!guides[firstKey]) {
      setCurrentKey(firstKey);
    }
  };

  const steps = guides[currentKey] || [];

  /**
   * This function removes the first item in the guides stack.
   */
  const handlePop = () => {
    const newGuides = {...guides};
    delete newGuides[currentKey];
    const [firstKey] = Object.keys(newGuides);
    if (firstKey) {
      // The delay is used to avoid the guide to disappear before the last animation is done.
      setTimeout(() => {
        setCurrentKey(firstKey);
      }, 1000);
    } else {
      setCurrentKey(null);
    }
    setGuides(newGuides);
  };

  return (
    <ContextProvider
      value={{
        steps,
        currentKey,
        addGuides,
        handlePop,
      }}>
      {children}
    </ContextProvider>
  );
};

export default GuidanceProvider;

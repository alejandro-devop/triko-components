import React from 'react';
import useSession from 'hooks/useSession';
import {ContextProvider} from './TranslationContext';
import TranslationRemote from './TranslationRemote';

/**
 * This component allows to get fetch determine whether to fetch the dictionary from the
 * remote source or the session storage.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} param0
 */
const TranslationProvider = ({children}) => {
  const {stack: storedDictionary} = useSession(({dictionary}) => dictionary);
  // const remote = !storedDictionary;
  const remote = true;
  // this state will help us to check if the dictionary was loaded.
  return (
    <>
      {remote ? (
        <TranslationRemote>
          {(dictionary) => (
            <ContextProvider value={dictionary}>{children}</ContextProvider>
          )}
        </TranslationRemote>
      ) : (
        <ContextProvider value={storedDictionary}>{children}</ContextProvider>
      )}
    </>
  );
};

export default TranslationProvider;

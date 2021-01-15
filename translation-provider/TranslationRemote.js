import React, {useState} from 'react';
import useSession from 'hooks/useSession';
import {useQuery} from '@apollo/react-hooks';
import {TRANSLATION_GROUP} from 'react-native-dotenv';
import {GET_TRANSLATIONS} from './queries';
import messages from './messages';
import PageError from './page-error';
import LoaderScreen from 'components/base/loaders/LoaderScreen';

/**
 * This Component allows to fetch the translation from a remote source.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} param0
 */
const TranslationRemote = ({children}) => {
  const {stack = {}, setAll} = useSession();
  const {locale = 'en', region: regionCode = 'en-US', regionId} = stack;
  const [stored, setStored] = useState(false);
  const {loading, error, data: response} = useQuery(GET_TRANSLATIONS, {
    variables: {locale, group: TRANSLATION_GROUP, regionCode},
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
    },
    pollInterval: 15000,
  });
  if (loading) {
    return (
      <LoaderScreen
        text={messages[locale] ? messages[locale].loading : messages.en.loading}
      />
    );
  }

  const errorMessage = (
    <PageError
      icon="globe-americas"
      message={
        messages[locale]
          ? messages[locale].loadingRegion
          : messages.en.loadingRegion
      }
    />
  );

  if (error) {
    return errorMessage;
  }
  const {dictionary = {}, region: regionInfo = []} = response || {};
  const {translation = {}} = dictionary;
  const [region = {}] = regionInfo;
  let dictionaryData = {};
  try {
    dictionaryData = JSON.parse(translation);
  } catch (err) {
    error('Error parsing the dictionary Code: [TK-00001]');
    console.err('Error while parsing dictionary', err);
    return errorMessage;
  }

  if (!stored) {
    setAll({
      dictionary: dictionaryData,
      region: regionCode || region.code,
      regionId: regionId || region.id,
    });
    setStored(true);
  }

  return children(dictionaryData);
};

export default TranslationRemote;

import {useState} from 'react';
import RNGooglePlaces from 'react-native-google-places';
import {useSession} from 'hooks/index';
import {isEmpty} from 'shared/utils/functions';

const useGetSuggestions = (options = {}) => {
  const {minChars = 4, queryPrepend = ''} = options;
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    stack: {countryCode},
  } = useSession();
  const getSuggestions = async query => {
    if (query.length < minChars) {
      setSuggestions([]);
      return null;
    }
    try {
      let matches = await RNGooglePlaces.getAutocompletePredictions(
        queryPrepend ? `${queryPrepend}, ${query}` : query,
        {
          types: ['geocode', 'street_address'],
          country: countryCode,
        },
      );
      const suggestedAddresses = matches
        .filter(item => !isEmpty(item.primaryText))
        .map(item => ({...item}));
      setSuggestions(suggestedAddresses);
      setLoading(false);
    } catch (err) {}
  };
  return {
    getSuggestions,
    loading,
    suggestions,
  };
};

export default useGetSuggestions;

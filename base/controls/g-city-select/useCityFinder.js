import {useState} from 'react';
import RNGooglePlaces from 'react-native-google-places';
import removeAccents from 'remove-accents';
import {useSession} from 'hooks/index';

const useCityFinder = () => {
  const [cities, setCities] = useState([]);
  const {
    stack: {countryCode},
  } = useSession();
  const findCities = async query => {
    const results = await RNGooglePlaces.getAutocompletePredictions(query, {
      type: 'cities',
      country: countryCode,
    });
    const processedResults = results.reduce((resultArr, currentItem) => {
      const primary = removeAccents(currentItem.primaryText);
      const exp = new RegExp(`(${primary}|${currentItem.primaryText}), `, 'g');
      const secondary = currentItem.secondaryText.replace(exp, '');
      const name = `${primary}, ${secondary}`;
      if (!resultArr.includes(name)) {
        resultArr.push(name);
      }
      return resultArr;
    }, []);
    setCities(processedResults);
  };
  return {
    cities,
    findCities,
  };
};

export default useCityFinder;

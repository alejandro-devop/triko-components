import {useState} from 'react';
import RNGooglePlaces from 'react-native-google-places';
import removeAccents from 'remove-accents';
import {useSession} from 'hooks/index';

/**
 * This hook allows to find a city using its name and the google api
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @returns {{cities: *, findCities: *, loading: *}}
 */
const useCityFinder = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    stack: {countryCode},
  } = useSession();
  const findCities = async (query) => {
    setLoading(true);
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
    setLoading(false);
    setCities(processedResults);
  };
  return {
    cities,
    findCities,
    loading,
  };
};

export default useCityFinder;

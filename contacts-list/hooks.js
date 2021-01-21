import {useState, useEffect, useMemo} from 'react';
import Contacts from 'react-native-contacts';
import {isEmpty} from 'shared/utils/functions';

/**
 * Lists and filters the user phone contacts.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param options
 * @returns {{total: *, displaying: (*), contacts: *}}
 */
export const useContacts = (options = {}) => {
  const {page = 0, size = 40, filter} = options;
  const [contactsList, setContactsList] = useState([]);
  const getContacts = async () => {
    const list = await Contacts.getAll();
    setContactsList(list);
  };
  useEffect(() => {
    getContacts();
  }, []);

  const formatNumber = (numbers = []) =>
    (!isEmpty(numbers[0]) ? numbers[0].number : '').replace(
      new RegExp('[\\(\\)\\s-]', 'g'),
      '',
    );
  const contacts = useMemo(() => {
    let filteredList = contactsList
      .map(
        ({
          recordID,
          emailAddresses,
          familyName,
          givenName,
          hasThumbnail,
          phoneNumbers,
          thumbnailPath,
        }) => ({
          id: recordID,
          lastName: familyName,
          firstName: givenName,
          emails: emailAddresses,
          phones: phoneNumbers,
          phone: formatNumber(phoneNumbers),
          hasThumbnail,
          thumbnailPath,
        }),
      )
      .filter(
        ({firstName, lastName, phones}) =>
          !(isEmpty(firstName) && isEmpty(lastName)) && phones.length > 0,
      );
    if (!isEmpty(filter)) {
      filteredList = filteredList.filter((item) => {
        const regExp = new RegExp(`.*(${filter.toLowerCase()}).*`, 'g');
        const compare = `${item.firstName.toLowerCase()} ${item.lastName.toLowerCase()}`;
        return compare.match(regExp);
      });
    }
    return filteredList;
  }, [contactsList, filter]);
  const recordsVisible = (page + 1) * size;
  let contactsToDisplay = contacts.slice(0, (page + 1) * size);
  const total = contacts.length;
  return {
    contacts: contactsToDisplay,
    displaying: recordsVisible > total ? total : recordsVisible,
    total,
  };
};

import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {useStyles} from 'hooks/index';
import styles from './styles';
import {useContacts} from './hooks';
import defaultPhoto from 'assets/avatars/profile-photo.jpg';
import PreImage from 'shared/components/base/pre-image';
import Text from 'shared/components/base/text';
import RadioButton from 'shared/components/base/controls/radio-button';
import Button from 'shared/components/base/buttons/button';
import TextField from 'shared/components/base/controls/text-field';
import useTranslation from 'shared/hooks/use-translate';

/**
 *
 * @returns {*}
 * @constructor
 */
const ContactsList = ({onSelectContacts}) => {
  const [page, setPage] = useState(0);
  const {_t} = useTranslation();
  const [selected, setSelected] = useState([]);
  const [filter, setFilter] = useState('');
  const [classes] = useStyles(styles);
  const {contacts = [], total = 0, displaying = 0} = useContacts({
    page: page,
    view: 20,
    filter,
  });

  const handleFilterChange = ({target: {value}}) => {
    setFilter(value);
  };

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  const handleSelected = (item) => {
    if (selected.includes(item.id)) {
      setSelected(
        selected.filter((selectedItem) => item.id !== selectedItem.id),
      );
    } else {
      setSelected([...selected, item]);
    }
  };
  const selectedIds = selected.map((item) => item.id);

  const handleSelectContacts = () => {
    onSelectContacts(selected);
  };
  return (
    <View style={classes.root}>
      <View style={classes.filterWrapper}>
        <TextField
          primary
          placeholder="contacts_filter_placeholder"
          onChange={handleFilterChange}
          value={filter}
        />
      </View>
      <View style={classes.legendWrapper}>
        <Text replacements={{displaying, total}} style={classes.legendText}>
          my_contacts_pager
        </Text>
      </View>
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent) && displaying < total) {
            setPage(page + 1);
          }
        }}
        scrollEventThrottle={400}>
        {contacts.map((item, key) => (
          <TouchableOpacity
            style={classes.itemWrapper}
            key={`contact-item-${key}`}
            onPress={() => handleSelected(item)}>
            <View style={classes.avatarWrapper}>
              <PreImage
                style={classes.avatar}
                source={
                  item.hasThumbnail ? {uri: item.thumbnailPath} : defaultPhoto
                }
              />
            </View>
            <View style={classes.textWrapper}>
              <Text
                style={
                  classes.textName
                }>{`${item.firstName} ${item.lastName}`}</Text>
              <Text style={classes.textPhone}>{item.phone}</Text>
            </View>
            <View>
              <RadioButton
                onChange={() => handleSelected(item)}
                value={selectedIds.includes(item.id)}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selected.length > 0 && (
        <View style={classes.actions}>
          <Button primary onPress={handleSelectContacts}>
            {_t('select_contacts', {total: selected.length})}
          </Button>
          <Button secondary onPress={() => setSelected([])}>
            {_t('clean_selected')}
          </Button>
        </View>
      )}
    </View>
  );
};

export default ContactsList;

import React, {useState} from 'react';
import {View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import Loader from './Loader';
import styles from './styles';
import {CheckboxField} from '../base/controls';
import Label from 'components/base/label';
import TextArea from '../base/controls/text-area';
import {useQuery} from '@apollo/react-hooks';
import {GET_ASPECTS_TO_IMPROVE} from './queries';
import useSession from 'hooks/useSession';

/**
 * This component allows to list the aspects to improve and renders a picker from them.
 * @author Jako <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client, Triko
 * @param name
 * @param label
 * @param onChange
 * @returns {*}
 * @constructor
 */
const AspectsToImprove = ({name, label, onChange}) => {
  const [comment, setComment] = useState('');
  const {
    stack: {locale},
  } = useSession();
  const [selectedItems, setSelectedItems] = useState([]);
  const {data = {}, loading} = useQuery(GET_ASPECTS_TO_IMPROVE, {
    variables: {
      locale,
    },
  });
  const [classes] = useStyles(styles);
  const aspects =
    data.response && Array.isArray(data.response) ? data.response : [];
  const handleChange = ({
    aspects: aspectsSelected,
    comment: commentChanged,
  }) => {
    if (onChange) {
      onChange({
        target: {
          name,
          aspects: aspectsSelected,
          comment: commentChanged,
        },
      });
    }
  };

  const handleSelect = ({id}) => {
    const selectedItem = selectedItems.find((item) => item === id);
    let newSelected = [...selectedItems];
    if (selectedItem) {
      newSelected = selectedItems.filter((item) => item !== id);
    } else {
      newSelected = [...selectedItems, id];
    }
    setSelectedItems(newSelected);
    handleChange({
      aspects: newSelected,
      comment,
    });
  };

  const handleChangeComment = ({target: {value}}) => {
    setComment(value);
    handleChange({
      aspects: selectedItems,
      comment: value,
    });
  };

  const content = () => (
    <View style={classes.content}>
      {label && <Label>{label}</Label>}
      <View style={classes.listWrapper}>
        {aspects.map((item, key) => (
          <CheckboxField
            key={`checkbox-i-${key}`}
            label={item.name}
            onPress={() => handleSelect(item)}
            value={selectedItems.includes(item.id)}
          />
        ))}
      </View>
      <TextArea
        onChange={handleChangeComment}
        placeholder={'rate_additional_comment'}
      />
    </View>
  );

  return (
    <View style={classes.root}>
      {loading && <Loader />}
      {!loading && content()}
    </View>
  );
};

export default AspectsToImprove;

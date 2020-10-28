import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import useSession from 'hooks/useSession';
import TransportItem from '../transport-item';
import ConfirmSlide from 'components/base/confirm-slide';
import LoaderScreen from 'components/base/loaders/LoaderScreen';
import useStyles from 'hooks/useStyles';
import {useTransportsList, useSaveTransport} from '../hooks';
import styles from '../styles/add.style';

/**
 * This component renders the list with the available transport types.
 * @author Jako <jakop.box@gmail.com>
 * @param toggleAdd
 * @returns {*}
 * @constructor
 */
const AddList = ({toggleAdd}) => {
  const {
    stack: {triko = {}},
  } = useSession();
  const [classes] = useStyles(styles);
  const trikoTransports = triko.transports || [];
  const {transports, loading: loadingList} = useTransportsList();
  const {handleSaveTransport, loading} = useSaveTransport();
  const [selected, setSelected] = useState(
    trikoTransports.map((item) => item.type.id),
  );

  const isSelected = ({id}) => selected.includes(id);

  const handleSelect = (item) => {
    if (selected.includes(item.id)) {
      setSelected(selected.filter((id) => id !== item.id));
    } else {
      setSelected([...selected, item.id]);
    }
  };

  return (
    <>
      <ScrollView>
        <View>
          {transports.map((item, key) => (
            <TransportItem
              key={`transport-item-${key}`}
              transport={{type: item}}
              selected={isSelected(item)}
              onSelect={() => handleSelect(item)}
            />
          ))}
        </View>
      </ScrollView>
      {selected.length > 0 && (
        <ConfirmSlide
          onAccept={() =>
            handleSaveTransport({
              onSaved: () => toggleAdd(),
            })
          }
          onCancel={toggleAdd}
        />
      )}
      {(loading || loadingList) && (
        <View style={classes.loader}>
          <LoaderScreen />
        </View>
      )}
    </>
  );
};

export default AddList;

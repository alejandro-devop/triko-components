import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import useMock from 'hooks/useMock';
import measures from './measures.mocks';
import Label from 'components/base/label';
import useStyles from 'shared/hooks/use-styles';
import Text from 'components/base/text';
import SkeletonLoader from 'shared/components/loaders/skeleton';
import MeasuresList from './MeasuresList';
import classNames from 'shared/utils/classnames';

const MeasuresPicker = ({
  label,
  labelSecondary,
  name: inputName,
  onChange,
  value,
}) => {
  const [classes] = useStyles(styles);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(value || {id: 1, name: 'Uni.'});
  const {loading, data = {}} = useMock(measures, 1000);
  const toggleVisible = () => setVisible(!visible);
  const units = data.response ? data.response : [];
  const handleSelect = item => {
    setSelected(item);
    setVisible(false);
    if (onChange) {
      onChange({
        target: {
          name: inputName,
          value: item,
        },
      });
    }
  };

  const {name} = selected || {};
  useEffect(() => {
    handleSelect({id: 1, name: 'Uni.'});
  }, []);
  return (
    <View style={classes.root}>
      {!loading && (
        <>
          <Label secondary={labelSecondary}>{label}</Label>
          <TouchableOpacity
            activeOpacity={1}
            style={classNames(
              {wrapper: true, wrapperVisible: visible},
              classes,
            )}
            onPress={toggleVisible}>
            {name && (
              <Text
                style={classNames(
                  {
                    valueHolder: true,
                    valueHolderVisible: visible,
                  },
                  classes,
                )}>
                {name}
              </Text>
            )}
          </TouchableOpacity>
          {visible && (
            <MeasuresList
              onSelect={handleSelect}
              options={units}
              selected={selected}
            />
          )}
        </>
      )}
      {loading && (
        <>
          <SkeletonLoader size={'xs'} />
          <SkeletonLoader />
        </>
      )}
    </View>
  );
};

const styles = ({palette}) => ({
  wrapper: {
    borderWidth: 1,
    borderColor: palette.blueLight,
    backgroundColor: palette.blueLight,
    borderRadius: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    paddingVertical: 10,
    zIndex: 100,
    height: 47,
  },
  wrapperVisible: {
    borderColor: palette.blueAccent,
    backgroundColor: palette.blueAccent,
  },
  valueHolder: {
    color: palette.blueDark,
  },
  valueHolderVisible: {
    color: '#FFF',
    fontWeight: '600',
  },
  root: {
    width: 100,
  },
});

export default MeasuresPicker;

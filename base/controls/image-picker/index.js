import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'components/base/icon';
import Text from 'components/base/text';
import useStyles from 'shared/hooks/use-styles';
import classNames from 'shared/utils/classnames';
import useTranslation from 'shared/hooks/use-translate';
import PreImage from 'shared/components/base/pre-image';
import useToggle from 'shared/hooks/use-toggle';
import ImagePickerDialog from './ImagePickerDialog';
import styles from './styles';

const ImagePicker = ({
  icon = 'image',
  label = 'select_image_label',
  onChange,
  secondary,
}) => {
  const [classes] = useStyles(styles);
  const [openDialog, toggleDialog] = useToggle();
  const [photo, setPhoto] = useState(null);
  const {_t} = useTranslation();
  const handleChange = (imageData) => {
    setPhoto(imageData);
    if (onChange) {
      onChange(imageData);
    }
  };
  return (
    <>
      <View style={classes.root}>
        <TouchableOpacity style={classes.button} onPress={() => toggleDialog()}>
          <View
            style={classNames(
              {iconWrapper: true, iconSecondary: secondary},
              classes,
            )}>
            {photo && (
              <PreImage source={{uri: photo.uri}} style={classes.image} />
            )}
            {!photo && <Icon name={icon} style={classes.icon} />}
          </View>
          <View style={classes.textWrapper}>
            <Text style={classes.label}>{_t(label)}</Text>
            {Boolean(photo) && (
              <Text variant="caption" style={classes.uploadedLabel}>
                ({_t('photo_uploaded_text')})
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <ImagePickerDialog
        open={openDialog}
        onClose={() => toggleDialog()}
        onChange={handleChange}
      />
    </>
  );
};

export default ImagePicker;

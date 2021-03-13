import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'components/base/icon';
import Text from 'components/base/text';
import useStyles from 'shared/hooks/use-styles';
import classNames from 'shared/utils/classnames';
import useTranslation from 'shared/hooks/use-translate';
import usePhotoCapture from 'shared/hooks/use-photo-capture';
import {isEmpty} from 'shared/utils/functions';
import PreImage from 'shared/components/base/pre-image';

const ImagePicker = ({
  icon = 'image',
  label = 'select_image_label',
  // clearLabel = 'clear_label',
  onChange,
  secondary,
}) => {
  const [classes] = useStyles(styles);
  const [photo, setPhoto] = useState(null);
  const {_t} = useTranslation();
  const capturePhoto = usePhotoCapture({
    customButtons: !isEmpty(photo)
      ? [{name: 'vu', title: _t('image_picker_view_photo')}]
      : [],
  });

  const handlePhotoCapture = async () => {
    capturePhoto({
      onPhotoSelected: (response) => {
        const {uri, data} = response;
        const imageData = {
          uri,
          data,
        };
        if (uri) {
          setPhoto(imageData);
          if (onChange) {
            onChange(imageData);
          }
        }
      },
    });
  };
  return (
    <View style={classes.root}>
      <TouchableOpacity style={classes.button} onPress={handlePhotoCapture}>
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
  );
};

const styles = ({palette}) => ({
  icon: {
    color: '#FFF',
    fontSize: 45,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    backgroundColor: palette.blue,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  button: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  label: {
    fontWeight: '400',
  },
  root: {},
  textWrapper: {
    justifyContent: 'center',
    marginLeft: 20,
  },
  iconSecondary: {
    backgroundColor: palette.orange,
  },
  uploadedLabel: {},
});

export default ImagePicker;

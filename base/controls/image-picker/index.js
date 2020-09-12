import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'components/base/icon';
import Text from 'components/base/text';
import useStyles from 'shared/hooks/use-styles';
import classNames from 'shared/utils/classnames';
import useTranslation from 'hooks/useTranslation';
import usePhotoCapture from 'shared/hooks/use-photo-capture';
import {isEmpty} from 'shared/utils/functions';

const ImagePicker = ({
  icon = 'image',
  label = 'select_image_label',
  clearLabel = 'clear_label',
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
      onPhotoSelected: response => {
        const {uri, data} = response;
        if (uri) {
          setPhoto({
            uri,
            data,
          });
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
          <Icon name={icon} style={classes.icon} />
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

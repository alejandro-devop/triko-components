import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'shared/components/commons';
import {useStyles} from 'hooks/index';
import styles from './styles';
import palette from 'themes/styles/palette';
import Button from 'shared/components/base/buttons/button';
import Icon from 'shared/components/base/icon';
import Text from 'shared/components/base/text';
import Label from 'shared/components/base/label';
import useNavigate from 'shared/hooks/use-navigate';
import {useSavePost} from './hooks';
import useForm from 'shared/hooks/use-form';
import TextField from 'shared/components/base/controls/text-field';
import RadioButton from 'shared/components/base/controls/radio-button';
import handleChange from 'shared/components/base/commons/handle-change';
import {LoadingCurtain} from 'components/base/dialogs';
import usePhotoCapture from 'shared/hooks/use-photo-capture';
import {isEmpty} from 'shared/utils/functions';
import PreImage from 'shared/components/base/pre-image';
import CircleButton from 'shared/components/base/buttons/circle-button';
import useTranslation from 'shared/hooks/use-translate';
import ImagePicker from 'shared/components/base/controls/image-picker';

/**
 * Component to publish posts by the user.
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param isTriko
 * @returns {*}
 * @constructor
 */
const PostAddComponent = ({isTriko}) => {
  const [classes] = useStyles(styles);
  const [checked, setChecked] = useState(true);
  const [photo, setPhoto] = useState(null);
  const {form = {}, isValid, onChange} = useForm(
    {
      content: '',
      title: '',
    },
    {
      required: ['title', 'content'],
    },
  );
  const capturePhoto = usePhotoCapture({});
  const handleCapturePhoto = async (imageData) => {
    setPhoto(imageData);
  };
  const {_t} = useTranslation();
  const {goBack} = useNavigate();
  const [savePost, loading] = useSavePost({isTriko});
  const {navigation} = useNavigate();
  const handlePostSave = async () => {
    const saved = await savePost({
      isPublic: checked,
      content,
      title,
      photo: !isEmpty(photo) ? `data:image/png;base64,${photo.data}` : null,
    });
    if (saved) {
      navigation.navigate('community');
    } else {
      // Handle error...
    }
  };
  const {content, title} = form;
  const handleRemoveImage = () => setPhoto(null);
  return (
    <ScrollView useKeyboard>
      <View style={classes.root}>
        <Text style={classes.title}>posts_title_label</Text>
        <View style={classes.textRow}>
          <TextField
            onChange={onChange}
            name="title"
            primary
            placeholder={'posts_title_ph'}
            value={title}
          />
        </View>
        <Text style={classes.title}>posts_content_label</Text>
        <View style={classes.textWrapper}>
          <TextInput
            name="content"
            textContentType={'oneTimeCode'}
            returnKeyType="done"
            style={classes.textInput}
            placeholder={_t('what_are_you_thinking')}
            placeholderTextColor={palette.blue}
            multiline
            onChangeText={(newValue) =>
              handleChange(newValue, {name: 'content', onChange})
            }
            value={content}
          />
        </View>
        <View style={classes.otherActions}>
          <Label>post_images</Label>
          <ImagePicker onChange={handleCapturePhoto} />
        </View>
        <Label>post_visibility_label</Label>
        <View style={classes.row}>
          <RadioButton value={checked} onChange={() => setChecked(true)} />
          <Text style={classes.label}>public_post_label</Text>
        </View>
        <View style={classes.row}>
          <RadioButton value={!checked} onChange={() => setChecked(false)} />
          <Text style={classes.label}>public_post_label_friends_only</Text>
        </View>

        <View style={classes.actions}>
          <Button onPress={handlePostSave} disabled={!isValid} primary>
            publish_text
          </Button>
          <Button onPress={goBack} secondary>
            cancel_text
          </Button>
        </View>
      </View>
      {loading && <LoadingCurtain disableModal />}
    </ScrollView>
  );
};

PostAddComponent.propTypes = {
  /**
   * If should save the post for triko or client.
   */
  isTriko: PropTypes.bool,
};

export default PostAddComponent;

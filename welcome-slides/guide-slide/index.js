import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'shared/components/commons';
import useStyles from 'hooks/useStyles';
import Text from 'shared/components/base/text';
import PreImage from 'shared/components/base/pre-image';
import Slide from 'shared/components/anims/Slide';
import logo from 'assets/logos/app_logo_text.png';
import Button from 'shared/components/base/buttons/button';
import useTranslation from 'shared/hooks/use-translate';
import styles from './styles';
import classNames from 'shared/utils/classnames';
import TypeText from '../type-text';
import TypeImage from '../type-image';
import TypeOffset from '../type-offset';

const resolveComponent = ({type}) => {
  switch (type) {
    case 'image':
      return TypeImage;
    case 'offset':
      return TypeOffset;
    default:
      return TypeText;
  }
};

const GuideSlide = ({
  animDuration = 500,
  active,
  isClient,
  slideWidth = 100,
  slide = {},
  onNext,
  final,
}) => {
  const {
    backgroundImage,
    backgroundStyles,
    content = [],
    title,
    titleIcon,
    wrapperStyles = {},
    contentStyles,
  } = slide;
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  return (
    <View style={[classes.root, {width: slideWidth}]}>
      <View style={classes.logoWrapper}>
        <PreImage source={logo} style={classes.logo} />
      </View>
      {active && (
        <Slide
          duration={animDuration}
          direction="bottom"
          style={classNames({main: true, mainClient: isClient}, classes)}>
          {title && (
            <View style={classes.titleWrapper}>
              <Text style={classes.title} variant="subtitle">
                {title}
              </Text>
              {titleIcon && (
                <PreImage style={classes.titleIcon} source={titleIcon} />
              )}
            </View>
          )}
          <Slide
            direction="bottom"
            delay={animDuration}
            duration={animDuration}
            style={classes.slide}>
            <View style={[classes.wrapper, wrapperStyles]}>
              {backgroundImage && (
                <PreImage
                  source={backgroundImage}
                  style={[classes.slideBackground, backgroundStyles]}
                />
              )}
              <ScrollView>
                <View style={[classes.innerContent, contentStyles]}>
                  {content.map((item, key) => {
                    const Component = resolveComponent(item);
                    return <Component key={`slide-content-${key}`} {...item} />;
                  })}
                </View>
              </ScrollView>
            </View>
            <View
              style={classNames({footer: true, footerClient: true}, classes)}>
              <Button
                primary={!isClient}
                secondary={isClient}
                style={classes.button}
                onPress={onNext}>
                {_t(final ? 'finish_text' : 'continue_text')}
              </Button>
            </View>
            {/*{image && (*/}
            {/*  <Slide*/}
            {/*    direction="left"*/}
            {/*    delay={animDuration * 2}*/}
            {/*    style={classes.imageWrapper}>*/}
            {/*    <PreImage source={image} style={classes.image} />*/}
            {/*  </Slide>*/}
            {/*)}*/}

            {/*{(caption || description) && (*/}
            {/*  <View style={classes.textWrapper}>*/}
            {/*    {!inverse && caption && (*/}
            {/*      <Text style={classes.description}>{caption}</Text>*/}
            {/*    )}*/}
            {/*    {!inverse && description && (*/}
            {/*      <Text style={classes.caption}>{description}</Text>*/}
            {/*    )}*/}
            {/*    {inverse && description && (*/}
            {/*      <Text style={classes.caption}>{description}</Text>*/}
            {/*    )}*/}
            {/*    {inverse && caption && (*/}
            {/*      <Text style={classes.description}>{caption}</Text>*/}
            {/*    )}*/}
            {/*  </View>*/}
            {/*)}*/}
          </Slide>
        </Slide>
      )}
    </View>
  );
};

export default GuideSlide;

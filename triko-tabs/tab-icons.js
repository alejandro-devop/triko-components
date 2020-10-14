import homeIcon from 'shared/assets/icons/menu-home.png';
import homeIconFilled from 'shared/assets/icons/menu-home-filled.png';
import chatIcon from 'shared/assets/icons/menu-chat.png';
import chatIconFilled from 'shared/assets/icons/menu-chat-filled.png';
import requestsIcon from 'shared/assets/icons/menu-requests.png';
import requestsIconFilled from 'shared/assets/icons/menu-requests-filled.png';
import activityIcon from 'shared/assets/icons/menu-activity.png';
import activityIconFilled from 'shared/assets/icons/menu-activity-filled.png';

/**
 * This module exports the application icons with it's different states.
 * Note: This module is used only to abstract the icon imports from the main module
 */
export default {
  home: {normal: homeIcon, active: homeIconFilled},
  chat: {normal: chatIcon, active: chatIconFilled},
  requests: {normal: requestsIcon, active: requestsIconFilled},
  activity: {normal: activityIcon, active: activityIconFilled},
};

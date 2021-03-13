import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'components/base/dialogs/dialog';
import ContentWrapper from './ContentWrapper';
import styles from './styles';
import useTranslation from 'hooks/useTranslation';
import useRegionConfig from 'hooks/useRegionConfig';
import {useQuery} from '@apollo/react-hooks';
import {GET_REGION_CONFIG} from 'shared/hooks/use-regional-config/queries';
import useSession from 'hooks/useSession';
import LoadingCurtain from 'components/base/dialogs/loading-curtain';

/**
 * This component renders the terms and conditions for the application
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param enabled
 * @param open
 * @param onAcceptTerms
 * @param onClose
 * @param region
 * @returns {*}
 * @constructor
 */
const TermsAndConditions = ({
  enabled,
  open,
  onAcceptTerms,
  onClose,
  region = {},
}) => {
  const {_t} = useTranslation();
  const {setKey} = useSession();
  const {loading} = useQuery(GET_REGION_CONFIG, {
    variables: {
      region: region.id,
    },
    fetchPolicy: 'no-cache',
    onCompleted: ({response}) => {
      setKey('regionalConfig', response);
    },
  });
  const config = useRegionConfig();
  const {termsUrl} = config;
  return (
    <>
      {!loading && (
        <Dialog
          contentStyles={styles.contentStyles}
          disableScroll
          open={open}
          onClose={onClose}>
          <ContentWrapper
            enabled={enabled}
            onAccept={onAcceptTerms}
            onCancel={onClose}
            source={termsUrl}
            _t={_t}
          />
        </Dialog>
      )}
      {loading && <LoadingCurtain />}
    </>
  );
};

TermsAndConditions.propTypes = {
  enabled: PropTypes.bool,
  open: PropTypes.bool,
  onAcceptTerms: PropTypes.func,
  onClose: PropTypes.func,
  region: PropTypes.oneOfType([PropTypes.object]),
};

export default TermsAndConditions;

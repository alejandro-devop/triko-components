import React, {useEffect, useState} from 'react';
import useSession from 'hooks/useSession';
import Control from './control';
import useGuide from 'shared/hooks/use-guide';
import TransportsDialog from './transports-dialog';
const GUIDE_KEY = 'configure-transports';

const guideSteps = [
  {
    title: 'guides_transport_manager_title_1',
    description: 'guides_transport_manager_description_1',
  },
  {
    title: 'guides_transport_manager_title_2',
    description: 'guides_transport_manager_description_2',
  },
];

/**
 * This component handles the triko transport
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @returns {*}
 * @constructor
 */
const TransportManager = () => {
  const {
    stack: {triko = {}, user = {}},
  } = useSession();
  const [openDialog, setOpenDialog] = useState(false);
  const {guides = {}} = user.attrs;
  const {transports = []} = triko;
  const {currentKey, addGuides} = useGuide();
  const defaultTransport = transports.find((item) => item.type.isDefault === 1);

  useEffect(() => {
    if (!guides[GUIDE_KEY]) {
      addGuides(GUIDE_KEY, guideSteps);
    }
  }, []);
  const toggleDialog = () => setOpenDialog(!openDialog);
  const shouldDisplayGuide = currentKey === GUIDE_KEY;
  return (
    <>
      <Control
        selectedTransport={defaultTransport}
        displayGuide={shouldDisplayGuide}
        toggleDialog={toggleDialog}
      />
      {openDialog && (
        <TransportsDialog open={openDialog} onClose={toggleDialog} />
      )}
    </>
  );
};

export default TransportManager;

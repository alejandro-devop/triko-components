import React from 'react';
import RateTriko from 'shared/components/rate-triko';
const RateTrikoService = ({onRateSend, request}) => {
  return (
    <>
      <RateTriko request={request} onRateSend={onRateSend} />
    </>
  );
};

export default RateTrikoService;

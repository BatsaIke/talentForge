import Image from 'next/image';
import React, { Fragment } from 'react';

const Spinner = () => (
  <>
    <Image
      src="/spinner.gif"
      width={200} height={200}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt="Loading..."
    />
  </>
);

export default Spinner;

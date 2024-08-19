// import React from 'react';
// import './Button.css';
// import { Link } from 'next/navigation';

// export function Button() {
//   return (
//     <Link href='/register'>
//       <button className='btn'>Sign Up</button>
//     </Link>
//   );
// }

import React from 'react';
import './Button.css';
import { Link } from 'next/navigation';

const STYLES = ['btn--primary', 'btn--outline', 'btn--test', 'btn--rounded'];

const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({
  to,
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  name,
  extraClass
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  const checkName = name ? name : 'no-name';
  return (
    <Link href={to} className=''>
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize} ${extraClass}`}
        onClick={onClick}
        type={type}
        name = {checkName}
      >
        {children}
      </button>
    </Link>
  );
};

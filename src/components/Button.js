import React from "react";
import className from 'classnames'

import "components/Button.scss";

export default function Button(props) {
   const { confirm, danger, disabled, onClick } = props;

   const buttonClasses = className('button', { 
      'button--confirm': confirm, 
      'button--danger': danger 
   });

   return (
      <button className={buttonClasses} onClick={onClick} disabled={disabled}>
         {props.children}
      </button>
   );
}

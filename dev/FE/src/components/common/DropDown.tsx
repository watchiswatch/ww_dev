import React from 'react';

export interface DropDownProps {
  children: React.ReactNode;
  visibility: boolean;
}

const DropDown = (props: DropDownProps) => {
  return <article>{props.visibility && props.children}</article>;
};

export default DropDown;

import * as React from 'react';

export type ButtonSize = 'small' | 'large' | 'default' | string;
export type ButtonProps = {
  size?: ButtonSize;
  disabled?: boolean;
  children: React.ReactNode | string;
  type?: 'submit' | 'reset' | 'button';
  style?: any;
  onClick?: any;
};

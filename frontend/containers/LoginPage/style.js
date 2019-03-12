import {css} from 'linaria';
import {sizes} from '../../constants/styles/common';

export const authFormContainer = css`
  width: ${sizes.grid * 40}px;
  padding: ${sizes.grid * 6}px ${sizes.grid * 4}px;
  border: 1px solid #ccc;
  border-radius: 12px;
`;

export const inputWrapper = css`
  & + & {
    margin-top: ${sizes.grid * 3}px;
  }
`;
import {css} from 'linaria';
import {sizes, colors} from '../../constants/styles/common';

export const errorMessage = css`
  color: ${colors.darkred};
  margin-top: ${sizes.grid * 3}px;
`;
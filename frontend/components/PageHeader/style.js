import {css} from 'linaria';
import {sizes, colors} from '../../constants/styles/common';

export const pageHeader = css`
  height: ${sizes.grid * 5}px;
  border-bottom: 1px solid #ccc;
`;

export const pageHeaderList = css`
  height: ${sizes.grid * 5}px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const pageHeaderListItem = css`
  color: ${colors.primary};
  will-change: color;
  transition: 0.2s ease-in-out color;

  &:hover {
    color: ${colors.primaryHovered};
    cursor: pointer;
  }

  & + & {
    margin-left: ${sizes.grid * 2}px;
  }
`;
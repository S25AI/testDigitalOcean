import {css} from 'linaria';
import { colors, sizes } from '../../constants/styles/common';

export const title = css`
  font-size: 32px;
`;

export const articlePageContainer = css``;

export const articlePageWrapper = css`
  position: relative;
  margin-top: ${sizes.grid * 3}px;
`;

export const articleTitle = css`
  font-size: 36px;
  font-weight: bold;
  margin-left: 0;
`;

export const articleDescr = css`
  font-size: 24px;
  margin-top: 12px;
  color: ${colors.primary}
`;

export const articleCategory = css`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 8px 12px;
  border-radius: 25px;
  color: ${colors.white};
  background: ${colors.category};
`;

export const articleBody = css`
  font-size: 20px;
  margin-top:  ${sizes.grid * 2}px;
  line-height: 1.5;
`;

export const articleCreator = css`
  font-size: 14px;
  text-align: right;
  margin-top: ${sizes.grid * 2}px;
  color: ${colors.primary};
`;
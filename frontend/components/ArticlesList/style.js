import {css} from 'linaria';
import { colors, sizes } from '../../constants/styles/common';

export const title = css`
  font-size: 32px;
`;

export const articlesList = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: row wrap;

  @media screen and (max-width: 500px) {
    flex-flow: column;
    align-items: stretch;
  }
`;

export const articlesListItem = css`
  flex: 1 0 calc((100% - 48px) / 3);
  height: 330px;
  border: 1px solid ${colors.gray};
  border-radius: 4px;
  padding: ${sizes.grid * 2}px ${sizes.grid}px;
  overflow: hidden;

  & + & {
    margin-left: ${sizes.grid * 3}px;
  }

  &:nth-child(n + 4) {
    margin-top: ${sizes.grid * 2}px;
  }

  &:nth-child(3n + 1) {
    margin-left: 0;
  }

  @media screen and (max-width: 500px) {
    flex: 1 0 100%;

    & + & {
      margin-top: ${sizes.grid * 2}px;
      margin-left: 0;
    }
  }
`;

export const articleTitle = css`
  font-size: 24px;
  font-weight: bold;
`;

export const articleDescr = css`
  font-size: 14px;
  margin-top: 12px;
  color: ${colors.primary}
`;

export const articleBody = css`
  font-size: 16px;
  margin-top: 16px;
  line-height: 1.4;
`;
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
  position: relative;
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
  text-overflow: ellipsis;
  white-space: pre;
  overflow: hidden;
  padding-right: 100px;
`;

export const articleDescr = css`
  font-size: 14px;
  margin-top: 12px;
  color: ${colors.primary};
  text-overflow: ellipsis;
  white-space: pre;
  overflow: hidden;
`;

export const articleBody = css`
  font-size: 16px;
  margin-top: 16px;
  line-height: 1.4;
  max-height: 200px;
  overflow: hidden;
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

export const articleCreator = css`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 12px;
  color: ${colors.primary};
`;
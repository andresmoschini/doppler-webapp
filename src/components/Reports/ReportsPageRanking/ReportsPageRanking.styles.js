import React from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import spacings from '../../styles/spacings';
import fonts from '../../styles/fonts';

export const ReportBox = ({ children }) => <div className="reports-box">{children}</div>;

export const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > div {
    width: 100%;
  }
`;

export const ListItem = styled.div`
  border-top: 1px solid ${colors.softGrey};
  border-bottom: 1px solid ${colors.softGrey};
  background: ${colors.ghostGrey};
  margin-bottom: ${spacings.spacesLvl1};
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: ${fonts.fontLvl3};
    margin: ${spacings.spacesLvl1};
    color: ${colors.darkGrey};
  }

  a {
    font-size: ${fonts.fontLvl3};
  }
`;

export const ListItemColumn = styled.div`
  padding: ${spacings.spacesLvl6} ${spacings.spacesLvl5};
`;

export const ListItemRightColumn = styled(ListItemColumn)`
  background: ${colors.white};
  width: 30%;
  text-align: right;

  p {
    font-weight: ${fonts.fontStrong};
    margin: ${spacings.spacesLvl0};
    &.visits--withemail {
      color: ${colors.purple3};
    }
    &.visits--withoutemail {
      color: ${colors.darkYellow};
      margin-top: ${spacings.spacesLvl3};
    }
  }
`;

export const GridFooter = styled.div`
  text-align: right;
  padding: ${spacings.spacesLvl2} ${spacings.spacesLvl5} ${spacings.spacesLvl3} 0;
  font-size: ${fonts.fontLvl3};
  button {
    text-transform: uppercase;
  }
  &::after {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 6px 0 6px;
    border-color: ${colors.lightGrey} transparent transparent transparent;
    margin-left: ${spacings.spacesLvl1};
    display: inline-block;
  }
`;

export const SpinnerContainer = styled.div`
  position: relative;
  height: 150px;
  .loading-box {
    background: none;
  }
`;

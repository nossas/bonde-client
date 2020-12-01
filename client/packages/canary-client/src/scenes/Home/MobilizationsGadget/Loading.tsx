import React from 'react';
import { Cell, Panel } from 'bonde-styleguide';

type Props = {
  cells: number
}

const TrendingMobilizationsCellsLoading = ({ cells }: Props) => (
  <>
    {Array(cells).fill('').map(() => (
      <Cell key={Math.random()} size={[6, 6, 6]}>
        <Panel loading image='' title='' author='' onClick={() => {}} />
      </Cell>
    ))}
  </>
);

TrendingMobilizationsCellsLoading.defaultProps = {
  cells: 4
};

export default TrendingMobilizationsCellsLoading;

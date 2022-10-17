import React, { FC } from 'react';

type ProgressProps = {
  width: string;
};

const Progress: FC<ProgressProps> = ({ width }) => (
    <div className="w-full">
      <div className="mx-auto h-2.5 max-w-2xl  rounded-2xl bg-slate-100">
        <div style={{ width }} className="progress h-full w-4/5 rounded-2xl transition-all" />
      </div>
    </div>
  );

export default Progress;

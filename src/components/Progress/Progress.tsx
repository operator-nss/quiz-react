import React, {FC} from 'react';

type ProgressProps = {
    width: string
}

const Progress: FC<ProgressProps> = ({width}) => {

    return (
        <div className='w-full'>
            <div className="h-2.5 max-w-2xl mx-auto  rounded-2xl bg-slate-100">
                <div style={{width: width}} className="progress h-full rounded-2xl w-4/5 transition-all"/>
            </div>
        </div>
    );
};

export default Progress;
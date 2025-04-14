import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { EndofListProps } from '@/types/job';

/**
 * End of job list
 * @constructor
 * @param onFetchMore -
 */
export default function EndOfList({ onFetchMore }: EndofListProps): React.JSX.Element {
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect((): void => {
    if (inView && onFetchMore) onFetchMore();
  }, [inView, onFetchMore]);

  return (
    <div ref={ref} className="flex flex-col justify-between items-center p-8 mb-8">
      <p className="text-sm text-gray-400 ">마지막 일자리입니다.</p>
    </div>
  );
}

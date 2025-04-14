'use client';

import React, { useCallback, useState } from 'react';
import { useParams } from 'next/navigation';
import { RouteParams, UseState } from '@/types/common';
import TopSearch from '@/components/job/TopSearch';
import Banner from '@/components/job/Banner';
import FilterActionBar from '@/components/job/FilterActionBar';
import HiringInfo from '@/components/job/HiringInfo';
import List from '@/components/job/List';
import { BgColors, JobItem, NewJobList } from '@/types/job';
import { formatWeekDays, generateJobList, getBgColors } from '@/app/[locale]/job/utils';
import EndOfList from '@/components/job/EndOfList';
import { ClientProps } from '@/app/[locale]/job/types';

/**
 * Home tab client component
 * @constructor
 */
export default function Client({ jobSampleData }: ClientProps): React.JSX.Element {
  const params: RouteParams = useParams<RouteParams>();
  const locale: string = params.locale;
  console.log('job', locale);
  const [isDropdownOpen, setIsDropdownOpen]: UseState<boolean> = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen]: UseState<boolean> = useState<boolean>(false);
  const [isHiring, setIsHiring]: UseState<boolean> = useState<boolean>(false);
  const [jobData, setJobData]: UseState<JobItem[]> = useState<JobItem[]>(generateJobList(10, jobSampleData));

  const jobListData: NewJobList[] = jobData.map((data: JobItem): NewJobList => {
    const bgColors: BgColors = getBgColors(data.isClosed);
    const formattedWorkWeekDay: string = formatWeekDays(data.workWeekDays);
    return {
      id: data.id,
      companyName: data.business.name,
      description: '글로벌 마케터 업무',
      workWeekDay: `${formattedWorkWeekDay} \n${data.startTime} ~ ${data.endTime}`,
      payAmount: `시급 ${data.payAmount.toLocaleString()}원`,
      status: '채용시 마감',
      isClosed: data.isClosed,
      classNames: {
        companyName: `${bgColors.companyName} text-white`,
        description: `${bgColors.description} text-primary-color`,
        workWeekDay: `${bgColors.workWeekDay} text-primary-color`,
        payAmount: `${bgColors.payAmount} text-primary-color ring-[0.5px] ring-inset ring-[#7b7b7b]`,
        status: `${bgColors.status} text-white`
      }
    };
  });

  const fetchMoreData = useCallback((): void => {
    setJobData((prev: JobItem[]): JobItem[] => [...prev, ...generateJobList(10, jobSampleData, prev.length)]);
  }, [jobSampleData]);

  return (
    <>
      <div className="absolute top-0 left-0 right-0 bg-opacity-80 backdrop-blur-[20px] z-10">
        <TopSearch
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
        />
        <div className="relative">
          <Banner />
          <FilterActionBar />
        </div>
      </div>
      <div className="relative h-full overflow-hidden">
        <div className="relative w-full h-full overflow-hidden">
          <div className="absolute left-0 w-full h-[1px] z-10 top-[216px]" />
          <div className="relative w-full h-full overflow-x-hidden overflow-y-auto overscroll-none">
            <div style={{ width: '100%', height: '216px' }} />
            <HiringInfo isHiring={isHiring} setIsHiring={setIsHiring} />
            <List dataList={jobListData} />
            <EndOfList onFetchMore={fetchMoreData} />
          </div>
        </div>
      </div>
    </>
  );
}

import React from 'react';
import Client from '@/app/[locale]/job/Client';
import jobSampleData from '@/data/job.sample.json';

/**
 * Home tab server component
 * @constructor
 */
export default async function Page(): Promise<React.JSX.Element> {
  return <Client jobSampleData={jobSampleData} />;
}

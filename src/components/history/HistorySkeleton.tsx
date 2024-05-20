import React, { FC } from 'react'

interface HistorySkeletonProps {

}

const HistorySkeleton: FC<HistorySkeletonProps> = ({ }) => {
  return <div
    className="animate-pulse h-full w-full flex flex-col items-center"
  >
    <div className="h-12 w-[90%] bg-slate-700 rounded-full mb-4"></div>
    <div className="h-12 w-[90%] bg-slate-700 rounded-full mb-4"></div>
    <div className="h-12 w-[90%] bg-slate-700 rounded-full mb-4"></div>
    <div className="h-12 w-[90%] bg-slate-700 rounded-full mb-4"></div>
  </div>
}

export default HistorySkeleton
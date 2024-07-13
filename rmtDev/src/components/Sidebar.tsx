import { TJobItem } from '../lib/types'
import JobList from './JobList'
import PaginationControls from './PaginationControls'
import ResultsCount from './ResultsCount'
import SortingControls from './SortingControls'

type Props = {
  jobItems: TJobItem[]
  isLoading: boolean
}

export default function Sidebar({ jobItems, isLoading }: Props) {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount />
        <SortingControls />
      </div>

      <JobList jobItems={jobItems} isLoading={isLoading} />

      <PaginationControls />
    </div>
  )
}

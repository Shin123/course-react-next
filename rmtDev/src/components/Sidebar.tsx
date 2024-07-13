import { TJobItem } from '../lib/types'
import JobList from './JobList'
import PaginationControls from './PaginationControls'
import ResultsCount from './ResultsCount'
import SidebarTop from './SidebarTop'
import SortingControls from './SortingControls'

type Props = {
  children: React.ReactNode
}

export default function Sidebar({ children }: Props) {
  return <div className="sidebar">{children}</div>
}

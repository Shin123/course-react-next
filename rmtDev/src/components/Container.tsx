import { TJobItem } from '../lib/types'
import JobItemContent from './JobItemContent'
import Sidebar from './Sidebar'

type Props = {
  jobItems: TJobItem[]
  isLoading: boolean
}

export default function Container({ jobItems, isLoading }: Props) {
  return (
    <div className="container">
      <Sidebar jobItems={jobItems} isLoading={isLoading} />
      <JobItemContent />
    </div>
  )
}

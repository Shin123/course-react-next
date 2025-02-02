import { useActiveIdContext } from '../lib/hooks'
import { TJobItem } from '../lib/types'
import JobListItem from './JobListItem'
import Spinner from './Spinner'

type Props = {
  jobItems: TJobItem[]
  isLoading: boolean
}

export default function JobList({ jobItems, isLoading }: Props) {
  const { activeId } = useActiveIdContext()

  return (
    <ul className="job-list">
      {isLoading && <Spinner />}
      {!isLoading &&
        jobItems.map((jobItem) => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            isActive={jobItem.id === activeId}
          />
        ))}
    </ul>
  )
}

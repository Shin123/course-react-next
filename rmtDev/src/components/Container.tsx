import { TJobItem } from '../lib/types'
import JobItemContent from './JobItemContent'
import Sidebar from './Sidebar'

type Props = {
  children: React.ReactNode
}

export default function Container({ children }: Props) {
  return <div className="container">{children}</div>
}

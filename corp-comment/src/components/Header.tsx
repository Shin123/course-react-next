import FeedbackForm from './FeedbackForm'
import Logo from './Logo'
import PageHeading from './PageHeading'
import Pattern from './Pattern'

type Props = {
  handleAddToList: (text: string) => void
}

export default function Header({ handleAddToList }: Props) {
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onAddToList={handleAddToList} />
    </header>
  )
}

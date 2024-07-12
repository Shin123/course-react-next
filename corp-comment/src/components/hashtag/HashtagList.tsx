import { useFeedbackItemsStore } from '../../stores/feedbackItemsStore'
import HashtagItem from './HashtagItem'

export default function HashtagList() {
  console.log(
    'HashtagList component rendered. This should only be rendered once.'
  )
  // const { companyList, handleSelectCompany } = useFeedbackItemsContext()
  const companyList = useFeedbackItemsStore((state) => state.getCompanyList())
  const selectCompany = useFeedbackItemsStore((state) => state.selectCompany)
  return (
    <ul className="hashtags">
      {companyList.map((company) => (
        <HashtagItem
          company={company}
          key={company}
          onSelectCompany={selectCompany}
        />
      ))}
    </ul>
  )
}

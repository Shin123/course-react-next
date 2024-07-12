import HashtagItem from './HashtagItem'

type Props = {
  companyList: string[]
  handleSelectCompany: (company: string) => void
}

export default function HashtagList({
  companyList,
  handleSelectCompany,
}: Props) {
  return (
    <ul className="hashtags">
      {companyList.map((company) => (
        <HashtagItem
          company={company}
          key={company}
          onSelectCompany={handleSelectCompany}
        />
      ))}
    </ul>
  )
}

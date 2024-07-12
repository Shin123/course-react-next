import HashtagItem from './HashtagItem'

type Props = {
  companyList: string[]
}

export default function HashtagList({ companyList }: Props) {
  return (
    <ul className="hashtags">
      {companyList.map((company) => (
        <HashtagItem company={company} key={company} />
      ))}
    </ul>
  )
}

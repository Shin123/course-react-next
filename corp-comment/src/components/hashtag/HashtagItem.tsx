type Props = {
  company: string
}
export default function HashtagItem({ company }: Props) {
  return (
    <li>
      <button>{`#${company}`}</button>
    </li>
  )
}

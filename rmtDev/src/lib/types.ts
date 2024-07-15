export type TJobItem = {
  id: number
  badgeLetters: string
  title: string
  company: string
  daysAgo: number
  relevanceScore: number
}

export type TJobItemExpanded = TJobItem & {
  description: string
  qualifications: string[]
  reviews: string[]
  salary: string
  duration: string
  coverImgURL: string
  companyURL: string
  location: string
}

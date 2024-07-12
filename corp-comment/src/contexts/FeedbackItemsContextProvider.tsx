import { createContext, useMemo, useState } from 'react'
import { useFeedbackItems } from '../lib/hooks'
import { TFeedbackItem } from '../lib/types'

type TFeedbackItemsContext = {
  filteredFeedbackItems: TFeedbackItem[]
  isLoading: boolean
  errorMessage: string
  companyList: string[]
  handleAddToList: (text: string) => Promise<void>
  handleSelectCompany: (company: string) => void
}

type Props = {
  children: React.ReactNode
}

export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(
  null
)

export default function FeedbackItemsContextProvider({ children }: Props) {
  const [selectedCompany, setSelectedCompany] = useState('')
  const { feedbackItems, isLoading, errorMessage, setFeedbackItems } =
    useFeedbackItems()

  const companyList = useMemo(
    () =>
      feedbackItems
        .map((item) => item.company)
        .filter((company, index, array) => array.indexOf(company) === index),
    [feedbackItems]
  )

  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter(
            (feedbackItem) => feedbackItem.company === selectedCompany
          )
        : feedbackItems,
    [feedbackItems, selectedCompany]
  )

  const handleAddToList = async (text: string) => {
    const companyName = text
      .split(' ')
      .find((word: string) => word.includes('#'))!
      .substring(1)

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
    }

    setFeedbackItems([...feedbackItems, newItem])

    await fetch(
      'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(newItem),
      }
    )
  }

  const handleSelectCompany = (company: string) => {
    if (company === selectedCompany) {
      setSelectedCompany('')
    } else {
      setSelectedCompany(company)
    }
  }

  return (
    <FeedbackItemsContext.Provider
      value={{
        filteredFeedbackItems,
        isLoading,
        errorMessage,
        companyList,
        handleAddToList,
        handleSelectCompany,
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  )
}

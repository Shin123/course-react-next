import { create } from 'zustand'
import { TFeedbackItem } from '../lib/types'

interface Store {
  feedbackItems: TFeedbackItem[]
  isLoading: boolean
  errorMessage: string
  selectedCompany: string
  getCompanyList: () => string[]
  getFilteredFeedbackItems: () => TFeedbackItem[]
  addItemToList: (text: string) => Promise<void>
  selectCompany: (company: string) => void
  fetchFeedbackItems: () => Promise<void>
}

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  errorMessage: '',
  selectedCompany: '',
  getCompanyList: () => {
    return get()
      .feedbackItems.map((item) => item.company)
      .filter((company, index, array) => array.indexOf(company) === index)
  },
  getFilteredFeedbackItems: () => {
    const state = get()

    return state.selectedCompany
      ? state.feedbackItems.filter(
          (feedbackItem) => feedbackItem.company === state.selectedCompany
        )
      : state.feedbackItems
  },
  addItemToList: async (text: string) => {
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

    // setFeedbackItems([...feedbackItems, newItem])
    set((state) => ({ feedbackItems: [...state.feedbackItems, newItem] }))

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
  },
  selectCompany: (company: string) => {
    set((state) => {
      if (company === state.selectedCompany) {
        return { ...state, selectedCompany: '' }
      } else {
        return { ...state, selectedCompany: company }
      }
    })
  },
  fetchFeedbackItems: async () => {
    set(() => ({
      isLoading: true,
    }))

    try {
      const response = await fetch(
        'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks'
      )

      if (!response.ok) {
        throw new Error('Could not fetch data')
      }

      const data = await response.json()
      set(() => ({ feedbackItems: data.feedbacks }))
    } catch (error) {
      set(() => ({
        errorMessage: 'Something went wrong. Please try again later',
      }))
    }

    set(() => ({ isLoading: false }))
  },
}))

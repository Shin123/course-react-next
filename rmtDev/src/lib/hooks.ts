import { useQueries, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { BASE_API_URL } from './constants'
import { TJobItem, TJobItemExpanded } from './types'
import { handleError } from './utils'
import { BookmarksContext } from '../contexts/BookmarksContextProvider'
import { ActiveIdContext } from '../contexts/ActiveIdContextProvider'

type JobItemApiResponse = {
  public: boolean
  jobItem: TJobItemExpanded
}

const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`)
  if (!response.ok) {
    const errorText = await response.text()
    handleError(errorText)
    throw new Error(`Error: ${response.status} - ${errorText}`)
  }
  const data = await response.json()
  return data
}

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null)

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1)
      setActiveId(id)
    }
    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return activeId
}

export function useJobItem(id: number | null) {
  const { data, isLoading } = useQuery({
    queryKey: ['job-item', id],
    queryFn: () => (id ? fetchJobItem(id) : null),
  })
  const jobItem = data?.jobItem
  return { jobItem, isLoading } as const
}

export function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ['job-item', id],
      queryFn: () => fetchJobItem(id),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      enabled: !!id,
      retry: false,
    })),
  })
  const jobItems = results
    .map((result) => result.data?.jobItem)
    // .filter((jobItem) => jobItem !== undefined)
    .filter((jobItem) => Boolean(jobItem)) as TJobItemExpanded[]

  const isLoading = results.some((result) => result.isLoading)

  return { jobItems, isLoading }
}

export function useActiveJobItem() {
  const activeId = useActiveId()
  const { isLoading, jobItem } = useJobItem(activeId)

  return { jobItem, isLoading } as const
}

// export function useJobItems(searchText: string) {
//   const [jobItems, setJobItems] = useState<TJobItem[]>([])
//   const [isLoading, setIsLoading] = useState(false)

//   useEffect(() => {
//     if (!searchText) return

//     const fetchData = async () => {
//       setIsLoading(true)
//       const response = await fetch(`${BASE_API_URL}?search=${searchText}`)
//       const data = await response.json()
//       setJobItems(data.jobItems)
//       setIsLoading(false)
//     }
//     fetchData()
//   }, [searchText])

//   return { jobItems, isLoading } as const
// }

type JobItemsApiResponse = {
  jobItems: TJobItem[]
  sorted: boolean
  public: boolean
}

const fetchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
  const response = await fetch(`${BASE_API_URL}?search=${searchText}`)
  if (!response.ok) {
    const errorText = await response.json()
    handleError(errorText)
    throw new Error(`Error: ${errorText?.description || response.status}`)
  }
  const data = await response.json()
  return data
}

export function useSearchQuery(searchText: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['job-items', searchText],
    queryFn: () => fetchJobItems(searchText),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!searchText,
    retry: false,
  })
  return { jobItems: data?.jobItems, isLoading }
}

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timerId)
  }, [value, delay])
  return debouncedValue
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
  )

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue] as const
}

export function useBookmarksContext() {
  const context = useContext(BookmarksContext)
  if (!context) {
    throw new Error(
      'useBookmarksContext must be used within a BookmarksContextProvider'
    )
  }
  return context
}

export function useActiveIdContext() {
  const context = useContext(ActiveIdContext)
  if (!context) {
    throw new Error(
      'useActiveIdContext must be used within a ActiveIdContextProvider'
    )
  }
  return context
}

//-------------------------------------------

export function useOnClickOutSide(
  refs: React.RefObject<HTMLElement>[],
  handler: () => void
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        refs.every((ref) => !ref.current?.contains(e.target as Node))
      ) {
        handler()
      }
    }
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [refs, handler])
}

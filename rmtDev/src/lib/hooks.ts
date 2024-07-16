import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { BASE_API_URL } from './constants'
import { TJobItem, TJobItemExpanded } from './types'

type JobItemApiResponse = {
  public: boolean
  jobItem: TJobItemExpanded
}

const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${3232}`)
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Error: ${response.status} - ${errorText}`)
  }
  const data = await response.json()
  return data
}

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(
    +window.location.hash.slice(1) || null
  )

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1)
      setActiveId(id)
    }
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

    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
    retry: false,
  })
  const jobItem = data?.jobItem
  return { jobItem, isLoading } as const
}

export function useActiveJobItem() {
  const activeId = useActiveId()
  const { isLoading, jobItem } = useJobItem(activeId)

  return { jobItem, isLoading } as const
}

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<TJobItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const totalNumberOfResults = jobItems.length
  const jobItemsSliced = jobItems.slice(0, 7)

  useEffect(() => {
    if (!searchText) return

    const fetchData = async () => {
      setIsLoading(true)
      const response = await fetch(`${BASE_API_URL}?search=${searchText}`)
      const data = await response.json()
      setJobItems(data.jobItems)
      setIsLoading(false)
    }
    fetchData()
  }, [searchText])

  return { jobItemsSliced, isLoading, totalNumberOfResults } as const
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

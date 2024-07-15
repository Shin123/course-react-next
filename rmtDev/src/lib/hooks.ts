import { useEffect, useState } from 'react'
import { TJobItem, TJobItemExpanded } from './types'
import { BASE_API_URL } from './constants'

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(
    +window.location.hash.slice(1) || null
  )

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1)
      console.log('🚀 ~ handleHashChange ~ id:', id)
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
  const [jobItem, setJobItem] = useState<TJobItemExpanded | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`${BASE_API_URL}/${id}`)
        const data = await response.json()
        setJobItem(data.jobItem)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id])

  return { isLoading, jobItem }
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

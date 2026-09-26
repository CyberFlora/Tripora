import { useEffect, useRef, useState } from 'react'

export function useServiceData<T>(loader: () => Promise<T>, initial: T) {
  const [data, setData] = useState<T>(initial)
  const loaderRef = useRef(loader)
  loaderRef.current = loader

  useEffect(() => {
    let active = true
    void loaderRef.current().then((result) => {
      if (active) setData(result)
    })
    return () => {
      active = false
    }
  }, [])

  return data
}

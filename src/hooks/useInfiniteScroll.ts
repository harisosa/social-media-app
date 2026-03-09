'use client'

import { RefObject, useEffect, useRef } from 'react'

type UseInfiniteScrollParams = {
  enabled: boolean
  onLoadMore: () => void
  rootRef?: RefObject<Element | null>
  rootMargin?: string
  threshold?: number
}

export const useInfiniteScroll = ({
  enabled,
  onLoadMore,
  rootRef,
  rootMargin = '300px',
  threshold = 0,
}: UseInfiniteScrollParams) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = sentinelRef.current

    if (!node || !enabled) {
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0]

        if (entry?.isIntersecting) {
          onLoadMore()
        }
      },
      {
        root: rootRef?.current ?? null,
        rootMargin,
        threshold,
      }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [enabled, onLoadMore, rootMargin, rootRef, threshold])

  return {
    sentinelRef,
  }
}
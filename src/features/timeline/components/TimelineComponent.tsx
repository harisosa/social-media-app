'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {  selectIsAuthenticated } from '@/features/auth'
import { ExploreComponent } from '@/features/timeline/components/ExploreComponent'
import { FeedsComponent } from '@/features/timeline/components/FeedsComponent'
import { useAppSelector } from '@/lib/hook'
import { Compass, Home } from 'lucide-react'

export const TimelineComponent = () => {

  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  if(!isAuthenticated) return <ExploreComponent />

  return (
    <section className="flex flex-col items-center gap-6">
      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="mx-auto flex w-fit items-center gap-6 bg-transparent p-0">
          
          <TabsTrigger
            value="feed"
            className="
              flex items-center gap-2
              rounded-full px-4 py-2
              text-neutral-400
              data-[state=active]:bg-[#2A1B4D]
              data-[state=active]:text-white
            "
          >
            <Home size={16} />
            Feed
          </TabsTrigger>

          <div className="h-6 w-px bg-neutral-800" />

          <TabsTrigger
            value="explore"
            className="
              flex items-center gap-2
              rounded-full px-4 py-2
              text-neutral-400
              data-[state=active]:bg-[#2A1B4D]
              data-[state=active]:text-white
            "
          >
            <Compass size={16} />
            Explore
          </TabsTrigger>

        </TabsList>

        <TabsContent value="feed">
          <FeedsComponent />
        </TabsContent>

        <TabsContent value="explore">
          <ExploreComponent />
        </TabsContent>
      </Tabs>
    </section>
  )
}
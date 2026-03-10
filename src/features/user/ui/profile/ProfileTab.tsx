'use client'

import { ProfileTabItem, ProfileTabKey } from '@/features/user/types'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

type ProfileTabsProps = {
  tabs: ProfileTabItem[]
  activeTab: ProfileTabKey
  onTabChange: (tab: ProfileTabKey) => void
  className?: string
}

export const ProfileTabs = ({
  tabs,
  activeTab,
  onTabChange,
  className,
}: ProfileTabsProps) => {
  return (
    <Tabs
      value={activeTab}
      onValueChange={(v) => onTabChange(v as ProfileTabKey)}
      className={cn('w-full mb-6 border-b ', className)}
    >
      <TabsList className="flex w-full justify-start gap-6  bg-transparent p-0"
      variant="line"
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.key}
            value={tab.key}
            className="
              relative h-12 px-0 text-sm font-medium
              text-white/50 hover:text-white/80
              data-[state=active]:text-white
              bg-transparent
              shadow-none
            "
          >
            {tab.icon}
            {tab.label}

            <span
              className="
                pointer-events-none absolute bottom-0 left-0 h-0.5 w-full
                rounded-full bg-white opacity-0
                transition-opacity
                data-[state=active]:opacity-100
              "
            />
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@repo/ui/components/tabs'

import { TimelineSection } from '~/features/Home/TimeLine'
import {
  clientProjects,
  personalProjects,
} from '~/features/Home/TimeLine/ProjectTimeLIne/config'

export const ProjectTabs = () => (
  <Tabs defaultValue="personal" className="mx-auto max-w-3xl">
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger value="personal">個人プロジェクト</TabsTrigger>
      <TabsTrigger value="client">受託開発</TabsTrigger>
    </TabsList>
    <TabsContent value="personal">
      <TimelineSection items={personalProjects} />
    </TabsContent>
    <TabsContent value="client">
      <TimelineSection items={clientProjects} />
    </TabsContent>
  </Tabs>
)

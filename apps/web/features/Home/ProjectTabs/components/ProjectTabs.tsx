import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@repo/ui/components/tabs'

import {
  Timeline,
  clientProjects,
  personalProjects,
} from '~/features/Home/ProjectTimeLIne'

export function ProjectTabs() {
  return (
    <Tabs defaultValue="personal" className="mx-auto max-w-3xl">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="personal">個人プロジェクト</TabsTrigger>
        <TabsTrigger value="client">受託開発・インターン</TabsTrigger>
      </TabsList>
      <TabsContent value="personal">
        <Timeline items={personalProjects} />
      </TabsContent>
      <TabsContent value="client">
        <Timeline items={clientProjects} />
      </TabsContent>
    </Tabs>
  )
}

import { Avatar, AvatarImage } from '@repo/ui/components/avatar'
import { Badge } from '@repo/ui/components/badge'
import { Button } from '@repo/ui/components/button'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@repo/ui/components/tabs'
import { Linkedin, Twitter } from '@repo/ui/icon/lucide'
import * as motion from 'framer-motion/client'

import { TimelineSection } from '~/features/Home/TimeLine'
import {
  clientProjects,
  personalProjects,
} from '~/features/Home/TimeLine/ProjectTimeLIne/config'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="w-full">
        <div className="flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center text-center"
          >
            <Avatar className="my-4 border-2 size-40 border-slate-400">
              <AvatarImage src="./avatarImage.jpg" />
            </Avatar>
            <h1 className="mb-4 text-4xl font-bold">Naoki Hayashida</h1>
            <p className="mb-8 text-xl">フロントエンドエンジニア</p>
            <div className="flex justify-center space-x-4">
              {/* <Button variant="outline" size="icon" asChild>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5" />
                </a>
              </Button> */}
              <Button variant="outline" size="icon" asChild>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="container px-4 py-20 mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-3xl font-bold text-center"
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-center"
          >
            私は3年間のフロントエンド開発経験を持つエンジニアです。
            モダンなWeb技術を駆使して、ユーザーフレンドリーなインターフェースの構築に情熱を注いでいます。
            常に新しい技術トレンドをキャッチアップし、効率的で美しいWebアプリケーションの開発に取り組んでいます。
          </motion.p>
        </div>

        <div className="container px-4 py-20 mx-auto bg-muted">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-3xl font-bold text-center"
          >
            Skills
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              'React',
              'TypeScript',
              'Next.js',
              'Tailwind CSS',
              'Node.js',
              'Supabase',
              'Firebase',
              'React Native',
              'hono',
              'Nest',
            ].map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="px-4 py-2 text-lg"
              >
                {skill}
              </Badge>
            ))}
          </motion.div>
        </div>

        <div className="container px-4 py-20 mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-3xl font-bold text-center"
          >
            Projects
          </motion.h2>
          <Tabs defaultValue="personal" className="max-w-3xl mx-auto">
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
        </div>
      </div>
    </div>
  )
}

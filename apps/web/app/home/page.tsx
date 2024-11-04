import { Badge } from '@repo/ui/components/badge'
import { Button } from '@repo/ui/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@repo/ui/components/tabs'
import { Linkedin, Twitter } from '@repo/ui/icon/lucide'
import * as motion from 'framer-motion/client'

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="w-full">
        <div className="flex min-h-screen items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="mb-4 text-4xl font-bold">山田 太郎</h1>
            <p className="mb-8 text-xl">フロントエンドエンジニア</p>
            <div className="flex justify-center space-x-4">
              {/* <Button variant="outline" size="icon" asChild>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button> */}
              <Button variant="outline" size="icon" asChild>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 py-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center text-3xl font-bold"
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-center text-lg"
          >
            私は3年間のフロントエンド開発経験を持つエンジニアです。
            モダンなWeb技術を駆使して、ユーザーフレンドリーなインターフェースの構築に情熱を注いでいます。
            常に新しい技術トレンドをキャッチアップし、効率的で美しいWebアプリケーションの開発に取り組んでいます。
          </motion.p>
        </div>

        <div className="bg-muted container mx-auto px-4 py-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center text-3xl font-bold"
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
              'GraphQL',
              'Jest',
              'Webpack',
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

        <div className="container mx-auto px-4 py-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center text-3xl font-bold"
          >
            Projects
          </motion.h2>
          <Tabs defaultValue="personal" className="mx-auto max-w-3xl">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">個人プロジェクト</TabsTrigger>
              <TabsTrigger value="client">受託開発</TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-6 grid gap-6"
              >
                {[
                  {
                    title: 'ポートフォリオサイト',
                    description:
                      'React と Tailwind CSS を使用して作成した個人ポートフォリオサイト',
                  },
                  {
                    title: 'タスク管理アプリ',
                    description:
                      'Next.js と TypeScript で開発したシンプルなタスク管理アプリケーション',
                  },
                  {
                    title: '天気予報 Widget',
                    description:
                      'OpenWeatherMap API を使用した、カスタマイズ可能な天気予報ウィジェット',
                  },
                ].map((project, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline">詳細を見る</Button>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </TabsContent>
            <TabsContent value="client">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-6 grid gap-6"
              >
                {[
                  {
                    title: 'Eコマースサイト',
                    description:
                      '大手小売業向けにReactとReduxを使用して開発したEコマースプラットフォーム',
                  },
                  {
                    title: '社内管理システム',
                    description:
                      '中小企業向けにVue.jsとFirebaseを使用して開発した社内管理システム',
                  },
                  {
                    title: 'ニュースアグリゲーターアプリ',
                    description:
                      'メディア企業向けにReact NativeとGraphQLを使用して開発したモバイルアプリ',
                  },
                ].map((project, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline">詳細を見る</Button>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

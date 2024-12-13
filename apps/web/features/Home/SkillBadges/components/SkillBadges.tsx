import { Badge } from '@repo/ui/components/badge'

const SKILLS = [
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
] as const

export function SkillBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {SKILLS.map((skill) => (
        <Badge key={skill} variant="secondary" className="px-4 py-2 text-lg">
          {skill}
        </Badge>
      ))}
    </div>
  )
}

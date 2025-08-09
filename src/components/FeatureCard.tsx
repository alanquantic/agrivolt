interface FeatureCardProps {
  title: string
  description: string
}

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 hover:bg-white/10 transition-colors rounded-2xl p-6">
      <div className="h-10 w-10 rounded-xl grid place-items-center mb-3 bg-primary/13 text-primary">
        ●
      </div>
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <p className="text-sm text-white/80 mt-1">{description}</p>
    </div>
  )
}

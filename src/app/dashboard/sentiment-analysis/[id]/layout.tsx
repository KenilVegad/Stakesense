 
import { Separator } from "@/components/ui/separator"

export default function SentimentAnalysisLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {

  return (
    <>
      <div className="space-y-6">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Sentiment Analysis</h2>
          <p className="text-muted-foreground">
            Analyze the sentiment of stakeholder feedback.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex-1 w-full">{children}</div>
      </div>
    </>
  )
}

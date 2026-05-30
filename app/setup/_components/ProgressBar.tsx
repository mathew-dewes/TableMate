"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"
import { Field, FieldLabel } from "@/components/ui/field"

export function ProgressBar({setupProgress}:
  {setupProgress: number}
) {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(setupProgress), 500)
    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
  <Field className="w-full max-w-sm">
<FieldLabel>
    <span className="text-base">On boarding progress</span>
    <span className="ml-auto">{progress}%</span>
</FieldLabel>
  <Progress value={progress} className="w-[60%]" />
  </Field>)

}

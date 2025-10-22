import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FlowClaude - Workflow Builder with AI',
  description: 'Create and execute visual workflows with Claude AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="overflow-hidden">{children}</body>
    </html>
  )
}

'use client'

import Header from '@/components/Header'
import TaskSidebar from '@/components/TaskSidebar'
import WorkflowCanvas from '@/components/WorkflowCanvas'
import PropertiesPanel from '@/components/PropertiesPanel'
import ExecutionPanel from '@/components/ExecutionPanel'
import CheckpointModal from '@/components/CheckpointModal'
import TemplateModal from '@/components/TemplateModal'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'

export default function BuilderPage() {
  // Enable keyboard shortcuts
  useKeyboardShortcuts()

  return (
    <div className="h-screen flex flex-col bg-black">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Task Sidebar */}
        <TaskSidebar />

        {/* Canvas */}
        <div className="flex-1 relative">
          <WorkflowCanvas />
        </div>

        {/* Properties Panel */}
        <PropertiesPanel />
      </div>

      {/* Execution Panel */}
      <ExecutionPanel />

      {/* Modals */}
      <CheckpointModal />
      <TemplateModal />
    </div>
  )
}

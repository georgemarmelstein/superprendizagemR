import { useEffect } from 'react'
import { useWorkflowStore } from '@/stores/workflowStore'

export function useKeyboardShortcuts() {
  const {
    createNewWorkflow,
    saveWorkflow,
    executeWorkflow,
    togglePropertiesPanel,
    deleteNode,
    selectedNodeId,
    isExecuting
  } = useWorkflowStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
      const metaKey = isMac ? e.metaKey : e.ctrlKey

      // Only handle shortcuts if not typing in an input
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return
      }

      // Cmd/Ctrl + Enter: Execute workflow
      if (metaKey && e.key === 'Enter') {
        e.preventDefault()
        if (!isExecuting) {
          executeWorkflow()
        }
      }

      // Cmd/Ctrl + N: New workflow
      if (metaKey && e.key === 'n') {
        e.preventDefault()
        createNewWorkflow()
      }

      // Cmd/Ctrl + S: Save workflow
      if (metaKey && e.key === 's') {
        e.preventDefault()
        saveWorkflow()
      }

      // Cmd/Ctrl + P: Toggle properties panel
      if (metaKey && e.key === 'p') {
        e.preventDefault()
        togglePropertiesPanel()
      }

      // Delete or Backspace: Delete selected node
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedNodeId) {
        e.preventDefault()
        deleteNode(selectedNodeId)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    createNewWorkflow,
    saveWorkflow,
    executeWorkflow,
    togglePropertiesPanel,
    deleteNode,
    selectedNodeId,
    isExecuting
  ])
}

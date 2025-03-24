// Simple toast hook for notifications
export function useToast() {
  const toast = ({ title, description }: { title: string; description: string }) => {
    // In a real app, this would use a proper toast library
    console.log(`Toast: ${title} - ${description}`)
  }

  return { toast }
} 
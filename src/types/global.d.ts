declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: {
        send_to?: string
        value?: number
        currency?: string
        [key: string]: any
      }
    ) => void
    dataLayer: any[]
  }
}

export {}

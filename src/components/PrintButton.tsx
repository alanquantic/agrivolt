'use client'

export default function PrintButton({ className = '' }: { className?: string }) {
  const handlePrint = () => {
    window.print()
  }

  return (
    <button
      onClick={handlePrint}
      className={`rounded-xl px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors shadow ${className}`}
      type="button"
    >
      Imprimir ficha técnica (PDF)
    </button>
  )
}



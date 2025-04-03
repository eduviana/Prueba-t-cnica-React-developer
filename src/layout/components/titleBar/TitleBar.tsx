
interface TitleBarProps {
    title?: string
}

export function TitleBar({title} : TitleBarProps) {
  return (
    <div className="bg-gray-600">
        <h2 className="custom-container py-2 text-white text-2xl font-semibold">{title}</h2>
    </div>
  )
}
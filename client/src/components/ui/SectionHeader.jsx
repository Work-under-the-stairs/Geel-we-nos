import { Link } from 'react-router-dom'

export default function SectionHeader({ title, categorySlug }) {
  return (
    <div className="flex items-center gap-2.5 mb-5 pb-3 mt-10
                    border-b-2 border-gray-100">
      <div className="w-1 h-5 bg-secondary rounded-full flex-shrink-0" />
      <h2 className="text-[15px] font-extrabold text-gray-800">{title}</h2>
      {categorySlug && (
        <Link
          to={`/${encodeURIComponent(categorySlug)}`}
          className="mr-auto text-[12px] text-secondary font-semibold
                     hover:underline"
        >
          عرض الكل ←
        </Link>
      )}
    </div>
  )
}
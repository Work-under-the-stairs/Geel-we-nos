// بدل ما تكتبي format في كل مكان
export const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
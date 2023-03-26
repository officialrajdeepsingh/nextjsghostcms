
export function formatDate(geDate: string) {

  const options: { year: string; month: string; day: string; } = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  return new Intl.DateTimeFormat('en-US', options)
    .format(new Date(geDate));
}

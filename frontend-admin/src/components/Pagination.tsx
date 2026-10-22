type Props = { page: number; pages: number; onChange: (page: number) => void };

export default function Pagination({ page, pages, onChange }: Props) {
  if (pages <= 1) return null;
  const start = Math.max(1, Math.min(page - 2, pages - 4));
  const visible = Array.from({ length: Math.min(5, pages) }, (_, index) => start + index);
  return <nav className="pagination" aria-label="Pagination">
    <button type="button" disabled={page <= 1} onClick={() => onChange(page - 1)}>Previous</button>
    {visible.map((number) => <button type="button" key={number} className={number === page ? 'current' : ''} aria-current={number === page ? 'page' : undefined} onClick={() => onChange(number)}>{number}</button>)}
    <button type="button" disabled={page >= pages} onClick={() => onChange(page + 1)}>Next</button>
  </nav>;
}

export default function CheckList({ items }) {
  return (
    <ul className="vol-list">
      {items.map((t) => (
        <li key={t}><svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>{t}</li>
      ))}
    </ul>
  );
}

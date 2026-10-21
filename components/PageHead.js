// Eyebrow + title + optional description used at the top of every inner page.
export default function PageHead({ eyebrow, title, desc, descStyle }) {
  return (
    <>
      {eyebrow && <div className="eyebrow"><span className="rule" /><span>{eyebrow}</span></div>}
      <h1 className="page-title">{title}</h1>
      {desc && <p className="page-desc" style={descStyle}>{desc}</p>}
    </>
  );
}

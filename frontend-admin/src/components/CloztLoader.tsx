export default function CloztLoader({ label = 'Loading' }: { label?: string }) {
  return <div className="clozt-loader" role="status" aria-label={label}><span className="clozt-loader-mark" aria-hidden="true">C</span><span className="clozt-loader-word" aria-hidden="true">CLOZT</span><span className="clozt-loader-line" aria-hidden="true" /></div>;
}

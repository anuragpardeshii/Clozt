import { useState } from 'react';
import PropTypes from 'prop-types';
import { Eye, EyeOff } from 'lucide-react';

export default function AuthField({ name, label, type = 'text', value, onChange, error, placeholder, autoComplete, maxLength }) {
  const [visible, setVisible] = useState(false);
  const password = type === 'password';
  const errorId = `${name}-error`;

  return <div>
    <label htmlFor={name} className="mb-2 block text-xs font-semibold text-[#202320]">{label}</label>
    <div className="relative">
      <input id={name} name={name} type={password && visible ? 'text' : type} value={value} onChange={onChange} placeholder={placeholder} autoComplete={autoComplete} maxLength={maxLength} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} className={`block h-12 w-full rounded-lg border bg-[#fbfbf9] px-4 text-sm text-[#202320] outline-none transition-colors placeholder:text-stone-400 focus:bg-white focus:ring-2 focus:ring-[#254b3d]/10 ${error ? 'border-red-400 focus:border-red-500' : 'border-stone-200 focus:border-[#254b3d]'} ${password ? 'pr-24' : ''}`} />
      {password && <button type="button" onClick={() => setVisible((current) => !current)} aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`} aria-pressed={visible} className="absolute inset-y-0 right-3 inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 transition-colors hover:text-[#202320]">{visible ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}{visible ? 'Hide' : 'Show'}</button>}
    </div>
    {error && <p id={errorId} role="alert" className="mt-1.5 text-xs text-red-600">{error}</p>}
  </div>;
}

AuthField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  maxLength: PropTypes.number,
};

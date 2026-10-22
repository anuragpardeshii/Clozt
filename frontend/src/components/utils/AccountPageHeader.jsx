import PropTypes from 'prop-types';

export default function AccountPageHeader({ eyebrow, title, description, badge }) {
  return <div className="bg-[#202320] px-4 py-10 text-white sm:py-14">
    <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-400">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-3 text-sm text-stone-300">{description}</p>
      </div>
      {badge && <span className="rounded-full border border-white/25 px-4 py-2 text-xs text-stone-200">{badge}</span>}
    </div>
  </div>;
}

AccountPageHeader.propTypes = {
  eyebrow: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  badge: PropTypes.string,
};

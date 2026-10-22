import { Link } from 'react-router-dom';

const sections = [
  {
    id: 'delivery',
    eyebrow: '01 / ORDERS',
    title: 'Delivery & order progress',
    questions: [
      { question: 'Where can I find my order?', answer: <>Your order and its latest status appear on the <Link to="/orders" className="font-semibold underline underline-offset-2">orders page</Link> after checkout.</> },
      { question: 'Can I track a delivery?', answer: 'The orders page shows each fulfillment stage. If a tracking number has been added, it appears with the order details.' },
      { question: 'Can I change my delivery address?', answer: <>You can edit <Link to="/addresses" className="font-semibold underline underline-offset-2">saved addresses</Link> for future orders. An order already placed keeps the address selected at checkout.</> },
    ],
  },
  {
    id: 'returns',
    eyebrow: '02 / SUPPORT',
    title: 'Returns & order issues',
    questions: [
      { question: 'How do I request a return or refund?', answer: 'Self-service return and refund requests are not available in the app yet. Keep your order number handy when contacting the store for help; no automatic return window is shown here.' },
      { question: 'What if an item is missing or damaged?', answer: <>Check the items listed on your <Link to="/orders" className="font-semibold underline underline-offset-2">order</Link> and keep the order number and photos of the issue for support.</> },
    ],
  },
  {
    id: 'shopping',
    eyebrow: '03 / SHOPPING',
    title: 'Shopping & your account',
    questions: [
      { question: 'Which payment methods are available?', answer: 'Checkout currently supports Cash on Delivery. Online payment and gift cards are not available.' },
      { question: 'How do sizes and saved pieces work?', answer: <>Select an available size on the product page before adding it to your bag. Your <Link to="/wishlist" className="font-semibold underline underline-offset-2">wishlist</Link> keeps products for later without selecting a size.</> },
      { question: 'Can I keep more than one delivery address?', answer: <>Yes. Add multiple addresses and choose one default on the <Link to="/addresses" className="font-semibold underline underline-offset-2">addresses page</Link>.</> },
    ],
  },
];

export default function Faq() {
  return <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6">
    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">Good to know</p>
    <h2 className="mt-2 text-2xl font-semibold text-[#202320]">Frequently asked questions</h2>
    <div className="mt-8 grid gap-5">{sections.map((section) => <section id={section.id} key={section.id} className="scroll-mt-28 rounded-xl border border-stone-200 bg-white p-5 sm:p-7"><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500">{section.eyebrow}</p><h3 className="mt-2 text-lg font-semibold text-[#202320]">{section.title}</h3><div className="mt-5 divide-y divide-stone-100">{section.questions.map((item) => <details key={item.question} className="group py-4 first:pt-0 last:pb-0"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-[#202320] marker:hidden">{item.question}<span className="text-lg font-normal text-stone-500 group-open:rotate-45" aria-hidden="true">＋</span></summary><p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">{item.answer}</p></details>)}</div></section>)}</div>
  </div>;
}

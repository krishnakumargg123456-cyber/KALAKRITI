export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-cream">
      <section className="border-b border-border bg-paper">
        <div className="kalakriti-container px-4 py-14 md:py-18">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
            Customer Care
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-maroon md:text-5xl">
            Refund Policy
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-brown">
            We want every Kalakriti experience to be fair to both customers
            and artisans.
          </p>
        </div>
      </section>

      <article className="kalakriti-container max-w-4xl px-4 py-12">
        {[
          ["Refund Eligibility", "Refund eligibility depends on the reason for the request, the condition of the product and the applicable return terms for the order."],
          ["Damaged Products", "If an item arrives damaged, please contact support promptly and provide the order details together with clear photographs of the package and product."],
          ["Incorrect Product", "If you receive an item materially different from what you ordered, contact customer support so the order can be reviewed and the appropriate resolution arranged."],
          ["Approved Refunds", "Where a refund is approved, the eligible amount will normally be returned through the applicable original payment method or another method communicated by our support team."],
          ["Non-Eligible Situations", "Refunds may not be available for damage caused after delivery, unauthorized alterations, misuse or situations outside the applicable return terms."],
          ["Support", "For a refund request, keep your order number and relevant photographs available when contacting Kalakriti."]
        ].map(([title, text]) => (
          <section key={title} className="border-b border-border py-7 first:pt-0">
            <h2 className="font-serif text-2xl font-bold text-maroon">{title}</h2>
            <p className="mt-3 text-sm leading-8 text-brown">{text}</p>
          </section>
        ))}
      </article>
    </main>
  );
}

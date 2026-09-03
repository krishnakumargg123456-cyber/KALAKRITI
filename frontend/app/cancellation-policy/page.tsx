export default function CancellationPolicyPage() {
  return (
    <main className="min-h-screen bg-cream">
      <section className="border-b border-border bg-paper">
        <div className="kalakriti-container px-4 py-14 md:py-18">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
            Customer Care
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-maroon md:text-5xl">
            Cancellation Policy
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-brown">
            Handmade orders often move quickly from artisan preparation to
            fulfillment, so cancellation depends on the order stage.
          </p>
        </div>
      </section>

      <article className="kalakriti-container max-w-4xl px-4 py-12">
        {[
          ["Before Fulfillment", "You may request cancellation while an order remains eligible for cancellation. Requests are subject to the current status of the order."],
          ["After Processing or Dispatch", "Once an order has entered fulfillment or has been dispatched, cancellation may no longer be possible. Applicable return procedures may apply instead."],
          ["Cancellation Confirmation", "A cancellation request should not be considered final until Kalakriti confirms that the order has been successfully cancelled."],
          ["Refund After Cancellation", "Where an eligible cancellation results in a refund, the applicable amount will be processed through the relevant payment method."],
          ["Custom & Made-to-Order Products", "Custom, personalized or made-to-order products may have different cancellation conditions because artisan work may begin specifically for the customer."],
          ["Need Help?", "Contact Kalakriti support with your order number as soon as possible if you need to cancel an order."]
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

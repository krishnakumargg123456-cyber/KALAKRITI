export default function TermsPage() {
  return (
    <main className="min-h-screen bg-cream">
      <section className="border-b border-border bg-paper">
        <div className="kalakriti-container px-4 py-14 md:py-18">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
            Kalakriti Legal
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-maroon md:text-5xl">
            Terms & Conditions
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-brown">
            These terms explain the basic rules for using the Kalakriti
            marketplace and purchasing handmade products.
          </p>
        </div>
      </section>

      <article className="kalakriti-container max-w-4xl px-4 py-12">
        {[
          ["1. Using Kalakriti", "You agree to use the platform lawfully and provide accurate information when creating an account, placing orders or communicating with us."],
          ["2. Handmade Products", "Handcrafted products naturally contain variations in colour, texture, dimensions and finish. These characteristics are part of handmade craftsmanship and should not automatically be considered defects."],
          ["3. Product Information", "We aim to provide accurate descriptions, images, prices and availability. Minor visual differences may occur because of photography, screens and handmade production."],
          ["4. Orders", "An order request is subject to product availability, successful payment authorization and applicable fulfillment conditions. We may contact you if information needs clarification."],
          ["5. Prices & Payments", "Product prices are displayed on the marketplace. Applicable taxes, shipping charges and other clearly disclosed charges may apply depending on the order."],
          ["6. Accounts", "You are responsible for keeping your account credentials secure and for activity carried out through your account."],
          ["7. Intellectual Property", "Kalakriti branding, original content and platform materials may be protected by applicable intellectual-property laws and may not be reproduced without permission."],
          ["8. Contact", "Questions regarding these terms can be directed to Kalakriti customer support."]
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

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cream">
      <section className="border-b border-border bg-paper">
        <div className="kalakriti-container px-4 py-14 md:py-18">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
            Kalakriti Legal
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-maroon md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-brown">
            Your trust matters to us. This policy explains how information is
            collected, used and protected when you use Kalakriti.
          </p>
        </div>
      </section>

      <article className="kalakriti-container max-w-4xl px-4 py-12">
        {[
          ["1. Information We Collect", "We may collect information you provide when creating an account, placing an order, contacting support, submitting reviews, or interacting with our marketplace. This may include your name, email address, phone number, delivery information and order details."],
          ["2. How We Use Information", "We use information to operate Kalakriti, process and deliver orders, provide customer support, maintain account security, improve our services and communicate important service-related updates."],
          ["3. Payments", "Payment information is processed through authorized payment service providers. Kalakriti does not need to store complete payment card credentials on its own systems."],
          ["4. Cookies & Local Storage", "We may use cookies and browser storage for authentication, preferences, cart functionality, security and improving the user experience."],
          ["5. Data Security", "We use reasonable technical and organizational safeguards designed to protect personal information against unauthorized access, misuse, alteration or disclosure."],
          ["6. Your Choices", "You may request access to, correction of, or deletion of eligible personal information associated with your account, subject to applicable legal and operational requirements."],
          ["7. Contact", "For privacy questions or requests, please contact the Kalakriti customer support team through the Contact page."]
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

import MarketingFooter from "@/app/_components/MarketingFooter";
import MarketingHeader from "@/app/_components/MarketingHeader";

export default function ContactUsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex-1 p-10 itutoros-soft-gradient">
        <h1 className="m-0 text-5xl font-extrabold">Contact us</h1>
        <p className="mt-4 text-base text-gray-700">Placeholder page. Content coming soon.</p>
      </main>
      <MarketingFooter />
    </div>
  );
}

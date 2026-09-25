import { Seo } from "../components/Seo";
import { Contact } from "../components/Contact";

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact & Booking"
        description="Get in touch with Champion Sport Activities. Send an enquiry about clubs, parties or camps and we'll reply within one working day. Free taster sessions available."
        path="/contact"
      />
      <Contact />
    </>
  );
}

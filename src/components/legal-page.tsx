import Link from "next/link";
import { BUSINESS } from "@/lib/content";
import { PageSchema } from "@/lib/seo";
import { Breadcrumbs, Eyebrow } from "./shared";

// Preserve the legal operator named in the existing published policies.
// The live footer names Halo Shield LLC; confirm this discrepancy before launch.
export function LegalPage({ privacy }: { privacy: boolean }) {
  const title = privacy ? "Privacy policy" : "Terms of service";
  return (
    <>
      <PageSchema
        path={privacy ? "/privacy-policy" : "/terms-of-service"}
        name={title}
      />
      <section className="legal-page container">
        <Breadcrumbs items={[{ name: title }]} />
        <div className="legal-heading">
          <Eyebrow>HALO PROPERTY INSPECTION</Eyebrow>
          <h1>{title}</h1>
        </div>
        <article className="legal-copy">
          {privacy ? (
            <>
              <p>
                Halo Interiors LLC ("us", "we", or "our") operates the
                https://haloinspection.ae/ website (the "Service"). This page
                informs you of our policies regarding the collection, use, and
                disclosure of personal data when you use our Service and the
                choices you have associated with that data.
              </p>
              <p>
                We use your data to provide and improve our services. By using
                our Service, you agree to the collection and use of information
                in accordance with this policy. Unless otherwise defined in this
                Privacy Policy, terms used in this Privacy Policy have the same
                meanings as in our Terms and Conditions, accessible from
                https://haloinspection.ae. Personal information may be collected
                through the submission of requests, online transactions, and
                through the use of other online tools. If you have additional
                questions regarding the privacy and security of your personal
                information, please contact us on{" "}
                <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>.
              </p>
              <h2>Information collection and use</h2>
              <p>
                All personal information collected and stored by Halo Interiors
                LLC is used for specific business purposes to protect and
                administer your accounts and transactions, to comply with the
                relevant laws and regulations of the United Arab Emirates, and
                to help Halo Interiors LLC better understand your needs in order
                to design or improve our products and services. Once received by
                Halo Interiors LLC, only Halo Interiors LLC's approved personnel
                may open and process any personal information you provide to the
                site.
              </p>
              <p>
                We collect several different types of information for various
                purposes to provide and improve our Service to you.
              </p>
              <h2>Personal data</h2>
              <p>
                While using our Service, we may ask you to provide us with
                certain personally identifiable information that can be used to
                contact or identify you ("Personal Data"). Personally
                identifiable information may include:
              </p>
              <ul>
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Contact details</li>
                <li>Personal preferences</li>
                <li>Cookies and usage data</li>
              </ul>
              <p>
                We may also collect information about how the Service is
                accessed and used ("Usage Data"). This may include your Internet
                Protocol address, browser type, browser version, the pages you
                visit, the time and date of your visit, the time spent on those
                pages, unique device identifiers and other diagnostic data.
              </p>
              <h2>Quote enquiries on this website</h2>
              <p>
                The guided quote form prepares your request in your browser. It
                does not save the form details to this website or send them
                automatically. You choose to send the prepared request using
                WhatsApp or your email application. Those services process the
                information under their own privacy policies. Halo receives your
                enquiry when you send it.
              </p>
              <h2>Tracking and cookies data</h2>
              <p>
                Our published privacy policy covers the use of cookies and
                similar tracking technologies to track activity on the Service
                and hold certain information. Cookies are files with a small
                amount of data which may include an anonymous unique identifier.
                You can instruct your browser to refuse all cookies or indicate
                when a cookie is being sent.
              </p>
              <p>
                Examples covered by the existing policy include session cookies
                to operate the Service, preference cookies to remember settings,
                and security cookies for security purposes. This static website
                does not set these cookies through the guided quote form.
                External services, including WhatsApp and maps, apply their own
                policies.
              </p>
              <h2>Use of data</h2>
              <p>
                Halo Interiors LLC uses collected data for the following
                purposes:
              </p>
              <ul>
                <li>To provide and maintain the Service</li>
                <li>To notify you about changes to our Service</li>
                <li>
                  To allow you to participate in interactive features when you
                  choose to do so
                </li>
                <li>To provide customer care and support</li>
                <li>To provide analysis so that we can improve the Service</li>
                <li>To monitor usage of the Service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
              <h2>Security of data</h2>
              <p>
                The security of your data is important to us, but no method of
                transmission over the Internet or electronic storage is 100%
                secure. While we strive to use commercially acceptable means to
                protect your Personal Data, we cannot guarantee its absolute
                security.
              </p>
            </>
          ) : (
            <>
              <p>
                These Terms of Service ("Terms") govern your use of the Halo
                Property Inspection website operated by Halo Interiors LLC
                ("us", "we", or "our").
              </p>
              <p>
                By accessing or using our Service, you agree to be bound by
                these Terms. If you disagree with any part of these terms, then
                you may not access the Service.
              </p>
              <h2>Service description</h2>
              <p>
                Halo Property Inspection provides professional property
                inspection services throughout the UAE, including pre-purchase
                inspections, handover inspections, villa inspections, apartment
                inspections and commercial property inspections.
              </p>
              <h2>Use licence</h2>
              <p>
                Permission is granted to temporarily use this website for
                personal, non-commercial transitory viewing only. This is the
                grant of a licence, not a transfer of title. Under this licence
                you may not:
              </p>
              <ul>
                <li>Modify or copy the materials</li>
                <li>
                  Use the materials for any commercial purpose or for any public
                  display
                </li>
                <li>
                  Attempt to reverse engineer any software contained on the
                  website
                </li>
                <li>
                  Remove any copyright or other proprietary notations from the
                  materials
                </li>
              </ul>
              <h2>Service terms</h2>
              <p>
                When you book an inspection service with us, you agree to
                provide accurate information about the property and grant access
                for the scheduled inspection. Our inspectors will conduct an
                examination based on the agreed scope and provide a detailed
                report.
              </p>
              <p>
                Preparing or sending an enquiry through this website does not
                confirm an appointment or payment. Halo will agree the scope,
                fee, availability and booking terms with you separately.
                Non-invasive inspections concern accessible areas at the time of
                the visit; limitations are recorded in the inspection report.
              </p>
              <h2>Limitation of liability</h2>
              <p>
                In no event shall Halo Interiors LLC or its suppliers be liable
                for any damages, including damages for loss of data or profit,
                or due to business interruption, arising out of the use or
                inability to use the materials on this website.
              </p>
              <h2>Privacy policy</h2>
              <p>
                Your privacy is important to us. Please review our{" "}
                <Link href="/privacy-policy">Privacy Policy</Link>, which also
                governs your use of the Service, to understand our practices.
              </p>
              <h2>Changes to terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or
                replace these Terms at any time. If a revision is material, we
                will try to provide at least 30 days notice prior to any new
                terms taking effect.
              </p>
            </>
          )}
          <h2>Contact us</h2>
          <p>
            If you have a question about{" "}
            {privacy ? "this privacy policy" : "these terms of service"},
            contact us:
          </p>
          <ul>
            <li>
              Email: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            </li>
            <li>
              Phone: <a href={BUSINESS.phoneLink}>{BUSINESS.phone}</a>
            </li>
            <li>Address: {BUSINESS.address}</li>
          </ul>
        </article>
      </section>
    </>
  );
}

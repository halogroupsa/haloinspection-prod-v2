"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BUSINESS, services, locations } from "@/lib/content";
import { Icon } from "./icon";

export function QuoteForm() {
  const [step, setStep] = useState(1);
  const [type, setType] = useState("Apartment");
  const [service, setService] = useState("Handover & snagging inspection");
  const [area, setArea] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [prepared, setPrepared] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("service");
    const found = services.find(
      (s) => s.slug === requested || s.name === requested,
    );
    if (found) {
      setService(found.name);
      if (found.category === "Commercial") setType("Commercial");
      else if (found.slug === "services/villa") setType("Villa / townhouse");
    }
    const loc = params.get("location");
    if (loc) setLocation(loc);
  }, []);
  const message = `Hello Halo, I would like a property inspection quote.\n\nName: ${name}\nPhone: ${phone}${email ? `\nEmail: ${email}` : ""}\nProperty: ${type}\nInspection: ${service}\nSize: ${area} sq ft\nLocation: ${location}${date ? `\nPreferred date: ${date}` : ""}${notes ? `\nNotes: ${notes}` : ""}\n\nPlease confirm the scope, fee and availability.`;
  function next() {
    if (!area || !Number.isFinite(Number(area)) || Number(area) <= 0) {
      setError("Enter your approximate property size in square feet.");
      return;
    }
    if (!location.trim()) {
      setError(
        "Enter the community or emirate where your property is located.",
      );
      return;
    }
    setError("");
    setStep(2);
    requestAnimationFrame(() => heading.current?.focus());
  }
  function prepare() {
    if (!name.trim()) {
      setError("Enter your name so the team knows who to contact.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 7) {
      setError("Enter a valid phone number, including your country code.");
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Check your email address or leave that optional field empty.");
      return;
    }
    if (!consent) {
      setError(
        "Please agree to share these details with Halo to request your quote.",
      );
      return;
    }
    setError("");
    setPrepared(true);
    setStep(3);
    requestAnimationFrame(() => heading.current?.focus());
  }
  return (
    <div className="quote-form-card" id="inspection-enquiry">
      <noscript>
        <p className="form-note">
          To request a quote,{" "}
          <a href={BUSINESS.whatsapp}>chat with Halo on WhatsApp</a> or{" "}
          <a href={`mailto:${BUSINESS.email}`}>send an email</a>.
        </p>
      </noscript>
      <div className="form-progress" aria-label={`Step ${step} of 3`}>
        {["Your property", "Your details", "Send your request"].map(
          (label, i) => (
            <div key={label} className={step >= i + 1 ? "current" : ""}>
              <span>{step > i + 1 ? <Icon name="check" /> : i + 1}</span>
              <small>{label}</small>
            </div>
          ),
        )}
      </div>
      <form
        key={step}
        className="motion-swap"
        onSubmit={(e) => {
          e.preventDefault();
          if (step === 1) next();
          else if (step === 2) prepare();
        }}
      >
        <h2 ref={heading} tabIndex={-1}>
          {step === 1
            ? "Tell us about your property."
            : step === 2
              ? "How can we reach you?"
              : "Your request is ready to send."}
        </h2>
        <p className="form-subtitle">
          {step === 1
            ? "A few details help us give you the right scope and quote."
            : step === 2
              ? "We’ll use these details only to handle your inspection enquiry."
              : "Choose WhatsApp or email to send these details to Halo."}
        </p>
        {step === 1 ? (
          <>
            <fieldset className="property-type">
              <legend>Property type</legend>
              {["Apartment", "Villa / townhouse", "Commercial"].map((t) => (
                <label key={t} className={type === t ? "selected" : ""}>
                  <input
                    type="radio"
                    name="propertyType"
                    value={t}
                    checked={type === t}
                    onChange={() => setType(t)}
                  />
                  <Icon name={t === "Commercial" ? "building" : "home"} />
                  <span>{t}</span>
                </label>
              ))}
            </fieldset>
            <label className="form-field">
              Inspection service
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                {services.map((s) => (
                  <option key={s.slug}>{s.name}</option>
                ))}
              </select>
            </label>
            <div className="form-row">
              <label className="form-field">
                Approximate size (sq ft)
                <input
                  type="number"
                  min="1"
                  max="1000000"
                  inputMode="numeric"
                  placeholder="e.g. 1,200"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  autoComplete="off"
                />
              </label>
              <label className="form-field">
                Community or emirate
                <input
                  list="communities"
                  placeholder="e.g. Dubai Marina"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <datalist id="communities">
                  {locations.map((l) => (
                    <option key={l.slug} value={l.name} />
                  ))}
                </datalist>
              </label>
            </div>
            <label className="form-field">
              Preferred date <span>(optional)</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
          </>
        ) : null}
        {step === 2 ? (
          <>
            <label className="form-field">
              Full name
              <input
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </label>
            <div className="form-row">
              <label className="form-field">
                Phone number
                <input
                  type="tel"
                  autoComplete="tel"
                  placeholder="+971 …"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
              <label className="form-field">
                Email <span>(optional)</span>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <label className="form-field">
              Anything else we should know? <span>(optional)</span>
              <textarea
                rows={3}
                placeholder="Access details, a handover date or a particular concern…"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </label>
            <label className="consent">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <span>
                I agree to share these details with Halo for my enquiry.{" "}
                <Link href="/privacy-policy">Privacy policy</Link>
              </span>
            </label>
          </>
        ) : null}
        {step === 3 && prepared ? (
          <>
            <dl className="request-summary">
              <div>
                <dt>Property</dt>
                <dd>
                  {type} · {Number(area).toLocaleString("en")} sq ft
                </dd>
              </div>
              <div>
                <dt>Inspection</dt>
                <dd>{service}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{location}</dd>
              </div>
              <div>
                <dt>Contact</dt>
                <dd>
                  {name} · {phone}
                </dd>
              </div>
              {date ? (
                <div>
                  <dt>Preferred date</dt>
                  <dd>{date}</dd>
                </div>
              ) : null}
            </dl>
            <a
              href={`${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`}
              className="button button-dark full-width"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" />
              Send via WhatsApp
              <Icon name="arrow" />
            </a>
            <a
              href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent(`Inspection quote — ${type}, ${location}`)}&body=${encodeURIComponent(message)}`}
              className="button button-outline full-width"
            >
              Send via email
              <Icon name="mail" />
            </a>
            <p className="form-note">
              Your details are prepared here. The request reaches Halo when you
              send it in WhatsApp or your email app. Your booking is confirmed
              separately by the team.
            </p>
            <button
              type="button"
              className="text-link"
              onClick={() => {
                setStep(2);
                setPrepared(false);
              }}
            >
              Edit my details
            </button>
          </>
        ) : null}
        {error ? (
          <p className="form-error" key={error} role="alert">
            {error}
          </p>
        ) : null}
        {step < 3 ? (
          <div className="form-actions">
            {step === 2 ? (
              <button
                type="button"
                className="button button-outline"
                onClick={() => {
                  setStep(1);
                  setError("");
                }}
              >
                Back
              </button>
            ) : (
              <span>
                <Icon name="shield" />
                No payment required
              </span>
            )}
            <button type="submit" className="button button-dark">
              {step === 1 ? "Continue" : "Review my request"}
              <Icon name="arrow" />
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
}

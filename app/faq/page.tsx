"use client";

import Link from "next/link";

export default function FAQ() {
  const faqs = [
    {
      q: "Ist das eine offizielle Informationsquelle?",
      a: "Nein, diese Karte ist KEINE offizielle Informationsquelle! Die Daten auf dieser Karte stammen von anderen Nutzenden.",
    },
    {
      q: "Welche offiziellen Informationsquellen gibt es?",
      a: "Das Land Berlin informiert unter https://www.berlin.de/aktuelles/10113643-958090-stromausfall-im-suedwesten-50000-haushal.html",
    },
    {
      q: "Woher stammen die Informationen?",
      a: "Die betroffenen Straßenzüge sind dieser Karte entnommen: https://www.stromnetz.berlin/krisenseite/ Die Meldungen zum aktuellen Stand stammen von Nutzenden wie dir.",
    },
    {
      q: "Was bedeuten die Farben?",
      a: "Gelb bzw. hell: der Strom funktioniert wahrscheinlich. Dunkelgrau: der Strom funtioniert wahrscheinlich NICHT. Hellgrau: keine oder widersprüchliche Meldungen zum aktuellen Stand.",
    },
    {
      q: "Warum ist meine Straße nicht auf der Karte?",
      a: "Wahrscheinlich waren die Straßenzüge zum Zeitpunkt der Erstellung nicht in der Datenquelle (s.o.) enthalten. Ich werde das Gebiet sobald es meine Zeit zulässt erweitern.",
    },
    {
      q: "Wer steht hinter dieser App?",
      a: "Niels Hoppe, Impressum folgt.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <span className="mr-2">←</span>
            Zurück zur Karte
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Häufig gestellte Fragen
          </h1>
          <p className="text-gray-600">
            Hier findest du Antworten auf häufig gestellte Fragen zur Karte.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-start">
                <span className="text-blue-600 font-bold mr-3">Q:</span>
                {faq.q}
              </h2>
              <p className="text-gray-700 text-base leading-relaxed flex items-start">
                <span className="text-green-600 font-bold mr-3">A:</span>
                <span>
                  {faq.a.includes("https://") ? (
                    <>
                      {faq.a.split("https://").map((part, i) =>
                        i === 0 ? (
                          <span key={i}>{part}</span>
                        ) : (
                          <span key={i}>
                            <a
                              href={`https://${part.split(" ")[0]}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline break-all"
                            >
                              https://{part.split(" ")[0]}
                            </a>
                            {part.substring(part.split(" ")[0].length)}
                          </span>
                        )
                      )}
                    </>
                  ) : (
                    faq.a
                  )}
                </span>
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        {/* <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
          <p className="text-gray-600 text-sm">
            Hast du weitere Fragen? Kontaktiere uns oder schau auf der Karte
            vorbei.
          </p>
        </div> */}
      </div>
    </main>
  );
}

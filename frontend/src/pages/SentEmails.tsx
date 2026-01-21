import { useEffect, useState } from "react";
import { getSentEmails } from "../api/emails";

export default function SentEmails() {
  const [emails, setEmails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSentEmails()
      .then(setEmails)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (emails.length === 0) return <p>No sent emails</p>;

  return (
    <div>
      <h2>Sent Emails</h2>
      <ul>
        {emails.map((e) => (
          <li key={e.id}>
            {e.recipient_email} — {e.subject} — {e.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

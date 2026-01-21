import { useEffect, useState } from "react";
import { getScheduledEmails } from "../api/emails";

export default function ScheduledEmails() {
  const [emails, setEmails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getScheduledEmails()
      .then(setEmails)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (emails.length === 0) return <p>No scheduled emails</p>;

  return (
    <div>
      <h2>Scheduled Emails</h2>
      <ul>
        {emails.map((e) => (
          <li key={e.id}>
            {e.recipient_email} — {e.subject}
          </li>
        ))}
      </ul>
    </div>
  );
}

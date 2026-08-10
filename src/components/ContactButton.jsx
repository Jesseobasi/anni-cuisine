import { Link } from 'react-router-dom';

export default function ContactButton() {
  return (
    <div className="contact-float">
      <Link to="/inquiry">💬 Contact Me</Link>
    </div>
  );
}

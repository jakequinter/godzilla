import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-violet-600">Home</h1>
      <Link to="/about">go to about</Link>
    </div>
  );
}

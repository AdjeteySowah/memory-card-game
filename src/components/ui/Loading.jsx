import './Loading.css';
import spinner from '../../assets/icons/spinner.svg';

export default function Loading() {
  return <img className="icon spinner" src={spinner} alt="loading spinner" />;
}

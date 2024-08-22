import "./Channel.css";

export function Channel({ name, ...props }) {
  return (
    <li {...props} className="Channel">
      {name}
    </li>
  );
}

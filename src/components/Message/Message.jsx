import "./Message.css";

export function Message({ title, text, isOwn }) {
  const classes = isOwn ? "Message Message_own" : "Message";
  return (
    <div className={classes}>
      {!isOwn && <div className="Message__title">{title}</div>}
      {text}
    </div>
  );
}

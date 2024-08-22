import "./UserInfo.css";

export function UserInfo({ name, avatar }) {
  return (
    <div className="UserInfo">
      <div className="UserInfo__img">
        <img src={avatar} alt="" />
      </div>
      <p className="UserInfo__name">{name}</p>
    </div>
  );
}

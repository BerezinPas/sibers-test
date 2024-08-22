import { Button } from "../Button/Button";
import "./ChatHeader.css";

export function ChatHeader({
  name,
  numberOfMembers,
  onClick,
  onTogleChannelsPanel,
  isOpen,
}) {
  return (
    <div onClick={onClick} className="ChatHeader">
      <h2 className="ChatHeader__title">
        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onTogleChannelsPanel();
          }}
          className="ChatHeader__btn"
        >
          {isOpen && "x"}
          {!isOpen && "<"}
        </Button>
        {name}
      </h2>
      <h3 className="ChatHeader__subtitle">{numberOfMembers} members</h3>
    </div>
  );
}

import "./ChannelControl.css";
import { Button } from "../Button/Button";

export function ChannelControl({ onCreate, onAdd, ...props }) {
  return (
    <div className="ChannelControl">
      <Button onClick={onAdd} className="Button Button_add">
        connect
      </Button>
      <Button onClick={onCreate} className="Button Button_create">
        Create a chat
      </Button>
    </div>
  );
}

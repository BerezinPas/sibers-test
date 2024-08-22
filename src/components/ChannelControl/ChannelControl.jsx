import "./ChannelControl.css";
import { Button } from "../Button/Button";

export function ChannelControl({ onCreate, onAdd, ...props }) {
  return (
    <div className="ChannelControl">
      <Button onClick={onAdd} className="Button Button_add">
        Присоединится
      </Button>
      <Button onClick={onCreate} className="Button Button_create">
        Создать чат
      </Button>
    </div>
  );
}

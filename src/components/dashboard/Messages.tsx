import Card from "../../common/Card";

interface Message {
  id: number;
  name: string;
  message: string;
  time: string;
  avatar: string;
}

const messages: Message[] = [
  {
    id: 1,
    name: "Jane Cooper",
    message: "Don't forget the lab report submission.",
    time: "12:34 PM",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    name: "Kristin Watson",
    message: "Do we have maths test tomorrow?",
    time: "12:34 PM",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: 3,
    name: "Jenny Wilson",
    message: "Can you share the assignment?",
    time: "12:34 PM",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    id: 4,
    name: "Brooklyn Simmons",
    message: "Bus timing has changed today.",
    time: "11:50 AM",
    avatar: "https://i.pravatar.cc/100?img=4",
  },
  {
    id: 5,
    name: "Darrell Steward",
    message: "Please attend the parents meeting.",
    time: "10:45 AM",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
];

export default function MessagesCard() {
  return (
    <Card
      title="Messages"
      headerRight={
        <button className="text-gray-500 text-xl font-bold">
          •••
        </button>
      }
    >
      <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
        {messages.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.avatar}
                alt={item.name}
                className="h-12 w-12 rounded-full object-cover"
              />

              <div>
                <h4 className="text-sm font-semibold text-gray-800">
                  {item.name}
                </h4>

                <p className="w-40 truncate text-xs text-gray-500">
                  {item.message}
                </p>
              </div>
            </div>

            <span className="text-xs text-gray-400">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
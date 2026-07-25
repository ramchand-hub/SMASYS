

import Card from "../../common/Card";

export default function Noticeboard() {
  return (
   <Card
  title="Notice Board"
  headerRight={
    <button className="text-violet-600 text-sm">
      View All
    </button>
  }
>
  <div>
    Notice board content goes here.
  </div>
</Card>
  );
}
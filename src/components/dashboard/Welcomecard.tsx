import Card from "../../common/Card";

export default function WelcomeCard() {
  return (
    <Card className="h-52">

      <h1 className="text-3xl font-bold">
        Welcome Back
      </h1>

      <p className="text-gray-500 mt-3">
        Manage your dashboard efficiently.
      </p>

    </Card>
  );
}
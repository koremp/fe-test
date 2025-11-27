import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const handleClickBoard = () => {
    navigate({ to: "/board" });
  };

  const handleClickGraph = () => {
    navigate({ to: "/graph" });
  };

  return (
    <div>
      <button onClick={handleClickBoard}>Board</button>
      <button onClick={handleClickGraph}>Graph</button>
    </div>
  );
}

import { CanvasPortfolio } from "./components/CanvasPortfolio";
import { getCanvasProjects } from "./content/canvas-projects";

export default function Home() {
  return <CanvasPortfolio projects={getCanvasProjects()} />;
}

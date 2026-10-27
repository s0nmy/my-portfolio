import { CanvasPortfolio } from "./components/CanvasPortfolio";
import { getCanvasProjects } from "./content/canvas-projects";
import { getCanvasProfile } from "./content/canvas-profile";

export default function Home() {
  return <CanvasPortfolio projects={getCanvasProjects()} profile={getCanvasProfile()} />;
}

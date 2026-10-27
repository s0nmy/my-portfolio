import { CanvasPortfolio } from "./canvas/CanvasPortfolio";
import { getProfile } from "./lib/profile";
import { getProjects } from "./lib/projects";

export default function Home() {
  return <CanvasPortfolio projects={getProjects()} profile={getProfile()} />;
}

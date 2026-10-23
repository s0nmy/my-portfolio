import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Profile } from "../components/Profile";
import { Skills } from "../components/Skills";
import { ProjectGallery } from "../components/ProjectGallery";
import { Activity } from "../components/Activity";
import { Footer } from "../components/Footer";
import { projects } from "../content/projects";

export default function ClassicPage() {
  return <><Header /><main><Hero /><Profile /><Skills /><ProjectGallery projects={projects} /><Activity /></main><Footer /></>;
}

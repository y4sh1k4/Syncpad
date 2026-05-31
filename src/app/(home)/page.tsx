import { Navbar } from "./navbar";
import { TemplateGallery } from "./template-gallery";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-h-[200px] w-full">
        <Navbar />
      </div>
      <div className="mt-4 w-full">
        <TemplateGallery />
      </div>
    </div>
  );
};
export default Home;

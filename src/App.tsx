import GalleryLayout from "./Components/Gallery/GalleryLayout";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <div className="container mx-auto">
        <Navbar />
        <GalleryLayout />
      </div>
    </>
  );
}

export default App;

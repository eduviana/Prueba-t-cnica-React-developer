import { CategoryCard } from "./components/categoryCard";
import { Layout } from "./layout";

function App() {
  return (
    <Layout title="Popular Titles">
      <div className="custom-container flex flex-wrap justify-evenly sm:justify-start w-full gap-4 my-10">
        <CategoryCard text="series" />
        <CategoryCard text="movies" />
      </div>
    </Layout>
  );
}

export default App;

import { getAllCarousel } from "./carouse.query";
import { DataTable } from "./components/DataTable";

const CarouselPage = async () => {
  const data = await getAllCarousel();

  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }

  return <DataTable data={data} />;
};

export default CarouselPage;

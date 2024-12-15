import CreateViewEditProductForm from "./components/CreateViewEditProductForm";
import { ProductType } from "./product.types";

type Props = {
  data: ProductType;
  categoriesName: any[];
  colors: any[];
  materials: any[];
  beadSizes: any[];
};

const ProductEditPage = ({
  data,
  categoriesName,
  colors,
  materials,
  beadSizes,
}: Props) => {
  return (
    <div className="flex flex-col space-y-4">
      <h2>{data.name}</h2>
      <CreateViewEditProductForm
        mode="edit"
        productData={data}
        categoriesName={categoriesName}
        colors={colors}
        materials={materials}
        beadSizes={beadSizes}
      />
    </div>
  );
};

export default ProductEditPage;

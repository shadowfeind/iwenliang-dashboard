import CreateViewEditProductForm from "./components/CreateViewEditProductForm";
import { ProductType } from "./product.types";

type Props = {
  data: ProductType;
  categoriesName: any[];
};

const ProductEditPage = ({ data, categoriesName }: Props) => {
  return (
    <div className="flex flex-col space-y-4">
      <h2>{data.name}</h2>
      <CreateViewEditProductForm
        mode="edit"
        productData={data}
        categoriesName={categoriesName}
        colors={[]}
        materials={[]}
      />
    </div>
  );
};

export default ProductEditPage;

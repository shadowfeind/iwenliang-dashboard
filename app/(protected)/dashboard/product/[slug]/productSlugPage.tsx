import CreateViewEditProductForm from "@/components/pages/products/addViewEdit/CreateViewEditProductForm";
import { ProductType } from "@/config/types/product.types";

type Props = {
  data: ProductType;
  categoriesName: any[];
  colorsName: any[];
  materialName: any[];
};

const ProductSlugPage = ({
  data,
  categoriesName,
  colorsName,
  materialName,
}: Props) => {
  return (
    <div className="flex flex-col space-y-4">
      <h2>{data.name}</h2>
      <CreateViewEditProductForm
        mode="view"
        productData={data}
        categoriesName={categoriesName}
        colors={colorsName}
        materials={materialName}
      />
    </div>
  );
};

export default ProductSlugPage;

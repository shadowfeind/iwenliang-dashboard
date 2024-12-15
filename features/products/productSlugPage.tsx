import CreateViewEditProductForm from "@/features/products/components/CreateViewEditProductForm";
import { ProductType } from "./product.types";

type Props = {
  data: ProductType;
  categoriesName: any[];
  colorsName: any[];
  materialName: any[];
  beadSizeName: any[];
};

const ProductSlugPage = ({
  data,
  categoriesName,
  colorsName,
  materialName,
  beadSizeName,
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
        beadSizes={beadSizeName}
      />
    </div>
  );
};

export default ProductSlugPage;

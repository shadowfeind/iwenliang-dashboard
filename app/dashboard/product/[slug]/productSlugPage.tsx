import CreateViewEditProductForm from "@/components/pages/products/addViewEdit/CreateViewEditProductForm";
import { ProductType } from "@/config/schemas/product.schema";

type Props = {
  data: ProductType;
  categoriesName: any[];
};

const ProductSlugPage = ({ data, categoriesName }: Props) => {
  return (
    <div className="flex flex-col space-y-4">
      <h2>{data.name}</h2>
      <CreateViewEditProductForm
        mode="view"
        productData={data}
        categoriesName={categoriesName}
      />
    </div>
  );
};

export default ProductSlugPage;

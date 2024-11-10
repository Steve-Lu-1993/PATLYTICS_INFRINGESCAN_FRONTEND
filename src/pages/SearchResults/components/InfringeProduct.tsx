import { ComparisonResult } from "@/types/entities/patentCompanyComparison";

type InfringeProductType = {
  result: ComparisonResult;
};

const InfringeProduct = ({ result }: InfringeProductType) => {
  return (
    <div className="w-full flex flex-col items-center gap-4 mb-6">
      <h2 className="w-full text-start px-2 text-2xl font-bold" style={{maxWidth:"916px"}}>Infringement Products</h2>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        {result.length > 0 && result.map((product) => (
          <div key={product.id} className="w-full bg-white p-4 rounded-lg shadow-md flex flex-col gap-1" style={{maxWidth:"916px"}}>
            <h3 className="text-lg font-bold pb-1">{product.name}</h3>
            <p className="text-sm text-neutral-400">{product.description}</p>
            <p className="text-sm">{product.infringement_reason}</p>
          </div>
        ))}
        {
          result.length === 0 && (
            <div className="w-full bg-neutral-100 p-4 rounded-lg shadow-md flex flex-col gap-1 justify-center items-center" style={{maxWidth:"916px"}}>
              <h3 className="text-lg font-bold pb-1">No Infringement Products Found</h3>
              <p className="text-sm text-neutral-500">No products were found that infringe on the patent.</p>
            </div>
          )
        }
      </div>
    </div>
  )
};

export default InfringeProduct;

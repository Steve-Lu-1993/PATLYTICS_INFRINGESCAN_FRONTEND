import { ComparisonResult } from "@/types/entities/patentCompanyComparison";

type InfringeProductType = {
  result: ComparisonResult;
};

const InfringeProduct = ({ result }: InfringeProductType) => {
  // 根據風險等級返回對應的顏色
  const getRiskColor = (risk: "high" | "medium" | "low"): string => {
    switch (risk) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // 格式化置信度為百分比
  const formatConfidence = (confidence: number): string => {
    return `${confidence}%`;
  };

  return (
    <div className="w-full flex flex-col items-center gap-4 mb-6">
      <h2 className="w-full text-start px-2 text-2xl font-bold" style={{maxWidth:"916px"}}>Infringement Products</h2>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        {result?.length > 0 && result.map((product) => (
          <div key={product.id} className="w-full bg-white p-4 rounded-lg shadow-md flex flex-col gap-3" style={{maxWidth:"916px"}}>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">{product.name}</h3>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getRiskColor(product.infringement_risk)}`}>
                  {product.infringement_risk.toUpperCase()} RISK
                </span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
                  Confidence: {formatConfidence(product.confidence)}
                </span>
              </div>
            </div>

            <div className="border-t pt-2">
              <h4 className="text-sm font-semibold text-neutral-700 mb-1">Infringing Claims</h4>
              <div className="flex flex-wrap gap-1">
                {product.infringing_claims.map((claim, index) => (
                  <span key={index} className="bg-neutral-100 px-2 py-1 rounded-md text-xs">
                    Claim {claim}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t pt-2">
              <h4 className="text-sm font-semibold text-neutral-700 mb-1">Infringement Analysis</h4>
              <p className="text-sm text-neutral-600">{product.infringement_analysis}</p>
            </div>

            <div className="border-t pt-2">
              <h4 className="text-sm font-semibold text-neutral-700 mb-1">Product to Claim Mapping</h4>
              <p className="text-sm text-neutral-600">{product.product_to_claim_mapping}</p>
            </div>
          </div>
        ))}
        {
          result?.length === 0 && (
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

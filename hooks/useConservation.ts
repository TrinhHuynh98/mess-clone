import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConservation = () => {
  const param = useParams();
  const conversionId = useMemo(() => {
    if (!param?.conversionId) {
      return "";
    }
    return param.conversionId as string;
  }, [param?.conversionId]);
  const isOpen = useMemo(() => !!conversionId, [conversionId]);

  return useMemo(
    () => ({
      conversionId,
      isOpen,
    }),
    [isOpen, conversionId]
  );
};

export default useConservation;

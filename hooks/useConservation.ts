import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConservation = () => {
  const param = useParams();
  const conservationId = useMemo(() => {
    if (!param?.conservationId) {
      return "";
    }
    return param.conservationId as string;
  }, [param?.conservationId]);
  const isOpen = useMemo(() => !!conservationId, [conservationId]);

  return useMemo(
    () => ({
      conservationId,
      isOpen,
    }),
    [isOpen, conservationId]
  );
};

export default useConservation;

import { useState, useEffect,useCallback } from "react";

/**
 * React Hook that gets the globally current shop ID from the `:shopId` URL prefix param
 * @return {Array} [currentShopId]
 */
export default function useCurrentShopId() {
  const currentShopId = localStorage.getItem('accounts:shopId');
  const [shopId, setShopId] = useState(currentShopId);
  
  const setActiveShopId = useCallback(async (spId) => {
    try {
      setShopId(spId);
      localStorage.removeItem('accounts:shopId');
      localStorage.setItem('accounts:shopId', spId);
    } catch (error) {
      console.error(error);
    }
  }, [shopId]);

  

  return {
    setShopId: setActiveShopId,
    shopId
  };
}
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {  useQuery } from "@apollo/react-hooks";
import useCurrentShopId from "/imports/client/ui/hooks/useCurrentShopId";
import { useSnackbar } from "notistack";

// GraphQL Queries / Mutations
import ProgramBatchQuery from "../../../../../client/ui/graphql/services/programs/queries/programBatch";

/**
 * Restore an archived product
 * @param {Object} programBatch Program object
 * @returns {undefined} No return
 */


/**
 * @method useProgramBatch
 * @summary useProduct hook
 * @param {Object} args input arguments
 * @param {String} args.productId Product Id to load product data for
 * @param {String} args.variantId Variant Id to load product data for
 * @param {String} args.optionId Option Id to load product data for
 * @returns {Object} Result containing the product and other helpers for managing that product
 */
function useProgramBatch(args = {}) {
  const { enqueueSnackbar } = useSnackbar();

  const {
    programId: programIdProp,
    variantId: variantIdProp,
    optionId: optionIdProp
  } = args;
  const [newMetaField, setNewMetaField] = useState({ key: "", value: "" });
  const navigate = useNavigate();
  const routeParams = useParams();
  

  const {shopId:currentShopId} = useCurrentShopId();
  const programId = routeParams.program_id || programIdProp;
  const programBatchId = routeParams.program_id || programIdProp;
  const variantId = routeParams.variantId || variantIdProp;
  const optionId = routeParams.optionId || optionIdProp;
  const shopId = currentShopId;

  const { data: programBatchQueryResult, isLoading, refetch: refetchProgramBatch } = useQuery(ProgramBatchQuery, {
    variables: {
     id: programBatchId
    },
    skip: !shopId
  });

  const { programBatch } = programBatchQueryResult || {};

  let variant;
  let option;

  
  /**
   * @method onUpdateProgramBatch
   * @param {Object} args
   * @param {Object} args.product Product fields to update
   * @param {Object} [args.productId] Product ID to update. Leave blank for current product.
   * @param {Object} [args.shopId] Shop ID of the product to update. Leave blank for current shop.
   */
 /*  const onUpdateProgramBatch = useCallback(async ({
    programBatch: programBatchLocal,
    programId: programIdLocal = program._id,
    shopId: shopIdLocal = shopId
  }) => {
    for(let i of programBatchLocal) {
      i.shopId = shopId;
      i.programId = programId;
    }

    
    try {
      await updateBatch({
        variables: {
          input: programBatchLocal
        }
      });

      // Refetch on success to force a cache update
      refetchProgramBatch();

      enqueueSnackbar(" Program batch updated successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Batch update failed", { variant: "error" });
    }
  }, [
    enqueueSnackbar,
    programBatch,
    shopId,
    updateBatch,
    refetchProgramBatch
  ]);
 */
 

  return {
    programBatch: programBatchQueryResult && programBatchQueryResult.programBatch,
    refetchProgramBatch,
    shopId,
  };
}

export default useProgramBatch;

import { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Meteor } from "meteor/meteor";
import useCurrentShopId from "/imports/client/ui/hooks/useCurrentShopId";
import { useSnackbar } from "notistack";


import ProgramQuery from "../../../../../client/ui/graphql/services/programs/queries/program";
import UpdateProgramMutation from "../../../../../client/ui/graphql/services/programs/mutations/updateprogram";

/**
 * Restore an archived product
 * @param {Object} program Program object
 * @returns {undefined} No return
 */
export function handleProductRestore(product) {
  Meteor.call("products/updateProductField", product._id, "isDeleted", false);
}

/**
 * @method useProgram
 * @summary useProduct hook
 * @param {Object} args input arguments
 * @param {String} args.productId Product Id to load product data for
 * @param {String} args.variantId Variant Id to load product data for
 * @param {String} args.optionId Option Id to load product data for
 * @returns {Object} Result containing the product and other helpers for managing that product
 */
function useProgram(args = {}) {
  ;
  const { enqueueSnackbar } = useSnackbar();

  const {
    programId: programIdProp,
    variantId: variantIdProp,
    optionId: optionIdProp
  } = args;
  const [newMetaField, setNewMetaField] = useState({ key: "", value: "" });
  const navigate = useNavigate();
  const routeParams = useParams();
  const [updateProgram] = useMutation(UpdateProgramMutation);
  

  const {shopId:currentShopId} = useCurrentShopId();
  const programId = routeParams.program_id || programIdProp;
  const variantId = routeParams.variantId || variantIdProp;
  const optionId = routeParams.optionId || optionIdProp;
  const shopId = currentShopId;

  const { data: programQueryResult, isLoading, refetch: refetchProgram } = useQuery(ProgramQuery, {
    variables: {
     id: programId
    },
    skip: !shopId
  });

  const { program } = programQueryResult || {};

  let variant;
  let option;

  
  /**
   * @method onUpdateProduct
   * @param {Object} args
   * @param {Object} args.product Product fields to update
   * @param {Object} [args.productId] Product ID to update. Leave blank for current product.
   * @param {Object} [args.shopId] Shop ID of the product to update. Leave blank for current shop.
   */
  const onUpdateProgram = useCallback(async ({
    program: programLocal,
   // programId: programIdLocal = program._id,
    shopId: shopIdLocal = shopId
  }) => {
    
    try {
      await updateProgram({
        variables: {
          input: {
            programId: programLocal.id,
            shopId: shopIdLocal,
            name:programLocal.title,
            type:programLocal.type,
            field:programLocal.fieldOfStudy,
            batches:programLocal.batches,
            duration:programLocal.duration,
            productIds:programLocal.modules,
            program_content:programLocal.description,
            price:programLocal.price,
            priceType:programLocal.priceType,
            faqs:programLocal.faqData,
            modes:programLocal.modes


          }
        }
      });

      // Refetch on success to force a cache update
      refetchProgram();

      enqueueSnackbar("Program updated successfully", { variant: "success" });
    } catch (error) {
      
      enqueueSnackbar("Program update failed", { variant: "error" });
    }
  }, [
    enqueueSnackbar,
    program,
    shopId,
    updateProgram,
    refetchProgram
  ]);

 

  return {
    onUpdateProgram,
    program: programQueryResult && programQueryResult.program,
    refetchProgram,
    shopId,
  };
}

export default useProgram;

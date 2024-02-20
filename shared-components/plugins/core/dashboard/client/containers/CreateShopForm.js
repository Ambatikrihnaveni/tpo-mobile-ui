import React, { useState } from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";
import { useMutation } from "@apollo/react-hooks";
import { useNavigate } from "react-router-dom";
import gql from "graphql-tag";
import Logger from "/client/modules/logger";
import CreateShopForm from "../components/CreateShopForm.js";
import useAuth from '../../../../../client/ui/hooks/useAuth';
import useCurrentShopId from '../../../../../client/ui/hooks/useCurrentShopId';


const createShopMutation = gql`
  mutation createShop($input: CreateShopInput!) {
    createShop(input: $input) {
      shop {
        _id
      }
    }
  }
`;
/**
 * CreateShopForm
 * @returns {Node} React component
 */
export default function CreateShopFormContainer() {
  const [createShop] = useMutation(createShopMutation, { ignoreResults: true });
  const navigate = useNavigate();
  const {refetchViewer} = useAuth()
  const {setShopId}=useCurrentShopId()
  const [insError,setInsError] = useState('')
  const [data,setData] = useState({})
  const onSubmit = (input) => {
    
    createShop({ variables: {input}}).then((data)=>{
      
      if (data?.data?.createShop?.shop?._id) {
        
    const id=data?.data?.createShop?.shop?._id
    setShopId(id)
    refetchViewer()
       // localStorage.setItem('accounts:shopId',id ); 
     
        navigate('/dashboard')};
    }).catch((error)=>{
      if(error.message=="GraphQL error: Institute Name is already exist") {
        setInsError('Institute Name is already exist')
        setTimeout(()=>{
          setInsError("")
        },3000)
      } 
    })
  }
  return (
    <CreateShopForm
      onSubmit={onSubmit}
      insError={insError}
    />
  );
}

registerComponent("CreateShopForm", CreateShopFormContainer);

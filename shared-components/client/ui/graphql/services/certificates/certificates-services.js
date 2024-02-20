import React, { Component } from 'react'
import BaseService from '../base-service';
import certificates from './queries/certificates'
import createCertificate from './mutations/createCertificate';
import removeCertificate from './mutations/removeCertificate';


export default class CertificatesServices extends Component {

    static async getCertificates(shopId) {

        const { data } = await BaseService.executeQueryWithVariables(certificates, {
         shopId
        });
        const records = data.certificates
        return records;
      }


      static async createCertificate(shopId,htmlData,certificateImage,authority,template,certifiTemp,logo) {

        const { data } = await BaseService.executeMutationWithVariables(createCertificate, {
            input:{
                shopId,
               // html_content:htmlData,
                templateImage:certificateImage,
                template:template,
                authority:authority,
                certifiTemp:certifiTemp,
                logo:logo
              }
        });
        const records = {}
        return records;
      }


      static async removeCertificate(deletePrms) {
        const { data } = await BaseService.executeMutationWithVariables(removeCertificate, {
          shopId:deletePrms.shopId,
          id:deletePrms.id
        });
        const records = data.removeCertificate
        return records;
      }
}
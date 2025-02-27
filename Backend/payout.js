import { Cashfree } from "cashfree-payout";
import crypto from "crypto";

Cashfree.XClientId = "CF10478964CUVBGQVSI14C73EO7QNG";
Cashfree.XClientSecret = "cfsk_ma_test_f66a4cf220c08ff1abfc65641e9c683b_70fef53f";
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

function generateRandomBankAccountNumber() {
  return Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
}
function generateRandomTransferId() {
  return crypto.randomBytes(16).toString('hex');
}


  // export async function createBeneficiary(name,email){
  //   const bank_account_number = generateRandomBankAccountNumber();
  //   const bank_ifsc = "HDFC0000002"; 

  //   const beneficiaryData = {
  //       beneficiary_id:name + "12233",
  //       beneficiary_name: name,
  //       beneficiary_instrument_details: {
  //         bank_account_number: bank_account_number,
  //         bank_ifsc: bank_ifsc,
  //         vpa: "test@upi"
  //       },
  //       beneficiary_contact_details: {
  //         beneficiary_email: email,
  //       }
  //     };
  //     console.log(beneficiaryData);

     
      

  //   try {
  //     const res = await Cashfree.PayoutFetchBeneficiary(
  //       "2024-01-01", 
  //         "unqiueif",
  //         beneficiaryData.beneficiary_id
  //     );
  //     if(res.data.beneficiary_id){
  //       return res.data.beneficiary_id;
  //     }
  //       else{
  //         const response = await Cashfree.PayoutCreateBeneficiary(
  //           "2024-01-01", 
  //           "unqiueif",
  //           beneficiaryData
  //         );
  //         return response.data.beneficiary_id;
  //       }
  //     } catch (error) {
  //       console.error("Error initiating transfer:", error.response ? error.response.data : error.message);
  //     }



  // }
  export async function createBeneficiary(name, email) {
    const bank_account_number = generateRandomBankAccountNumber();
    const bank_ifsc = "HDFC0000002"; 
  
    const beneficiaryData = {
      beneficiary_id: name + "12233",
      beneficiary_name: name,
      beneficiary_instrument_details: {
        bank_account_number: bank_account_number,
        bank_ifsc: bank_ifsc,
        vpa: "test@upi"
      },
      beneficiary_contact_details: {
        beneficiary_email: email,
      }
    };
    console.log(beneficiaryData);
    try {
      // Check if the beneficiary exists
      const res = await Cashfree.PayoutFetchBeneficiary(
        "2024-01-01", 
        "unique_request_id_123",
        beneficiaryData.beneficiary_id
      );
  
      if (res.data.beneficiary_id) {
        console.log("yes");
        console.log("Beneficiary exists:", res.data.beneficiary_id);
        return res.data.beneficiary_id;
      }
    } catch (error) {
      
      console.log("This is the error code" ,error.response.data);
      if (error.response.data.code  === "beneficiary_not_found") {
        console.log("no");
        try {
          const response = await Cashfree.PayoutCreateBeneficiary(
            "2024-01-01", 
            "unique_request_id_123",
            beneficiaryData
          );
          console.log("Beneficiary created successfully:", response.data);
          return response.data.beneficiary_id;
        } catch (createError) {
          console.error("Error creating beneficiary:", createError.response ? createError.response.data : createError.message);
        }
      } else {
        console.error("Error checking beneficiary:", error.response ? error.response.data : error.message);
      }
    }
  };


 export async function PaytoUser(id,amount){
  const transferId = generateRandomTransferId();

    const transferData = {
        beneId: id,
        amount: amount,
        transferId: transferId,
        transferMode: "banktransfer",
        remarks: "Payment for services",
        transfer_amount:amount,
        transfer_id:transferId,
        beneficiary_details:{beneficiary_id:id}
      };
      try {
             const response = await Cashfree.PayoutInitiateTransfer(
                "2024-01-01", // x_api_version
                "unique_request_id_123", // x_request_id (optional)
                 transferData // CreateTransferRequest
               );
               console.log("Transfer initiated successfully:", response.data);
            } catch (error) {
              console.error("Error initiating transfer:", error.response ? error.response.data : error.message);
            }


 }
//  const ans1 = await PaytoUser("Manush12233",1000);
//  console.log(ans1);
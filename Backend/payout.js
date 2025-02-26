import { Cashfree } from "cashfree-payout";

Cashfree.XClientId = "CF10478964CUVBGQVSI14C73EO7QNG";
Cashfree.XClientSecret = "cfsk_ma_test_f66a4cf220c08ff1abfc65641e9c683b_70fef53f";
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;



  async function createBeneficiary(name,bank_account_number,bank_ifsc,email){

    const beneficiaryData = {
        beneficiary_id:name + "12233",
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
        const response = await Cashfree.PayoutCreateBeneficiary(
          "2024-01-01", 
          "unqiueif",
          beneficiaryData
        );
        console.log("Beneficary created successfully:", response.data);
      } catch (error) {
        console.error("Error initiating transfer:", error.response ? error.response.data : error.message);
      }



  }
//  const ans = await createBeneficiary("Manush","1234566","HDFC0000002","zobime660@gmail.com");

 async function PaytoUser(id,amount){

    const transferData = {
        beneId: id,
        amount: amount,
        transferId: id+amount,
        transferMode: "banktransfer",
        remarks: "Payment for services",
        transfer_amount:amount,
        transfer_id:id + amount,
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
 const ans1 = await PaytoUser("Manush12233",1000);
 console.log(ans1);
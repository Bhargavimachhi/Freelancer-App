import crypto from "crypto";
import { Cashfree } from "cashfree-pg";
Cashfree.XClientId = "TEST104789643c6ca7ecadb2f1637ba846987401";
Cashfree.XClientSecret = "cfsk_ma_test_ac00b5486fb8476e9c8a3ace1d691608_41004b67";
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

function generateOrderId() {
  const uniqueId = crypto.randomBytes(16).toString('hex');

  const hash = crypto.createHash('sha256');
  hash.update(uniqueId);

  const orderId = hash.digest('hex');

  return orderId.slice(0, 12);
}


export const payment = async (req, res) => {
  const {amount} = req.body;

  try {


      let request = {
          "order_amount": amount,
          "order_currency": "INR",
          "order_id": generateOrderId(),
          "customer_details": {
              "customer_id": "webcodder01",
              "customer_phone": "9999999999",
              "customer_name": "Web Codder",
              "customer_email": "webcodder@example.com"
          },
      }
     

      Cashfree.PGCreateOrder("2022-09-01", request).then(response => {
          res.json(response.data);

          console.log('Order Created successfully:',response.data);
      }).catch(error => {
          console.error(error.response.data.message);
      });

      


  } catch (error) {
      console.log(error);
  }
};

export const verify = async (req, res) => {

  try {

      let {
          orderId
      } = req.body;

      Cashfree.PGOrderFetchPayments("2023-08-01", orderId).then((response) => {

          res.json(response.data);
      }).catch(error => {
          console.error(error.response.data.message);
      });


  } catch (error) {
      console.log(error);
  }
};


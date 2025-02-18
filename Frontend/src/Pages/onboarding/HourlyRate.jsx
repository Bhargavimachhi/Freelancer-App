import { useState } from "react";

export default function HourlyRateForm() {
    const [hourlyRate, setHourlyRate] = useState(null);
    const serviceFeePercentage = 0.1; // 10% service fee
    const serviceFee = isNaN(hourlyRate * serviceFeePercentage) ? 0.00 : (hourlyRate * serviceFeePercentage);
    const youGet = isNaN(hourlyRate - serviceFee) ? 0.00 : (hourlyRate - serviceFee);

    console.log(serviceFee);
    

  return (
    <div className="flex flex-col  p-6 max-w-7xl mx-auto my-4">
      <h1 className="text-2xl sm:text-4xl font-semibold">Now, let’s set your hourly rate.</h1>
      <p className="text-text mt-2">
        Clients will see this rate on your profile and in search results once you publish your profile.
        You can adjust your rate every time you submit a proposal.
      </p>

      <div className="w-full mt-6 space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <div>
            <h2 className="text-lg font-medium">Hourly rate</h2>
            <p className="text- text-sm mb-3">Total amount the client will see.</p>
          </div>
          <div className="flex items-center">
            <input
              type="number"
              className="border rounded-md px-3 py-1 w-24 text-right"
              value={`${hourlyRate}`}
              placeholder="$0.00"
              onChange={(e) => setHourlyRate(parseFloat(e.target.value))}
            />
            <span>/hr</span>
          </div>
        </div>

        <div className="flex justify-between items-center border-b pb-2 ">
          <div>
            <h2 className="text-lg font-medium">Service fee <span className="text-btn cursor-pointer">Learn more</span></h2>
            <p className="text-text text-sm mb-3">This helps us run the platform and provide services like payment protection and customer support.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="border rounded-md px-3 py-1 w-24 text-right">-${serviceFee.toFixed(2)}</span>
            <span>/hr</span>
          </div>
        </div>

        <div className="flex justify-between items-center border-b pb-2">
          <div>
            <h2 className="text-lg font-medium">You'll get</h2>
            <p className="text-text text-sm mb-3">The estimated amount you'll receive after service fees</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="border rounded-md px-3 py-1 w-24 text-right">${youGet.toFixed(2) || 0}</span>
            <span>/hr</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";

export default function HourlyRateForm() {
    const [hourlyRate, setHourlyRate] = useState(null);
    const serviceFeePercentage = 0.1; // 10% service fee
    const serviceFee = isNaN(hourlyRate * serviceFeePercentage) ? 0.00 : (hourlyRate * serviceFeePercentage);
    const youGet = isNaN(hourlyRate - serviceFee) ? 0.00 : (hourlyRate - serviceFee);

    console.log(serviceFee);
    

  return (
    <div className="flex flex-col p-6 mx-auto my-4 max-w-7xl">
      <h1 className="text-2xl font-semibold sm:text-4xl">Now, let’s set your hourly rate.</h1>
      <p className="mt-2 text-text">
        Clients will see this rate on your profile and in search results once you publish your profile.
        You can adjust your rate every time you submit a proposal.
      </p>

      <div className="w-full mt-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b">
          <div>
            <h2 className="text-lg font-medium">Hourly rate</h2>
            <p className="mb-3 text-sm text-">Total amount the client will see.</p>
          </div>
          <div className="flex items-center">
            <input
              type="number"
              className="w-24 px-3 py-1 text-right border rounded-md"
              value={`${hourlyRate}`}
              placeholder="$0.00"
              onChange={(e) => setHourlyRate(parseFloat(e.target.value))}
            />
            <span>/hr</span>
          </div>
        </div>

        <div className="flex items-center justify-between pb-2 border-b ">
          <div>
            <h2 className="text-lg font-medium">Service fee <span className="cursor-pointer text-btn">Learn more</span></h2>
            <p className="mb-3 text-sm text-text">This helps us run the platform and provide services like payment protection and customer support.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-24 px-3 py-1 text-right border rounded-md">-${serviceFee.toFixed(2)}</span>
            <span>/hr</span>
          </div>
        </div>

        <div className="flex items-center justify-between pb-2 border-b">
          <div>
            <h2 className="text-lg font-medium">You'll get</h2>
            <p className="mb-3 text-sm text-text">The estimated amount you'll receive after service fees</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-24 px-3 py-1 text-right border rounded-md">${youGet.toFixed(2) || 0}</span>
            <span>/hr</span>
          </div>
        </div>
      </div>
    </div>
  );
}

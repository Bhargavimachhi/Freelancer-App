import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useUserContext } from "@/Context/UserContext";
import ReviewsModal from "../ReviewsModal";
import { Star } from "lucide-react";

const Reviews = () => {
  const [editReviews, setEditReviews] = useState(null);
  const { userData } = useUserContext();

  const ratingsCount = userData?.reviews?.length || 0;
  const ratingSummary = [0, 0, 0, 0, 0];
  userData?.reviews?.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingSummary[review.rating - 1]++;
    }
  });

  const totalRatings = ratingSummary.reduce((a, b) => a + b, 0);
  const averageRating =
    totalRatings > 0
      ? (
          userData.reviews.reduce((acc, r) => acc + r.rating, 0) / totalRatings
        ).toFixed(1)
      : "0.0";

  return (
    <Card className="mt-8">
      <CardHeader className="flex flex-row items-center justify-between px-6">
        <CardTitle className="text-lg font-semibold">
          Ratings & Reviews
        </CardTitle>
        {/* <div className="flex items-center justify-center gap-2">
          <ReviewsModal
            editReviews={editReviews}
            setEditReviews={setEditReviews}
          />
        </div> */}
      </CardHeader>
      <CardContent className="grid items-center grid-cols-1 sm:grid-cols-2">
        <div className="mb-4 text-center">
          <div className="flex items-center justify-center gap-1 text-3xl font-bold">
            <span>{averageRating}</span>
            <Star size={30} className="text-yellow-500" />
          </div>
          <div className="text-gray-600">
            {totalRatings} Ratings & {ratingsCount} Reviews
          </div>
        </div>
        <div>
          {[5, 4, 3, 2, 1].map((star, index) => (
            <div key={star} className="flex items-center gap-2 mb-2">
              <div className="flex gap-1">
                <span className="text-sm font-medium">{star} </span>
                <span className="text-sm font-medium"> ★</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-green-500 rounded-full"
                  style={{
                    width: `${
                      (ratingSummary[star - 1] / totalRatings) * 100 || 0
                    }%`,
                  }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">
                {ratingSummary[star - 1]}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Reviews;

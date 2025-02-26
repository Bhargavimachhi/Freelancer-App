import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useUserContext } from "@/Context/UserContext";
import ReviewsModal from "../ReviewsModal";
import { ICONS } from "@/assets/icons/icons";

const Reviews = () => {
  const [editReviews, setEditReviews] = useState(null);
  const { userData } = useUserContext();

  const handleEdit = (review) => {
    setEditReviews(review);
  };

  return (
    <Card className="mt-8">
      <CardHeader className="flex flex-row items-center justify-between px-6">
        <CardTitle className="text-lg font-semibold">Reviews</CardTitle>
        <div className="flex items-center justify-center gap-2">
          <ReviewsModal
            editReviews={editReviews}
            setEditReviews={setEditReviews}
          />
        </div>
      </CardHeader>
      <CardContent>
        {userData?.reviews?.length > 0 ? (
          userData.reviews.map((review) => (
            <div
              key={review._id}
              className="flex items-center justify-between p-5 transition-all duration-300 ease-in-out bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg"
            >
              <div className="pb-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-text">Rating :</span>
                  {[...Array(5)].map((_, index) => (
                    <ICONS.STAR
                      key={index}
                      size={20}
                      className={
                        index < review.rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-1 sm:gap-2 sm:items-center sm:justify-start sm:flex-row">
                  <span className="font-semibold text-text">Reviews :</span>
                  <p className="text-sm text-text">{review.description}</p>
                </div>
              </div>
              {/* Edit Button */}
              <button
                onClick={() => handleEdit(review)}
                className="p-2 transition-colors duration-200 bg-gray-100 rounded-full hover:bg-gray-300"
              >
                <ICONS.EDIT size={20} className="text-text" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default Reviews;

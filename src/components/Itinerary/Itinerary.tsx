import React from 'react';
import { Section } from '../../types/itineraryTypes';

interface ItineraryProps {
  title: string;
  sections: Section[];
}

const Itinerary: React.FC<ItineraryProps> = ({ title, sections }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2>
      {sections.map((section, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {section.time}
          </h3>
          <div className="space-y-4">
            {section.activities.map((activity, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4">
                <div className="grid gap-2">
                  <div className="text-gray-800">
                    <span className="font-semibold">Activity:</span> {activity.activity}
                  </div>
                  <div className="text-gray-700">
                    <span className="font-semibold">Rating:</span> {activity.rating}
                  </div>
                  {activity.weather && (
                    <div className="text-gray-700">
                      <span className="font-semibold">Weather:</span> {activity.weather}
                    </div>
                  )}
                  <div className="text-gray-700">
                    <span className="font-semibold">Duration:</span> {activity.duration}
                  </div>
                  {activity.budget && (
                    <div className="text-gray-700">
                      <span className="font-semibold">Budget:</span> {activity.budget}
                    </div>
                  )}
                  {activity.comments && (
                    <div className="text-gray-700">
                      <span className="font-semibold">Comments:</span> {activity.comments}
                    </div>
                  )}
                  {activity.commute_time && (
                    <div className="text-gray-700">
                      <span className="font-semibold">Commute Time:</span> {activity.commute_time}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Itinerary; 
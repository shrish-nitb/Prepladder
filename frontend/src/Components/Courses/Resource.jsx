import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Resource = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [resource, setResource] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { resourceId } = useParams();

  useEffect(() => {
    fetchData();
  }, [resourceId]); // Add resourceId to the dependency array

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/course/resource/${resourceId}`);
      setResource(res?.data?.resource[0]);
      setLoading(false);
    } catch (err) {
      setError("Failed to load the resource");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-[#181818] text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-[#181818] text-white">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen h-full mx-auto relative bg-[#181818] text-white overflow-x-hidden">
      <div className="w-10/12 h-full flex flex-col mx-auto">
        {resource?.type === "video" ? (
          <div className="flex items-center justify-center p-5 h-screen w-full">
            <iframe
              src={resource?.link}
              className="w-full h-full"
              style={{ border: 0 }}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              title="Video Resource"
            ></iframe>
          </div>
        ) : (
          <div className="flex items-center justify-center p-5 h-screen w-full">
            <iframe
              src={`${resource?.link}#toolbar=0&navpanes=0&scrollbars=0`}
              className="w-full h-full"
              style={{ border: 0, display: 'block' }}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              title="PDF Resource"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resource;

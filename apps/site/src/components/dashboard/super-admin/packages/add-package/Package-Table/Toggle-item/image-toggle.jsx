import React from 'react';

const ImageToggle = ({ item, features, setFeatures }) => {

  const handleFeatureChecked = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      features.featureData.map((feature) => {
        if (feature.name === item.name) {
          feature.active = true;
        }
      });
      setFeatures({
        featureData: features.featureData,
      });
    } else {
      features.featureData.map((feature) => {
        if (feature.name === item.name) {
          feature.active = false;
        }
      }
      );
      setFeatures({
        featureData: features.featureData,
      });
    }
  }

  return (
    <div>
      <label
        htmlFor="image"
        className="text-base text-themeWhiteLighter cursor-pointer"
      >
        Enable
      </label>
      <div className="relative inline-block w-10 ml-6 align-middle select-none transition duration-200 ease-in-out">
        <input
          type="checkbox"
          name="image"
          id="image"
          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-2 border-themeGrayLight appearance-none cursor-pointer"
          onChange={handleFeatureChecked}
        />
        <label
          htmlFor="image"
          className="toggle-label block overflow-hidden h-6 rounded-full bg-themeGrayLight cursor-pointer"
        ></label>
      </div>
    </div>
  );
};

export default ImageToggle;
import React from 'react';

const AddFeaturesForm = ({ features, setFeatures, featureTitle, setFeatureTitle, featureText, setFeatureText }) => {
  const [featuresError, setFeaturesError] = React.useState('');

  const handleAddFearue = () => {
    if (featureTitle === "" || featureText === "") {
      return setFeaturesError('Please fill all the fields');
    }
    const featurePair = {
      name: featureTitle,
      details: featureText,
      active: false,
    };
    setFeatures({
      featureData: [...features?.featureData, featurePair],
    });
    setFeatureTitle("");
    setFeatureText("");
    setFeaturesError("");
  }

  return (
    <div className="pt-10">
      <p className="pb-6 text-base font-semibold text-themeBlackDarker">
        Features
      </p>
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-6">
        {/* package features title  */}
        <div className="w-full sm:w-4/12">
          <label className="w-full" htmlFor="">
            <input
              type="text"
              className="py-3 px-3 focus:outline-none border border-themeGrayLight rounded-md placeholder:text-themeGrayWhite placeholder:text-sm w-full"
              placeholder="Title"
              name="featureTitle"
              onChange={(e) => {
                setFeatureTitle(e.target.value);
              }}
              value={featureTitle}
            />
          </label>
        </div>

        {/* package features details  */}
        <div className="w-full sm:w-4/12">
          <label className="w-full" htmlFor="">
            <input
              type="text"
              className="py-3 px-3 focus:outline-none border border-themeGrayLight rounded-md placeholder:text-themeGrayWhite placeholder:text-sm w-full"
              placeholder="Text"
              name="featureText"
              onChange={(e) => {
                setFeatureText(e.target.value);
              }}
              value={featureText}
            />
          </label>
        </div>
        <div className="w-full sm:w-4/12 self-end">
          <div
            onClick={handleAddFearue}
            className="w-full sm:w-4/12 md:w-8/12 lg:w-4/12 text-sm font-semibold text-white py-3.5 bg-themePrimary rounded-md text-center cursor-pointer">
            Add
          </div>
        </div>
      </div>
      {featuresError !== '' && (
        <span className="text-red-400 text-sm italic">
          {featuresError}
        </span>
      )}
    </div>
  );
};

export default AddFeaturesForm;
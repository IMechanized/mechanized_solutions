import _ from 'lodash';
import React from 'react';
import { HiOutlineTrash } from 'react-icons/hi';

const Description = ({ register, errors, spectication, setSpectication }) => {
    const [value, setValue] = React.useState('');
    const [editSpecification, setEditSpecification] = React.useState('');
    const [specificationError, setSpecificationError] = React.useState(false);

    const data = ['1', '2', '3', '4', '5', '6'];

    const handleAddSpecification = (item) => {
        // if item repeat in setSpectication.specificationData array returns false
        if (_.includes(spectication.specificationData, item)) {
            return setSpecificationError(true);
        }
        setSpectication({
            specificationData: [...spectication.specificationData, item],
        });
        setEditSpecification('');
        setSpecificationError(false);
    };

    const handleRemoveSpecification = (item) => {
        const newData = _.filter(
            spectication.specificationData,
            (o) => o !== item,
        );
        setSpectication({
            specificationData: newData,
        });
    };

    const handleEditSpecification = (item) => {
        setEditSpecification(item);
    };

    return (
        <div>
            <h2 className="text-xl font-bold text-themeBlackDarker pb-10">
                Description &amp; Specification
            </h2>

            {/* description  */}
            <p className="pb-2 text-sm font-semibold text-themeWhiteLighter">
                Ad Description
            </p>
            <textarea
                className={`w-full focus:outline-none p-3 h-40 sm:h-32 border border-themeGrayLight rounded-md placeholder:text-themeGray ${
                    errors.description && 'border-themeRedLight'
                }`}
                name=""
                placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                {...register('description', {
                    required: 'Description is required',
                })}
            />

            {/* specification  */}
            <p className="mt-10 pb-6 text-sm font-semibold text-themeBlackDarker">
                Specification
            </p>
            <div className="w-full md:w-7/12">
                <div className="w-full flex flex-wrap sm:flex-nowrap gap-3 ">
                    <input
                        type="text"
                        className="py-3 px-3 focus:outline-none border border-themeGrayLight rounded-md w-full placeholder:text-themeGray"
                        placeholder="New Specification"
                        name=""
                        value={editSpecification}
                        onChange={(e) => {
                            setValue(e.target.value);
                            setEditSpecification(e.target.value);
                        }}
                    />

                    <button
                        type="button"
                        className="bg-themePrimary rounded-md text-base font-normal text-white w-full sm:w-auto py-3 px-8"
                        onClick={() => handleAddSpecification(value)}
                    >
                        Save
                    </button>
                </div>
                {specificationError && (
                    <p className="text-xs text-themeRedLight font-semibold text-center">
                        Specification already exist
                    </p>
                )}
                <div className="pt-8">
                    <div className="space-y-4">
                        {_.map(
                            spectication.specificationData,
                            (item, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center"
                                >
                                    <li className="marker:text-themePrimary list-disc list-inside w-9/12 truncate sm:w-10/12">
                                        {item}
                                    </li>
                                    <div className="flex items-center gap-3">
                                        <svg
                                            className="cursor-pointer text-themeWhiteLighter hover:text-themePrimary"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            onClick={() => {
                                                handleRemoveSpecification(item);
                                                handleEditSpecification(item);
                                            }}
                                        >
                                            <path
                                                d="M9 11.2501L15.2888 4.93883C15.5841 4.64345 15.7501 4.24282 15.7501 3.82508C15.7501 3.40734 15.5841 3.00672 15.2888 2.71133C14.9934 2.41595 14.5927 2.25 14.175 2.25C13.7573 2.25 13.3566 2.41595 13.0613 2.71133L6.75 9.00008V11.2501H9Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M12 3.75L14.25 6"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M6.75184 5.30078C5.44012 5.49299 4.24964 6.1742 3.41932 7.2077C2.58899 8.2412 2.18028 9.55049 2.27521 10.8728C2.37013 12.1951 2.96167 13.4326 3.9311 14.3369C4.90054 15.2412 6.17612 15.7454 7.50184 15.7483C8.76419 15.7481 9.98425 15.2933 10.9386 14.467C11.893 13.6408 12.5178 12.4984 12.6986 11.249"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <HiOutlineTrash
                                            className="text-themeWhiteLighter cursor-pointer hover:text-themePrimary"
                                            onClick={() =>
                                                handleRemoveSpecification(item)
                                            }
                                        />
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                </div>
            </div>

            {/* special note  */}
            <p className=" mt-10 pb-2 text-sm font-semibold text-themeWhiteLighter">
                Special note
            </p>
            <textarea
                className="w-full focus:outline-none p-3 h-40 sm:h-32 border border-themeGrayLight rounded-md placeholder:text-themeGray"
                name=""
                placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
                {...register('specialNote')}
            />
        </div>
    );
};

export default Description;

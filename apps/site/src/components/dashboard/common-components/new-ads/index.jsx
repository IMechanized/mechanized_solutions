import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { useSWRConfig } from 'swr';
import { ThemeContext } from '../../../../context/ThemeContext';
import useUser from '../../../../lib/user';
import { authAxios } from '../../../../utils/axiosKits';
import AddInfo from './add-info';
import BasicInfo from './basic-info';
import Description from './description';
import Gallery from './gallery';
import PersonalInfo from './personal-info';
import Pricing from './pricing';

const formItem = [
    {
        id: 1,
        name: 'Basic Info',
    },
    {
        id: 2,
        name: 'Ads Info',
    },
    {
        id: 3,
        name: 'Description & Specification',
    },
    {
        id: 4,
        name: 'Pricing',
    },
    {
        id: 5,
        name: 'Gallery',
    },
    {
        id: 6,
        name: 'Personal Info',
    },
];

const AddNewAds = () => {
    const {
        adsCategoryData,
        adsCategoryError,
        topLocationData,
        filtersData,
        filtersError,
    } = React.useContext(ThemeContext);
    const [active, setActive] = React.useState(1);
    const [spectication, setSpectication] = React.useState({
        specificationData: [],
    });
    const { user } = useUser();
    const [coverName, setCoverName] = React.useState(null);
    const [galleryName, setGalleryName] = React.useState([]);
    const [videoName, setVideoName] = React.useState(null);
    const [selectedTags, setSelectedTags] = React.useState([]);
    const [newTags, setNewTags] = React.useState([]);

    const { addToast } = useToasts();
    const router = useRouter();
    const { mutate } = useSWRConfig({
        refreshInterval: 0,
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: 'onChange',
    });

    const onSubmit = async (data) => {
        // if active <= 5 then next
        if (active <= 5) {
            setActive(active + 1);
        }

        if (active > 5) {
            const {
                category,
                location,
                adTitle,
                adTags,
                itemCondition,
                itemWarranty,
                adType,
                description,
                specialNote,
                currency,
                priceType,
                price,
                photoCover,
                photoGallery,
                video,
                fullName,
                email,
                phone,
                personalLocation,
            } = data;

            if (category == '') {
                return validationToast('Category');
            } else if (location == '') {
                return validationToast('location');
            } else if (adTitle == '') {
                return validationToast('Ad Title');
            } else if (itemCondition == null) {
                return validationToast('Item Condition');
            } else if (itemWarranty == null) {
                return validationToast('Warranty');
            } else if (adType == null) {
                return validationToast('Type Of Ad');
            } else if (description == '') {
                return validationToast('Ad Description');
            } else if (price == '') {
                return validationToast('Price');
            } else if (fullName == '') {
                return validationToast('Name in Personal Info ');
            } else if (personalLocation == '') {
                return validationToast('Location in Personal Info ');
            }

            const specifications = spectication.specificationData;

            const priceDetails = {
                currency: currency,
                priceType: priceType,
                price: price,
            };

            const personalInfo = {
                fullName: fullName,
                email: email,
                phone: phone,
                location: personalLocation,
            };

            const formData = new FormData();
            formData.append('adTitle', adTitle);
            formData.append('category', category);
            formData.append('location', location);
            formData.append('tags', JSON.stringify(adTags));
            formData.append('itemCondition', itemCondition);
            formData.append('itemWarranty', itemWarranty);
            formData.append('adType', adType);
            formData.append('specifications', JSON.stringify(specifications));
            formData.append('description', description);
            formData.append('specialNote', specialNote);
            formData.append('priceDetails', JSON.stringify(priceDetails));
            formData.append('personalInfo', JSON.stringify(personalInfo));

            if (photoCover && photoCover[0]) {
                formData.append('adCoverImage', photoCover[0]);
            }

            if (photoGallery) {
                for (const single_file of photoGallery) {
                    formData.append('adGallery', single_file);
                }
            }
            if (video && video[0]) {
                formData.append('adVideo', video[0]);
            }

            try {
                await authAxios({
                    method: 'POST',
                    url: '/user/ads',
                    data: formData,
                }).then((res) => {
                    addToast(res.data.message, {
                        appearance: 'success',
                        autoDismiss: true,
                    });
                    mutate('/user/ads');
                    // reset();
                    router.push('/dashboard/ads');
                });
            } catch (error) {
                if (error?.response?.data) {
                    addToast(error.response.data.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                } else {
                    addToast(error?.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                }
            }
        }
    };

    const validationToast = (filed) => {
        addToast(`${filed} fields is required`, {
            appearance: 'warning',
            autoDismiss: true,
        });
    };
    useEffect(() => {
        if (user?.data) {
            setValue(
                'fullName',
                user?.data?.fullName.firstName +
                    ' ' +
                    user?.data?.fullName.lastName,
            );
            setValue('email', user?.data?.email);
            setValue('phone', user?.data?.phoneNumber);
        }
    }, [setValue, user]);

    return (
        <section className="bg-themeWhiteLight">
            <div className="container mx-auto w-full pb-44">
                <h2 className="text-3xl font-bold text-themeBlackDarker text-center pb-12">
                    Add New Ads
                </h2>
                <div className="flex flex-wrap xl:flex-nowrap gap-6 sm:gap-10 lg:justify-center">
                    {formItem.map((item, index) => (
                        <div key={index} className="flex gap-2 sm:gap-4 ">
                            <div className="relative mb-2">
                                <div
                                    className={`w-7 h-7 sm:w-9 sm:h-9 m-auto border rounded-full text-lg flex items-center justify-center ${
                                        active >= item.id
                                            ? 'border-themePrimary text-themePrimary'
                                            : 'border-themeGrayLight text-themeGrayWhite'
                                    } ${
                                        active > item.id
                                            ? 'bg-themePrimary'
                                            : 'bg-white'
                                    }`}
                                >
                                    <p
                                        className={`text-sm sm:text-lg ${
                                            active > item.id
                                                ? 'text-themeGrayLight'
                                                : ''
                                        } ${
                                            active === item.id
                                                ? 'text-themePrimary'
                                                : ''
                                        }}`}
                                    >
                                        {item.id}
                                    </p>
                                </div>
                            </div>
                            <div
                                className={`text-sm sm:text-base font-semibold mt-1  ${
                                    active >= item.id
                                        ? 'text-themePrimary'
                                        : 'text-themeGray'
                                }`}
                            >
                                {item.name}
                            </div>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="bg-white p-5 sm:p-10 mt-12 rounded-xl max-w-4xl mx-auto shadow-boxShadow">
                        {(active === 1 && (
                            <BasicInfo
                                register={register}
                                errors={errors}
                                setValue={setValue}
                                adsCategoryData={adsCategoryData}
                                adsCategoryError={adsCategoryError}
                                topLocationData={topLocationData}
                                filtersData={filtersData}
                                filtersError={filtersError}
                                selectedTags={selectedTags}
                                setSelectedTags={setSelectedTags}
                                newTags={newTags}
                                setNewTags={setNewTags}
                            />
                        )) ||
                            (active === 2 && (
                                <AddInfo
                                    register={register}
                                    filtersData={filtersData}
                                    errors={errors}
                                />
                            )) ||
                            (active === 3 && (
                                <Description
                                    register={register}
                                    errors={errors}
                                    spectication={spectication}
                                    setSpectication={setSpectication}
                                />
                            )) ||
                            (active === 4 && (
                                <Pricing
                                    register={register}
                                    errors={errors}
                                    filtersData={filtersData}
                                />
                            )) ||
                            (active === 5 && (
                                <Gallery
                                    register={register}
                                    errors={errors}
                                    setValue={setValue}
                                    coverName={coverName}
                                    setCoverName={setCoverName}
                                    galleryName={galleryName}
                                    setGalleryName={setGalleryName}
                                    videoName={videoName}
                                    setVideoName={setVideoName}
                                />
                            )) ||
                            (active === 6 && (
                                <PersonalInfo
                                    register={register}
                                    errors={errors}
                                />
                            )) ||
                            (active === 6 && (
                                <PersonalInfo
                                    errors={errors}
                                    register={register}
                                />
                            ))}
                    </div>
                    <div className="flex justify-between max-w-4xl mx-auto mt-12">
                        <button
                            type="button"
                            className="bg-themeGray py-3 px-8 rounded-md text-base font-semibold text-white"
                            disabled={active === 1}
                            onClick={() => setActive(active - 1)}
                        >
                            Prev
                        </button>
                        <button
                            type="submit"
                            className="flex gap-2 bg-themePrimary py-3 px-8 rounded-md text-base font-semibold text-white cursor-pointer"
                            // disabled={active === 7}
                            disabled={isSubmitting}
                        >
                            {/* {active === 5 ? "Finish" : "Next"} */}
                            {active <= 5 && 'Next'}
                            {active > 5 &&
                                (isSubmitting ? 'Please wait' : 'Finish')}

                            {/* spinner */}
                            {isSubmitting && (
                                <div className="flex items-center justify-center ">
                                    <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                                </div>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};
export default AddNewAds;

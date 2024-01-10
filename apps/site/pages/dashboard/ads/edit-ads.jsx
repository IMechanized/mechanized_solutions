import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import useSWR, { useSWRConfig } from 'swr';
import AddInfo from '../../../src/components/dashboard/common-components/new-ads/add-info';
import BasicInfoEdit from '../../../src/components/dashboard/common-components/new-ads/basic-info-edit';
import Description from '../../../src/components/dashboard/common-components/new-ads/description';
import Gallery from '../../../src/components/dashboard/common-components/new-ads/gallery';
import PersonalInfo from '../../../src/components/dashboard/common-components/new-ads/personal-info';
import Pricing from '../../../src/components/dashboard/common-components/new-ads/pricing';
import DashboardLayout from '../../../src/components/dashboard/dashboard-layout';
import { ThemeContext } from '../../../src/context/ThemeContext';
import useUser, { UserGoBack, UserNotLogin } from '../../../src/lib/user';
import { authAxios } from '../../../src/utils/axiosKits';

// [x] Post ads form step data
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

const fetcher = (url) => authAxios(url).then((res) => res.data.data);

function EditAds() {
    const [active, setActive] = React.useState(1);
    const [selectedTags, setSelectedTags] = React.useState([]);
    const [newTags, setNewTags] = React.useState([]);

    const [coverName, setCoverName] = React.useState(null);
    const [galleryName, setGalleryName] = React.useState([]);
    const [oldGalleryName, setOldGalleryName] = React.useState([]);
    const [videoName, setVideoName] = React.useState(null);
    const [spectication, setSpectication] = React.useState({
        specificationData: [],
    });

    const {
        adsCategoryData,
        adsCategoryError,
        topLocationData,
        filtersData,
        filtersError,
    } = React.useContext(ThemeContext);
    const { user, loggedIn, loggedOut, isBuyer } = useUser();
    const userData = user?.data;

    const { addToast } = useToasts();
    const { mutate } = useSWRConfig({
        refreshInterval: 0,
    });

    const router = useRouter();
    const { data: adData, error: adError } = useSWR(
        `/user/ads/${router?.query?.active_id}`,
        fetcher,
        {
            refreshInterval: 0,
            // no-cache for edit ads
            revalidateOnMount: true,
        },
    );

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: 'onSubmit',
    });

    const validationToast = (filed) => {
        addToast(`${filed} fields is required`, {
            appearance: 'warning',
            autoDismiss: true,
        });
    };

    // [x] Edit ads submit handler
    const editAdsSubmitHandler = async (data) => {
        // if active <= 5 then next
        if (active <= 5) {
            setActive(active + 1);
        }

        if (active > 5) {
            const {
                category,
                location,
                adTitle,
                slug,
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
            } else if (slug == '') {
                return validationToast('Ads Slug');
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
            formData.append('slug', slug);
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
            formData.append('oldAdCoverImage', coverName);
            formData.append('oldAdVideo', videoName);
            formData.append('oldGallery', JSON.stringify(oldGalleryName));

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
                    method: 'PUT',
                    url: `/user/ads/${router?.query?.active_id}`,
                    data: formData,
                }).then((res) => {
                    addToast(res.data.message, {
                        appearance: 'success',
                        autoDismiss: true,
                    });
                    mutate('/user/ads');
                    router.push('/dashboard/ads');
                    // all data clear
                    setActive(1);
                    setSelectedTags([]);
                    setNewTags([]);
                    setCoverName(null);
                    setGalleryName([]);
                    setOldGalleryName([]);
                    setVideoName(null);
                    setSpectication({ specificationData: [] });
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

    // default value set
    React.useEffect(() => {
        if (adData) {
            setValue('adTitle', adData?.adTitle);
            setValue('slug', adData?.slug);
            setValue('category', adData?.category);
            setValue('location', adData?.location);
            setValue('adTags', adData?.tags);
            setValue('itemCondition', adData?.itemCondition);
            setValue('itemWarranty', adData?.itemWarranty);
            setValue('adType', adData?.adType);
            setValue('description', adData?.description);
            setValue('specialNote', adData?.specialNote);
            setSpectication({
                specificationData: adData?.specifications,
            });
            setValue('currency', adData?.priceDetails?.currency);
            setValue('priceType', adData?.priceDetails?.priceType);
            setValue('price', adData?.priceDetails?.price);
            setValue('fullName', adData?.personalInfo?.fullName);
            setValue('email', adData?.personalInfo?.email);
            setValue('phone', adData?.personalInfo?.phone);
            setValue('personalLocation', adData?.personalInfo?.location);
            if (adData?.adCoverImage) {
                setCoverName(adData?.adCoverImage);
            } else {
                setCoverName(null);
            }
            if (adData?.adGallery && adData?.adGallery.length > 0) {
                // set only url in galleryName
                const gallery = adData?.adGallery.map((item) => item.url);
                setGalleryName(gallery);
                setOldGalleryName(adData?.adGallery);
            } else {
                setGalleryName([]);
                setOldGalleryName([]);
            }

            if (adData?.adVideo) {
                setVideoName(adData?.adVideo);
            } else {
                setVideoName(null);
            }
        }
    }, [adData, setValue]);

    return (
        <>
            <Head>
                <title>Edit ads</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>

            {loggedOut && <UserNotLogin />}
            {isBuyer && <UserGoBack />}
            {userData && loggedIn && !isBuyer && (
                <DashboardLayout>
                    <main>
                        <section className="bg-themeWhiteLight">
                            <div className="container mx-auto w-full pb-44">
                                <h2 className="text-3xl font-bold text-themeBlackDarker text-center pb-12">
                                    Edit Ads
                                </h2>
                                {/* form step */}
                                <div className="flex flex-wrap xl:flex-nowrap gap-6 sm:gap-10 lg:justify-center">
                                    {formItem.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-2 sm:gap-4 cursor-pointer"
                                            onClick={() => setActive(item.id)}
                                        >
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

                                {/* form */}
                                <form
                                    onSubmit={handleSubmit(
                                        editAdsSubmitHandler,
                                    )}
                                >
                                    <div className="bg-white p-5 sm:p-10 mt-12 rounded-xl max-w-4xl mx-auto shadow-boxShadow">
                                        {(active === 1 && (
                                            <BasicInfoEdit
                                                register={register}
                                                errors={errors}
                                                setValue={setValue}
                                                adsCategoryData={
                                                    adsCategoryData
                                                }
                                                adsCategoryError={
                                                    adsCategoryError
                                                }
                                                topLocationData={
                                                    topLocationData
                                                }
                                                filtersData={filtersData}
                                                filtersError={filtersError}
                                                adData={adData}
                                                selectedTags={selectedTags}
                                                setSelectedTags={
                                                    setSelectedTags
                                                }
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
                                                    spectication={spectication}
                                                    setSpectication={
                                                        setSpectication
                                                    }
                                                    errors={errors}
                                                />
                                            )) ||
                                            (active === 4 && (
                                                <Pricing
                                                    register={register}
                                                    filtersData={filtersData}
                                                    errors={errors}
                                                />
                                            )) ||
                                            (active === 5 && (
                                                <Gallery
                                                    register={register}
                                                    setValue={setValue}
                                                    coverName={coverName}
                                                    setCoverName={setCoverName}
                                                    galleryName={galleryName}
                                                    setGalleryName={
                                                        setGalleryName
                                                    }
                                                    oldGalleryName={
                                                        oldGalleryName
                                                    }
                                                    setOldGalleryName={
                                                        setOldGalleryName
                                                    }
                                                    videoName={videoName}
                                                    setVideoName={setVideoName}
                                                    errors={errors}
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
                                                    register={register}
                                                    errors={errors}
                                                />
                                            ))}
                                    </div>
                                    <div className="flex justify-between max-w-4xl mx-auto mt-12">
                                        <button
                                            type="button"
                                            className="bg-themeGray py-3 px-8 rounded-md text-base font-semibold text-white"
                                            disabled={active === 1}
                                            onClick={() =>
                                                setActive(active - 1)
                                            }
                                        >
                                            Prev
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex gap-2 bg-themePrimary py-3 px-8 rounded-md text-base font-semibold text-white cursor-pointer"
                                            disabled={isSubmitting}
                                        >
                                            {active <= 5 && 'Next'}
                                            {active > 5 &&
                                                (isSubmitting
                                                    ? 'Please wait'
                                                    : 'Finish')}

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
                    </main>
                </DashboardLayout>
            )}
        </>
    );
}

export default EditAds;

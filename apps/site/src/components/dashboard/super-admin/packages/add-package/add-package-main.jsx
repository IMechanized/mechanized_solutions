import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { useSWRConfig } from 'swr';
import { authAxios } from '../../../../../utils/axiosKits';
import AddFeaturesForm from './add-features-form';
import InstantPreview from './instant-preview';
import PackageForm from './package-form';
import PackageTable from './Package-Table';

function AddPackageMain() {
    const [features, setFeatures] = React.useState({
        featureData: [],
    });
    const [featurePreview, setFeaturePreview] = React.useState({
        packageName: "Package Name",
        packageColor: "Primary",
        currency: "USD",
        pricing: "00",
        frequency: "Month",
        validity: "0",
        totalAds: "0",
        featuredAds: "0",
        featureDatas: [],
    });
    const [featureTitle, setFeatureTitle] = React.useState("");
    const [featureText, setFeatureText] = React.useState("");
    const { addToast } = useToasts();
    const router = useRouter();

    const { mutate } = useSWRConfig({
        refreshInterval: 0,
    });

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        const inputData = {
            ...data,
            services: features?.featureData,
        }

        try {
            await authAxios({
                method: "POST",
                url: "package/ads",
                data: inputData,
            }).then((res) => {
                addToast(res.data.message, {
                    appearance: "success",
                    autoDismiss: true,
                });
                mutate("package/ads");
                reset();
                router.push("/dashboard/packages");
            });
        } catch (error) {
            if (error?.response?.data) {
                addToast(error.response.data.message, {
                    appearance: "error",
                    autoDismiss: true,
                });
            } else {
                addToast(error?.message, {
                    appearance: "error",
                    autoDismiss: true,
                });
            }
        }
    };

    React.useEffect(() => {
        setFeaturePreview({
            ...featurePreview,
            featureDatas: features?.featureData,
        });
    }, [features]);


    return (
        <section className="pb-44">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-themeBlackDarker">
                    Add New Package
                </h1>
                <Link href="/dashboard/packages">
                    <a>
                        <button className="bg-themeGray rounded py-3 px-7 text-white">
                            Discard
                        </button>
                    </a>
                </Link>
            </div>
            <div className="grid grid-cols-7 gap-7 2xl:gap-16 mt-12 ">
                <div className="col-span-7 xl:col-span-5">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className=" bg-white p-10 rounded-xl shadow-boxShadow">
                            <h1 className="text-xl font-bold text-themeBlackDarker">
                                {" "}
                                Package Details
                            </h1>
                            <PackageForm register={register} errors={errors} featurePreview={featurePreview} setFeaturePreview={setFeaturePreview} />
                            <AddFeaturesForm register={register} errors={errors} features={features} setFeatures={setFeatures} featureTitle={featureTitle} setFeatureTitle={setFeatureTitle} featureText={featureText} setFeatureText={setFeatureText} />
                            <PackageTable register={register} errors={errors} features={features} setFeatures={setFeatures} setFeatureTitle={setFeatureTitle} setFeatureText={setFeatureText} featurePreview={featurePreview} setFeaturePreview={setFeaturePreview} />
                            <div className="w-full sm:w-4/12 self-end mt-6">
                                <button
                                    type='submit'
                                    disabled={isSubmitting}
                                    className="w-full md:w-8/12 lg:w-4/12 text-sm font-semibold text-white py-3.5 bg-themePrimary rounded-md text-center">
                                    {isSubmitting ? "Please Wait" : "Save"}
                                    {/* spinner */}
                                    {isSubmitting && (
                                        <div className="flex items-center justify-center ">
                                            <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="col-span-7 xl:col-span-2">
                    <div className="w-full sm:w-10/12 xl:w-full m-auto ">
                        <p className="text-2xl font-bold text-themeBlackDarker pb-7">
                            Instant Preview
                        </p>
                        <div className="col-span-1 bg-white p-10 xl:p-5 2xl:p-10 rounded-lg shadow-boxShadow">
                            <InstantPreview featurePreview={featurePreview} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddPackageMain
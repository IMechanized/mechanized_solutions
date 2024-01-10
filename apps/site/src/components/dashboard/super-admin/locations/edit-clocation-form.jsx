import Link from "next/link";
import { useRouter } from 'next/router';
import React from "react";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import useSWR, { useSWRConfig } from "swr";
import { LoaderPage } from "../../../../lib/loader";
import ImageOpt from "../../../../optimize/image";
import { authAxios } from "../../../../utils/axiosKits";

const fetcher = (url) => authAxios.get(url).then((res) => res.data.data);

const EditLocationForm = () => {
    const [photoImage, setPhotoImage] = React.useState(null);
    const router = useRouter();
    const { addToast } = useToasts();
    const { mutate } = useSWRConfig({
        refreshInterval: 0,
    });

    const { data: locationData, error: locationError } = useSWR(
        `/admin/topLocations/byId/${router.query.active_id}`,
        fetcher
    );

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm();

    React.useEffect(() => {
        if (locationData) {
            setValue("location", locationData?.location);
            setPhotoImage(locationData?.avatar);
        }
    }, [locationData, setValue]);

    const onSubmit = async (data) => {

        if (photoImage === null) {
            return addToast("Please select a photo", {
                appearance: "warning",
                autoDismiss: true,
            });
        }

        const formData = new FormData();
        formData.append("location", data.location);

        if (data?.locationIcon) {
            formData.append("locationImage", data.locationIcon[0]);
        }

        try {
            await authAxios
                .put(`/admin/topLocations/byId/${router.query.active_id}`, formData)
                .then((res) => {
                    addToast(res.data.message, {
                        appearance: "success",
                        autoDismiss: true,
                    });
                    mutate("/admin/topLocations");
                    setPhotoImage(null);
                    router.push("/dashboard/superadmin/locations");
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
    }

    // photo image upload preview handler
    function photoPreview(e) {
        const file = e.target.files[0];
        const filePreview = URL.createObjectURL(file);
        setPhotoImage(filePreview);
    }

    const ImageFile = register("locationIcon");

    return (
        <section className="h-screen">
            <div className="max-w-lg	mx-auto bg-white p-10 shadow-boxShadow rounded-xl ">
                <div className="flex justify-between items-center">
                    <h1 className="text-lg sm:text-xl font-bold text-themeBlackDarker">
                        Edit Location
                    </h1>
                    <Link href="/dashboard/superadmin/locations">
                        <a className="text-sm font-normal text-themePrimary">Cancel</a>
                    </Link>
                </div>
                <div className="pt-7 relative">

                    {locationError && <div className="bg-red-300 my-2 text-white py-1 p-2.5 text-xss rounded text-center">Failed to load data</div>}
                    {!locationError && !locationData && <LoaderPage />}


                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="">
                            <p className="text-sm font-semibold text-themeGrayWhite pb-2">
                                Category Name
                            </p>
                            <input
                                type="text"
                                className="w-full focus:outline-none py-3 px-3 rounded-md border border-themeGrayLight"
                                {...register("location", { required: true })}
                            />
                            {errors.location && (
                                <span className="text-red-400 text-sm italic">
                                    This field is required
                                </span>
                            )}
                        </label>

                        <div className="pt-4">
                            <p className="text-sm font-semibold text-themeGrayWhite pb-2">
                                Upload Icon
                            </p>
                            {photoImage && (
                                <span className="!mb-3 items-center flex gap-3">
                                    <ImageOpt
                                        src={photoImage}
                                        style={{
                                            minWidth: "100px",
                                            minHeight: "100px",
                                        }}
                                        width={100}
                                        height={100}
                                        alt="img"
                                    />
                                    <button
                                        type="button"
                                        className="bg-red-300 mt-2 text-white py-1 p-2.5 text-xss rounded hover:bg-red-500"
                                        onClick={() => {
                                            setPhotoImage(null);
                                            setValue("locationIcon", "");
                                        }}
                                    >
                                        Remove
                                    </button>
                                </span>
                            )}
                            <label className="flex flex-col border border-dashed border-themeGray w-full h-14 rounded-md cursor-pointer">
                                <p className="text-sm font-normal text-themeGrayWhite text-center m-auto">
                                    Choose or Drag and Drop SVG Icon
                                </p>
                                <input type="file" className="hidden"
                                    {...ImageFile}
                                    ref={ImageFile.ref}
                                    onBlur={ImageFile.onBlur}
                                    onChange={(event) => {
                                        ImageFile.onChange(event);
                                        photoPreview(event);
                                    }}
                                />
                            </label>
                            {errors.locationIcon && (
                                <span className="text-red-400 text-sm italic">
                                    This field is required
                                </span>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex gap-2  text-base font-semibold text-white bg-themePrimary py-3 px-7 mt-7 rounded"
                        >
                            {isSubmitting ? "Please wait..." : "Update Category"}
                            {/* spinner */}
                            {isSubmitting && (
                                <div className="flex items-center justify-center ">
                                    <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                                </div>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default EditLocationForm;

import React from 'react'
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import useSWR, { useSWRConfig } from 'swr';
import { LoaderPage } from '../../../../../lib/loader';
import { authAxios, Axios } from '../../../../../utils/axiosKits';

const fetcher = (url) => Axios(url).then(res => res.data.data);
const announcementAPI = "/admin/announcement";

const AnnouncementSettings = () => {
    const { addToast } = useToasts();

    const { mutate } = useSWRConfig({
        refreshInterval: 0,
    });

    const { data: announcementData, error: announcementError } = useSWR(announcementAPI, fetcher);
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            announcement: announcementData,
        }
    });

    React.useEffect(() => {
        setValue('announcement', announcementData);
    }, [announcementData, setValue]);

    const onSubmit = async (data) => {
        const inputData = {
            announcement: data.announcement,
        }

        try {
            await authAxios({
                method: "POST",
                url: "/admin/announcement",
                data: inputData,
            }).then((res) => {
                addToast(res.data.message, {
                    appearance: "success",
                    autoDismiss: true,
                });
                mutate("/admin/announcement");
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

    return (
        <div className='relative'>
            <h2 className="text-base font-semibold text-themeBlackAlt">
                Announcement
            </h2>
            {announcementError && <div className="bg-red-300 my-2 text-white py-1 p-2.5 text-xss rounded text-center">Failed to load data</div>}
            {!announcementError && !announcementData && <LoaderPage />}

            <form className="grid mt-10" onSubmit={handleSubmit(onSubmit)}>
                <label className="w-full" htmlFor="">
                    <p className="text-sm font-semibold text-themeWhiteLighter pb-2">
                        Announcement
                    </p>
                    <input
                        type="text"
                        className="w-full xl:w-6/12 rounded-md border border-themeGrayLight py-3 px-3 focus:outline-none"
                        {...register("announcement")}
                    />
                </label>
                <button
                    type='submit'
                    disabled={isSubmitting}
                    className="flex gap-2 bg-themePrimary rounded text-base text-white font-semibold py-3 px-6 mt-5 w-fit">
                    {isSubmitting ? "Please wait..." : "Save"}
                    {/* spinner */}
                    {isSubmitting && (
                        <div className="flex items-center justify-center ">
                            <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                        </div>
                    )}
                </button>
            </form>
        </div>
    )
}

export default AnnouncementSettings
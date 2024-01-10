const PersonalInfo = ({ register, errors }) => {
    return (
        <div>
            <h2 className="text-xl font-bold text-themeBlackDarker pb-10">
                Personal Info
            </h2>
            <div className="flex flex-wrap sm:flex-nowrap gap-6">
                <label className="w-full" htmlFor="">
                    <p className="text-sm font-semibold text-themeWhiteLighter pb-2">
                        Name
                    </p>
                    <input
                        type="text"
                        className={`rounded-md border placeholder:text-themeGray w-full focus:outline-none p-3 ${
                            errors?.fullName
                                ? 'border-themeRedLight'
                                : 'border-themeGrayLight'
                        }`}
                        {...register('fullName', {
                            required: 'Full Name is required',
                        })}
                        placeholder="Enter Full Name"
                    />
                </label>
                <label className="w-full" htmlFor="">
                    <p className="text-sm font-semibold text-themeWhiteLighter pb-2">
                        Email
                    </p>
                    <input
                        type="email"
                        className={`rounded-md border placeholder:text-themeGray w-full focus:outline-none p-3 ${
                            errors?.email
                                ? 'border-themeRedLight'
                                : 'border-themeGrayLight'
                        }`}
                        {...register('email', {
                            required: 'Email is required',
                        })}
                        placeholder="Enter Email Address"
                    />
                </label>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-6 mt-6">
                <label className="w-full" htmlFor="">
                    <p className="text-sm font-semibold text-themeWhiteLighter pb-2">
                        Phone
                    </p>
                    <input
                        type="text"
                        className="rounded-md border placeholder:text-themeGray border-themeGrayLight w-full focus:outline-none p-3"
                        {...register('phone')}
                        placeholder="Enter Phone Number"
                    />
                </label>
                <label className="w-full" htmlFor="">
                    <p className="text-sm font-semibold text-themeWhiteLighter pb-2">
                        Location
                    </p>
                    <input
                        type="text"
                        className={`rounded-md border placeholder:text-themeGray w-full focus:outline-none p-3 ${
                            errors?.personalLocation
                                ? 'border-themeRedLight'
                                : 'border-themeGrayLight'
                        }`}
                        {...register('personalLocation', {
                            required: 'Location is required',
                        })}
                        placeholder="Enter Location"
                    />
                </label>
            </div>
        </div>
    );
};

export default PersonalInfo;

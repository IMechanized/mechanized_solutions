export const Loader = () => {
    return (
        <div id="preloader">
            <div className="sk-three-bounce">
                <div className="sk-child text-themePrimary sk-bounce1"></div>
                <div className="sk-child text-themePrimary sk-bounce2"></div>
                <div className="sk-child text-themePrimary sk-bounce3"></div>
            </div>
        </div>
    );
};

export const LoaderGrowing = () => {
    return (
        <div className="absolute inset-0 flex bg-[#ffffffd0] z-40 justify-center items-center">
            <div
                className="spinner-grow text-themePrimary h-10 w-10"
                role="status"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export const LoaderPage = () => {
    return (
        <div className="absolute w-full h-full bg-[#ffffffd0] z-40 flex justify-center items-center">
            <div className="flex  items-center justify-center space-x-2 animate-pulse">
                <div className="w-8 h-8 bg-themePrimary rounded-full"></div>
                <div className="w-8 h-8 bg-themePrimary rounded-full"></div>
                <div className="w-8 h-8 bg-themePrimary rounded-full"></div>
            </div>
        </div>
    );
};

export const LoaderMain = () => {
    return (
        <div className="absolute inset-0 bg-[#ffffffd0] z-40 flex justify-center items-center">
            <div className="flex items-center justify-center space-x-2 animate-pulse">
                <div className="w-8 h-8 bg-themePrimary rounded-full"></div>
                <div className="w-8 h-8 bg-themePrimary rounded-full"></div>
                <div className="w-8 h-8 bg-themePrimary rounded-full"></div>
            </div>
        </div>
    );
};

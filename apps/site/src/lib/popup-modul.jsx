import styled from '@emotion/styled';

const PopupModule = ({
    children,
    titleClassName,
    closeIconClassName,
    bodyClassName,
    overlayClassName,
    PopupTitle,
    Popup,
    PopupHandler,
    maxHeight,
}) => {
    return (
        <PopupWrapper className={Popup ? 'show' : 'hide'}>
            <div className="flex justify-center items-center w-full h-screen">
                <Form className={Popup ? 'show' : 'hide'} maxHeight={maxHeight}>
                    <FormTitle>
                        <FormTitleText
                            className={titleClassName ? titleClassName : ''}
                        >
                            {PopupTitle}
                        </FormTitleText>
                        <FormTitleClose
                            onClick={PopupHandler}
                            className={
                                closeIconClassName
                                    ? closeIconClassName
                                    : 'hover:!bg-themeSecondary !bg-themePrimary duration-300 ease-in-out'
                            }
                        >
                            <CloseIcon />
                        </FormTitleClose>
                    </FormTitle>
                    <FormBody className={bodyClassName ? bodyClassName : ''}>
                        {children}
                    </FormBody>
                </Form>
                <PopupOverlay
                    overlayClassName={overlayClassName ? overlayClassName : ''}
                    onClick={PopupHandler}
                />
            </div>
        </PopupWrapper>
    );
};

const CloseIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
                fill="currentColor"
            />
        </svg>
    );
};

export default PopupModule;

const PopupWrapper = styled('div')`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 99;
    color: #fff;
    transition: all 0.3s ease-in-out;
    opacity: 0;
    visibility: hidden;
    &.show {
        opacity: 1;
        visibility: visible;
    }
`;
const Form = styled('div')`
    max-width: 550px;
    width: 100%;
    max-height: ${(props) => (props.maxHeight ? props.maxHeight : '90%')};
    height: fit-content;
    overflow: auto;
    margin: 0 auto;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transform: scale(0.7);
    transition: all 0.3s ease-in-out;
    opacity: 0;
    visibility: hidden;
    position: relative;
    z-index: 2;
    &.show {
        transform: scale(1);
        opacity: 1;
        visibility: visible;
    }
`;
const FormTitle = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    border-bottom: 1px solid #ebebeb;
`;
const FormTitleText = styled('div')`
    font-size: 28px;
    font-weight: 500;
    color: #000;
`;
const FormTitleClose = styled('div')`
    cursor: pointer;
    padding: 15px;
    border-radius: 5px;
    & svg {
        color: #fff;
        width: 16px;
        height: 16px;
    }
`;
const FormBody = styled('div')`
    padding: 40px;
    color: #000;
`;
const PopupOverlay = styled('div')`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
`;

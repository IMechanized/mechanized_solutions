import React from "react";
import { useToasts } from "react-toast-notifications";
import { authAxios } from "../../../../../utils/axiosKits";
import ConfirmEmail from "./confirm-email";

const menuData = [
  {
    id: 1,
    title: "Email Confirmation",
    type: "CONFIRMATION_EMAIL",
  },
  {
    id: 2,
    title: "Password Reset Email",
    type: "RESET_PASSWORD",
  },
  {
    id: 3,
    title: "Forget Password",
    type: "FORGET_PASSWORD",
  },
];

const EmailSettings = () => {
  const [activeForm, setActiveForm] = React.useState(0);
  const [loading, setLoading] = React.useState(0);
  const [emailType, setEmailType] = React.useState("CONFIRMATION_EMAIL");
  const [emailData, setEmailData] = React.useState(null);

  const { addToast } = useToasts();

  const getDataByEmailType = async (type) => {
    setLoading(true);
    try {
      await authAxios({
        method: "GET",
        url: `/admin/notification/email/${type}`,
      }).then((res) => {
        setEmailData(res.data.data[0]);
        setLoading(false);
      });
    } catch (error) {
      addToast(error.response?.data?.message, {
        appearance: "error",
        autoDismiss: true,
      });
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (emailType == "CONFIRMATION_EMAIL") {
      setLoading(true);
      try {
        authAxios({
          method: "GET",
          url: `/admin/notification/email/${emailType}`,
        }).then((res) => {
          setEmailData(res.data.data[0]);
          setLoading(false);
        });
      } catch (error) {
        addToast(error.response?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
        setLoading(false);
      }
    }
  }, []);

  return (
    <section>
      <div className="w-full">
        <ul className="flex flex-wrap gap-x-10 gap-y-4 2xl:border-b 2xl:mb-3 w-full">
          {menuData.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setActiveForm(index)
                getDataByEmailType(item.type)
                setEmailType(item.type)
              }}
              className={`text-base font-semibold cursor-pointer border-b-2 2xl:pb-3 ${activeForm === index
                ? " border-themePrimary text-themePrimary "
                : " border-white"
                }`}
            >
              {item.title}
            </li>
          ))}
        </ul>
        {/* <hr className="mt-3 2xl:hidden"/> */}
      </div>

      <div className="pt-5">
        {activeForm === 0 && <ConfirmEmail emailData={emailData} loading={loading} emailType={emailType} />}
        {activeForm === 1 && <ConfirmEmail emailData={emailData} loading={loading} emailType={emailType} />}
        {activeForm === 2 && <ConfirmEmail emailData={emailData} loading={loading} emailType={emailType} />}
      </div>
    </section>
  );
};

export default EmailSettings;

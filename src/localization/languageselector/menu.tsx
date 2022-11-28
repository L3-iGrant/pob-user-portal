import "react-i18next";
import { useTranslation } from "react-i18next";
import { Dropdown } from "antd";

export const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  const handleOnclick = (e: any) => {
    i18n.changeLanguage(e.key);
  };

  const items:any = [

    {
      label:"English",
      key:"en"
    },
    {
      label:"Swedish",
       key:"sw"
      },
    {
      label:"Finnish",
       key:"fn"
    },
    // {
    //   label:"Norwegian",
    //    key:"ng"
    // },

  ]
   return (
    <Dropdown menu={{items,onClick:handleOnclick}} placement="top">
      <a href="#" style={{ fontSize: 13 }}>
        {t("Language")}
      </a>
    </Dropdown>
  );
};
export default LanguageSelector;

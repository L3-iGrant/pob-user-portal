import { useTranslation } from 'react-i18next';

export const LandingPage = () => {
    const { t, i18n } = useTranslation();

    return (
        <div>
            {t('Procurement buyer')}
        </div>
    );
};

export default LandingPage;
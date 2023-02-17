import { CorrespondenceAddressData } from 'components/forms/segments/CorrespondenceAddressForm/CorrespondenceAddressForm'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import SummaryRow from '../../../steps/Summary/SummaryRow'
import CorrespondenceAddressModal from '../../CorrespondenceAddressModal/CorrespondenceAddressModal'

const ContactInformationSection = (props: any) => {
  const { t } = useTranslation('account')

  const [correnspondenceAddressModalShow, setCorrenspondenceAddressModalShow] = useState(false)

  const onSubmitCorrespondenceAddress = ({ data }: { data?: CorrespondenceAddressData }) => {
    console.log(data)
    setCorrenspondenceAddressModalShow(false)
  }

  return (
    <>
      <CorrespondenceAddressModal
        show={correnspondenceAddressModalShow}
        onClose={() => setCorrenspondenceAddressModalShow(false)}
        onSubmit={onSubmitCorrespondenceAddress}
        defaultValues={{}}
      />
      <div className="flex flex-col items-start sm:gap-8 gap-6 w-full">
        <div className="flex flex-col w-full items-start gap-2">
          <div className="text-h3">{t('personal_info')}</div>
          <div className="flex flex-col w-full">
            <SummaryRow
              size="small"
              isEditable={false}
              data={{
                label: t('name_and_surname'),
                value: 'Michal Mrkvička',
                schemaPath: '',
                isError: false,
              }}
            />
            <SummaryRow
              size="small"
              isEditable={false}
              data={{
                label: t('permanent_address'),
                value: 'Námestie hraničiarov 12/A, 811 01 Bratislava',
                schemaPath: '',
                isError: false,
              }}
            />
            <SummaryRow
              size="small"
              data={{
                label: t('correspondence_address'),
                value: 'Námestie hraničiarov 12/A, 811 01 Bratislava',
                schemaPath: '',
                isError: false,
              }}
              onGoToStep={() => setCorrenspondenceAddressModalShow(true)}
            />
            <SummaryRow
              size="small"
              isEditable={false}
              data={{
                label: t('taxpayer_id'),
                value: '111 222',
                schemaPath: '',
                isError: false,
              }}
            />
          </div>
        </div>
        <div className="flex flex-col w-full items-start gap-2">
          <div className="text-h3">{t('equips')}</div>
          <div className="flex flex-col w-full">
            <SummaryRow
              size="small"
              isEditable={false}
              data={{
                label: t('name_and_surname'),
                value: 'Meno Správcu/Správkyne',
                schemaPath: '',
                isError: false,
              }}
            />
            <SummaryRow
              size="small"
              isEditable={false}
              data={{
                label: t('contact'),
                value: '+421 2/553 559 38, meno.priezvisko@bratislava.sk',
                schemaPath: '',
                isError: false,
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactInformationSection
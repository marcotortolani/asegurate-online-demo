'use server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { PersonalData } from '@/components/cotizar/sin-patente/form-personal-data'

const clientId = process.env.SANCOR_SEGUROS_API_KEY
const apiSecret = process.env.SANCOR_SEGUROS_API_SECRET
const apiUrl = process.env.NEXT_PUBLIC_SANCOR_SEGUROS_API_URL

interface Vehicle_Quotation {
  person: {
    identificationNumber: number
    identificationType: PersonalData['identification_type']
    isJuridicPerson: boolean
  }
  currencyCode: number
  policyPeriodStartEffectiveDate: string
  policyPeriodEndEffectiveDate?: string
  intermediary: {
    prodProducerCode: number
    upperProducerCode: number
  }
  policyVigencyCode: number
  policyPaymentPeriodicityCode: number
  policyQuotas: number
  productCode: number
  zone: {
    postalCode: number
    cityCode: number
  }
  vehicle: {
    vehicleCode: string
    vehicleYear: number
    yearSuggestedValue: number
    vehicleUseTypeCode: number
    vehicleTrackingEquipment: boolean
    gncInformation: {
      hasGNC: boolean
      accesoryInsuredSum: number
    }
    zeroKM: boolean
  }
}

const STATIC_DATA: Vehicle_Quotation = {
  person: {
    identificationNumber: 30205500,
    identificationType: 'D',
    isJuridicPerson: false,
  },
  currencyCode: 1, // 1: pesos
  policyPeriodStartEffectiveDate: '2025-05-21T00:00:00',
  // policyPeriodEndEffectiveDate: '2026-05-21T00:00:00',
  intermediary: {
    prodProducerCode: 102781, // Código productor
    upperProducerCode: 1, // Código organizador
  },
  policyVigencyCode: 1, // 1: anual, 2: semestral, 3: trimestral
  policyPaymentPeriodicityCode: 5, // 5: mensual, 7: cuotas
  policyQuotas: 0, // fijo
  productCode: 24, // 24: automotores
  zone: {
    postalCode: 1427, // codigo postal
    cityCode: 12, // ID localidad
  },
  vehicle: {
    vehicleCode: '180599',
    vehicleYear: 2018,
    yearSuggestedValue: 0,
    vehicleUseTypeCode: 2, // 2: particular, 4: particular y/o comercial, 7: transporte general
    vehicleTrackingEquipment: false,
    gncInformation: {
      hasGNC: false, // dato del formulario
      accesoryInsuredSum: 0,
    },
    zeroKM: false, // dato del formulario
  },
}

export async function POST() {
  const cookieStore = await cookies()
  const token = cookieStore.get('sancor_id_token')?.value

  if (!token) {
    console.log('🔐 Token no encontrado')
    return NextResponse.json(
      { message: 'Token no encontrado' },
      { status: 401 }
    )
  }

  if (!clientId || !apiSecret || !apiUrl) {
    console.error('Faltan credenciales o URL de la API')
    return NextResponse.json(
      { message: 'Faltan credenciales o URL de la API' },
      { status: 500 }
    )
  }
  console.log('SANCOR API URL: ', apiUrl)
  console.log('token: ', token)

  try {
    const response = await fetch(`${apiUrl}/quotations/vehicle/automotive`, {
      method: 'POST',
      headers: {
        gss_apiclient_id: clientId,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        vehicleQuotation: {
          person: {
            identificationNumber: 32605266,
            identificationType: 'D',
            isJuridicPerson: false,
          },
          currencyCode: 1, // 1: pesos
          policyPeriodStartEffectiveDate: new Date()
            .toISOString()
            .split('.')[0],
          // policyPeriodEndEffectiveDate: '2026-05-21T00:00:00',
          intermediary: {
            prodProducerCode: STATIC_DATA.intermediary.prodProducerCode,
            upperProducerCode: STATIC_DATA.intermediary.upperProducerCode,
          },
          policyVigencyCode: STATIC_DATA.policyVigencyCode, // 1: anual, 2: semestral, 3: trimestral
          policyPaymentPeriodicityCode: 5, // 5: mensual, 7: cuotas
          policyQuotas: 0, // fijo
          productCode: 24, // 24: automotores
          zone: {
            postalCode: 1427,
            cityCode: 298,
          },
          vehicle: {
            vehicleCode: STATIC_DATA.vehicle.vehicleCode,
            vehicleYear: STATIC_DATA.vehicle.vehicleYear,
            yearSuggestedValue: STATIC_DATA.vehicle.yearSuggestedValue,
            vehicleUseTypeCode: STATIC_DATA.vehicle.vehicleUseTypeCode,
            vehicleTrackingEquipment:
              STATIC_DATA.vehicle.vehicleTrackingEquipment,
            gncInformation: {
              hasGNC: false, // dato del formulario
              accesoryInsuredSum: 0,
            },
            zeroKM: false, // dato del formulario
          },
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error en la respuesta de Sancor Seguros:', errorText)
      return NextResponse.json(
        { message: errorText || 'Error al obtener la cotización' },
        { status: 500 }
      )
    }

    const data = await response.json()
    console.log('data: ->', data)
    return NextResponse.json(data)
  } catch (error: unknown) {
    console.error('Error en la API Route:', error)
    return NextResponse.json(
      { message: error || 'Error al obtener la cotización' },
      { status: 500 }
    )
  }
}

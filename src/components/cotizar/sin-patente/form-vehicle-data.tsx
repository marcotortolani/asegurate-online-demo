'use client'
import { useState } from 'react'
import { SearchIcon, ChevronDown } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function VehicleForm({
  onNextStep,
  setData,
}: {
  onNextStep: () => void
  setData: (data: {
    brand_id: number
    brand_name: string
    model: string
    model_id: number
    year: number
    version: string
    codia: number
    hasGnc: boolean
    isZeroKm: boolean
  }) => void
}) {
  const [brandQuery, setBrandQuery] = useState('')
  const [brands, setBrands] = useState<{ id: number; name: string }[]>([])
  const [selectedBrand, setSelectedBrand] = useState<{
    id: number
    name: string
  } | null>(null)
  const [selectedGroup, setSelectedGroup] = useState<{
    id: number
    name: string
  } | null>(null)
  const [selectedModel, setSelectedModel] = useState<{
    id: number
    description: string
    codia: number
    photoUrl: string
  } | null>(null)

  const [groups, setGroups] = useState<{ id: number; name: string }[]>([])
  const [models, setModels] = useState<
    { id: number; description: string; codia: number; photoUrl: string }[]
  >([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBrands = async (query: string) => {
    if (!query || query.length < 2) {
      setBrands([])
      setIsDropdownOpen(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `/api/infoauto/brands?query_string=${encodeURIComponent(query)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error('Error al obtener las marcas')
      }

      const data: { id: number; name: string }[] = await response.json()
      const filteredBrands = data.filter((brand) =>
        brand.name.toLowerCase().includes(query.toLowerCase())
      )

      setBrands(filteredBrands)
      setIsDropdownOpen(filteredBrands.length > 0)
      if (filteredBrands.length > 0) {
        fetchGroups(filteredBrands[0].id)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al buscar marcas')
      setBrands([])
      setIsDropdownOpen(false)
    } finally {
      setLoading(false)
    }
  }

  const fetchGroups = async (brandId: number) => {
    try {
      const response = await fetch(`/api/infoauto/groups/${brandId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Error al obtener los grupos')
      }

      const data: {
        id: number
        name: string
      }[] = await response.json()

      setGroups(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al buscar grupos')
      setGroups([])
    }
  }

  const fetchModels = async ({
    brandId,
    groupId,
  }: {
    brandId: number
    groupId: number
  }) => {
    try {
      const response = await fetch(
        `/api/infoauto/groups/${brandId}/models/${groupId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error('Error al obtener los modelos')
      }

      const data: {
        id: number
        description: string
        codia: number
        photoUrl: string
      }[] = await response.json()

      setModels(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al buscar modelos')
      setModels([])
    }
  }

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setBrandQuery(query)
    setSelectedBrand(null)
    //fetchBrands(query)
  }

  const handleBrandSelect = (brand: { id: number; name: string }) => {
    setSelectedBrand(brand)
    setBrandQuery(brand.name)
    setIsDropdownOpen(false)
  }

  const handleGroupSelect = (group: { id: number; name: string }) => {
    setSelectedModel(null)
    setModels([])
    setSelectedGroup(group)
    fetchModels({ brandId: selectedBrand!.id, groupId: group.id })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedBrand) {
      alert('Por favor selecciona una marca válida')
      return
    }

    const formData = new FormData(e.currentTarget)
    const vehicleData = {
      brand_id: selectedBrand.id,
      brand_name: selectedBrand.name,
      model_id: selectedGroup!.id,
      model: selectedGroup!.name,
      year: parseInt(formData.get('year') as string),
      version: selectedModel!.description,
      codia: selectedModel!.codia,
      hasGnc: formData.get('gnc') === 'si',
      isZeroKm: formData.get('zerokm') === 'si',
    }
    setData(vehicleData)
    onNextStep()
  }

  return (
    <div className="h-fit bg-white p-4 md:p-6 rounded-2xl max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="h-fit flex flex-col gap-2 lg:gap-4"
      >
        <div className="relative">
          <input
            type="text"
            name="brand"
            id="brand"
            value={brandQuery}
            onChange={handleBrandChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                fetchBrands(brandQuery)
                setModels([])
                setSelectedModel(null)
              }
            }}
            placeholder="Marca"
            className="w-full px-6 py-2 font-platform-regular text-xl placeholder:text-primary/60 text-primary bg-white border-4 border-gray-300 rounded-full"
            autoComplete="off"
          />
          <div className="absolute inset-y-0 right-4 flex items-center px-2 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-black stroke-3" />
          </div>

          {isDropdownOpen && (
            <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {brands.map((brand) => (
                <li
                  key={brand.id + brand.name}
                  onClick={() =>
                    handleBrandSelect({
                      id: brand.id,
                      name: brand.name,
                    })
                  }
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {brand.name}
                </li>
              ))}
            </ul>
          )}

          {loading && <p className="text-sm text-gray-500 mt-1">Buscando...</p>}
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>

        <div className="relative">
          <Select>
            <SelectTrigger className="w-full h-full px-6 py-2 font-platform-regular text-xl placeholder:text-primary/60 text-primary bg-white border-4 border-gray-300 rounded-full">
              <SelectValue placeholder="Modelo" />
            </SelectTrigger>
            <SelectContent className=" bg-white shadow" side="bottom">
              {groups.map((group) => (
                <SelectItem
                  key={group.id + group.name}
                  value={group.name || ''}
                  onClick={() => {
                    handleGroupSelect(group)
                    setModels([])
                    setSelectedModel(null)
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="absolute inset-y-0 right-4 flex items-center px-2 pointer-events-none">
            <ChevronDown className="w-6 h-6 text-black stroke-3" />
          </div>
        </div>

        <div className="relative">
          <input
            type="number"
            name="year"
            id="year"
            min={1970}
            max={new Date().getFullYear()}
            placeholder="Año"
            className="w-full px-6 py-2 font-platform-regular text-xl placeholder:text-primary/60 text-primary bg-white border-4 border-gray-300 rounded-full"
          />
        </div>

        <div className="relative">
          <Select>
            <SelectTrigger className="w-full h-full px-6 py-2 font-platform-regular text-xl placeholder:text-primary/60 text-primary bg-white border-4 border-gray-300 rounded-full">
              <SelectValue placeholder="Versión" />
            </SelectTrigger>
            <SelectContent className=" bg-white shadow" side="bottom">
              {models.map((model) => (
                <SelectItem
                  key={model.id + model.description}
                  value={model.description || ''}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedModel(model)
                  }}
                >
                  {model.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="absolute inset-y-0 right-4 flex items-center px-2 pointer-events-none">
            <ChevronDown className="w-6 h-6 text-black stroke-3" />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-primary-grayish font-platform-regular text-lg">
            <p className="mb-2">¿Tiene GNC?</p>
            <div className="flex items-center justify-between gap-4">
              <label className="flex items-center gap-1">
                <span>Sí</span>
                <input
                  type="radio"
                  name="gnc"
                  value="si"
                  className="h-4 w-4 checked:accent-amber-600 cursor-pointer"
                />
              </label>
              <label className="flex items-center gap-1">
                <span>No</span>
                <input
                  type="radio"
                  name="gnc"
                  value="no"
                  className="h-4 w-4 checked:accent-amber-600 cursor-pointer"
                  defaultChecked
                />
              </label>
            </div>
          </div>
          <div className="text-primary-grayish font-platform-regular text-lg">
            <p className="mb-2">¿Es 0km?</p>
            <div className="flex items-center justify-between gap-4">
              <label className="flex items-center gap-1">
                <span>Sí</span>
                <input
                  type="radio"
                  name="zerokm"
                  value="si"
                  className="h-4 w-4 checked:accent-amber-600 cursor-pointer"
                />
              </label>
              <label className="flex items-center gap-1">
                <span>No</span>
                <input
                  type="radio"
                  name="zerokm"
                  value="no"
                  className="h-4 w-4 checked:accent-amber-600 cursor-pointer"
                  defaultChecked
                />
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-primary uppercase font-platform-medium tracking-wide text-lg cursor-pointer text-white px-8 py-2 rounded-2xl hover:bg-primary-dark disabled:bg-primary-grayish disabled:cursor-not-allowed disabled:hover:bg-primary-grayish disabled:grayscale-75 transition-colors"
            disabled={loading || !selectedGroup || !selectedModel}
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  )
}

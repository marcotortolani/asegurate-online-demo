import Image from 'next/image'

export default function AutoInspection() {
  return (
    <div className="bg-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-primary text-center mb-4">
          ¿Cómo hacer la auto inspección de tu vehículo?
        </h2>
        <p className="text-center text-lg mb-10">
          Con ayuda de tu teléfono puedes hacer la auto inspección
        </p>

        <div className="flex flex-col items-center mb-12">
          <div className="w-full max-w-md">
            <Image
              src="/placeholder.svg?height=300&width=600"
              alt="Auto"
              width={600}
              height={300}
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Paso 1 */}
          <div className="border border-primary rounded-lg p-6">
            <div className="bg-secondary text-white font-bold py-1 px-4 rounded-full inline-block mb-4">
              PASO 1
            </div>
            <h3 className="text-xl font-bold text-primary mb-4">
              FOTO FRENTE-LATERAL DEL VEHÍCULO
            </h3>
            <div className="mb-4">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Foto frontal-lateral"
                width={300}
                height={200}
                className="w-full h-auto rounded-md"
              />
            </div>
            <p className="mb-4">
              <span className="font-bold">Tomar una foto</span>{' '}
              <span className="text-secondary font-bold">
                del frente y lateral izquierdo
              </span>{' '}
              del auto, asegúrate que la imagen sea clara y bien iluminada.
            </p>
            <button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors">
              SUBIR IMAGEN
            </button>
          </div>

          {/* Paso 2 */}
          <div className="border border-primary rounded-lg p-6">
            <div className="bg-secondary text-white font-bold py-1 px-4 rounded-full inline-block mb-4">
              PASO 2
            </div>
            <h3 className="text-xl font-bold text-primary mb-4">
              FOTO FRENTE-LATERAL DEL VEHÍCULO
            </h3>
            <div className="mb-4">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Foto frontal-lateral"
                width={300}
                height={200}
                className="w-full h-auto rounded-md"
              />
            </div>
            <p className="mb-4">
              <span className="font-bold">Tomar una foto</span>{' '}
              <span className="text-secondary font-bold">
                del frente y lateral derecho
              </span>{' '}
              del auto, asegúrate que la imagen sea clara y bien iluminada.
            </p>
            <button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors">
              SUBIR IMAGEN
            </button>
          </div>

          {/* Paso 3 */}
          <div className="border border-primary rounded-lg p-6">
            <div className="bg-secondary text-white font-bold py-1 px-4 rounded-full inline-block mb-4">
              PASO 3
            </div>
            <h3 className="text-xl font-bold text-primary mb-4">
              FOTO TRASERA-LATERAL DEL VEHÍCULO
            </h3>
            <div className="mb-4">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Foto trasera-lateral"
                width={300}
                height={200}
                className="w-full h-auto rounded-md"
              />
            </div>
            <p className="mb-4">
              <span className="font-bold">Tomar una foto</span>{' '}
              <span className="text-secondary font-bold">
                de la parte trasera y lateral izquierdo
              </span>{' '}
              del auto, asegúrate que la imagen sea clara y bien iluminada.
            </p>
            <button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors">
              SUBIR IMAGEN
            </button>
          </div>

          {/* Paso 4 */}
          <div className="border border-primary rounded-lg p-6">
            <div className="bg-secondary text-white font-bold py-1 px-4 rounded-full inline-block mb-4">
              PASO 4
            </div>
            <h3 className="text-xl font-bold text-primary mb-4">
              FOTO TRASERA-LATERAL DEL VEHÍCULO
            </h3>
            <div className="mb-4">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Foto trasera-lateral"
                width={300}
                height={200}
                className="w-full h-auto rounded-md"
              />
            </div>
            <p className="mb-4">
              <span className="font-bold">Tomar una foto</span>{' '}
              <span className="text-secondary font-bold">
                de la parte trasera y lateral derecho
              </span>{' '}
              del auto, asegúrate que la imagen sea clara y bien iluminada.
            </p>
            <button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors">
              SUBIR IMAGEN
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

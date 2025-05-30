import Image from 'next/image'

export default function AutoInspection() {
  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <section className=" px-4 md:px-8 h-fit flex flex-col-reverse md:flex-row items-center justify-between gap-4 lg:gap-8 ">
        <div className=" md:w-10/12 lg:w-2/3 flex flex-col items-center md:items-start gap-4 md:gap-6 lg:gap-10 bg-red-300/0">
          <h4 className="font-platform-medium text-left text-2xl md:text-3xl text-primary ">
            Con ayuda de tu teléfono puedes hacer la auto inspección
          </h4>
          <p className=" pr-8 font-platform-medium text-left text-lg md:text-xl text-black ">
            A continuación te indicaremos cómo tomar correctamente las fotos a
            tu vehículo para hacer la auto inspección.
          </p>
          <p className=" w-fit px-5 py-2 border-3 border-primary-grayish font-platform-medium text-left text-2xl text-primary-grayish rounded-2xl">
            Sigue el paso a paso
          </p>
        </div>

        <div className="w-5/6 md:w-8/12 lg:w-2/5 max-w-[500px] md:p-12 h-auto bg-sky-200/0 ">
          <Image
            className=" h-full w-auto md:scale-120 lg:scale-100 "
            src="/images/requirements/auto-2d-frente.webp"
            alt="Auto"
            width={600}
            height={300}
          />
        </div>
      </section>

      <div className="h-0.75 w-5/6 md:w-2/3 mx-auto max-w-[600px] bg-secondary mt-10 mb-14 md:my-14" />

      <section className="w-full px-2 md:px-8 grid md:grid-cols-2 gap-8 font-platform-medium">
        {/* Paso 1 */}
        <article className=" px-6 py-10 flex flex-col items-center justify-around gap-4 relative border-6 border-primary rounded-xl ">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary font-platform-medium uppercase text-2xl text-white py-1 px-4 rounded-xl ">
            PASO 1
          </div>
          <h4 className="font-platform-medium text-center text-2xl uppercase font-bold text-primary ">
            Foto frente-lateral izquierdo del vehículo
          </h4>
          <div className="px-4">
            <Image
              src="/images/requirements/auto-2d-frente-lateral.webp"
              alt="Foto frontal-lateral"
              width={300}
              height={200}
              className="w-full h-auto rounded-md"
            />
          </div>
          <p className="text-center text-lg ">
            <span className="">Tomar una</span>{' '}
            <span className="text-secondary font-bold">
              foto del frente y lateral izquierdo
            </span>{' '}
            del auto, asegúrate que la imágen sea clara y bien iluminada.
          </p>
          <button className="bg-primary font-platform-regular text-lg tracking-wider text-white py-2 px-4 rounded-2xl hover:bg-primary-dark transition-colors">
            SUBIR IMAGEN
          </button>
        </article>

        {/* Paso 2 */}
        <article className=" px-6 py-10 flex flex-col items-center justify-around gap-4 relative border-6 border-primary rounded-xl ">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary font-platform-medium uppercase text-2xl text-white py-1 px-4 rounded-xl ">
            PASO 2
          </div>
          <h4 className="font-platform-medium text-center text-2xl uppercase font-bold text-primary ">
            Foto frente-lateral derecho del vehículo
          </h4>
          <div className="px-4">
            <Image
              src="/images/requirements/auto-2d-frente-lateral.webp"
              alt="Foto frontal-lateral"
              width={300}
              height={200}
              className="w-full h-auto -scale-x-100 rounded-md"
            />
          </div>
          <p className="text-center text-lg ">
            <span className="">Tomar una</span>{' '}
            <span className="text-secondary font-bold">
              foto del frente y lateral derecho
            </span>{' '}
            del auto, asegúrate que la imágen sea clara y bien iluminada.
          </p>
          <button className="bg-primary font-platform-regular text-lg tracking-wider text-white py-2 px-4 rounded-2xl hover:bg-primary-dark transition-colors">
            SUBIR IMAGEN
          </button>
        </article>

        {/* Paso 3 */}
        <article className=" px-6 py-10 flex flex-col items-center justify-around gap-4 relative border-6 border-primary rounded-xl ">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary font-platform-medium uppercase text-2xl text-white py-1 px-4 rounded-xl ">
            PASO 3
          </div>
          <h4 className="font-platform-medium text-center text-2xl uppercase font-bold text-primary ">
            Foto trasera-lateral izquierdo del vehículo
          </h4>
          <div className="px-4">
            <Image
              src="/images/requirements/auto-2d-trasero-lateral.webp"
              alt="Foto frontal-lateral"
              width={300}
              height={200}
              className="w-full h-auto rounded-md"
            />
          </div>
          <p className="text-center text-lg ">
            <span className="">Tomar una</span>{' '}
            <span className="text-secondary font-bold">
              foto de la parte trasera y lateral izquierdo
            </span>{' '}
            del auto, asegúrate que la imágen sea clara y bien iluminada.
          </p>
          <button className="bg-primary font-platform-regular text-lg tracking-wider text-white py-2 px-4 rounded-2xl hover:bg-primary-dark transition-colors">
            SUBIR IMAGEN
          </button>
        </article>

        {/* Paso 4 */}
        <article className=" px-6 py-10 flex flex-col items-center justify-around gap-4 relative border-6 border-primary rounded-xl ">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary font-platform-medium uppercase text-2xl text-white py-1 px-4 rounded-xl ">
            PASO 4
          </div>
          <h4 className="font-platform-medium text-center text-2xl uppercase font-bold text-primary ">
            Foto trasera-lateral derecho del vehículo
          </h4>
          <div className="px-4">
            <Image
              src="/images/requirements/auto-2d-trasero-lateral.webp"
              alt="Foto frontal-lateral"
              width={300}
              height={200}
              className="w-full h-auto -scale-x-100 rounded-md"
            />
          </div>
          <p className="text-center text-lg ">
            <span className="">Tomar una</span>{' '}
            <span className="text-secondary font-bold">
              foto de la parte trasera y lateral derecho
            </span>{' '}
            del auto, asegúrate que la imágen sea clara y bien iluminada.
          </p>
          <button className="bg-primary font-platform-regular text-lg tracking-wider text-white py-2 px-4 rounded-2xl hover:bg-primary-dark transition-colors">
            SUBIR IMAGEN
          </button>
        </article>
      </section>

      <div className="h-0.75 w-5/6 md:w-2/3 mx-auto max-w-[600px] bg-secondary my-10 md:my-14" />

      <section className="w-full px-8 font-platform-medium">
        <div className=" ">
          <h4 className=" w-fit px-4 py-1 mb-4 border-2 border-primary-grayish text-2xl md:text-3xl text-primary-grayish rounded-2xl">
            Otros requerimientos:
          </h4>
          <p className=" md:w-2/5 text-xl">
            Ahora y para finalizar necesitaremos una foto de tu{' '}
            <span className=" text-secondary">
              Documento de Identidad, Cédula del vehículo y GNC (opcional).
            </span>{' '}
            Asegúrate que la imágen sea clara y este bien iluminada.
          </p>
        </div>

        {/* Documento de Identidad */}
        <div className=" mt-10 xl:mt-16 grid grid-cols-1 md:grid-cols-2 xl:place-items-center gap-4 md:gap-8 ">
          <h4 className=" md:col-span-2 text-center text-2xl md:text-3xl text-primary">
            Documento de Identidad
          </h4>
          {/* Documento Frente */}
          <article className=" aspect-square xl:max-w-[400px] px-6 py-4 flex flex-col items-center justify-around relative border-6 border-primary rounded-xl ">
            <h4 className="font-platform-medium text-center text-2xl md:text-3xl uppercase font-bold text-primary ">
              Imagen frontal
            </h4>
            <div className="px-4">
              <Image
                src="/images/requirements/documento-persona-frente.webp"
                alt="Foto Documento Persona Frente"
                width={300}
                height={200}
                className="w-full h-auto rounded-md"
              />
            </div>

            <button className="bg-primary font-platform-regular text-lg tracking-wider text-white py-2 px-4 rounded-2xl hover:bg-primary-dark transition-colors">
              SUBIR IMAGEN
            </button>
          </article>

          {/* Documento Dorso */}
          <article className=" aspect-square xl:max-w-[400px] px-6 py-4 flex flex-col items-center justify-around relative border-6 border-primary rounded-xl ">
            <h4 className="font-platform-medium text-center text-2xl md:text-3xl uppercase font-bold text-primary ">
              Imagen posterior
            </h4>
            <div className="px-4">
              <Image
                src="/images/requirements/documento-persona-dorso.webp"
                alt="Foto Documento Persona Posterior"
                width={300}
                height={200}
                className="w-full h-auto rounded-md"
              />
            </div>

            <button className="bg-primary font-platform-regular text-lg tracking-wider text-white py-2 px-4 rounded-2xl hover:bg-primary-dark transition-colors">
              SUBIR IMAGEN
            </button>
          </article>
        </div>

        {/* Cédula del vehículo */}
        <div className=" mt-10 xl:mt-16 grid grid-cols-1 md:grid-cols-2 xl:place-items-center gap-4 md:gap-8 ">
          <h4 className=" md:col-span-2 text-center text-2xl md:text-3xl text-primary">
            Cédula del vehículo
          </h4>
          {/* Cecula Frente */}
          <article className=" aspect-square xl:max-w-[400px] px-6 py-4 flex flex-col items-center justify-around relative border-6 border-primary rounded-xl ">
            <h4 className="font-platform-medium text-center text-2xl md:text-3xl uppercase font-bold text-primary ">
              Imagen frontal
            </h4>
            <div className="px-4">
              <Image
                src="/images/requirements/cedula-vehiculo-frente.webp"
                alt="Foto Cedula Vehiculo Frente"
                width={300}
                height={200}
                className="w-full h-auto rounded-md"
              />
            </div>

            <button className="bg-primary font-platform-regular text-lg tracking-wider text-white py-2 px-4 rounded-2xl hover:bg-primary-dark transition-colors">
              SUBIR IMAGEN
            </button>
          </article>

          {/* Cecula Dorso */}
          <article className=" aspect-square xl:max-w-[400px] px-6 py-4 flex flex-col items-center justify-around relative border-6 border-primary rounded-xl ">
            <h4 className="font-platform-medium text-center text-2xl md:text-3xl uppercase font-bold text-primary ">
              Imagen posterior
            </h4>
            <div className="px-4">
              <Image
                src="/images/requirements/cedula-vehiculo-dorso.webp"
                alt="Foto Cedula Vehiculo Posterior"
                width={300}
                height={200}
                className="w-full h-auto rounded-md"
              />
            </div>

            <button className="bg-primary font-platform-regular text-lg tracking-wider text-white py-2 px-4 rounded-2xl hover:bg-primary-dark transition-colors">
              SUBIR IMAGEN
            </button>
          </article>
        </div>

        {/* GNC (opcional) */}
        <div className="mt-20 ">
          <h4 className=" mb-4 md:mb-10 text-center text-2xl md:text-3xl text-primary ">
            GNC (opcional, si lo tiene)
          </h4>

          <article className=" md:w-1/3 md:min-w-[300px] mx-auto aspect-square px-6 py-4 flex flex-col items-center justify-around relative border-6 border-primary rounded-xl ">
            <h4 className="font-platform-medium text-center text-2xl md:text-3xl uppercase font-bold text-primary ">
              Imagen
            </h4>
            <div className="px-4">
              <p className=" font-platform-bold text-[6rem] text-neutral-400">
                GNC
              </p>
            </div>

            <button className="bg-primary font-platform-regular text-lg tracking-wider text-white py-2 px-4 rounded-2xl hover:bg-primary-dark transition-colors">
              SUBIR IMAGEN
            </button>
          </article>
        </div>
      </section>
    </div>
  )
}

import Image from 'next/image';
import { LoginForm } from '@/components/login-form';
import { ClientOnly } from '@/components/client-only';

export default function Home() {
  return (
    <div className="relative min-h-screen w-screen">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2020/12/Featured-2-2.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative z-10 flex h-full min-h-screen items-center justify-center">
        <div className="w-full max-w-4xl rounded-xl bg-white/10 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="hidden items-center justify-center p-12 sm:p-16 md:flex">
              <div className="rounded-2xl bg-white p-6">
                <Image
                  src="/stakesense.jpg"
                  alt="Login"
                  width={300}
                  height={300}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center p-12 sm:p-16">
              <ClientOnly>
                <LoginForm />
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

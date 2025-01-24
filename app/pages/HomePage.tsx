import LoginForm from '../components/LoginForm'

export default function Home() {
  return (
    <main className="min-h-screen flex">
      {/* Lado esquerdo - Imagem */}
      <div className="w-1/2 bg-[#EBF3FA] p-8 flex items-center justify-center">
        <div className="relative w-full max-w-md">
          <div className="flex items-start mb-8">
            <div className="w-8 h-8 bg-black rounded-full mr-2"></div>
            <span className="text-xl font-medium">Employee</span>
          </div>
          <img 
            src="/login-illustration.png" 
            alt="Login illustration" 
            className="w-full"
          />
        </div>
      </div>

      {/* Lado direito - Formulário */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <LoginForm />
      </div>
    </main>
  )
} 
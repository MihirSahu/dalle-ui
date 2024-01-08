import Footer from "./components/footer/footer"

export default async function Home() {

  return (
    <main className="flex h-fit flex-col items-center p-24 space-y-16">
      <div className="text-black font-semibold text-6xl text-center uppercase">Create images at the speed of thought</div>
      <div className="flex flex-col space-y-5">
        <div className="text-black font-semibold text-xl text-center">Use the most popular image generation models to their full extent, effortlessly.</div>
        <div className="text-black font-semibold text-xl text-center">Completely free, no account necessary.</div>
      </div>
      {/*<Footer />*/}
    </main>
  )
}
